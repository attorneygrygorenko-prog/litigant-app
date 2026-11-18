# B2B-аутріч АБ «Літіґент»: компанії з ознаками боргової кризи

Пошук юросіб із відкритими виконавчими провадженнями за **відкритими державними даними**
(data.gov.ua) і листи керівникам **від адвоката / АБ «Літіґент»** з `kyiv@litigant.legal`
через Resend. Перенесено з `~/grygorenko-outreach/b2b` 16.11.2026 (рішення власника:
B2B-пропозиції — від адвоката з банкрутства, не від арбітражного керуючого; аутріч АК
до адвокатів лишається в `grygorenko-outreach` без змін).
18.11.2026 перенесено з `~/litigant-crm-app/scripts/b2b` у репозиторій сайту
`~/litigant-site/litigant-app/scripts/b2b` (шляхи нижче — від `litigant-app`).

`data/` і `.env` — лише локально (`.gitignore`, `.vercelignore`): там персональні дані
керівників і ключ Resend. Python 3 (стандартна бібліотека); Gmail-клієнт — з `~/inbox-watcher`.

## Джерела

| Набір | Що беремо |
|---|---|
| Єдиний реєстр боржників (Мін'юст) | відкриті ВП юросіб: кількість, категорії, стягувач, регіон відділу виконання |
| ЄДР, юридичні особи (Мін'юст) | статус, форма, керівник, засновники, ознаки припинення/банкрутства |
| Справи про банкрутство (ДСА) | виключення тих, хто вже в процедурі |

Контакти з реєстру боржників належать **виконавцям**, не боржникам — не використовуються.

## Кроки

```bash
cd scripts/b2b
python3 aggregate_erb.py      # потрібен data/raw/erb.zip; ~10 хв → data/erb_legal.json
python3 build_leads.py        # ЄДР з кешу data/edr_debtors.json (або data/raw/uo.zip) → leads.csv, leads_top.csv
python3 merge_contacts.py     # data/contacts_p*.csv → contacts.csv; exclude=yes / чужий регіон → exclude.csv
python3 render_letters.py     # листи від Літіґента → data/letters_top.csv

# чернетки в Gmail для перегляду (мітка «Літіґент/B2B-чернетка»)
GMAIL_TOKEN_FILE=~/inbox-watcher/config/token_grygorenko.json GMAIL_NONINTERACTIVE=1 \
  ~/inbox-watcher/venv/bin/python create_drafts.py [--dry-run]

# відправка через Resend лише тих, чиї чернетки ще існують (видалена чернетка = відхилено)
GMAIL_TOKEN_FILE=~/inbox-watcher/config/token_grygorenko.json GMAIL_NONINTERACTIVE=1 \
  ~/inbox-watcher/venv/bin/python send_via_resend.py [--dry-run]
```

Ключ Resend Літіґента (домен litigant.legal підтверджено в акаунті Resend сайту):

```bash
printf 'LITIGANT_RESEND_API_KEY=re_...\n' > scripts/b2b/.env && chmod 600 scripts/b2b/.env
```

Сирі архіви: реєстр боржників — data.gov.ua/dataset/783b9b50-faba-4cc9-a393-60485e395b1d;
ЄДР — data.gov.ua/dataset/03cc1239-3988-4451-aa0d-aadb77448714 (UO.zip);
банкрутство — data.gov.ua/dataset/544d4dad-0b6d-4972-b0b8-fb266829770f.

## Фільтри, скоринг, контакти

- Київ / Київська / Одеська (за відділом виконання; фактична адреса з перевірки — пріоритетніша);
  ≥3 ВП; «зареєстровано»; не державні/комунальні/неприбуткові, без засновника-держави;
  ≤300 ВП; немає в реєстрі банкрутств; немає в `data/exclude.csv`.
- Скоринг: зарплатні борги ×5 (до 10), ДПС/ПФУ ×2 (до 15), «на користь держави» (до 15), +10·log2(1+ВП).
- Контакти — лише опубліковані самою компанією (власний сайт — high; SMIDA/Prozorro, куди
  компанія вносить дані сама — medium). Агрегатори і скриньки сервісів звітності — не беремо.

## Відповіді й етика

Відповіді на `kyiv@litigant.legal` пересилаються в Gmail і потрапляють у щоденний розбір
`~/inbox-watcher` (08:45). У кожному листі — джерело контакту і відмова «не турбуйте».
Ризик щодо Правил адвокатської етики власник прийняв (15.11.2026); тон — інформаційний,
без обіцянок результату. Воєнні заборони на банкрутство перевіряються вручну.
