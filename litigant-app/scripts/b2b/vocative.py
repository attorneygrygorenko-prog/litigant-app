"""Ukrainian vocative case (кличний відмінок) transformation.

Rule-based, deterministic. Covers ~90% of common Ukrainian first names
and effectively 100% of patronymics (which are morphologically regular).
"""

from __future__ import annotations


def to_vocative_patronymic(patronymic: str) -> str:
    """По-батькові → кличний відмінок.

    Вікторович → Вікторовичу
    Юрійович → Юрійовичу
    Ілліч → Іллічу (укр. -іч)
    Сергіївна → Сергіївно
    Юріївна → Юріївно
    Нуру огли → Нуру огли (тюркські — залишаємо без змін)
    """
    if not patronymic:
        return patronymic
    p = patronymic.strip()

    # Жіночі: -івна/-ївна → -івно/-ївно (swap last 'а' → 'о')
    if p.endswith("івна") or p.endswith("ївна"):
        return p[:-1] + "о"
    # Російське написання в реєстрі (Валерієвна, Костянтиновна, Разміковна) — теж -вна → -вно
    if p.endswith("вна") or p.endswith("ична"):
        return p[:-1] + "о"

    # Чоловічі: -ович/-йович/-іч/-ич → +'у' (append)
    if p.endswith("ович") or p.endswith("йович") or p.endswith("іч") or p.endswith("ич"):
        return p + "у"

    # Тюркські «огли» / «оглу» / «кизи» — залишаємо без змін
    # (звертання «Шановний Ім'я По-батькові огли» без відмінювання)

    # Fallback — без змін
    return p


def to_vocative_name(name: str) -> str:
    """Ім'я → кличний відмінок (правила для ~90% укр. імен)."""
    if not name:
        return name
    n = name.strip()
    if not n:
        return n

    # Жіночі імена на -а (Олена → Олено, Ольга → Ольго, Ірина → Ірино)
    if n.endswith("а"):
        return n[:-1] + "о"

    # Жіночі імена на -я (Софія → Софіє, Ілля → Ілле)
    if n.endswith("я"):
        return n[:-1] + "є"

    # Чоловічі на -й (Віталій → Віталію, Сергій → Сергію, Андрій → Андрію)
    if n.endswith("й"):
        return n[:-1] + "ю"

    # Чоловічі на -о (Петро → Петре, Дмитро → Дмитре, Павло → Павле)
    if n.endswith("о"):
        return n[:-1] + "е"

    # Чоловічі на -ь (Ігорь → Ігорю — рідко)
    if n.endswith("ь"):
        return n[:-1] + "ю"

    # Чоловічі на -р (Ігор → Ігоре, Олександр → Олександре) — append 'е'
    if n.endswith("р"):
        return n + "е"

    # Чоловічі на інші тверді приголосні → append 'е' (Іван → Іване, Гліб → Глібе)
    if n[-1] in "бвгґджзклмнпстфхцчшщ":
        return n + "е"

    # Fallback — без змін
    return n


def detect_gender(patronymic: str) -> str:
    """Визначає стать за по-батькові: 'm' / 'f' / 'unknown'.

    Українські: -ович/-йович/-іч/-ич → m; -івна/-ївна/-на → f.
    Тюркські: -огли/-оглу → m; -кизи/-гизи → f.
    """
    if not patronymic:
        return "unknown"
    p = patronymic.strip().lower()
    # Слов'янські чоловічі
    if p.endswith("ович") or p.endswith("йович") or p.endswith("іч") or p.endswith("ич"):
        return "m"
    # Слов'янські жіночі
    if p.endswith("івна") or p.endswith("ївна") or p.endswith("на"):
        return "f"
    # Тюркські чоловічі («огли»/«оглу», часто з дефісом чи пробілом)
    if p.endswith("огли") or p.endswith("оглу") or p.endswith("огли") or "огли" in p or "оглу" in p:
        return "m"
    # Тюркські жіночі («кизи»/«гизи»)
    if p.endswith("кизи") or p.endswith("гизи") or "кизи" in p or "гизи" in p:
        return "f"
    return "unknown"


def _detect_gender_from_name(first_name: str) -> str:
    """Fallback-детекція статі за іменем (без по-батькові).

    Використовується коли patronymic порожній або нестандартний.
    Правило: жіночі — -а/-я (з винятками для чол. Микола/Ілля/Кузьма/Мустафа/Ісайя).
    Все інше — 'm' (типово для укр. чоловічих на приголосний або -й).
    """
    if not first_name:
        return "unknown"
    n = first_name.strip()
    if not n:
        return "unknown"
    # Відомі чоловічі імена, що закінчуються на -а/-я
    MALE_ENDING_A_YA = {
        "Микола", "Ілля", "Кузьма", "Хома", "Пилипа", "Мустафа", "Ісайя",
        "Ібрагім", "Мойсей", "Хамза", "Абдулла",
    }
    if n in MALE_ENDING_A_YA:
        return "m"
    # Відомі жіночі імена, що НЕ закінчуються на -а/-я
    FEMALE_OTHER = {"Любов", "Естер", "Рут", "Мар'ям"}
    if n in FEMALE_OTHER:
        return "f"
    # Загальне правило
    if n.endswith("а") or n.endswith("я"):
        return "f"
    return "m"


def salutation(first_name: str, patronymic: str) -> str:
    """Повертає повне звертання у кличному відмінку.

    'Ігор', 'Вікторович'  → 'Шановний Ігоре Вікторовичу'
    'Олена', 'Сергіївна'  → 'Шановна Олено Сергіївно'
    'Володимир', 'Ілліч'  → 'Шановний Володимире Іллічу'
    'Васиф', 'Нуру огли'  → 'Шановний Васифе Нуру огли' (тюркські без відмінювання)
    'Масуд', ''           → 'Шановний Масуде' (без по-батькові)
    Якщо не вдалося визначити взагалі — 'Шановний колего' (безпечний дефолт).
    """
    gender = detect_gender(patronymic)
    # Fallback: якщо по-батькові невідомого формату або порожнє — за ім'ям
    if gender == "unknown":
        gender = _detect_gender_from_name(first_name)
    if gender == "unknown":
        # Останній fallback — без «(а)», масс. форма прийнятна у діловому листуванні
        return "Шановний колего"

    voc_name = to_vocative_name(first_name)
    prefix = "Шановна" if gender == "f" else "Шановний"

    if not voc_name:
        return f"{prefix} колего"

    # Якщо patronymic є — відмінюємо і додаємо
    if patronymic:
        voc_patr = to_vocative_patronymic(patronymic)
        return f"{prefix} {voc_name} {voc_patr}"

    # Без patronymic — тільки ім'я
    return f"{prefix} {voc_name}"
