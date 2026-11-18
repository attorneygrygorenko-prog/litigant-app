#!/usr/bin/env python3
"""Крок 5: надіслати B2B-листи від АБ «Літіґент» через Resend (kyiv@litigant.legal).

Екран перегляду — Gmail-чернетки з міткою «Літіґент/B2B-чернетка» (create_drafts.py).
Юрій видаляє непотрібні; цей скрипт надсилає лише ті, чиї чернетки ЩЕ ІСНУЮТЬ,
через Resend (домен litigant.legal підтверджено в акаунті Resend сайту Літіґента),
і видаляє відповідну чернетку. Журнал: data/sent_litigant.csv.

Ключ: scripts/b2b/.env → LITIGANT_RESEND_API_KEY=... (файл у .gitignore; вставляє власник).

  GMAIL_TOKEN_FILE=~/inbox-watcher/config/token_grygorenko.json GMAIL_NONINTERACTIVE=1 \
    ~/inbox-watcher/venv/bin/python send_via_resend.py [--dry-run]
"""
from __future__ import annotations

import csv
import json
import sys
import time
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DATA = ROOT / "data"
sys.path.insert(0, str(Path.home() / "inbox-watcher"))
from lib import gmail_client  # noqa: E402

FROM = "Юрій Григоренко, АБ «Літіґент» <kyiv@litigant.legal>"
REPLY_TO = "kyiv@litigant.legal"
DRAFTS_LOG = DATA / "drafts_log_litigant.csv"
SENT_LOG = DATA / "sent_litigant.csv"
MAX_PER_RUN = 20


def resend_key() -> str:
    env = ROOT / ".env"
    if env.exists():
        for line in env.read_text(encoding="utf-8").splitlines():
            if line.startswith("LITIGANT_RESEND_API_KEY="):
                return line.split("=", 1)[1].strip().strip('"').strip("'")
    return ""


def resend_send(key: str, to: str, subject: str, text: str) -> str:
    body = {"from": FROM, "to": [to], "reply_to": REPLY_TO, "subject": subject, "text": text}
    req = urllib.request.Request(
        "https://api.resend.com/emails", data=json.dumps(body).encode(), method="POST",
        headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json",
                 "User-Agent": "litigant-b2b"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r).get("id", "")


def main(dry_run: bool) -> int:
    key = resend_key()
    if not key and not dry_run:
        print("Немає LITIGANT_RESEND_API_KEY у scripts/b2b/.env — нічого не надіслано.")
        return 1
    letters = {r["edrpou"]: r for r in csv.DictReader((DATA / "letters_top.csv").open(encoding="utf-8"))}
    sent = set()
    if SENT_LOG.exists():
        sent = {r["email"].lower() for r in csv.DictReader(SENT_LOG.open(encoding="utf-8"))}
    svc = gmail_client.get_service()
    queue = []
    for r in csv.DictReader(DRAFTS_LOG.open(encoding="utf-8")):
        if r["email"].lower() in sent:
            continue
        try:
            gmail_client.gexec(svc.users().drafts().get(userId="me", id=r["draft_id"], format="minimal"))
        except Exception:  # noqa: BLE001 — чернетку видалено = Юрій відхилив
            print(f"  ⊘ {r['company']}: чернетку видалено — пропускаю")
            continue
        queue.append(r)
    print(f"до відправки: {len(queue)} (ліміт за запуск {MAX_PER_RUN})")
    new_log = not SENT_LOG.exists()
    with SENT_LOG.open("a", encoding="utf-8", newline="") as f:
        w = csv.writer(f)
        if new_log:
            w.writerow(["at", "edrpou", "company", "email", "resend_id"])
        for r in queue[:MAX_PER_RUN]:
            L = letters.get(r["edrpou"])
            if not L:
                print(f"  ✗ {r['company']}: немає тексту в letters_top.csv")
                continue
            if dry_run:
                print(f"  [тест] {r['company']} → надіслав би")
                continue
            try:
                rid = resend_send(key, r["email"], L["subject"], L["body"])
            except urllib.error.HTTPError as e:
                print(f"  ✗ {r['company']}: Resend {e.code} {e.read().decode()[:150]}")
                continue
            w.writerow([datetime.now(timezone.utc).isoformat(timespec="seconds"),
                        r["edrpou"], r["company"], r["email"], rid])
            f.flush()
            try:
                gmail_client.gexec(svc.users().drafts().delete(userId="me", id=r["draft_id"]))
            except Exception:  # noqa: BLE001
                pass
            print(f"  ✓ {r['company']} — надіслано")
            time.sleep(1)
    return 0


if __name__ == "__main__":
    sys.exit(main("--dry-run" in sys.argv))
