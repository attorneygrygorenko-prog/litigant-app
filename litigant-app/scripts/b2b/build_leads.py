#!/usr/bin/env python3
"""Крок 2: ліди B2B — юрособи з відкритими виконавчими провадженнями.

Джерела (відкриті дані data.gov.ua):
  data/erb_legal.json       — агрегат Єдиного реєстру боржників (aggregate_erb.py)
  data/raw/uo.zip           — ЄДР, юридичні особи (статус, форма, керівник)
  data/raw/bankrutstvo.csv  — ДСА, оголошення у справах про банкрутство

Фільтри:
  • регіон за органом виконання: Київ, Київська, Одеська;
  • ≥ MIN_VP відкритих ВП;
  • ЄДР: «зареєстровано», не в процесі припинення, без відомостей про банкрутство/санацію;
  • не державні / комунальні (за формою і назвою);
  • немає в реєстрі справ про банкрутство ДСА.

Скоринг (сила сигналу): зарплатні борги ×5, податкові/ПФУ ×2, «на користь держави» ×1, +кількість ВП.

Результат: data/leads.csv (усі), data/leads_top.csv (TOP_N). Контактів тут немає —
керівник і назва з ЄДР; корпоративні контакти шукаються окремо.
"""
from __future__ import annotations

import csv
import json
import math
import re
import sys
import zipfile
from pathlib import Path
from xml.etree.ElementTree import iterparse

ROOT = Path(__file__).resolve().parent
DATA = ROOT / "data"
MIN_VP = 3
TOP_N = 300
REGIONS = {"Київ", "Київська", "Одеська"}

STATE_FORMS = ("ДЕРЖАВН", "КОМУНАЛЬН", "КАЗЕНН", "БЮДЖЕТН", "УСТАНОВА", "ОРГАН МІСЦЕВОГО",
               "ГРОМАДСЬК", "РЕЛІГІЙН", "ОБ'ЄДНАННЯ СПІВВЛАСНИКІВ", "ОБСЛУГОВУЮЧИЙ КООПЕРАТИВ",
               "ПОЛІТИЧН", "ПРОФЕСІЙН", "ФОНД")


def load_bankrupt_codes() -> set[str]:
    codes = set()
    with (DATA / "raw" / "bankrutstvo.csv").open(encoding="utf-8", errors="replace") as f:
        for r in csv.DictReader(f, delimiter="\t"):
            c = (r.get("firm_edrpou") or "").strip()
            if len(c) == 8:
                codes.add(c)
    return codes


STATE_FOUNDERS = ("ДЕРЖАВ", "ФОНД ДЕРЖАВНОГО МАЙНА", "КАБІНЕТ МІНІСТРІВ", "МІНІСТЕРСТВ",
                  "МІСЬКА РАДА", "СІЛЬСЬКА РАДА", "СЕЛИЩНА РАДА", "ОБЛАСНА РАДА", "РАЙОННА РАДА",
                  "НАЦІОНАЛЬНА АКЦІОНЕРНА КОМПАНІЯ", "НАК ", "АГЕНТСТВО", "ФОНД ГАРАНТУВАННЯ")
MAX_VP = 300  # гіганти з сотнями ВП — не профіль індивідуального АК


def score(a: dict) -> float:
    """Сила сигналу з насиченням: кожен вид сигналу дає внесок до межі,
    кількість ВП — логарифмічно, щоб гіганти не займали весь топ."""
    return (5 * min(a["wages"], 10) + 2 * min(a["tax"] + a["pension"], 15)
            + min(a["state"], 15) + 10 * math.log2(1 + a["vp"]))


def director_of(signers: list[str]) -> str:
    for s in signers:
        if "керівник" in s.lower():
            return re.sub(r"\s*-\s*керівник.*$", "", s, flags=re.I).strip(" ;")
    return ""


def parse_edr(wanted: set[str]) -> dict[str, dict]:
    """Потоковий розбір UO.xml з ZIP; зберігаємо лише потрібні ЄДРПОУ."""
    z = zipfile.ZipFile(DATA / "raw" / "uo.zip")
    out: dict[str, dict] = {}
    n = 0
    with z.open(z.namelist()[0]) as f:
        for _, el in iterparse(f, events=("end",)):
            if el.tag != "SUBJECT":
                continue
            n += 1
            if n % 500_000 == 0:
                print(f"  ЄДР: {n:,} записів, знайдено {len(out):,}", flush=True)
            code = (el.findtext("EDRPOU") or "").strip()
            if code in wanted:
                out[code] = {
                    "name": el.findtext("NAME") or "",
                    "short": el.findtext("SHORT_NAME") or "",
                    "opf": el.findtext("OPF") or "",
                    "stan": (el.findtext("STAN") or "").strip(),
                    "director": director_of([s.text or "" for s in el.iter("SIGNER")]),
                    "terminating": bool((el.findtext("TERMINATION_STARTED_INFO") or "").strip()),
                    "bankruptcy": bool((el.findtext("BANKRUPTCY_READJUSTMENT_INFO") or "").strip()),
                    "registered": (el.findtext("REGISTRATION") or "").split(";")[0].strip(),
                    "capital": el.findtext("AUTHORIZED_CAPITAL") or "",
                    "founders": " | ".join((x.text or "") for x in el.iter("FOUNDER"))[:2000],
                }
            el.clear()
    print(f"  ЄДР: усього {n:,} записів, знайдено {len(out):,}")
    return out


