#!/usr/bin/env python3
"""Крок 1: Єдиний реєстр боржників (data.gov.ua, Мін'юст) → статистика по юрособах.

Читає ZIP потоком (без розпакування на диск), cp1251. У реєстрі лише ВІДКРИТІ
виконавчі провадження. Контактні дані в реєстрі належать ВИКОНАВЦЯМ, не боржникам —
ми їх не беремо.

Результат: data/erb_legal.json — {edrpou: {name, vp, wages, state, tax, courts, cats}}
"""
from __future__ import annotations

import collections
import csv
import io
import json
import sys
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent
RAW = ROOT / "data" / "raw" / "erb.zip"
OUT = ROOT / "data" / "erb_legal.json"


def region_of(org: str) -> str:
    """Регіон за назвою органу виконання (ДВС / приватний виконавець).
    У відкритому ЄДР адреси немає, тож це найкращий доступний проксі."""
    o = org.lower()
    # Назва міжрегіонального управління в кінці («…Південного міжрегіонального управління
    # Міністерства юстиції (м.Одеса)») охоплює кілька областей — відкидаємо її і
    # дивимось лише на сам відділ («Олександрівський відділ ДВС у місті Запоріжжі»).
    for cut in ("міжрегіонального управління", "головного територіального управління",
                "територіального управління", "(м."):
        i = o.find(cut)
        if i > 0:
            o = o[:i]
    if "києв" in o or "київ" in o:
        return "Київ" if ("місті києві" in o or "м. києві" in o or "м.києві" in o
                          or "міста києва" in o) else "Київська"
    if "одес" in o:
        return "Одеська"
    return "інше"


def main() -> int:
    z = zipfile.ZipFile(RAW)
    name = z.namelist()[0]
    f = io.TextIOWrapper(z.open(name), encoding="cp1251", errors="replace", newline="")
    f.readline()  # заголовок через ';'
    reader = csv.reader(f, delimiter=",", quotechar='"')
    agg: dict[str, dict] = {}
    n = 0
    for row in reader:
        n += 1
        if n % 2_000_000 == 0:
            print(f"  {n:,} рядків, юросіб: {len(agg):,}", flush=True)
        if len(row) < 11:
            continue
        code = row[2].strip()
        if len(code) != 8 or not code.isdigit():
            continue  # фізособи (10 цифр / порожньо) — не беремо
        a = agg.get(code)
        if a is None:
            a = agg[code] = {"name": row[0].strip(), "vp": 0, "wages": 0, "state": 0,
                             "tax": 0, "pension": 0, "cats": collections.Counter(),
                             "region": collections.Counter()}
        a["vp"] += 1
        a["region"][region_of(row[4])] += 1
        cat = row[10].strip().lower()
        pub = row[3].strip().lower()
        a["cats"][cat[:60]] += 1
        if "заробітн" in cat:
            a["wages"] += 1
        if "на користь держави" in cat:
            a["state"] += 1
        if "дпс" in pub or "податков" in pub:
            a["tax"] += 1
        if "пенсійн" in pub:
            a["pension"] += 1
    for a in agg.values():
        a["cats"] = dict(a["cats"].most_common(4))
        a["region"] = a["region"].most_common(1)[0][0] if a["region"] else "?"
    OUT.write_text(json.dumps(agg, ensure_ascii=False), encoding="utf-8")
    print(f"готово: {n:,} рядків, юросіб з відкритими ВП: {len(agg):,} → {OUT.name}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
