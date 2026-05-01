import type { Locale } from '@/i18n/routing';

/**
 * Канонічні ключі 4 практик (мовно-нейтральні).
 * Slug-и локалізовані: див. SLUG_BY_LOCALE.
 */
export type PracticeKey = 'wcc' | 'bankruptcy' | 'state-disputes' | 'lobbying-gr';

export const PRACTICE_KEYS: PracticeKey[] = [
  'wcc',
  'bankruptcy',
  'state-disputes',
  'lobbying-gr',
];

/** URL slug per locale per practice. */
export const SLUG_BY_LOCALE: Record<PracticeKey, Record<Locale, string>> = {
  wcc: {
    ua: 'white-collar-crime',
    en: 'white-collar-crime',
    ro: 'white-collar-crime',
  },
  bankruptcy: {
    ua: 'bankrutstvo',
    en: 'bankruptcy',
    ro: 'faliment',
  },
  'state-disputes': {
    ua: 'spory-z-derzhavoyu',
    en: 'state-disputes',
    ro: 'litigii-stat',
  },
  'lobbying-gr': {
    ua: 'lobizm-gr',
    en: 'lobbying-gr',
    ro: 'lobby-gr',
  },
};

/** Reverse lookup: slug (any locale) → canonical PracticeKey. */
export const PRACTICE_BY_SLUG: Record<string, PracticeKey> = (() => {
  const m: Record<string, PracticeKey> = {};
  for (const key of PRACTICE_KEYS) {
    for (const locale of ['ua', 'en', 'ro'] as const) {
      m[SLUG_BY_LOCALE[key][locale]] = key;
    }
  }
  return m;
})();

export interface PracticeContent {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  h1: string;
  intro: [string, string]; // 2 paragraphs
  servicesTitle: string;
  services: Array<[string, string]>; // [title, description]
  whenTitle: string;
  whenLead: string;
  whenItems: string[];
  faqTitle: string;
  faqLead: string;
  faq: Array<[string, string]>; // [question, answer]
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
  backToOverview: string;
  breadcrumbHome: string;
  breadcrumbPractices: string;
  breadcrumbCurrent: string;
}

