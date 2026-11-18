#!/usr/bin/env python3
"""Об'єднує data/contacts_p*.csv (результати пошуку контактів) у data/contacts.csv,
а компанії з exclude=yes додає до data/exclude.csv. Ідемпотентно (за ЄДРПОУ)."""
from __future__ import annotations

import csv
import glob
import sys
from pathlib import Path

DATA = Path(__file__).resolve().parent / "data"
FIELDS = ["edrpou", "email", "source_url", "website", "confidence", "real_region", "exclude", "note"]


def read(path: Path) -> list[dict]:
    if not path.exists():
        return []
    with path.open(encoding="utf-8") as f:
        return list(csv.DictReader(f))


def main() -> int:
    merged = {r["edrpou"]: r for r in read(DATA / "contacts.csv")}
    parts = sorted(glob.glob(str(DATA / "contacts_p*.csv")))
    added = 0
    for p in parts:
        for r in read(Path(p)):
            code = (r.get("edrpou") or "").strip()
            if not code:
                continue
            if code not in merged or (r.get("email") and not merged[code].get("email")):
                merged[code] = r
                added += 1
    with (DATA / "contacts.csv").open("w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=FIELDS, extrasaction="ignore")
        w.writeheader()
        for r in merged.values():
            w.writerow({k: r.get(k, "") for k in FIELDS})

    excl_path = DATA / "exclude.csv"
    # зайві поля (кома без лапок у причині) зводимо назад у reason, щоб не впасти
    excl = {}
    for r in read(excl_path):
        extra = r.pop(None, None)
        if extra:
            r["reason"] = ",".join([r.get("reason", "")] + list(extra))
        excl[r["edrpou"]] = {"edrpou": r["edrpou"], "reason": r.get("reason", "")}
    new_excl = 0
    target = ("київ", "києв", "одес")
    for r in merged.values():
        if r["edrpou"] in excl:
            continue
        if (r.get("exclude") or "").strip().lower() in ("yes", "так", "true", "1"):
            excl[r["edrpou"]] = {"edrpou": r["edrpou"], "reason": (r.get("note") or "позначено при перевірці")[:200]}
            new_excl += 1
            continue
        rr = (r.get("real_region") or "").strip().lower()
        if rr and not any(t in rr for t in target):
            excl[r["edrpou"]] = {"edrpou": r["edrpou"], "reason": f"фактичний регіон: {r['real_region']}"}
            new_excl += 1
    with excl_path.open("w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=["edrpou", "reason"])
        w.writeheader()
        w.writerows(excl.values())

    conf = {}
    for r in merged.values():
        if r.get("email"):
            conf[r.get("confidence", "?")] = conf.get(r.get("confidence", "?"), 0) + 1
    print(f"частин: {len(parts)}, нових/оновлених записів: {added}, усього компаній: {len(merged)}")
    print(f"email за довірою: {conf}; нових виключень: {new_excl} (усього {len(excl)})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