def main() -> int:
    erb = json.loads((DATA / "erb_legal.json").read_text(encoding="utf-8"))
    cand = {c: a for c, a in erb.items() if a["vp"] >= MIN_VP and a["region"] in REGIONS}
    print(f"юросіб з відкритими ВП: {len(erb):,}; у регіонах і ≥{MIN_VP} ВП: {len(cand):,}")
    bankrupt = load_bankrupt_codes()
    cand = {c: a for c, a in cand.items() if c not in bankrupt}
    print(f"без справ про банкрутство (ДСА): {len(cand):,}")
    # Ручні виключення після перевірки (рф, ТОТ, держчастка, фіктивні, не працюють)
    excl_path = DATA / "exclude.csv"
    if excl_path.exists():
        with excl_path.open(encoding="utf-8") as f:
            excl = {r["edrpou"].strip() for r in csv.DictReader(f)}
        cand = {c: a for c, a in cand.items() if c not in excl}
        print(f"після ручних виключень ({len(excl)}): {len(cand):,}")
    # Кеш ЄДР по ВСІХ юрособах-боржниках: перебудова лідів (інші фільтри/регіони)
    # більше не потребує 3-ГБ UO.xml.
    cache = DATA / "edr_debtors.json"
    if cache.exists():
        edr = json.loads(cache.read_text(encoding="utf-8"))
        print(f"ЄДР з кешу: {len(edr):,}")
    else:
        edr = parse_edr(set(erb))
        cache.write_text(json.dumps(edr, ensure_ascii=False), encoding="utf-8")

    leads = []
    drop = {"немає в ЄДР": 0, "не зареєстровано": 0, "припинення/банкрутство": 0, "держ/комун/неприбуткові": 0}
    for c, a in cand.items():
        e = edr.get(c)
        if not e:
            drop["немає в ЄДР"] += 1
            continue
        if e["stan"] != "зареєстровано":
            drop["не зареєстровано"] += 1
            continue
        if e["terminating"] or e["bankruptcy"]:
            drop["припинення/банкрутство"] += 1
            continue
        up = (e["opf"] + " " + e["name"]).upper()
        if any(s in up for s in STATE_FORMS):
            drop["держ/комун/неприбуткові"] += 1
            continue
        if any(s in e["founders"].upper() for s in STATE_FOUNDERS):
            drop["засновник — держава/громада"] = drop.get("засновник — держава/громада", 0) + 1
            continue
        if a["vp"] > MAX_VP:
            drop[f"понад {MAX_VP} ВП"] = drop.get(f"понад {MAX_VP} ВП", 0) + 1
            continue
        leads.append({
            "edrpou": c, "name": e["name"], "short": e["short"] or e["name"], "opf": e["opf"],
            "director": e["director"], "region": a["region"], "vp": a["vp"], "wages": a["wages"],
            "tax": a["tax"], "pension": a["pension"], "state": a["state"],
            "score": round(score(a), 1), "registered": e["registered"], "capital": e["capital"],
            "top_cats": "; ".join(f"{k} ({v})" for k, v in a["cats"].items()),
        })
    leads.sort(key=lambda r: r["score"], reverse=True)
    print("відсіяно:", drop)
    print(f"лідів: {len(leads):,}")

    fields = list(leads[0].keys()) if leads else []
    for path, rows in ((DATA / "leads.csv", leads), (DATA / "leads_top.csv", leads[:TOP_N])):
        with path.open("w", encoding="utf-8", newline="") as f:
            w = csv.DictWriter(f, fieldnames=fields)
            w.writeheader()
            w.writerows(rows)
    by_region: dict[str, int] = {}
    for r in leads:
        by_region[r["region"]] = by_region.get(r["region"], 0) + 1
    print("за регіонами:", by_region)
    print(f"із зарплатними боргами: {sum(1 for r in leads if r['wages'])}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