export const PRACTICES: Record<PracticeKey, Record<Locale, PracticeContent>> = {
  /* ─────────────────────────────────────────────────────────────────
     WHITE-COLLAR CRIME
     ───────────────────────────────────────────────────────────────── */
  wcc: {
    ua: {
      metaTitle:
        'White-Collar Crime адвокат Київ — захист бізнесу в кримінальних провадженнях | Litigant',
      metaDescription:
        'Захист власників бізнесу та менеджменту у справах про економічні злочини. Обшуки, арешти, ДБР, НАБУ. Адвокат Юрій Григоренко. Київ · Одеса.',
      keywords:
        'white collar crime адвокат, захист при обшуку, економічні злочини адвокат, захист директора ДБР НАБУ, кримінальне провадження бізнес',
      h1: 'White-Collar Crime: захист бізнесу та менеджменту в кримінальних провадженнях',
      intro: [
        'White-Collar Crime — кримінальні провадження економічного характеру, де у ролі підозрюваного або свідка опиняється власник бізнесу, директор, фінансовий директор або топ-менеджмент. Ухилення від сплати податків, шахрайство, зловживання владою, легалізація доходів, контрабанда, фіктивне підприємництво — це справи, де ставкою є не лише штраф, а особиста свобода клієнта та контроль над активами.',
        'Litigant супроводжує клієнтів від моменту першого контакту з правоохоронцями (обшук, виклик на допит, арешт майна) до набрання вироком законної сили. Ми працюємо з ДБР, НАБУ, СБУ, БЕБ, ДПС, прокуратурою всіх рівнів. Захист починається до того, як справу передано в суд — методичні помилки слідства на досудовій стадії визначають результат у касації.',
      ],
      servicesTitle: 'Спектр послуг у справах White-Collar Crime',
      services: [
        [
          'Захист під час обшуку 24/7',
          'Виїзд адвоката за викликом протягом 1–2 годин у Києві та Одесі. Контроль законності проведення обшуку, фіксація порушень, оскарження ухвал слідчого судді.',
        ],
        [
          'Супровід на допитах',
          'Підготовка клієнта до допиту, участь у слідчих діях у статусі свідка/підозрюваного, недопущення зміни процесуального статусу через тактичні прорахунки.',
        ],
        [
          'Зняття арештів з активів',
          'Оскарження накладення арешту на корпоративні рахунки, нерухомість, корпоративні права. Збереження операційної здатності бізнесу під час провадження.',
        ],
        [
          'Захист у суді першої інстанції',
          'Стратегія захисту, побудова доказової бази, перехресні допити, виклик експертів. Робота над процесуальними помилками слідства як основою для виправдання.',
        ],
        [
          'Апеляційне та касаційне оскарження',
          'Підготовка апеляційних та касаційних скарг, представництво у Київському апеляційному суді та Касаційному кримінальному суді ВС.',
        ],
      ],
      whenTitle: 'Коли звертаються до Litigant',
      whenLead:
        'Типові ситуації, коли потрібна негайна юридична інтервенція. Кожна з них вимагає реакції протягом годин, не днів.',
      whenItems: [
        'Прийшли з обшуком на підприємство або до директора вдома',
        'Відкрито кримінальне провадження проти власника або менеджменту',
        'Виклик на допит як свідка або підозрюваного (ДБР, НАБУ, СБУ, БЕБ)',
        'Арешт корпоративних рахунків або майна за рішенням слідчого судді',
        'Тиск через кримінальне переслідування як інструмент корпоративного конфлікту',
      ],
      faqTitle: 'Часті питання про White-Collar Crime',
      faqLead: 'Відповіді на питання, які найчастіше ставлять власники бізнесу та C-level менеджери перед укладенням договору про правову допомогу.',
      faq: [
        [
          'Що таке White-Collar Crime в Україні?',
          'White-Collar Crime — це збірне поняття для кримінальних правопорушень економічного характеру, які скоюються представниками бізнесу або державного сектору без застосування фізичного насильства. До цієї категорії в українському праві належать: ухилення від сплати податків (ст. 212 КК), легалізація (відмивання) доходів (ст. 209 КК), фіктивне підприємництво (ст. 205-1 КК), шахрайство з фінансовими ресурсами (ст. 222 КК), доведення до банкрутства (ст. 219 КК), зловживання службовим становищем (ст. 364 КК). Розслідуванням займаються ДБР, НАБУ, СБУ, БЕБ — залежно від суб’єктного складу та розміру шкоди.',
        ],
        [
          'Що робити власнику бізнесу якщо прийшли з обшуком?',
          'Перше і найважливіше — викликати адвоката до того, як ви відкриєте двері, та повідомити про це слідчого. Закон дозволяє почекати прибуття захисника до 2 годин (ст. 233 КПК). Не давайте жодних пояснень без адвоката, не підписуйте протоколи, не передавайте техніку без опису. Зафіксуйте порушення на відео власним телефоном — це дозволено. Перевірте повноваження учасників обшуку та ухвалу слідчого судді: вона повинна містити конкретний перелік об’єктів пошуку. Усе, що виходить за межі цього переліку, є незаконним вилученням і підлягає поверненню.',
        ],
        [
          'Чим відрізняється статус свідка від підозрюваного?',
          'Свідок зобов’язаний з’явитись на допит і дати правдиві показання, але має право на адвоката та може відмовитись від показань щодо себе та близьких родичів (ст. 63 Конституції). Підозрюваний має ширші права захисту — отримує копії процесуальних документів, бере участь у слідчих діях, оскаржує дії слідчого. Ризик зміни статусу зі свідка на підозрюваного існує завжди, тому участь адвоката на допиті свідка обов’язкова: одне необережне формулювання у показаннях відкриває слідчому шлях до повідомлення про підозру. Litigant супроводжує клієнтів з моменту першого виклику, навіть якщо формально вони ще свідки.',
        ],
        [
          'Як захистити активи при кримінальному провадженні?',
          'Активи захищаються через три механізми. Перший — оскарження ухвали слідчого судді про арешт у апеляційному суді (5 днів з моменту вручення). Другий — клопотання про зміну запобіжного заходу або зняття арешту в межах самого провадження за зміни обставин. Третій — стратегічне планування корпоративної структури до моменту виникнення ризику: розмежування операційної та активо-утримуючої компаній, використання трастів та іноземних юрисдикцій у межах закону. Litigant поєднує реактивний захист (оскарження вже накладених арештів) з проактивною інженерією — антирейдерські структури, які витримують кримінальне переслідування.',
        ],
        [
          'Скільки коштує захист у справах White-Collar Crime?',
          'Вартість залежить від стадії провадження, кількості епізодів, обсягу матеріалів справи та складності доказової бази. Орієнтовно: захист на стадії досудового розслідування у справі середньої складності — від 80 000 ₴ за місяць супроводу. Кейси з масштабною доказовою базою (фінансово-кредитні операції, міжнародні розслідування) — від 250 000 ₴ за місяць. Ми працюємо за договором про правову допомогу з фіксованою щомісячною винагородою або за окремими процесуальними діями. Перший пре-аналіз кейсу — за заявкою через форму на /kontakty.',
        ],
      ],
      ctaTitle: 'Не дайте слідству перехопити ініціативу',
      ctaText:
        'У справах White-Collar Crime результат визначається першими 48 годинами після обшуку або повідомлення про підозру. Опишіть ситуацію — ми відповімо протягом 2 робочих годин і запропонуємо план дій.',
      ctaButton: 'Подати кейс на розгляд',
      backToOverview: '← Усі практики Litigant',
      breadcrumbHome: 'Головна',
      breadcrumbPractices: 'Практики',
      breadcrumbCurrent: 'White-Collar Crime',
    },
    en: {
      metaTitle:
        'White-Collar Crime Defense Lawyer Kyiv — Business Protection in Criminal Cases | Litigant',
      metaDescription:
        'Defense for business owners and management in economic-crime proceedings. Searches, arrests, SBI, NABU. Attorney Iurii Grygorenko. Kyiv · Odesa.',
      keywords:
        'white collar crime lawyer Ukraine, search defense, economic crime attorney, director defense SBI NABU, criminal proceedings business',
      h1: 'White-Collar Crime: Defense for Business Owners and Management in Criminal Cases',
      intro: [
        'White-Collar Crime covers criminal proceedings of an economic nature where a business owner, director, CFO or top-manager appears as suspect or witness. Tax evasion, fraud, abuse of office, money laundering, smuggling, fictitious entrepreneurship — these are cases where the stake is not only a fine but the client’s personal liberty and control over assets.',
        'Litigant supports clients from the first contact with law enforcement (search, summons, asset arrest) until the verdict enters into force. We work with the SBI, NABU, SBU, Economic Security Bureau, State Tax Service, and prosecutor’s offices at every level. Defense begins before the case reaches court — methodological errors of investigators at the pre-trial stage determine the outcome at cassation.',
      ],
      servicesTitle: 'Scope of services in White-Collar Crime cases',
      services: [
        [
          '24/7 search defense',
          'Lawyer on-site within 1–2 hours in Kyiv or Odesa. Control of search legality, recording of violations, appeal of investigating-judge orders.',
        ],
        [
          'Interrogation support',
          'Pre-interrogation preparation, presence during witness/suspect questioning, prevention of status change through tactical errors.',
        ],
        [
          'Removal of asset arrests',
          'Appeal against freezes on corporate accounts, real estate, equity rights. Preserving operational capacity throughout the proceedings.',
        ],
        [
          'Defense at trial court',
          'Defense strategy, evidence base, cross-examination, expert witnesses. Building on investigative procedural errors as the foundation for acquittal.',
        ],
        [
          'Appellate and cassation review',
          'Drafting of appeal and cassation petitions, representation before the Kyiv Court of Appeal and the Supreme Court Cassation Criminal Court.',
        ],
      ],
      whenTitle: 'When clients turn to Litigant',
      whenLead:
        'Typical situations requiring immediate legal intervention. Each demands a response within hours, not days.',
      whenItems: [
        'Investigators arrived with a search at the company or at the director’s home',
        'Criminal proceedings opened against the owner or management',
        'Summons for questioning as witness or suspect (SBI, NABU, SBU, ESB)',
        'Freeze of corporate accounts or property under investigating-judge order',
        'Criminal pressure used as a tool in corporate conflicts',
      ],
      faqTitle: 'Frequently asked questions about White-Collar Crime',
      faqLead:
        'Answers to questions most often raised by business owners and C-level managers before signing a legal-services agreement.',
      faq: [
        [
          'What is White-Collar Crime in Ukraine?',
          'White-Collar Crime is a collective term for economic criminal offences committed by business or public-sector representatives without physical violence. Under Ukrainian law this category includes: tax evasion (Art. 212 CC), money laundering (Art. 209 CC), fictitious entrepreneurship (Art. 205-1 CC), fraud with financial resources (Art. 222 CC), bringing to bankruptcy (Art. 219 CC), abuse of office (Art. 364 CC). Investigation is conducted by SBI, NABU, SBU and the Economic Security Bureau depending on the subject composition and damage size.',
        ],
        [
          'What should a business owner do when investigators arrive with a search?',
          'First and foremost — call a lawyer before opening the door, and inform the investigator about it. The law allows a 2-hour wait for defense counsel to arrive (Art. 233 CCP). Give no explanations without your lawyer, sign no protocols, hand over no equipment without inventory. Record any violations on your own phone — this is permitted. Verify the authority of search participants and the investigating-judge order: it must contain a specific list of search targets. Anything beyond that list is unlawful seizure subject to return.',
        ],
        [
          'How does witness status differ from suspect status?',
          'A witness must appear for questioning and give truthful testimony but has the right to counsel and may refuse to testify against themselves and close relatives (Art. 63 Constitution). A suspect has broader defense rights — receives copies of procedural documents, participates in investigative actions, appeals investigator’s actions. The risk of upgrading from witness to suspect always exists, so a lawyer’s presence at witness questioning is essential: a single careless wording opens the path to a notice of suspicion. Litigant accompanies clients from the first summons, even when they are formally still witnesses.',
        ],
        [
          'How to protect assets during criminal proceedings?',
          'Assets are protected through three mechanisms. First — appealing the investigating-judge order on arrest before the court of appeal (5 days from service). Second — motions to alter the preventive measure or lift the arrest within the proceedings upon changed circumstances. Third — strategic corporate-structure planning before risk arises: separation of operating and asset-holding entities, use of trusts and foreign jurisdictions within the law. Litigant combines reactive defense (appealing existing arrests) with proactive engineering — anti-raid structures that withstand criminal pressure.',
        ],
        [
          'How much does White-Collar Crime defense cost?',
          'The cost depends on proceedings stage, number of episodes, case-file volume and evidence complexity. Indicatively: defense at pre-trial in a medium-complexity case starts at UAH 80 000 per month of support. Cases with a large evidence base (financial-credit operations, international investigations) start at UAH 250 000 per month. We work under a legal-services agreement with a fixed monthly retainer or on a per-procedural-action basis. The first case pre-analysis is by application via the form at /kontakty.',
        ],
      ],
      ctaTitle: 'Don’t let the investigation seize the initiative',
      ctaText:
        'In White-Collar Crime cases, the result is determined within the first 48 hours after a search or notice of suspicion. Describe the situation — we’ll respond within 2 business hours and propose an action plan.',
      ctaButton: 'Submit case for review',
      backToOverview: '← All Litigant practices',
      breadcrumbHome: 'Home',
      breadcrumbPractices: 'Practices',
      breadcrumbCurrent: 'White-Collar Crime',
    },
    ro: {
      metaTitle:
        'White-Collar Crime — avocat Kyiv pentru apărarea afacerilor în cauze penale | Litigant',
      metaDescription:
        'Apărarea proprietarilor de afaceri și a managementului în cauze penale economice. Percheziții, sechestre, SBI, NABU. Avocat Iurii Grygorenko. Kyiv · Odesa.',
      keywords:
        'white collar crime avocat Ucraina, apărare percheziție, infracțiuni economice avocat, apărare director SBI NABU, proceduri penale afaceri',
      h1: 'White-Collar Crime: apărarea proprietarilor de afaceri și a managementului în cauze penale',
      intro: [
        'White-Collar Crime cuprinde procedurile penale de natură economică în care proprietarul afacerii, directorul, CFO-ul sau top-managementul apar ca suspecți sau martori. Evaziunea fiscală, frauda, abuzul în serviciu, spălarea banilor, contrabanda, antreprenoriatul fictiv — sunt cazuri în care miza nu este doar amenda, ci libertatea personală a clientului și controlul asupra activelor.',
        'Litigant însoțește clienții de la primul contact cu organele de urmărire penală (percheziție, citație, sechestru) până la rămânerea definitivă a sentinței. Lucrăm cu SBI, NABU, SBU, Biroul de Securitate Economică, Serviciul Fiscal de Stat și parchetele de toate gradele. Apărarea începe înainte ca dosarul să ajungă în instanță — erorile metodologice ale anchetei la faza pre-judiciară determină rezultatul la casație.',
      ],
      servicesTitle: 'Sfera serviciilor în cauze White-Collar Crime',
      services: [
        [
          'Apărare la percheziție 24/7',
          'Avocat la fața locului în 1–2 ore în Kyiv și Odesa. Controlul legalității percheziției, înregistrarea încălcărilor, contestarea ordonanțelor judecătorului de instrucție.',
        ],
        [
          'Asistență la audieri',
          'Pregătirea clientului, prezență la audieri în calitate de martor/suspect, prevenirea schimbării statutului procesual prin erori tactice.',
        ],
        [
          'Ridicarea sechestrelor pe active',
          'Contestarea sechestrului pe conturi corporative, imobile, drepturi corporative. Păstrarea capacității operaționale a afacerii pe parcursul procedurilor.',
        ],
        [
          'Apărare în prima instanță',
          'Strategia de apărare, baza probatorie, audieri încrucișate, experți. Lucrul pe erori procedurale ale anchetei ca temei al achitării.',
        ],
        [
          'Apel și recurs',
          'Redactarea cererilor de apel și recurs, reprezentare la Curtea de Apel Kyiv și la Curtea de Casație Penală a Curții Supreme.',
        ],
      ],
      whenTitle: 'Când clienții se adresează Litigant',
      whenLead:
        'Situații tipice care necesită intervenție juridică imediată. Fiecare cere reacție în ore, nu în zile.',
      whenItems: [
        'A venit perchiziția la întreprindere sau la domiciliul directorului',
        'S-a deschis dosar penal împotriva proprietarului sau managementului',
        'Citație la audieri ca martor sau suspect (SBI, NABU, SBU, BSE)',
        'Sechestru pe conturi corporative sau pe bunuri prin ordonanța judecătorului de instrucție',
        'Presiune prin urmărire penală ca instrument în conflicte corporative',
      ],
      faqTitle: 'Întrebări frecvente despre White-Collar Crime',
      faqLead:
        'Răspunsuri la întrebările cele mai frecvente puse de proprietari de afaceri și manageri C-level înainte de încheierea contractului de asistență juridică.',
      faq: [
        [
          'Ce este White-Collar Crime în Ucraina?',
          'White-Collar Crime este un termen colectiv pentru infracțiunile penale de natură economică comise de reprezentanți ai mediului de afaceri sau ai sectorului public fără violență fizică. Conform dreptului ucrainean, în această categorie intră: evaziunea fiscală (art. 212 CP), spălarea banilor (art. 209 CP), antreprenoriatul fictiv (art. 205-1 CP), frauda cu resurse financiare (art. 222 CP), aducerea la faliment (art. 219 CP), abuzul în serviciu (art. 364 CP). Ancheta este condusă de SBI, NABU, SBU și Biroul de Securitate Economică în funcție de compoziția subiectivă și mărimea prejudiciului.',
        ],
        [
          'Ce trebuie să facă proprietarul afacerii când vine perchiziția?',
          'În primul rând — chemați avocatul înainte de a deschide ușa și informați anchetatorul despre acest lucru. Legea permite o așteptare de până la 2 ore pentru sosirea apărătorului (art. 233 CPP). Nu dați nicio explicație fără avocat, nu semnați procese-verbale, nu predați tehnică fără inventariere. Înregistrați încălcările pe propriul telefon — este permis. Verificați împuternicirile participanților la percheziție și ordonanța judecătorului de instrucție: aceasta trebuie să conțină o listă concretă a obiectelor căutării. Tot ceea ce depășește această listă constituie ridicare ilegală și este supus restituirii.',
        ],
        [
          'Care e diferența dintre statutul de martor și de suspect?',
          'Martorul este obligat să se prezinte la audiere și să dea declarații sincere, dar are dreptul la avocat și poate refuza să depună mărturie împotriva sa și a rudelor apropiate (art. 63 din Constituție). Suspectul are drepturi de apărare mai largi — primește copii ale documentelor procesuale, participă la acțiuni de urmărire, atacă acțiunile anchetatorului. Riscul schimbării statutului de la martor la suspect există întotdeauna, de aceea prezența avocatului la audierea martorului este esențială: o singură formulare neglijentă deschide calea către comunicarea bănuielii. Litigant însoțește clienții de la prima citație, chiar dacă formal sunt încă martori.',
        ],
        [
          'Cum să protejăm activele în timpul procedurilor penale?',
          'Activele sunt protejate prin trei mecanisme. Primul — atacarea ordonanței judecătorului de instrucție privind sechestrul la curtea de apel (5 zile de la comunicare). Al doilea — cereri de schimbare a măsurii preventive sau de ridicare a sechestrului în cadrul procedurilor în condițiile schimbării circumstanțelor. Al treilea — planificarea strategică a structurii corporative înainte de apariția riscului: separarea entităților operaționale și de deținere a activelor, utilizarea trusturilor și a jurisdicțiilor străine în limitele legii. Litigant combină apărarea reactivă (atacarea sechestrelor existente) cu inginerie proactivă — structuri anti-raider care rezistă presiunii penale.',
        ],
        [
          'Cât costă apărarea în cauze White-Collar Crime?',
          'Costul depinde de stadiul procedurilor, numărul episoadelor, volumul dosarului și complexitatea probatoriului. Orientativ: apărarea la stadiul de urmărire penală într-o cauză de complexitate medie începe de la 80 000 UAH pe lună de asistență. Cauzele cu probatoriu masiv (operațiuni financiar-creditare, anchete internaționale) — de la 250 000 UAH pe lună. Lucrăm conform contractului de asistență juridică cu retainer lunar fix sau pe acțiuni procesuale separate. Prima pre-analiză a cazului se face la cerere prin formularul de la /kontakty.',
        ],
      ],
      ctaTitle: 'Nu lăsați ancheta să preia inițiativa',
      ctaText:
        'În cauzele White-Collar Crime, rezultatul este determinat în primele 48 de ore după percheziție sau comunicarea bănuielii. Descrieți situația — vom răspunde în 2 ore lucrătoare cu un plan de acțiune.',
      ctaButton: 'Trimite cazul pentru analiză',
      backToOverview: '← Toate practicile Litigant',
      breadcrumbHome: 'Acasă',
      breadcrumbPractices: 'Practici',
      breadcrumbCurrent: 'White-Collar Crime',
    },
  },

  /* ─────────────────────────────────────────────────────────────────
     BANKRUPTCY
     ───────────────────────────────────────────────────────────────── */
  bankruptcy: {
    ua: {
      metaTitle:
        'Банкрутство підприємства Київ — арбітражний керуючий, захист кредиторів | Litigant',
      metaDescription:
        'Банкрутство юридичних осіб, реструктуризація боргів, захист кредиторів і боржників. Арбітражний керуючий. Секретар Комітету НААУ з питань банкрутства.',
      keywords:
        'банкрутство підприємства Київ, арбітражний керуючий Одеса, реструктуризація боргів підприємства, субсидіарна відповідальність директора, захист кредиторів банкрутство',
      h1: 'Банкрутство та реструктуризація: правовий супровід кредиторів і боржників',
      intro: [
        'Банкрутство — це не закінчення, а перерозподіл прав і активів. Кодекс України з процедур банкрутства (вступив у дію 21.10.2019) докорінно змінив підхід: процедура зосереджена на санації, а не ліквідації. Хто перший зайде в провадження — той задає правила: складає реєстр вимог, обирає арбітражного керуючого, формулює план реструктуризації.',
        'Litigant представляє і кредиторів, і боржників — на різних кейсах, з чітким розмежуванням конфліктів інтересів. Юрій Григоренко — арбітражний керуючий зі свідоцтвом, секретар Комітету НААУ з питань банкрутства. Це означає, що ми бачимо процедуру з обох боків і знаємо, де ризики для кожного учасника. Захист кредитора у справі А — інший спеціаліст команди, ніж той, хто супроводжує боржника у справі Б.',
      ],
      servicesTitle: 'Спектр послуг у процедурах банкрутства',
      services: [
        [
          'Подача заяви про банкрутство',
          'Підготовка заяви кредитора або боржника, формування доказової бази неплатоспроможності, супровід у Господарському суді на стадії порушення провадження.',
        ],
        [
          'Арбітражне керування',
          'Виконання обов’язків розпорядника майна, керуючого санацією, ліквідатора. Інвентаризація, формування реєстру кредиторів, продаж майна на електронних торгах.',
        ],
        [
          'Реструктуризація заборгованості',
          'Підготовка плану санації, переговори з ключовими кредиторами, узгодження мирової угоди. Збереження операційного бізнесу замість ліквідації.',
        ],
        [
          'Захист кредиторів',
          'Включення вимог до реєстру, оскарження дій арбітражного керуючого, контроль за продажем майна боржника, оспорення фраудаторних правочинів.',
        ],
        [
          'Субсидіарна відповідальність',
          'Притягнення керівників, засновників, бенефіціарів до субсидіарної відповідальності за борги збанкрутілої компанії — або захист директора від такого позову.',
        ],
      ],
      whenTitle: 'Коли звертаються до Litigant',
      whenLead:
        'Сценарії, коли потрібен спеціаліст з кодексу процедур банкрутства. Час реакції тут вимірюється тижнями, але ціна затримки — втрата активів.',
      whenItems: [
        'Підприємство не може обслуговувати борги перед банком, постачальниками або працівниками',
        'Кредитори подали заяву про банкрутство — потрібна стратегія захисту боржника',
        'Потрібен арбітражний керуючий зі свідоцтвом для процедури',
        'Захист активів від стягнення кредиторів через банкрутство',
        'Загроза притягнення директора до субсидіарної відповідальності',
      ],
      faqTitle: 'Часті питання про банкрутство',
      faqLead:
        'Базові питання, з якими стикаються директори, бенефіціари та кредитори перед прийняттям рішення про входження у процедуру.',
      faq: [
        [
          'Коли підприємство може подати на банкрутство?',
          'Боржник зобов’язаний звернутися до суду з заявою про відкриття провадження у випадках, передбачених ст. 34 Кодексу України з процедур банкрутства: припинення виконання грошових зобов’язань протягом 3 місяців на суму понад 300 розмірів мінімальної заробітної плати, виявлення нестачі майна для виконання зобов’язань, або у разі, якщо подальша діяльність призведе до банкрутства. Боржник також вправі подати заяву добровільно — це часто стратегічно вигідніше, ніж очікувати заяви кредитора, бо дозволяє самостійно ініціювати санацію та зберегти контроль над процедурою через узгодженого арбітражного керуючого.',
        ],
        [
          'Що таке арбітражний керуючий і яка його роль?',
          'Арбітражний керуючий — юридична особа або фізична особа-підприємець з вищою юридичною або економічною освітою, який пройшов кваліфікаційний іспит та має свідоцтво Міністерства юстиції. У процедурі банкрутства він послідовно виконує три ролі: розпорядник майна (на стадії спостереження), керуючий санацією (під час оздоровлення) та ліквідатор. Його повноваження включають інвентаризацію, формування реєстру кредиторів, продаж майна на електронних торгах через Prozorro.Sale, оспорення сумнівних правочинів. Юрій Григоренко є арбітражним керуючим з 2017 року і має досвід виконання усіх трьох ролей у Господарських судах Києва, Одеси, Львова.',
        ],
        [
          'Чи несе директор особисту відповідальність при банкрутстві компанії?',
          'Так, у двох сценаріях. Перший — субсидіарна відповідальність за ст. 61 Кодексу процедур банкрутства: керівники та засновники відповідають своїм особистим майном за зобов’язаннями боржника, якщо їх дії або бездіяльність призвели до банкрутства. Другий — кримінальна відповідальність: ст. 219 КК (доведення до банкрутства), ст. 388 КК (незаконні дії у разі банкрутства). Захист включає аналіз управлінських рішень за останні 3 роки до банкрутства, доведення відсутності причинного зв’язку між діями керівника та неплатоспроможністю, формування доказової бази добросовісної поведінки. Litigant супроводжує директорів у субсидіарних позовах і кримінальних провадженнях паралельно.',
        ],
        [
          'Як захистити активи кредитора при банкрутстві боржника?',
          'Кредитор повинен діяти у трьох напрямках. Перший — своєчасне включення вимог до реєстру: 30 днів з моменту офіційного повідомлення про відкриття провадження (ст. 47 КУзПБ). Запізнення означає включення на пізнішій стадії з нижчим пріоритетом задоволення. Другий — контроль за діями арбітражного керуючого: участь у комітеті кредиторів, оскарження невигідних рішень керуючого або звітів. Третій — оспорення фраудаторних правочинів боржника, вчинених протягом 3 років до відкриття провадження: продажі за заниженими цінами, дарування пов’язаним особам, безпідставні заліки. Litigant супроводжує великих кредиторів від подачі вимог до отримання задоволення з ліквідаційної маси.',
        ],
        [
          'Що таке реструктуризація і коли вона краща за банкрутство?',
          'Реструктуризація — це процедура санації в межах банкрутського провадження, спрямована на відновлення платоспроможності боржника без ліквідації. План санації затверджується зборами кредиторів і включає реструктуризацію заборгованості, продаж непрофільних активів, залучення нового капіталу, відстрочку платежів. Реструктуризація вигідна, коли бізнес життєздатний (генерує операційний грошовий потік, але має непосильний борговий тягар), коли активи коштують більше як працюючий бізнес, ніж розпродані по частинах, і коли є кредитори, готові на компроміс. Litigant веде кейси санації від 6 місяців до 2 років, з фокусом на збереженні робочих місць та операційного контролю клієнта.',
        ],
      ],
      ctaTitle: 'Банкрутство — не вирок, а процес із власними правилами',
      ctaText:
        'Опишіть ситуацію — кредиторську чи боржникову. Ми оцінимо стратегію входження у провадження, ризики субсидіарної відповідальності та потенціал реструктуризації протягом 2 робочих годин.',
      ctaButton: 'Подати кейс на розгляд',
      backToOverview: '← Усі практики Litigant',
      breadcrumbHome: 'Головна',
      breadcrumbPractices: 'Практики',
      breadcrumbCurrent: 'Банкрутство',
    },
    en: {
      metaTitle:
        'Bankruptcy Lawyer Kyiv — Insolvency Trustee, Creditor Defense | Litigant',
      metaDescription:
        'Corporate insolvency, debt restructuring, defense of creditors and debtors. Insolvency trustee. Secretary of the NAAU Committee on Bankruptcy.',
      keywords:
        'corporate bankruptcy Kyiv, insolvency trustee Odesa, corporate debt restructuring, director subsidiary liability, creditor defense bankruptcy',
      h1: 'Bankruptcy and Restructuring: Legal Support for Creditors and Debtors',
      intro: [
        'Bankruptcy is not an end — it is a redistribution of rights and assets. Ukraine’s Bankruptcy Procedures Code (effective 21.10.2019) radically changed the approach: the procedure focuses on rehabilitation rather than liquidation. Whoever enters the proceeding first sets the rules: builds the creditor register, selects the trustee, drafts the restructuring plan.',
        'Litigant represents both creditors and debtors — on separate cases, with strict conflict-of-interest separation. Iurii Grygorenko is a certified insolvency trustee and Secretary of the NAAU Bankruptcy Committee. We see the procedure from both sides and know the risks for every participant. Defense of a creditor in case A is handled by a different team specialist than the one supporting a debtor in case B.',
      ],
      servicesTitle: 'Scope of services in bankruptcy proceedings',
      services: [
        [
          'Filing a bankruptcy petition',
          'Drafting creditor or debtor petitions, building the insolvency evidence base, court support at the proceeding-opening stage.',
        ],
        [
          'Insolvency trustee work',
          'Performance of property administrator, rehabilitation manager and liquidator duties. Inventory, creditor register, electronic-auction asset sales.',
        ],
        [
          'Debt restructuring',
          'Rehabilitation plan, negotiations with key creditors, settlement-agreement coordination. Preserving the operational business instead of liquidation.',
        ],
        [
          'Creditor defense',
          'Inclusion of claims in the register, appeals against trustee actions, control of debtor-asset sales, challenge of fraudulent transactions.',
        ],
        [
          'Subsidiary liability',
          'Bringing managers, founders, beneficiaries to subsidiary liability for the debts of a bankrupt company — or defending the director against such a claim.',
        ],
      ],
      whenTitle: 'When clients turn to Litigant',
      whenLead:
        'Scenarios that require a Bankruptcy Code specialist. Reaction time here is measured in weeks, but the cost of delay is asset loss.',
      whenItems: [
        'The company cannot service debts to banks, suppliers or employees',
        'Creditors filed a bankruptcy petition — debtor defense strategy is needed',
        'A certified insolvency trustee is required for the procedure',
        'Asset protection from creditor enforcement through bankruptcy',
        'Threat of subsidiary liability against the director',
      ],
      faqTitle: 'Frequently asked questions about bankruptcy',
      faqLead:
        'Basic questions faced by directors, beneficiaries and creditors before deciding to enter the procedure.',
      faq: [
        [
          'When can a company file for bankruptcy?',
          'A debtor is required to file with the court for the opening of proceedings in cases provided by Art. 34 of the Bankruptcy Procedures Code: cessation of monetary obligations for over 3 months on amounts exceeding 300 minimum-wage units, discovery of insufficient property to fulfill obligations, or where continued activity will lead to bankruptcy. The debtor may also file voluntarily — often strategically more beneficial than waiting for a creditor’s petition, as it allows initiating rehabilitation and retaining procedure control through an agreed trustee.',
        ],
        [
          'What is an insolvency trustee and what is the role?',
          'An insolvency trustee is a legal entity or individual entrepreneur with higher legal or economic education, having passed the qualification exam and holding a Ministry of Justice certificate. In bankruptcy, the trustee sequentially performs three roles: property administrator (observation stage), rehabilitation manager (reorganization), and liquidator. Powers include inventory, creditor register, asset sales via electronic auctions on Prozorro.Sale, challenging suspicious transactions. Iurii Grygorenko has been a trustee since 2017 and has performed all three roles in commercial courts of Kyiv, Odesa and Lviv.',
        ],
        [
          'Does a director bear personal liability when the company goes bankrupt?',
          'Yes, in two scenarios. First — subsidiary liability under Art. 61 of the Bankruptcy Code: managers and founders are liable with personal property for the debtor’s obligations if their actions or inaction led to bankruptcy. Second — criminal liability: Art. 219 CC (bringing to bankruptcy), Art. 388 CC (illegal actions in bankruptcy). Defense includes analyzing management decisions for the 3 years preceding bankruptcy, proving absence of causal link between the manager’s actions and insolvency, building evidence of good-faith conduct. Litigant supports directors in subsidiary claims and criminal proceedings simultaneously.',
        ],
        [
          'How to protect creditor assets in debtor bankruptcy?',
          'A creditor must act on three fronts. First — timely inclusion of claims in the register: 30 days from the official notification of proceedings opening (Art. 47 BPC). Delay means inclusion at a later stage with lower satisfaction priority. Second — control of trustee actions: participation in the creditors’ committee, appeals against unfavorable trustee decisions or reports. Third — challenging fraudulent debtor transactions made within 3 years before proceedings opening: sales at understated prices, gifts to related parties, baseless offsets. Litigant supports large creditors from claim filing to satisfaction from the liquidation estate.',
        ],
        [
          'What is restructuring and when is it preferable to bankruptcy?',
          'Restructuring is a rehabilitation procedure within bankruptcy proceedings aimed at restoring debtor solvency without liquidation. The rehabilitation plan is approved by the creditors’ meeting and includes debt restructuring, sale of non-core assets, attraction of new capital, payment deferrals. Restructuring is beneficial when the business is viable (generates operating cash flow but carries an unsustainable debt burden), when assets are worth more as a going concern than sold piecemeal, and when creditors are open to compromise. Litigant runs rehabilitation cases of 6 months to 2 years, focused on preserving jobs and operational client control.',
        ],
      ],
      ctaTitle: 'Bankruptcy is not a verdict — it is a process with its own rules',
      ctaText:
        'Describe the situation — creditor or debtor side. We’ll assess the entry strategy, subsidiary-liability risks and restructuring potential within 2 business hours.',
      ctaButton: 'Submit case for review',
      backToOverview: '← All Litigant practices',
      breadcrumbHome: 'Home',
      breadcrumbPractices: 'Practices',
      breadcrumbCurrent: 'Bankruptcy',
    },
    ro: {
      metaTitle:
        'Avocat insolvență Kyiv — administrator judiciar, apărare creditori | Litigant',
      metaDescription:
        'Insolvența persoanelor juridice, restructurarea datoriilor, apărarea creditorilor și debitorilor. Administrator judiciar. Secretar al Comitetului NAAU pentru insolvență.',
      keywords:
        'insolvență întreprindere Kyiv, administrator judiciar Odesa, restructurare datorii companie, răspundere subsidiară director, apărare creditori insolvență',
      h1: 'Insolvență și restructurare: asistență juridică pentru creditori și debitori',
      intro: [
        'Insolvența nu este sfârșitul — este o redistribuire a drepturilor și activelor. Codul Ucrainei privind procedurile de insolvență (în vigoare de la 21.10.2019) a schimbat radical abordarea: procedura se concentrează pe redresare, nu pe lichidare. Cine intră primul în procedură — acela stabilește regulile: întocmește registrul creanțelor, alege administratorul judiciar, formulează planul de restructurare.',
        'Litigant reprezintă atât creditorii, cât și debitorii — în cauze diferite, cu separare strictă a conflictelor de interese. Iurii Grygorenko este administrator judiciar autorizat și Secretar al Comitetului NAAU pentru insolvență. Vedem procedura din ambele părți și cunoaștem riscurile pentru fiecare participant. Apărarea unui creditor în cauza A este realizată de un specialist din echipă diferit de cel care asistă debitorul în cauza B.',
      ],
      servicesTitle: 'Sfera serviciilor în procedurile de insolvență',
      services: [
        [
          'Depunerea cererii de insolvență',
          'Redactarea cererii creditorului sau debitorului, construirea bazei probatorii a insolvenței, asistență la Tribunalul Comercial în faza deschiderii procedurii.',
        ],
        [
          'Administrare judiciară',
          'Îndeplinirea atribuțiilor de administrator de bunuri, manager de redresare și lichidator. Inventariere, registrul creditorilor, vânzări la licitații electronice.',
        ],
        [
          'Restructurarea datoriilor',
          'Plan de redresare, negocieri cu creditorii-cheie, acord de tranzacție. Conservarea afacerii operaționale în locul lichidării.',
        ],
        [
          'Apărarea creditorilor',
          'Includerea creanțelor în registru, atacarea actelor administratorului, controlul vânzării bunurilor debitorului, contestarea actelor frauduloase.',
        ],
        [
          'Răspundere subsidiară',
          'Atragerea conducătorilor, fondatorilor, beneficiarilor la răspunderea subsidiară pentru datoriile companiei falite — sau apărarea directorului împotriva unei astfel de acțiuni.',
        ],
      ],
      whenTitle: 'Când clienții se adresează Litigant',
      whenLead:
        'Scenarii care necesită un specialist al codului procedurilor de insolvență. Timpul de reacție se măsoară în săptămâni, dar costul întârzierii este pierderea activelor.',
      whenItems: [
        'Întreprinderea nu poate deservi datoriile către bancă, furnizori sau angajați',
        'Creditorii au depus cerere de insolvență — este nevoie de strategie de apărare a debitorului',
        'Este nevoie de un administrator judiciar autorizat pentru procedură',
        'Protecția activelor de executarea creditorilor prin insolvență',
        'Amenințarea atragerii directorului la răspunderea subsidiară',
      ],
      faqTitle: 'Întrebări frecvente despre insolvență',
      faqLead:
        'Întrebări de bază pe care le au directorii, beneficiarii și creditorii înainte de a decide intrarea în procedură.',
      faq: [
        [
          'Când o companie poate depune cerere de insolvență?',
          'Debitorul este obligat să se adreseze instanței cu cerere de deschidere a procedurii în cazurile prevăzute la art. 34 din Cod: încetarea executării obligațiilor bănești timp de 3 luni pentru o sumă mai mare de 300 de salarii minime, constatarea insuficienței bunurilor pentru îndeplinirea obligațiilor, sau în cazul în care continuarea activității va duce la insolvență. Debitorul poate depune cerere și voluntar — adesea mai avantajos strategic decât așteptarea cererii creditorului, întrucât permite inițierea redresării și păstrarea controlului procedurii prin administratorul judiciar agreat.',
        ],
        [
          'Ce este administratorul judiciar și care este rolul său?',
          'Administratorul judiciar este o persoană juridică sau persoană fizică-întreprinzător cu studii superioare juridice sau economice, care a trecut examenul de calificare și deține certificatul Ministerului Justiției. În procedura de insolvență îndeplinește succesiv trei roluri: administrator de bunuri (în faza de observație), manager de redresare (în reorganizare), lichidator. Atribuțiile includ inventarierea, registrul creditorilor, vânzarea bunurilor la licitații electronice prin Prozorro.Sale, contestarea actelor suspecte. Iurii Grygorenko este administrator judiciar din 2017 și are experiență în îndeplinirea tuturor celor trei roluri la Tribunalele Comerciale din Kyiv, Odesa, Lviv.',
        ],
        [
          'Răspunde directorul personal pentru insolvența companiei?',
          'Da, în două scenarii. Primul — răspunderea subsidiară conform art. 61 din Codul de insolvență: conducătorii și fondatorii răspund cu bunurile personale pentru obligațiile debitorului dacă acțiunile sau inacțiunile lor au dus la insolvență. Al doilea — răspunderea penală: art. 219 CP (aducerea la faliment), art. 388 CP (acțiuni ilegale în caz de faliment). Apărarea include analiza deciziilor manageriale din ultimii 3 ani înainte de insolvență, dovada lipsei legăturii cauzale dintre acțiunile conducătorului și insolvabilitate, construirea bazei probatorii a comportamentului de bună-credință. Litigant asistă directorii în acțiunile subsidiare și procedurile penale paralel.',
        ],
        [
          'Cum se protejează activele creditorului în insolvența debitorului?',
          'Creditorul trebuie să acționeze pe trei direcții. Prima — includerea în termen a creanțelor în registru: 30 de zile de la notificarea oficială a deschiderii procedurii (art. 47 CIP). Întârzierea înseamnă includere în etapă ulterioară cu prioritate de satisfacere mai mică. A doua — controlul acțiunilor administratorului: participare la comitetul creditorilor, atacarea deciziilor sau rapoartelor nefavorabile. A treia — contestarea actelor frauduloase ale debitorului efectuate în 3 ani înainte de deschiderea procedurii: vânzări la prețuri subevaluate, donații către persoane afiliate, compensări nejustificate. Litigant asistă creditori mari de la depunerea creanțelor până la satisfacerea din masa de lichidare.',
        ],
        [
          'Ce este restructurarea și când este preferabilă insolvenței?',
          'Restructurarea este o procedură de redresare în cadrul procedurii de insolvență, având ca scop restabilirea solvabilității debitorului fără lichidare. Planul de redresare este aprobat de adunarea creditorilor și include restructurarea datoriilor, vânzarea activelor non-core, atragerea de capital nou, amânări de plată. Restructurarea este avantajoasă atunci când afacerea este viabilă (generează flux de numerar operațional, dar are o povară a datoriei nesustenabilă), când activele valorează mai mult ca afacere funcțională decât vândute pe părți, și când există creditori dispuși la compromis. Litigant conduce cazuri de redresare de la 6 luni la 2 ani, cu focus pe păstrarea locurilor de muncă și a controlului operațional al clientului.',
        ],
      ],
      ctaTitle: 'Insolvența nu este o sentință — este un proces cu reguli proprii',
      ctaText:
        'Descrieți situația — partea creditorului sau a debitorului. Vom evalua strategia de intrare în procedură, riscurile răspunderii subsidiare și potențialul de restructurare în 2 ore lucrătoare.',
      ctaButton: 'Trimite cazul pentru analiză',
      backToOverview: '← Toate practicile Litigant',
      breadcrumbHome: 'Acasă',
      breadcrumbPractices: 'Practici',
      breadcrumbCurrent: 'Insolvență',
    },
  },

  /* ─────────────────────────────────────────────────────────────────
     STATE DISPUTES
     ───────────────────────────────────────────────────────────────── */
  'state-disputes': {
    ua: {
      metaTitle:
        'Спори з державою — GR-Litigation, оскарження ДПС, митні спори | Litigant Київ',
      metaDescription:
        'Оскарження рішень держорганів, захист від податкової, митні спори, АМКУ. GR-Litigation. Адвокат Юрій Григоренко. Київ · Одеса.',
      keywords:
        'оскарження рішень ДПС адвокат, податкові спори Київ, митні спори адвокат, оскарження ППР, GR litigation Україна',
      h1: 'Спори з державою: оскарження рішень ДПС, митниці, АМКУ та інших регуляторів',
      intro: [
        'Конфлікт бізнесу з державою — це не лотерея, а структурована процедура з жорсткими строками, формальними вимогами і власною судовою практикою. Помилка у формулюванні позовної заяви, пропуск 10-денного строку, невірний вибір інстанції — і навіть найкращий матеріальний аргумент не буде розглянутий.',
        'Litigant веде спори з ДПС, ДМС, АМКУ, Мінфіном, профільними міністерствами та регуляторами. Юрій Григоренко як суб’єкт лобіювання має робочі контакти з апаратом органів виконавчої влади — це означає, що в багатьох випадках спір розв’язується без повного судового циклу через узгодження позицій. У випадках, де компроміс неможливий — ми йдемо до Верховного Суду, маючи практику з категорій податкових донарахувань, митних класифікацій, оскарження антимонопольних рішень.',
      ],
      servicesTitle: 'Спектр послуг у спорах з державою',
      services: [
        [
          'Оскарження рішень ДПС',
          'Адміністративне та судове оскарження податкових повідомлень-рішень (ППР), актів перевірок, рішень про блокування податкових накладних, арешт коштів на рахунках.',
        ],
        [
          'Митні спори',
          'Оскарження рішень про класифікацію товарів за УКТ ЗЕД, визначення митної вартості, конфіскацію товару, штрафи за порушення митного законодавства.',
        ],
        [
          'Антимонопольні провадження',
          'Захист у справах АМКУ про зловживання монопольним становищем, антиконкурентні узгоджені дії, концентрації, дискримінацію у держзакупівлях.',
        ],
        [
          'Ліцензійні спори',
          'Оскарження рішень про відкликання ліцензій, дозволів, реєстраційних свідоцтв. Захист у Національних регуляторах (НКРЕКП, НБУ, НКЦПФР).',
        ],
        [
          'Зупинення виконання рішень',
          'Забезпечення позову — зупинення виконання оскаржуваного рішення держоргану до набрання судовим рішенням законної сили.',
        ],
      ],
      whenTitle: 'Коли звертаються до Litigant',
      whenLead:
        'Кожна з ситуацій має жорсткий процесуальний строк — 10, 30 або 90 днів. Своєчасна реакція важливіша за складність аргументу.',
      whenItems: [
        'Податкова донарахувала мільйонні штрафи за результатами перевірки',
        'Митниця затримала або конфіскувала товар, відмовила у випуску',
        'АМКУ порушив провадження проти компанії за заявою конкурента',
        'Відкликано ліцензію, дозвіл або зареєстровано відмову у видачі',
        'Блокування податкових накладних — зупинення реєстрації у ЄРПН',
      ],
      faqTitle: 'Часті питання про спори з державою',
      faqLead:
        'Питання про процедуру оскарження, строки, тактику. Юридичний відділ компанії-клієнта зазвичай вже знає теорію — нам ставлять питання про практику.',
      faq: [
        [
          'Як оскаржити рішення ДПС про донарахування податків?',
          'Алгоритм фіксований у Податковому кодексі. Перший крок — адміністративне оскарження до ДПС у вищому органі: скарга подається протягом 10 робочих днів з моменту вручення податкового повідомлення-рішення (ППР). Цей етап обов’язковий — без нього суд відмовить у відкритті провадження. Другий крок — судове оскарження в адміністративному суді: 1080 днів з моменту вручення (в новій редакції КАС), але стратегічно — у перші 30 днів. Третій — апеляція та касація. Litigant веде спори з ДПС від першого пояснення на запит інспектора до Верховного Суду, з фокусом на побудову доказової бази вже на стадії перевірки, до моменту винесення ППР.',
        ],
        [
          'Які строки оскарження рішень держорганів в Україні?',
          'Строки залежать від типу рішення. Для ППР та інших рішень ДПС — 10 робочих днів на адмін. оскарження, 1080 календарних днів на суд (ст. 122 КАС). Для митних рішень — 1 місяць адмін. оскарження, 6 місяців суд. Для рішень АМКУ — 60 днів суд, без обов’язкового адмін. оскарження. Для ліцензійних рішень — 1 місяць суд, без обов’язкового досудового. Загальний строк адміністративного позову — 6 місяців з моменту, коли особа дізналась про порушення прав (ст. 122 КАС). Пропуск строку без поважної причини — підстава для відмови у відкритті провадження.',
        ],
        [
          'Що таке GR-Litigation?',
          'GR-Litigation — це поєднання судових спорів з державою (Litigation) та роботи з державними інституціями (Government Relations). Класичний адвокат працює тільки в суді: подає позов, виступає на засіданні, отримує рішення. GR-Litigation паралельно веде роботу на рівні апарату міністерства, регуляторного органу або профільного комітету Верховної Ради: подача позицій, участь у робочих групах, узгодження редакції підзаконних актів. У 60% випадків спір розв’язується через зміну позиції регулятора або уточнення нормативного акту, не доходячи до Верховного Суду. Litigant використовує цей підхід у спорах з ДПС, АМКУ, профільними міністерствами.',
        ],
        [
          'Як зупинити виконання рішення держоргану до суду?',
          'Інструмент називається забезпечення позову (ст. 150 КАС). Адміністративний суд може за заявою позивача зупинити дію оскаржуваного рішення суб’єкта владних повноважень до набрання судовим рішенням законної сили. Заява подається разом з позовом або під час провадження. Підстава — наявність обставин, що ускладнюють або унеможливлюють виконання судового рішення у разі задоволення позову. Найчастіше використовується для зупинення стягнення податкового боргу, виконання приписів регуляторів, реалізації арештованого майна. Litigant подає заяви про забезпечення вже з першим зверненням до суду — інакше за час провадження бізнес ризикує отримати непоправні втрати.',
        ],
        [
          'Чи можна оскаржити блокування податкових накладних?',
          'Так. Зупинення реєстрації податкової накладної в ЄРПН (ПДВ-накладна) оскаржується спочатку через комісію ДПС регіонального рівня — заявник подає пояснення з документами, що підтверджують реальність господарської операції, протягом 365 днів з моменту блокування. Якщо комісія підтримує блокування, наступний крок — позов до адміністративного суду. Підстава — порушення критеріїв ризиковості, визначених постановою КМУ № 1165. Стратегія захисту базується на доведенні економічної реальності операції: первинні документи, ланцюжки постачання, аналіз контрагентів. Litigant веде такі спори у форматі типових кейсів — кілька десятків блокувань на одного клієнта розв’язуються одним пакетом документів.',
        ],
      ],
      ctaTitle: 'У спорі з державою час — це аргумент',
      ctaText:
        'Опишіть рішення, яке ви хочете оскаржити, та дату його вручення. Ми визначимо прохідні шанси і строк, що залишився, протягом 2 робочих годин.',
      ctaButton: 'Подати кейс на розгляд',
      backToOverview: '← Усі практики Litigant',
      breadcrumbHome: 'Головна',
      breadcrumbPractices: 'Практики',
      breadcrumbCurrent: 'Спори з державою',
    },
    en: {
      metaTitle:
        'Disputes with the State — GR-Litigation, Tax Appeals, Customs | Litigant Kyiv',
      metaDescription:
        'Appeals against state-body decisions, tax-service defense, customs disputes, antimonopoly. GR-Litigation. Attorney Iurii Grygorenko. Kyiv · Odesa.',
      keywords:
        'tax authority appeal lawyer Ukraine, tax disputes Kyiv, customs disputes attorney, tax assessment appeal, GR litigation Ukraine',
      h1: 'Disputes with the State: Appealing Tax, Customs, Antimonopoly and Other Regulatory Decisions',
      intro: [
        'A business-state conflict is not a lottery — it is a structured procedure with strict deadlines, formal requirements and its own case law. An error in petition wording, a missed 10-day deadline, the wrong instance — and even the strongest substantive argument will go unheard.',
        'Litigant conducts disputes with the State Tax Service, Customs, Antimonopoly Committee, Ministry of Finance, sectoral ministries and regulators. Iurii Grygorenko, as a lobbying subject, maintains working contacts with the apparatus of executive bodies — meaning many disputes settle without full litigation through position alignment. Where compromise is impossible — we go to the Supreme Court with established practice in tax assessments, customs classifications, antimonopoly appeals.',
      ],
      servicesTitle: 'Scope of services in state disputes',
      services: [
        [
          'Tax-service appeals',
          'Administrative and judicial appeal of tax assessment notices, audit reports, decisions on blocking VAT invoices, freezes on accounts.',
        ],
        [
          'Customs disputes',
          'Appeals against decisions on UCG ZED classification, customs-value determination, goods confiscation, customs-violation fines.',
        ],
        [
          'Antimonopoly proceedings',
          'Defense in AMC cases on dominant-position abuse, anticompetitive concerted practices, concentrations, public-procurement discrimination.',
        ],
        [
          'License disputes',
          'Appeals against revocation of licenses, permits, registration certificates. Defense before national regulators (NEURC, NBU, NSSMC).',
        ],
        [
          'Suspension of decision execution',
          'Interim relief — suspending the contested state-body decision until the court ruling enters into force.',
        ],
      ],
      whenTitle: 'When clients turn to Litigant',
      whenLead:
        'Each situation has a strict procedural deadline — 10, 30 or 90 days. Timely action matters more than argument complexity.',
      whenItems: [
        'Tax service assessed multimillion fines following an audit',
        'Customs detained or confiscated goods, refused release',
        'Antimonopoly Committee opened proceedings on a competitor’s complaint',
        'License, permit or registration certificate revoked',
        'VAT-invoice blocking — suspension of registration in the URTI',
      ],
      faqTitle: 'Frequently asked questions about state disputes',
      faqLead:
        'Procedure, deadlines, tactics. The client’s in-house legal department typically already knows the theory — we are asked about practice.',
      faq: [
        [
          'How to appeal a State Tax Service decision on tax assessment?',
          'The algorithm is fixed in the Tax Code. First step — administrative appeal to the higher tax authority: complaint filed within 10 business days from receipt of the tax assessment notice. This stage is mandatory — without it, the court will refuse to open proceedings. Second step — judicial appeal in administrative court: 1080 days from receipt (under the new CAC), but strategically within the first 30 days. Third — appeal and cassation. Litigant handles disputes from the first explanation on inspector’s request to the Supreme Court, focusing on building the evidence base already at audit stage, before the assessment is issued.',
        ],
        [
          'What are the deadlines for appealing state decisions in Ukraine?',
          'Deadlines depend on decision type. For tax assessments and other tax-service decisions — 10 business days for admin appeal, 1080 calendar days for court (Art. 122 CAC). For customs — 1 month admin, 6 months court. For Antimonopoly Committee — 60 days court, without mandatory admin appeal. For licensing — 1 month court, no mandatory pre-trial. The general administrative-claim deadline is 6 months from when the person learned of the rights violation. Missing the deadline without valid cause is grounds for refusal to open proceedings.',
        ],
        [
          'What is GR-Litigation?',
          'GR-Litigation combines judicial state disputes (Litigation) with government-relations work. A classical lawyer works only in court: files the claim, argues the hearing, receives the ruling. GR-Litigation runs parallel work at the ministry apparatus, regulatory body or specialized parliamentary committee level: position submissions, working-group participation, alignment of bylaw wording. In 60% of cases the dispute resolves through regulator position change or normative-act clarification, without reaching the Supreme Court. Litigant uses this approach in disputes with tax service, AMC, sectoral ministries.',
        ],
        [
          'How to suspend the execution of a state-body decision before court?',
          'The tool is called interim relief (Art. 150 CAC). The administrative court may, at the plaintiff’s request, suspend the operation of the contested decision of the public-power subject until the court ruling enters into force. The motion is filed together with the claim or during proceedings. Grounds — circumstances that complicate or make impossible the execution of the ruling if the claim is satisfied. Most often used to suspend tax-debt collection, regulator-instruction execution, sale of arrested property. Litigant files interim-relief motions with the very first court submission — otherwise the business risks unrecoverable losses during proceedings.',
        ],
        [
          'Can VAT-invoice blocking be appealed?',
          'Yes. Suspension of VAT-invoice registration in the URTI is appealed first through a regional-level Tax Service commission — the applicant files explanations with documents confirming the operation’s reality, within 365 days from blocking. If the commission upholds the block, the next step is an administrative-court claim. Grounds — violation of risk criteria defined by Cabinet of Ministers Resolution No. 1165. Defense strategy is built on proving operation reality: primary documents, supply chains, counterparty analysis. Litigant handles such disputes as typical-case packages — dozens of blocks for one client are resolved with one document set.',
        ],
      ],
      ctaTitle: 'In a state dispute, time is an argument',
      ctaText:
        'Describe the decision you want to appeal and the date of service. We’ll determine viability and remaining deadline within 2 business hours.',
      ctaButton: 'Submit case for review',
      backToOverview: '← All Litigant practices',
      breadcrumbHome: 'Home',
      breadcrumbPractices: 'Practices',
      breadcrumbCurrent: 'Disputes with the state',
    },
    ro: {
      metaTitle:
        'Litigii cu statul — GR-Litigation, contestare ANAF, vamă | Litigant Kyiv',
      metaDescription:
        'Contestarea deciziilor organelor statului, apărare împotriva fiscului, litigii vamale, antitrust. GR-Litigation. Avocat Iurii Grygorenko. Kyiv · Odesa.',
      keywords:
        'contestare decizie fisc avocat, litigii fiscale Kyiv, litigii vamale avocat, contestare decizie impunere, GR litigation Ucraina',
      h1: 'Litigii cu statul: contestarea deciziilor fiscale, vamale, de concurență și a altor regulatori',
      intro: [
        'Conflictul afacerii cu statul nu este o loterie — este o procedură structurată cu termene stricte, cerințe formale și jurisprudență proprie. O eroare în formularea cererii de chemare în judecată, depășirea termenului de 10 zile, alegerea greșită a instanței — și chiar cel mai bun argument material nu va fi examinat.',
        'Litigant conduce litigii cu Serviciul Fiscal de Stat, Vama, Comitetul Antimonopol, Ministerul Finanțelor, ministerele de profil și regulatorii. Iurii Grygorenko, ca subiect de lobby, are contacte de lucru cu aparatul organelor executive — ceea ce înseamnă că în multe cazuri litigiul se rezolvă fără ciclu judiciar complet prin alinierea pozițiilor. Acolo unde compromisul este imposibil — mergem la Curtea Supremă, cu jurisprudență stabilită în categoriile impunerilor fiscale, clasificărilor vamale, contestării deciziilor antimonopol.',
      ],
      servicesTitle: 'Sfera serviciilor în litigiile cu statul',
      services: [
        [
          'Contestarea deciziilor fiscale',
          'Contestare administrativă și judiciară a deciziilor de impunere, actelor de control, deciziilor de blocare a facturilor TVA, sechestrelor pe conturi.',
        ],
        [
          'Litigii vamale',
          'Contestarea deciziilor de clasificare a mărfurilor după nomenclator, determinarea valorii vamale, confiscarea mărfurilor, amenzile vamale.',
        ],
        [
          'Proceduri antitrust',
          'Apărare în cazuri ale Comitetului Antimonopol privind abuzul de poziție dominantă, practici concertate anticoncurențiale, concentrări, discriminare în achiziții publice.',
        ],
        [
          'Litigii de licențiere',
          'Contestarea deciziilor de retragere a licențelor, autorizațiilor, certificatelor de înregistrare. Apărare la regulatorii naționali.',
        ],
        [
          'Suspendarea executării deciziilor',
          'Asigurarea acțiunii — suspendarea aplicării deciziei contestate a organului de stat până la rămânerea definitivă a hotărârii judecătorești.',
        ],
      ],
      whenTitle: 'Când clienții se adresează Litigant',
      whenLead:
        'Fiecare situație are un termen procedural strict — 10, 30 sau 90 de zile. Reacția în timp util contează mai mult decât complexitatea argumentului.',
      whenItems: [
        'Fiscul a stabilit amenzi de milioane în urma unui control',
        'Vama a reținut sau confiscat mărfuri, a refuzat eliberarea',
        'Comitetul Antimonopol a deschis procedură la sesizarea unui concurent',
        'Retragerea licenței, autorizației sau certificatului de înregistrare',
        'Blocarea facturilor TVA — suspendarea înregistrării în URTI',
      ],
      faqTitle: 'Întrebări frecvente despre litigii cu statul',
      faqLead:
        'Procedura de contestare, termenele, tactica. Departamentul juridic al companiei-client cunoaște de regulă teoria — întrebările sunt despre practică.',
      faq: [
        [
          'Cum se contestă decizia fiscului privind impunerea de taxe?',
          'Algoritmul este fixat în Codul Fiscal. Primul pas — contestarea administrativă la organul fiscal superior: plângerea se depune în 10 zile lucrătoare de la comunicarea deciziei de impunere. Această etapă este obligatorie — fără ea, instanța va refuza deschiderea procedurii. Al doilea pas — contestarea judiciară în instanța administrativă: 1080 de zile de la comunicare (în noua redacție a CAC), dar strategic în primele 30 de zile. Al treilea — apel și recurs. Litigant conduce litigii fiscale de la prima explicație la solicitarea inspectorului până la Curtea Supremă, cu accent pe construirea bazei probatorii încă de la faza controlului, înainte de emiterea deciziei.',
        ],
        [
          'Care sunt termenele de contestare a deciziilor organelor statului în Ucraina?',
          'Termenele depind de tipul deciziei. Pentru decizii de impunere și alte decizii fiscale — 10 zile lucrătoare contestare administrativă, 1080 de zile calendaristice instanță (art. 122 CAC). Pentru decizii vamale — 1 lună administrativ, 6 luni instanță. Pentru Comitetul Antimonopol — 60 de zile instanță, fără contestare administrativă obligatorie. Pentru licențe — 1 lună instanță, fără pre-judiciar obligatoriu. Termenul general al acțiunii administrative — 6 luni de la momentul în care persoana a aflat despre încălcarea drepturilor. Depășirea termenului fără motiv întemeiat este temei de refuz al deschiderii procedurii.',
        ],
        [
          'Ce este GR-Litigation?',
          'GR-Litigation combină litigiile judiciare cu statul (Litigation) cu munca cu instituțiile statului (Government Relations). Avocatul clasic lucrează doar în instanță: depune acțiunea, susține ședința, primește hotărârea. GR-Litigation desfășoară în paralel muncă la nivelul aparatului ministerului, organului regulator sau comisiei parlamentare de profil: depunerea pozițiilor, participarea la grupuri de lucru, alinierea redactării actelor sublegale. În 60% din cazuri litigiul se rezolvă prin schimbarea poziției regulatorului sau clarificarea actului normativ, fără a ajunge la Curtea Supremă. Litigant folosește această abordare în litigii cu fiscul, Comitetul Antimonopol, ministerele de profil.',
        ],
        [
          'Cum se suspendă executarea deciziei organului de stat înainte de instanță?',
          'Instrumentul se numește asigurarea acțiunii (art. 150 CAC). Instanța administrativă poate, la cererea reclamantului, suspenda aplicarea deciziei contestate a subiectului de putere publică până la rămânerea definitivă a hotărârii judecătorești. Cererea se depune împreună cu acțiunea sau în timpul procedurii. Temeiul — împrejurări care complică sau fac imposibilă executarea hotărârii dacă acțiunea este admisă. Cel mai des este folosit pentru suspendarea executării datoriei fiscale, executării prescripțiilor regulatorilor, valorificării bunurilor sechestrate. Litigant depune cereri de asigurare deja cu prima adresare la instanță — altfel afacerea riscă pierderi ireparabile pe parcursul procedurii.',
        ],
        [
          'Se poate contesta blocarea facturilor TVA?',
          'Da. Suspendarea înregistrării facturii TVA în URTI se contestă mai întâi prin comisia regională a fiscului — solicitantul depune explicații cu documente care confirmă realitatea operațiunii economice, în 365 de zile de la blocare. Dacă comisia menține blocarea, pasul următor este acțiunea în instanța administrativă. Temeiul — încălcarea criteriilor de risc definite prin Hotărârea Cabinetului de Miniștri nr. 1165. Strategia de apărare se bazează pe dovedirea realității economice a operațiunii: documente primare, lanțuri de aprovizionare, analiza contrapărților. Litigant rezolvă astfel de litigii ca pachete de cazuri-tip — zeci de blocări pentru un client se rezolvă cu un singur set de documente.',
        ],
      ],
      ctaTitle: 'Într-un litigiu cu statul, timpul este un argument',
      ctaText:
        'Descrieți decizia pe care doriți să o contestați și data comunicării. Vom determina șansele de succes și termenul rămas în 2 ore lucrătoare.',
      ctaButton: 'Trimite cazul pentru analiză',
      backToOverview: '← Toate practicile Litigant',
      breadcrumbHome: 'Acasă',
      breadcrumbPractices: 'Practici',
      breadcrumbCurrent: 'Litigii cu statul',
    },
  },

  /* ─────────────────────────────────────────────────────────────────
     LOBBYING & GR
     ───────────────────────────────────────────────────────────────── */
  'lobbying-gr': {
    ua: {
      metaTitle:
        'Лобізм та GR Україна — захист інтересів бізнесу у законодавстві | Litigant',
      metaDescription:
        'Захист інтересів бізнесу на рівні формування законодавства. Представництво перед держорганами. Молдова. Суб’єкт лобіювання Юрій Григоренко.',
      keywords:
        'лобізм Україна адвокат, GR послуги Київ, захист інтересів бізнесу законодавство, представництво перед держорганами, суб’єкт лобіювання',
      h1: 'Лобізм та GR: захист інтересів бізнесу на рівні законодавства',
      intro: [
        'З 23.02.2024 в Україні діє Закон «Про лобіювання» — перший спеціальний нормативний акт, який легалізує і регулює діяльність із впливу на формування законодавства. Тепер бізнес може офіційно представляти свої інтереси у Верховній Раді, Кабінеті Міністрів, профільних міністерствах через зареєстрованих суб’єктів лобіювання — без сірих схем і репутаційних ризиків.',
        'Юрій Григоренко — зареєстрований суб’єкт лобіювання у Реєстрі прозорості. Litigant поєднує юридичну роботу (написання законопроектів, аналіз нормативних актів) з GR-діяльністю (узгодження позицій, представництво на профільних комітетах, участь у робочих групах). Це не «зв’язки» в неформальному сенсі — це структурована робота з апаратом держави на легальних підставах, з письмовими позиціями і документованим результатом.',
      ],
      servicesTitle: 'Спектр послуг у сфері лобізму та GR',
      services: [
        [
          'Аналіз законодавчих ініціатив',
          'Моніторинг законопроектів у Верховній Раді, аналіз їх впливу на бізнес-модель клієнта, підготовка позицій до профільних комітетів.',
        ],
        [
          'Підготовка законопроектів',
          'Розробка проектів законів та підзаконних актів у партнерстві з народними депутатами або через громадські ініціативи. Юридична експертиза текстів.',
        ],
        [
          'Представництво у Верховній Раді',
          'Участь у засіданнях профільних комітетів, подача альтернативних редакцій, координація з фракціями. Робота на стадії другого читання.',
        ],
        [
          'GR з міністерствами та регуляторами',
          'Узгодження позицій з апаратом виконавчих органів, підготовка пропозицій до підзаконних актів, участь у робочих групах при ЦОВВ.',
        ],
        [
          'Молдовський напрямок',
          'Представництво НААУ у Республіці Молдова — координація для українського бізнесу, що працює у молдовській юрисдикції. Адвокатська співпраця.',
        ],
      ],
      whenTitle: 'Коли звертаються до Litigant',
      whenLead:
        'GR-проекти мають довший горизонт планування, ніж судові спори — від 3 місяців до 2 років. Зате результат — зміна правил гри, а не кейс.',
      whenItems: [
        'Нове законодавство загрожує бізнес-моделі компанії або галузі',
        'Потрібно внести зміни до регуляторних актів — постанов КМУ, наказів міністерств',
        'Захист інтересів галузі на рівні комітетів Верховної Ради',
        'Узгодження проектів нормативних актів з профільним регулятором',
        'Представництво інтересів українського бізнесу у Молдові',
      ],
      faqTitle: 'Часті питання про лобізм та GR',
      faqLead:
        'Лобізм в Україні — нова сфера після прийняття закону у 2024 році. Питання, які найчастіше ставлять клієнти перед укладенням договору про GR-супровід.',
      faq: [
        [
          'Що таке лобізм в Україні і чи це легально?',
          'Лобіювання в Україні — легально регульована діяльність з 23.02.2024, коли вступив у дію Закон «Про лобіювання». Закон визначає лобіювання як діяльність із впливу на об’єктів лобіювання (народних депутатів, членів Кабміну, керівників ЦОВВ та інших) з метою формування або зміни нормативно-правових актів. Лобіювання здійснюється через зареєстрованих у Реєстрі прозорості суб’єктів лобіювання — фізичних або юридичних осіб, які пройшли реєстрацію в НАЗК. Без реєстрації представництво інтересів за винагороду заборонено. Litigant діє через Юрія Григоренка як зареєстрованого суб’єкта лобіювання — це означає, що вся діяльність документується і контролюється у відкритому режимі.',
        ],
        [
          'Хто такий суб’єкт лобіювання?',
          'Суб’єкт лобіювання — фізична особа або юридична особа, яка зареєстрована у Реєстрі прозорості Національного агентства з питань запобігання корупції (НАЗК) і має право здійснювати лобіювання за винагороду. Реєстрація передбачає подання інформації про лобіста, його клієнтів, мету лобіювання, плановані дії. Реєстр публічний — будь-яка зацікавлена особа може перевірити, хто саме лобіює конкретний законопроект. Суб’єкт лобіювання зобов’язаний щоквартально звітувати про фактично здійснену діяльність. Порушення режиму реєстрації — адміністративна відповідальність за ст. 172-9 КУпАП. Litigant працює виключно у білому режимі — кожен GR-проект починається з оновлення інформації у Реєстрі.',
        ],
        [
          'Як захистити інтереси бізнесу при прийнятті нового закону?',
          'Робота починається на стадії законопроекту — задовго до голосування. Спочатку — моніторинг порядку денного Верховної Ради та комітетів: відстеження подання нових ініціатив у профільних сферах. Далі — швидкий аналіз тексту: вплив на бізнес-модель клієнта, ризики, можливі поправки. Потім — підготовка письмової позиції з юридичним обґрунтуванням і відправлення до профільного комітету. Паралельно — робота з народними депутатами через легальні канали (звернення, експертні консультації, участь у засіданнях комітету). Найкритичніший момент — друге читання, коли подаються поправки. Litigant веде GR-проекти від моніторингу до публікації прийнятого закону, з документованою trail-ою позицій клієнта.',
        ],
        [
          'Що дає представництво НААУ у Молдові для українського бізнесу?',
          'Юрій Григоренко є офіційним представником Національної асоціації адвокатів України у Республіці Молдова з 2023 року. Це створює юридичний міст між двома країнами для українських компаній, які мають операції, активи або контрагентів у Молдові. Представництво забезпечує: координацію з молдовськими адвокатськими бюро для судових спорів і кримінальних проваджень у Молдові, узгодження міжнародних арбітражних процесів, переклад українських судових рішень у молдовську юрисдикцію, представництво перед молдовськими держорганами, підготовку білатеральних угод. Це особливо важливо для бізнесу, що евакуйовано до Молдови після 2022 року, або для компаній, які працюють у транскордонній логістиці.',
        ],
        [
          'Відмінність між GR і лобізмом?',
          'Лобізм — підмножина GR, легально регульована окремим законом. Лобізм — це конкретно діяльність із впливу на формування нормативно-правових актів за винагороду через зареєстрованих суб’єктів. GR (Government Relations) ширше — включає всю системну роботу бізнесу з державою: моніторинг, аналіз ризиків, побудова репутаційного капіталу, участь у експертних радах, проведення публічних заходів, освітні ініціативи. Більшість GR-діяльності не вимагає реєстрації як лобізм — це звичайна комунікація громадянина чи компанії з державою. Реєстрація потрібна тільки коли діяльність здійснюється за винагороду і має на меті вплив на формування актів. Litigant пропонує повний цикл — і легальний лобізм, і ширший GR-супровід.',
        ],
      ],
      ctaTitle: 'Зміна правил гри — окремий продукт',
      ctaText:
        'GR-проекти не починаються з кризи. Вони починаються з моніторингу. Опишіть ваш сектор — ми проведемо попередній скан законодавчого порядку денного на найближчі 6 місяців.',
      ctaButton: 'Замовити GR-скан',
      backToOverview: '← Усі практики Litigant',
      breadcrumbHome: 'Головна',
      breadcrumbPractices: 'Практики',
      breadcrumbCurrent: 'Лобізм та GR',
    },
    en: {
      metaTitle:
        'Lobbying and GR Ukraine — Business Interest Protection in Legislation | Litigant',
      metaDescription:
        'Protection of business interests at the legislation-formation level. Government-body representation. Moldova. Lobbying subject Iurii Grygorenko.',
      keywords:
        'lobbying Ukraine lawyer, GR services Kyiv, business interest defense legislation, representation before state bodies, lobbying subject',
      h1: 'Lobbying and GR: Defense of Business Interests at the Legislative Level',
      intro: [
        'Since 23.02.2024 Ukraine has had the Law “On Lobbying” — the first special normative act legalizing and regulating activity to influence legislation formation. Business can now officially represent interests in the Verkhovna Rada, Cabinet of Ministers, sectoral ministries via registered lobbying subjects — without grey schemes or reputational risk.',
        'Iurii Grygorenko is a registered lobbying subject in the Transparency Register. Litigant combines legal work (drafting bills, analysis of normative acts) with GR (position alignment, committee representation, working-group participation). This is not “connections” in the informal sense — it is structured state-apparatus work on legal grounds, with written positions and documented outcome.',
      ],
      servicesTitle: 'Scope of services in lobbying and GR',
      services: [
        [
          'Analysis of legislative initiatives',
          'Monitoring of bills in the Verkhovna Rada, impact analysis on client business model, position drafting for sectoral committees.',
        ],
        [
          'Bill drafting',
          'Development of bills and bylaws in partnership with MPs or via civic initiatives. Legal expertise of texts.',
        ],
        [
          'Verkhovna Rada representation',
          'Participation in sectoral committees, alternative-wording submissions, faction coordination. Work at second-reading stage.',
        ],
        [
          'GR with ministries and regulators',
          'Position alignment with executive-body apparatus, bylaw proposals, working-group participation under central executive bodies.',
        ],
        [
          'Moldovan track',
          'NAAU representation in the Republic of Moldova — coordination for Ukrainian business operating in Moldovan jurisdiction. Bar cooperation.',
        ],
      ],
      whenTitle: 'When clients turn to Litigant',
      whenLead:
        'GR projects have a longer planning horizon than litigation — 3 months to 2 years. The reward: changing the rules of the game, not winning a case.',
      whenItems: [
        'New legislation threatens the company’s or industry’s business model',
        'Amendments to regulatory acts are needed — Cabinet resolutions, ministry orders',
        'Industry interest defense at Verkhovna Rada committee level',
        'Coordination of normative-act drafts with the sectoral regulator',
        'Representation of Ukrainian business interests in Moldova',
      ],
      faqTitle: 'Frequently asked questions about lobbying and GR',
      faqLead:
        'Lobbying in Ukraine is a new area after the 2024 law. Questions clients raise most often before signing a GR-support agreement.',
      faq: [
        [
          'What is lobbying in Ukraine and is it legal?',
          'Lobbying in Ukraine is legally regulated activity from 23.02.2024, when the Law “On Lobbying” took effect. The law defines lobbying as activity to influence lobbying objects (MPs, Cabinet members, central executive body heads) for forming or amending normative acts. Lobbying is performed via subjects registered in the NACP Transparency Register — natural or legal persons. Without registration, paid interest representation is prohibited. Litigant acts through Iurii Grygorenko as a registered lobbying subject — meaning all activity is documented and openly controlled.',
        ],
        [
          'Who is a lobbying subject?',
          'A lobbying subject is a natural or legal person registered in the Transparency Register of the National Agency on Corruption Prevention (NACP) and entitled to perform paid lobbying. Registration includes information about the lobbyist, clients, lobbying purpose, planned actions. The register is public — anyone can check who lobbies a specific bill. The lobbying subject must report quarterly on actually performed activity. Registration regime violations — administrative liability under Art. 172-9 CAO. Litigant works exclusively in the white regime — each GR project begins with register-information update.',
        ],
        [
          'How to protect business interests when a new law is being adopted?',
          'Work begins at the bill stage — long before voting. First — monitoring the Verkhovna Rada agenda and committee dockets: tracking new initiatives in relevant sectors. Then — rapid text analysis: impact on client business model, risks, possible amendments. Then — drafting a written position with legal grounds and submitting it to the sectoral committee. In parallel — work with MPs via legal channels (appeals, expert consultations, committee-meeting participation). The most critical moment — second reading, when amendments are submitted. Litigant runs GR projects from monitoring to adopted-law publication, with a documented trail of client positions.',
        ],
        [
          'What does NAAU representation in Moldova give Ukrainian business?',
          'Iurii Grygorenko has been the official NAAU representative in the Republic of Moldova since 2023. This creates a legal bridge between two countries for Ukrainian companies with operations, assets or counterparties in Moldova. The representation provides: coordination with Moldovan bar offices for litigation and criminal proceedings in Moldova, alignment of international arbitration processes, transfer of Ukrainian judgments into Moldovan jurisdiction, representation before Moldovan state bodies, drafting of bilateral agreements. Especially important for businesses evacuated to Moldova after 2022, or companies in cross-border logistics.',
        ],
        [
          'Difference between GR and lobbying?',
          'Lobbying is a subset of GR, regulated by a separate law. Lobbying specifically is paid activity to influence the formation of normative acts via registered subjects. GR (Government Relations) is broader — covering all systematic business-state work: monitoring, risk analysis, reputational-capital building, expert-council participation, public events, educational initiatives. Most GR activity does not require registration as lobbying — it is regular communication of a citizen or company with the state. Registration is needed only when activity is paid and aims at act formation. Litigant offers the full cycle — both legal lobbying and broader GR support.',
        ],
      ],
      ctaTitle: 'Changing the rules of the game is a separate product',
      ctaText:
        'GR projects do not begin with a crisis. They begin with monitoring. Describe your sector — we’ll run a preliminary legislative-agenda scan for the next 6 months.',
      ctaButton: 'Order GR scan',
      backToOverview: '← All Litigant practices',
      breadcrumbHome: 'Home',
      breadcrumbPractices: 'Practices',
      breadcrumbCurrent: 'Lobbying and GR',
    },
    ro: {
      metaTitle:
        'Lobby și GR Ucraina — protecția intereselor de afaceri în legislație | Litigant',
      metaDescription:
        'Protecția intereselor de afaceri la nivelul formării legislației. Reprezentare la organele statului. Moldova. Subiect de lobby Iurii Grygorenko.',
      keywords:
        'lobby Ucraina avocat, servicii GR Kyiv, protecție interese afaceri legislație, reprezentare la organele statului, subiect de lobby',
      h1: 'Lobby și GR: protecția intereselor de afaceri la nivel legislativ',
      intro: [
        'Din 23.02.2024 în Ucraina este în vigoare Legea „Privind activitatea de lobby” — primul act normativ special care legalizează și reglementează activitatea de influențare a formării legislației. Acum afacerea poate reprezenta oficial interesele în Rada Supremă, Cabinetul de Miniștri, ministerele de profil prin subiecți de lobby înregistrați — fără scheme gri și riscuri reputaționale.',
        'Iurii Grygorenko este subiect de lobby înregistrat în Registrul transparenței. Litigant combină activitatea juridică (redactarea proiectelor de lege, analiza actelor normative) cu activitatea GR (alinierea pozițiilor, reprezentare în comisiile de profil, participare la grupuri de lucru). Aceasta nu este „relații” în sens informal — este muncă structurată cu aparatul statului pe baze legale, cu poziții scrise și rezultat documentat.',
      ],
      servicesTitle: 'Sfera serviciilor în lobby și GR',
      services: [
        [
          'Analiza inițiativelor legislative',
          'Monitorizarea proiectelor de lege în Rada Supremă, analiza impactului asupra modelului de afaceri al clientului, pregătirea pozițiilor pentru comisiile de profil.',
        ],
        [
          'Redactarea proiectelor de lege',
          'Elaborarea proiectelor de lege și a actelor sublegale în parteneriat cu deputați sau prin inițiative civice. Expertiza juridică a textelor.',
        ],
        [
          'Reprezentare în Rada Supremă',
          'Participare la ședințele comisiilor de profil, depunerea redactărilor alternative, coordonarea cu fracțiunile. Lucrul la stadiul lecturii a doua.',
        ],
        [
          'GR cu ministere și regulatori',
          'Alinierea pozițiilor cu aparatul organelor executive, propuneri la actele sublegale, participare la grupuri de lucru la organele centrale executive.',
        ],
        [
          'Direcția Moldova',
          'Reprezentarea NAAU în Republica Moldova — coordonare pentru afaceri ucrainene care operează în jurisdicția moldovenească. Cooperare cu baroul.',
        ],
      ],
      whenTitle: 'Când clienții se adresează Litigant',
      whenLead:
        'Proiectele GR au un orizont de planificare mai lung decât litigiile — de la 3 luni la 2 ani. În schimb, rezultatul — schimbarea regulilor jocului, nu un caz.',
      whenItems: [
        'Noua legislație amenință modelul de afaceri al companiei sau al sectorului',
        'Este necesară modificarea actelor regulatorii — hotărâri ale Cabinetului, ordine ale ministerelor',
        'Protecția intereselor sectorului la nivelul comisiilor Radei Supreme',
        'Coordonarea proiectelor de acte normative cu regulatorul de profil',
        'Reprezentarea intereselor afacerilor ucrainene în Moldova',
      ],
      faqTitle: 'Întrebări frecvente despre lobby și GR',
      faqLead:
        'Lobby-ul în Ucraina este un domeniu nou după adoptarea legii în 2024. Întrebări frecvent puse de clienți înainte de încheierea contractului de asistență GR.',
      faq: [
        [
          'Ce este lobby-ul în Ucraina și este legal?',
          'Activitatea de lobby în Ucraina este o activitate reglementată legal din 23.02.2024, când a intrat în vigoare Legea „Privind activitatea de lobby”. Legea definește lobby-ul ca activitate de influențare a obiectelor de lobby (deputați, membri ai Cabinetului, conducători ai organelor centrale executive) în scopul formării sau modificării actelor normativ-juridice. Lobby-ul se realizează prin subiecți înregistrați în Registrul transparenței — persoane fizice sau juridice care au trecut înregistrarea la NAPC. Fără înregistrare, reprezentarea contra cost a intereselor este interzisă. Litigant acționează prin Iurii Grygorenko ca subiect de lobby înregistrat — ceea ce înseamnă că întreaga activitate este documentată și controlată în regim deschis.',
        ],
        [
          'Cine este subiect de lobby?',
          'Subiectul de lobby este o persoană fizică sau juridică înregistrată în Registrul transparenței al Agenției Naționale pentru Prevenirea Corupției (NAPC) și are dreptul să desfășoare activitate de lobby contra cost. Înregistrarea presupune furnizarea de informații despre lobbyist, clienții săi, scopul lobby-ului, acțiunile planificate. Registrul este public — orice persoană interesată poate verifica cine face lobby pentru un anumit proiect de lege. Subiectul de lobby este obligat să raporteze trimestrial despre activitatea efectiv desfășurată. Încălcarea regimului de înregistrare — răspundere administrativă conform art. 172-9 CCA. Litigant lucrează exclusiv în regim alb — fiecare proiect GR începe cu actualizarea informațiilor în Registru.',
        ],
        [
          'Cum se protejează interesele afacerii la adoptarea unei noi legi?',
          'Activitatea începe la stadiul proiectului de lege — cu mult înainte de votare. Mai întâi — monitorizarea agendei Radei Supreme și a comisiilor: urmărirea depunerii noilor inițiative în domeniile de profil. Apoi — analiza rapidă a textului: impactul asupra modelului de afaceri al clientului, riscuri, posibile amendamente. Apoi — pregătirea poziției scrise cu fundamentare juridică și trimiterea către comisia de profil. În paralel — lucrul cu deputații prin canale legale (sesizări, consultări de experți, participare la ședințele comisiei). Cel mai critic moment — lectura a doua, când se depun amendamentele. Litigant conduce proiecte GR de la monitorizare până la publicarea legii adoptate, cu un trail documentat al pozițiilor clientului.',
        ],
        [
          'Ce oferă reprezentarea NAAU în Moldova pentru afacerile ucrainene?',
          'Iurii Grygorenko este reprezentantul oficial al Asociației Naționale a Avocaților din Ucraina în Republica Moldova din 2023. Aceasta creează o punte juridică între cele două țări pentru companii ucrainene cu operațiuni, active sau contrapărți în Moldova. Reprezentarea oferă: coordonare cu birourile de avocați moldovenești pentru litigii și proceduri penale în Moldova, alinierea proceselor de arbitraj internațional, transferul hotărârilor judecătorești ucrainene în jurisdicția moldovenească, reprezentare la organele moldovenești, redactarea acordurilor bilaterale. Este deosebit de important pentru afaceri evacuate în Moldova după 2022 sau pentru companii care lucrează în logistica transfrontalieră.',
        ],
        [
          'Care este diferența între GR și lobby?',
          'Lobby-ul este o submulțime a GR, reglementată separat printr-o lege. Lobby-ul este concret activitatea de influențare a formării actelor normativ-juridice contra cost prin subiecți înregistrați. GR (Government Relations) este mai larg — include întreaga muncă sistemică a afacerii cu statul: monitorizare, analiza riscurilor, construirea capitalului reputațional, participare la consilii de experți, organizarea de evenimente publice, inițiative educative. Majoritatea activităților GR nu necesită înregistrare ca lobby — este comunicare obișnuită a unui cetățean sau a unei companii cu statul. Înregistrarea este necesară numai atunci când activitatea este desfășurată contra cost și are ca scop influențarea formării actelor. Litigant oferă ciclul complet — atât lobby legal, cât și asistență GR mai largă.',
        ],
      ],
      ctaTitle: 'Schimbarea regulilor jocului — un produs separat',
      ctaText:
        'Proiectele GR nu încep cu o criză. Încep cu monitorizare. Descrieți sectorul dvs. — vom realiza o scanare preliminară a agendei legislative pentru următoarele 6 luni.',
      ctaButton: 'Comandă scanare GR',
      backToOverview: '← Toate practicile Litigant',
      breadcrumbHome: 'Acasă',
      breadcrumbPractices: 'Practici',
      breadcrumbCurrent: 'Lobby și GR',
    },
  },
};
