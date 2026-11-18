#!/usr/bin/env python3
"""Крок 3: чернетки листів керівникам для топ-лідів (data/leads_top.csv → data/letters_top.csv).

Нічого не надсилає. Колонка email порожня, доки контакт не знайдено в публічних
джерелах компанії (див. data/contacts.csv, якщо є).
"""
from __future__ import annotations

import csv
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DATA = ROOT / "data"
# B2B-листи йдуть від адвоката / АБ «Літіґент» (рішення власника 15.11.2026).
TEMPLATE = ROOT / "templates" / "director_letter_litigant.txt"


def ep_word(n: int) -> str:
    if n % 10 == 1 and n % 100 != 11:
        return "виконавче провадження"
    if 2 <= n % 10 <= 4 and not 12 <= n % 100 <= 14:
        return "виконавчі провадження"
    return "виконавчих проваджень"


def greeting(director: str) -> str:
    """«Шановний(-а) Ім'я По батькові!» з кличним відмінком, якщо вдасться."""
    # У ЄДР після ПІБ часто йдуть посада/примітки — беремо перші три слова-імена
    words = re.findall(r"[А-ЯІЇЄҐA-Z][А-ЯІЇЄҐа-яіїєґ'ʼ\-]+", director.upper())
    parts = [w.title() for w in words[:3]]
    if len(parts) >= 3 and parts[2].lower().endswith(("ович", "евич", "йович", "івна", "ївна", "овна", "евна", "ич")):
        try:
            sys.path.insert(0, str(ROOT))
            from vocative import salutation  # noqa: E402  (копія з grygorenko-outreach/lib)
            return salutation(parts[1], parts[2]) + "!"
        except Exception:  # noqa: BLE001
            pass
    return "Доброго дня!"


def short_name(short: str, name: str) -> str:
    s = (short or name).replace('""', '"').strip()
    return re.sub(r"\s+", " ", s)[:60]


def main() -> int:
    raw = TEMPLATE.read_text(encoding="utf-8")
    subj_tpl, body_tpl = raw.split("\n---\n", 1)
    subj_tpl = subj_tpl.replace("SUBJECT:", "").strip()
    contacts = {}
    cpath = DATA / "contacts.csv"
    if cpath.exists():
        with cpath.open(encoding="utf-8") as f:
            contacts = {r["edrpou"]: r for r in csv.DictReader(f)}
    rows = list(csv.DictReader((DATA / "leads_top.csv").open(encoding="utf-8")))
    out = []
    for r in rows:
        n = int(r["vp"])
        ctx = {
            "company_short": short_name(r["short"], r["name"]),
            "company_name": short_name(r["short"], r["name"]),
            "edrpou": r["edrpou"], "ep_count": n, "ep_word": ep_word(n),
            "greeting": greeting(r["director"]),
        }
        c = contacts.get(r["edrpou"], {})
        out.append({
            "edrpou": r["edrpou"], "company": ctx["company_short"], "director": r["director"],
            "region": r["region"], "score": r["score"], "vp": n, "wages": r["wages"],
            "email": c.get("email", ""), "email_source": c.get("source_url", ""),
            "subject": subj_tpl.format(**ctx), "body": body_tpl.format(**ctx),
        })
    with (DATA / "letters_top.csv").open("w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=list(out[0].keys()))
        w.writeheader()
        w.writerows(out)
    print(f"чернеток: {len(out)}, з контактом: {sum(1 for o in out if o['email'])}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
