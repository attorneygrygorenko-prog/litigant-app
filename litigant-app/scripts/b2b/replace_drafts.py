#!/usr/bin/env python3
"""Перестворити B2B-чернетки після зміни шаблону (напр. нового телефону).

Видаляє лише чернетки з data/drafts_log_litigant.csv, які ще існують і ще
не надіслані (є в Gmail Drafts), архівує журнал і запускає create_drafts.py.
Надіслані (data/sent_litigant.csv) не чіпає.

  GMAIL_TOKEN_FILE=~/inbox-watcher/config/token_grygorenko.json GMAIL_NONINTERACTIVE=1 \
    ~/inbox-watcher/venv/bin/python replace_drafts.py [--dry-run]
"""
from __future__ import annotations

import base64
import csv
import subprocess
import sys
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DATA = ROOT / "data"
LOG = DATA / "drafts_log_litigant.csv"
sys.path.insert(0, str(Path.home() / "inbox-watcher"))
from lib import gmail_client  # noqa: E402
from googleapiclient.errors import HttpError  # noqa: E402


def body_of(draft: dict) -> str:
    p = draft["message"]["payload"]
    data = p.get("body", {}).get("data") or next(
        (x["body"].get("data") for x in p.get("parts", []) if x.get("mimeType") == "text/plain"), "")
    return base64.urlsafe_b64decode(data or "").decode("utf-8", "replace")


def main(dry: bool) -> int:
    sent = {r["email"].lower() for r in csv.DictReader((DATA / "sent_litigant.csv").open(encoding="utf-8"))} \
        if (DATA / "sent_litigant.csv").exists() else set()
    rows = list(csv.DictReader(LOG.open(encoding="utf-8")))
    svc = gmail_client.get_service()
    for r in rows:
        if r["email"].lower() in sent:
            print(f"  = {r['email']}: надіслано, не чіпаю")
            continue
        try:
            d = gmail_client.gexec(svc.users().drafts().get(userId="me", id=r["draft_id"], format="full"))
        except HttpError as e:
            print(f"  ? {r['email']}: чернетки немає ({e.resp.status})")
            continue
        old = "223 29 95" in body_of(d)
        print(f"  {'−' if old else '='} {r['email']}: {'старий номер' if old else 'вже новий/інший'}")
        if old and not dry:
            gmail_client.gexec(svc.users().drafts().delete(userId="me", id=r["draft_id"]))
    if dry:
        return 0
    LOG.rename(LOG.with_name(f"drafts_log_litigant.replaced-{datetime.now():%Y%m%d-%H%M}.csv"))
    return subprocess.call([sys.executable, str(ROOT / "create_drafts.py")])


if __name__ == "__main__":
    sys.exit(main("--dry-run" in sys.argv))
