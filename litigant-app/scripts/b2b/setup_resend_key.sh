#!/bin/bash
# Ключ Resend акаунта Літіґента → scripts/b2b/.env (LITIGANT_RESEND_API_KEY). Файл у .gitignore.
set -euo pipefail
ENV_FILE="$(cd "$(dirname "$0")" && pwd)/.env"
echo "Resend (акаунт, де підтверджено litigant.legal) → API Keys → створіть ключ з правом Sending."
read -r -s -p "Вставте ключ (re_...) і натисніть Enter: " KEY; echo
[ -z "$KEY" ] && { echo "Порожньо — нічого не змінено."; exit 1; }
touch "$ENV_FILE"
grep -v -E '^LITIGANT_RESEND_API_KEY=' "$ENV_FILE" > "$ENV_FILE.tmp" || true
printf 'LITIGANT_RESEND_API_KEY=%s\n' "$KEY" >> "$ENV_FILE.tmp"
mv "$ENV_FILE.tmp" "$ENV_FILE"
chmod 600 "$ENV_FILE"
CODE="$(curl -s -o /dev/null -w '%{http_code}' -H "Authorization: Bearer ${KEY}" https://api.resend.com/domains)"
case "$CODE" in
  200) echo "Ключ прийнято (повний доступ).";;
  401) echo "Ключ збережено (лише надсилання — це нормально).";;
  *)   echo "Ключ збережено, перевірка Resend: HTTP $CODE.";;
esac
echo "Готово. Напишіть у чаті «надсилай»."
