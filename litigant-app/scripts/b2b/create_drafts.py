#!/usr/bin/env python3
"""Крок 4: чернетки B2B-листів у Gmail (скринька АК) — лише для надійних контактів.

Беремо з data/letters_top.csv ті компанії, для яких у data/contacts.csv є email
з довірою high / medium (опублікований самою компанією: власний сайт або держпортал,
куди компанія вносить дані сама). Агрегатори (low) — не беремо.
Одна чернетка на email: якщо скринька спільна для кількох компаній — лист першій за балом.

НІЧОГО НЕ НАДСИЛАЄ. Чернетки з міткою «B2B/чернетка» — Юрій переглядає й надсилає сам.
Журнал: data/drafts_log.csv (щоб не дублювати при повторних запусках).

Запуск (токен скриньки АК з inbox-watcher):
  GMAIL_TOKEN_FILE=~/inbox-watcher/config/token_grygorenko.json GMAIL_NONINTERACTIVE=1 \
    ~/inbox-watcher/venv/bin/python create_drafts.py [--dry-run]
"""
from __future__ import annotations

import base64
import csv
import os
import sys
from datetime import datetime, timezone
from email.header import Header
from email.mime.text import MIMEText
from email.utils import formataddr, parseaddr
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DATA = ROOT / "data"
sys.path.insert(0, str(Path.home() / "inbox-watcher"))
from lib import gmail_client  # noqa: E402

# 15.11.2026: B2B — від адвоката / АБ «Літіґент», відправник kyiv@litigant.legal
# (додається в Gmail як «Надсилати листи як»; відповіді пересилаються в Gmail).
LABEL = "Літіґент/B2B-чернетка"
LOG = DATA / "drafts_log_litigant.csv"
SENDER = os.getenv("B2B_FROM", '"Юрій Григоренко, АБ «Літіґент»" <kyiv@litigant.legal>')
OK_CONFIDENCE = {"high", "medium"}
# Скриньки на доменах сервісів звітності SMIDA — їх веде агент розкриття, а не компанія
REPORTING_DOMAINS = ("emitent.net.ua", "pat.ua", "smida.gov.ua", "stockmarket.gov.ua")


def main(dry_run: bool) -> int:
    letters = list(csv.DictReader((DATA / "letters_top.csv").open(encoding="utf-8")))
    contacts = {r["edrpou"]: r for r in csv.DictReader((DATA / "contacts.csv").open(encoding="utf-8"))}
    done = set()
    if LOG.exists():
        done = {r["email"].lower() for r in csv.DictReader(LOG.open(encoding="utf-8"))}

    todo, seen = [], set()
    for L in letters:  # уже відсортовані за балом
        c = contacts.get(L["edrpou"])
        if not c or not c.get("email") or c.get("confidence") not in OK_CONFIDENCE:
            continue
        e = c["email"].strip().lower()
        if e.split("@")[-1].endswith(REPORTING_DOMAINS):
            continue
        if e in seen or e in done:
            continue
        seen.add(e)
        todo.append((L, c, e))

    print(f"чернеток до створення: {len(todo)}")
    if dry_run or not todo:
        for L, c, e in todo:
            print(f"  {L['edrpou']} {L['company']} → {e} ({c['confidence']})")
        return 0

    svc = gmail_client.get_service()
    sender = SENDER
    new_log = not LOG.exists()
    with LOG.open("a", encoding="utf-8", newline="") as f:
        w = csv.writer(f)
        if new_log:
            w.writerow(["at", "edrpou", "company", "email", "confidence", "source_url", "draft_id"])
        for L, c, e in todo:
            msg = MIMEText(L["body"], "plain", "utf-8")
            msg["To"] = e
            if sender:
                name, addr = parseaddr(sender)
                msg["From"] = formataddr((name, addr), charset="utf-8")  # кирилиця в імені → RFC 2047
            msg["Subject"] = str(Header(L["subject"], "utf-8"))
            raw = base64.urlsafe_b64encode(msg.as_bytes()).decode("ascii")
            d = gmail_client.gexec(svc.users().drafts().create(userId="me", body={"message": {"raw": raw}}))
            tid = d.get("message", {}).get("threadId")
            if tid:
                gmail_client.add_thread_label(tid, LABEL, svc=svc)
            w.writerow([datetime.now(timezone.utc).isoformat(timespec="seconds"), L["edrpou"],
                        L["company"], e, c["confidence"], c.get("source_url", ""), d.get("id")])
            print(f"  ✓ {L['company']} → чернетка")
    return 0


if __name__ == "__main__":
    sys.exit(main("--dry-run" in sys.argv))
