import type { Locale } from '@/i18n/routing';
import type { PracticeContent } from './practices';

/**
 * International practices — maritime & shipping law, international arbitration.
 * Aimed at foreign clients (EN first). Facts only from the firm's own record:
 * law degree from Odesa National Maritime Academy, Odesa office, maritime asset
 * in the RD4U portfolio, in-house forensic expert institution, insolvency
 * practitioner status. No invented cases, numbers or rankings.
 */

export const MARITIME: Record<Locale, PracticeContent> = {
  en: {
    metaTitle: 'Maritime & Shipping Lawyer in Ukraine — Ship Arrest, Cargo Claims, Odesa · Litigant',
    metaDescription:
      'Ukrainian maritime and shipping counsel for foreign shipowners, charterers, traders and P&I clubs: vessel arrest and release, cargo and charter-party claims, port and customs disputes, war-risk losses. Offices in Odesa and Kyiv. English-speaking team.',
    keywords:
      'maritime lawyer Ukraine, shipping lawyer Odesa, ship arrest Ukraine, vessel arrest Odesa, cargo claim Ukraine, charter party dispute Ukraine, P&I correspondent Ukraine, Black Sea shipping lawyer',
    h1: 'Maritime & Shipping Law in Ukraine: Ship Arrest, Cargo Claims and Port Disputes',
    intro: [
      'Ukraine\'s Black Sea ports — Odesa, Chornomorsk and Pivdennyi — remain the gateway for grain, metals and project cargo, and they generate disputes that foreign principals cannot run from abroad: vessel arrests, cargo shortages, detentions by authorities, war-risk losses and insolvent counterparties. A ruling in a Ukrainian court or a decision by Ukrainian customs often decides the matter before any London or Geneva proceeding begins.',
      'Litigant acts as Ukrainian counsel for shipowners, charterers, commodity traders, P&I clubs and their foreign lawyers. The founder, attorney Iurii Grygorenko, holds a law degree from Odesa National Maritime Academy; the Odesa office sits inside the country\'s largest port cluster. We combine court practice, an in-house forensic expert institution for damage quantum, and insolvency-practitioner experience for shipping counterparties that go bankrupt.',
    ],
    servicesTitle: 'Maritime services',
    services: [
      ['Vessel arrest and release', 'Arrest of sea-going ships in Ukrainian ports to secure maritime claims under the Merchant Shipping Code of Ukraine and the 1952 Arrest Convention, to which Ukraine is a party. Release against bank guarantee or P&I letter of undertaking; challenging wrongful arrest and claiming counter-security.'],
      ['Cargo and charter-party claims', 'Shortage, damage and contamination of cargo, demurrage and laytime, freight and dead freight, bill-of-lading disputes. Evidence preservation in port: surveys, sampling, tally and draft-survey records — before the vessel sails.'],
      ['Port, customs and enforcement authorities', 'Detentions and seizures of vessels or cargo, customs violation cases, pressure from the Bureau of Economic Security, port-state control disputes. Defence of the ship, master and crew in administrative and criminal proceedings.'],
      ['War-risk losses and claims against Russia', 'Vessels and cargo damaged or blocked in Ukrainian ports since 2022: evidence for underwriters, national claims against the Russian Federation, filing with the international Register of Damage (RD4U) — our portfolio includes a maritime asset.'],
      ['Shipping insolvency and debt recovery', 'Claims against insolvent Ukrainian shipowners, charterers, agents and terminals; ranking of maritime liens and mortgages; sale of vessels and assets in bankruptcy, handled with insolvency-practitioner expertise.'],
      ['Crew, registration and transactions', 'Crew wage and injury claims, ship registration and mortgages in the State Ship Register of Ukraine, due diligence on Ukrainian counterparties, sanctions screening.'],
    ],
    whenTitle: 'When foreign principals instruct us',
    whenLead: 'Typical first calls. Speed matters: most maritime remedies in Ukraine depend on acting while the vessel or cargo is still within reach.',
    whenItems: [
      'Your debtor\'s vessel is calling at a Ukrainian port and you need it arrested before departure',
      'Your vessel has been arrested or detained in Odesa or Chornomorsk and must be released quickly',
      'A cargo receiver in Ukraine alleges shortage or damage and withholds payment',
      'Your P&I club or London solicitors need Ukrainian counsel on the ground',
      'A Ukrainian charterer, agent or terminal has become insolvent owing you money',
    ],
    faqTitle: 'Maritime FAQ',
    faqLead: 'Short answers to what foreign shipowners, traders and their lawyers ask first.',
    faq: [
      ['Can a vessel be arrested in Ukraine to secure a claim?', 'Yes. A sea-going ship may be arrested by a Ukrainian court to secure a maritime claim under the Merchant Shipping Code of Ukraine and the 1952 International Convention relating to the Arrest of Sea-Going Ships. The applicant must show a maritime claim and may be ordered to provide counter-security. We prepare the application, the evidence and the security package in parallel.'],
      ['How quickly can an arrest be obtained or lifted?', 'Arrest applications are handled as urgent; the practical timing depends on the court and on how complete the documents are. Release is usually achieved by providing acceptable security — a bank guarantee or a P&I club letter of undertaking — or by challenging the grounds of arrest.'],
      ['Do you work with P&I clubs and foreign law firms?', 'Yes. We act as Ukrainian counsel alongside the client\'s lead lawyers in London, Piraeus, Geneva or elsewhere, report in English and keep the Ukrainian proceedings aligned with the main arbitration or litigation strategy.'],
      ['Can you assess the size of a cargo or war-risk loss?', 'Yes. Our in-house forensic expert institution prepares damage and valuation reports admissible in Ukrainian courts, and we coordinate independent surveyors where a vessel or cargo must be inspected.'],
      ['How are fees structured?', 'Hourly, fixed per stage or capped, agreed after a short review of the documents. Urgent arrest matters are scoped and priced the same day.'],
    ],
    ctaTitle: 'A vessel or cargo in a Ukrainian port?',
    ctaText: 'Send the key documents — charter party, bills of lading, correspondence — and we will reply with a first view on remedies and timing.',
    ctaButton: 'Submit a maritime matter',
    backToOverview: '← All Litigant practices',
    breadcrumbHome: 'Home',
    breadcrumbPractices: 'Practices',
    breadcrumbCurrent: 'Maritime & Shipping',
    enUniqueSection: {
      heading: 'Why Ukrainian counsel in Odesa matters to a London or Geneva dispute',
      body: 'Most charter parties and sale contracts in the Black Sea trade point to English law and LMAA, GAFTA or FOSFA arbitration. Yet the leverage is created in Ukraine: an arrest that holds the vessel, a survey that fixes the condition of the cargo, a court order that freezes the counterparty\'s assets. We keep those local steps consistent with the main forum, so that evidence gathered in Odesa is usable in London and an award obtained abroad can be enforced back in Ukraine.',
      stats: [
        'Founder\'s law degree: Odesa National Maritime Academy',
        'Office in Odesa, inside Ukraine\'s largest port cluster',
        'In-house forensic expert institution for loss quantum',
        'Maritime asset in our RD4U war-damage portfolio',
      ],
    },
  },
  ua: {
    metaTitle: 'Морське право і судноплавство — арешт суден, вантажні спори, Одеса · Litigant',
    metaDescription:
      'Адвокати з морського права для судновласників, фрахтувальників, трейдерів і P&I клубів: арешт і звільнення суден, вантажні та чартерні спори, спори з портом і митницею, воєнні збитки. Офіси в Одесі та Києві.',
    keywords:
      'морський адвокат Одеса, арешт судна Україна, морське право адвокат, вантажні спори, чартер спір, адвокат з морського права Київ',
    h1: 'Морське право і судноплавство: арешт суден, вантажні спори та спори з портом',
    intro: [
      'Порти Одеси, Чорноморська та Південного залишаються воротами для зерна, металу й проєктних вантажів — і саме тут виникають спори, які не можна вести на відстані: арешти суден, недостачі вантажу, затримання органами влади, воєнні збитки, неплатоспроможні контрагенти.',
      'Litigant представляє судновласників, фрахтувальників, трейдерів і P&I клуби, зокрема як український юрист іноземних компаній. Засновник, адвокат Юрій Григоренко, — випускник юридичного факультету Одеської національної морської академії; офіс в Одесі — в центрі найбільшого портового кластеру країни. Поєднуємо судову практику, власну експертну установу для оцінки збитків і досвід арбітражного керуючого.',
    ],
    servicesTitle: 'Послуги з морського права',
    services: [
      ['Арешт і звільнення суден', 'Арешт морських суден в українських портах для забезпечення морських вимог за Кодексом торговельного мореплавства України та Конвенцією 1952 року про арешт морських суден. Звільнення під банківську гарантію чи гарантійний лист P&I клубу; оскарження безпідставного арешту.'],
      ['Вантажні та чартерні спори', 'Недостача, пошкодження вантажу, демередж і сталійний час, фрахт, спори за коносаментами. Фіксація доказів у порту до відходу судна.'],
      ['Порт, митниця, правоохоронні органи', 'Затримання суден і вантажів, справи про порушення митних правил, тиск БЕБ, спори з портовим контролем. Захист судна, капітана й екіпажу.'],
      ['Воєнні збитки та позови до рф', 'Пошкоджені чи заблоковані з 2022 року судна й вантажі: докази для страховиків, позови до рф, подання до Реєстру збитків RD4U — у нашому портфелі є морський актив.'],
      ['Банкрутство в судноплавстві', 'Вимоги до неплатоспроможних судновласників, фрахтувальників, агентів і терміналів; черговість морських привілеїв та іпотек; продаж суден у процедурі банкрутства.'],
      ['Екіпаж, реєстрація, угоди', 'Вимоги екіпажу, реєстрація суден та іпотек у Державному судновому реєстрі, перевірка українських контрагентів, санкційний скринінг.'],
    ],
    whenTitle: 'Коли до нас звертаються',
    whenLead: 'Типові ситуації. У морських справах вирішує швидкість: більшість засобів захисту працює, поки судно чи вантаж ще в зоні досяжності.',
    whenItems: [
      'Судно боржника заходить в український порт, і його треба арештувати до відходу',
      'Ваше судно арештоване чи затримане в Одесі або Чорноморську',
      'Вантажоодержувач заявляє недостачу чи пошкодження і не платить',
      'Іноземному P&I клубу чи юридичній фірмі потрібен юрист в Україні',
      'Український фрахтувальник, агент чи термінал став неплатоспроможним',
    ],
    faqTitle: 'Питання про морське право',
    faqLead: 'Короткі відповіді на перші питання судновласників і трейдерів.',
    faq: [
      ['Чи можна арештувати судно в Україні для забезпечення вимоги?', 'Так. Суд може арештувати морське судно для забезпечення морської вимоги за Кодексом торговельного мореплавства України та Конвенцією 1952 року. Заявник має довести морську вимогу; суд може вимагати зустрічного забезпечення. Готуємо заяву, докази й забезпечення паралельно.'],
      ['Як швидко можна арештувати або звільнити судно?', 'Заяви про арешт розглядаються як термінові; реальні строки залежать від суду і повноти документів. Звільнення — зазвичай під прийнятне забезпечення (банківська гарантія, гарантійний лист P&I клубу) або через оскарження підстав арешту.'],
      ['Чи працюєте ви з іноземними юристами та P&I клубами?', 'Так. Працюємо як український юрист разом із провідними юристами клієнта за кордоном, звітуємо англійською.'],
      ['Як формується вартість?', 'Погодинно, фіксовано за етап або з лімітом — після короткого аналізу документів. Термінові справи про арешт оцінюємо в той самий день.'],
    ],
    ctaTitle: 'Судно чи вантаж в українському порту?',
    ctaText: 'Надішліть ключові документи — чартер, коносаменти, листування — і ми повернемося з першою оцінкою засобів захисту та строків.',
    ctaButton: 'Подати морську справу',
    backToOverview: '← Усі практики Litigant',
    breadcrumbHome: 'Головна',
    breadcrumbPractices: 'Експертиза',
    breadcrumbCurrent: 'Морське право',
  },
  ro: {
    metaTitle: 'Drept maritim în Ucraina — sechestru de nave, litigii privind marfa, Odesa · Litigant',
    metaDescription:
      'Avocați în drept maritim pentru armatori, navlositori, traderi și cluburi P&I: sechestru și eliberare de nave, litigii privind marfa și charter-party, dispute cu portul și vama, daune de război. Birouri la Odesa și Kiev.',
    keywords: 'avocat drept maritim Ucraina, sechestru navă Ucraina, avocat maritim Odesa, litigii marfă Ucraina, charter party Ucraina',
    h1: 'Drept maritim în Ucraina: sechestru de nave, litigii privind marfa și dispute portuare',
    intro: [
      'Porturile ucrainene de la Marea Neagră — Odesa, Chornomorsk și Pivdennyi — rămân poarta pentru cereale, metale și mărfuri de proiect și generează litigii care nu pot fi gestionate de la distanță: sechestre de nave, lipsuri de marfă, rețineri de către autorități, daune de război, contrapărți insolvabile.',
      'Litigant acționează ca avocat ucrainean pentru armatori, navlositori, traderi și cluburi P&I. Fondatorul, avocatul Iurii Grygorenko, este absolvent al Facultății de Drept a Academiei Naționale Maritime din Odesa; biroul din Odesa se află în cel mai mare cluster portuar al țării.',
    ],
    servicesTitle: 'Servicii de drept maritim',
    services: [
      ['Sechestrul și eliberarea navelor', 'Sechestrul navelor maritime în porturile ucrainene pentru garantarea creanțelor maritime conform Codului navigației comerciale al Ucrainei și Convenției din 1952. Eliberare contra garanție bancară sau scrisoare de garanție P&I; contestarea sechestrului nejustificat.'],
      ['Litigii privind marfa și charter-party', 'Lipsuri și deteriorări de marfă, staliile și contrastaliile, navlu, litigii privind conosamentele. Conservarea probelor în port înainte de plecarea navei.'],
      ['Port, vamă și autorități', 'Rețineri de nave și mărfuri, cazuri vamale, presiunea Biroului de Securitate Economică, dispute cu controlul statului portului.'],
      ['Daune de război și acțiuni împotriva Rusiei', 'Nave și mărfuri deteriorate sau blocate din 2022: probe pentru asigurători, acțiuni naționale împotriva Federației Ruse, depunere la Registrul Daunelor (RD4U).'],
      ['Insolvență în transportul maritim', 'Creanțe față de armatori, navlositori, agenți și terminale insolvabile; rangul privilegiilor maritime și ipotecilor; vânzarea navelor în procedura de faliment.'],
    ],
    whenTitle: 'Când ne contactează clienții',
    whenLead: 'Situații tipice. În cazurile maritime viteza decide: majoritatea remediilor funcționează cât timp nava sau marfa sunt încă la îndemână.',
    whenItems: [
      'Nava debitorului intră într-un port ucrainean și trebuie sechestrată înainte de plecare',
      'Nava dvs. a fost sechestrată sau reținută la Odesa sau Chornomorsk',
      'Destinatarul mărfii invocă lipsuri sau deteriorări și refuză plata',
      'Clubul P&I sau avocații dvs. din străinătate au nevoie de un avocat în Ucraina',
    ],
    faqTitle: 'Întrebări despre dreptul maritim',
    faqLead: 'Răspunsuri scurte la primele întrebări ale armatorilor și traderilor.',
    faq: [
      ['Poate fi sechestrată o navă în Ucraina?', 'Da. Instanța ucraineană poate sechestra o navă maritimă pentru garantarea unei creanțe maritime conform Codului navigației comerciale și Convenției din 1952. Pregătim cererea, probele și garanția în paralel.'],
      ['Lucrați cu cluburi P&I și firme străine?', 'Da. Acționăm ca avocat ucrainean alături de avocații principali ai clientului și raportăm în engleză.'],
      ['Cum se stabilesc onorariile?', 'Pe oră, fix pe etapă sau plafonat — după o scurtă analiză a documentelor.'],
    ],
    ctaTitle: 'O navă sau o marfă într-un port ucrainean?',
    ctaText: 'Trimiteți documentele cheie — charter-party, conosamente, corespondență — și revenim cu o primă evaluare a remediilor și termenelor.',
    ctaButton: 'Trimite un caz maritim',
    backToOverview: '← Toate practicile Litigant',
    breadcrumbHome: 'Acasă',
    breadcrumbPractices: 'Practici',
    breadcrumbCurrent: 'Drept maritim',
  },
};

export const INTL_ARBITRATION: Record<Locale, PracticeContent> = {
  en: {
    metaTitle: 'International Arbitration Lawyer in Ukraine — Enforcement of Awards, ICAC · Litigant',
    metaDescription:
      'Ukrainian counsel in international commercial arbitration: ICAC and Maritime Arbitration Commission at the Ukrainian Chamber of Commerce, support to LCIA, ICC, SCC and LMAA proceedings, recognition and enforcement of foreign awards in Ukraine, interim measures, asset tracing.',
    keywords:
      'international arbitration lawyer Ukraine, enforcement of arbitral award Ukraine, New York Convention Ukraine, ICAC Ukraine lawyer, recognition foreign award Ukraine, asset tracing Ukraine, Ukrainian counsel arbitration',
    h1: 'International Arbitration in Ukraine: Enforcement of Awards, Interim Relief and Asset Tracing',
    intro: [
      'An award is only worth what can be collected. When the counterparty, its assets or the evidence are in Ukraine, the outcome of an arbitration in London, Paris, Stockholm or Vienna depends on what happens in Ukrainian courts: interim measures that stop assets from leaving, recognition of the award, and enforcement against property, accounts and receivables.',
      'Litigant acts as Ukrainian counsel in international commercial arbitration — both in Kyiv-seated proceedings before the ICAC and the Maritime Arbitration Commission at the Ukrainian Chamber of Commerce and Industry, and alongside foreign lead counsel in LCIA, ICC, SCC, VIAC and LMAA cases. We add what most arbitration teams lack on the ground: forensic damage quantum from our own expert institution, insolvency-practitioner tools for tracing assets, and court practice in recognition and enforcement.',
    ],
    servicesTitle: 'Arbitration services',
    services: [
      ['Recognition and enforcement of foreign awards', 'Ukraine is a party to the 1958 New York Convention. We obtain recognition of foreign arbitral awards in Ukrainian courts, resist set-aside and refusal arguments, and then enforce against the debtor\'s assets — or defend Ukrainian clients against enforcement.'],
      ['Interim measures in support of arbitration', 'Freezing of assets, accounts and shares in Ukraine in support of arbitration seated in Ukraine or abroad, before or during the proceedings, so that the award does not become a paper victory.'],
      ['Proceedings at ICAC and MAC (Kyiv)', 'Representation before the International Commercial Arbitration Court and the Maritime Arbitration Commission at the Ukrainian Chamber of Commerce and Industry: statements of claim and defence, evidence, hearings, challenges to awards.'],
      ['Ukrainian-law and evidence counsel to foreign teams', 'Expert-level input on Ukrainian law, document collection in Ukraine, witness preparation, translation management and coordination with Ukrainian state registers and courts.'],
      ['Damages quantum and forensic evidence', 'Valuation and damage reports by our in-house forensic expert institution: lost profit, cost of replacement, financial analysis of the respondent — prepared to the standard tribunals expect.'],
      ['Asset tracing and post-award recovery', 'Mapping the debtor\'s assets in Ukraine and abroad, piercing nominee structures, challenging fraudulent transfers, and using insolvency proceedings where enforcement alone stalls.'],
    ],
    whenTitle: 'When clients and their counsel instruct us',
    whenLead: 'Typical mandates. The earlier Ukrainian counsel joins, the more of the award can be collected.',
    whenItems: [
      'You hold an award against a Ukrainian company and need it recognised and enforced',
      'You are about to start arbitration and fear the respondent will move assets out of Ukraine',
      'Your foreign law firm needs Ukrainian-law input, evidence or witnesses',
      'A dispute under a Ukrainian contract is referred to the ICAC or MAC in Kyiv',
      'A Ukrainian client faces enforcement of a foreign award and needs a defence',
    ],
    faqTitle: 'International arbitration FAQ',
    faqLead: 'What foreign companies and their lawyers usually ask before instructing Ukrainian counsel.',
    faq: [
      ['Is Ukraine a party to the New York Convention?', 'Yes. Foreign arbitral awards are recognised and enforced in Ukraine on the basis of the 1958 New York Convention and the Civil Procedure Code of Ukraine. Refusal is possible only on the limited grounds the Convention allows.'],
      ['Can assets in Ukraine be frozen before or during a foreign arbitration?', 'Yes. Ukrainian courts can grant interim measures in support of international arbitration, including arbitration seated abroad. Acting early, with a clear picture of the respondent\'s assets, is what makes these measures effective.'],
      ['How long does recognition and enforcement take?', 'It depends on the court and on whether the debtor resists. Time limits apply to applications for recognition, so an award should be assessed for enforcement in Ukraine as soon as it is issued.'],
      ['Do you replace our lead counsel?', 'No. We usually work alongside the client\'s international law firm as Ukrainian counsel, in English, covering Ukrainian law, evidence, interim relief and enforcement.'],
      ['How are fees structured?', 'Hourly, fixed per stage, capped, or partly success-based for enforcement — agreed after reviewing the award or the dispute documents.'],
    ],
    ctaTitle: 'An award to enforce, or a dispute heading to arbitration?',
    ctaText: 'Send the award or a short description of the dispute and the counterparty — we will reply with a first view on enforcement prospects and interim measures in Ukraine.',
    ctaButton: 'Submit an arbitration matter',
    backToOverview: '← All Litigant practices',
    breadcrumbHome: 'Home',
    breadcrumbPractices: 'Practices',
    breadcrumbCurrent: 'International Arbitration',
    enUniqueSection: {
      heading: 'From award to collection: the Ukrainian half of an international dispute',
      body: 'International arbitration teams are strong on the merits; collection in Ukraine is a different discipline. It needs fast interim relief before assets move, a recognition application drafted to withstand public-policy objections, enforcement officers who actually act, and — when the debtor hollows itself out — insolvency tools that reach transfers made before the award. That is the work we do, with a forensic expert institution and an insolvency practitioner inside the same team.',
      stats: [
        'Ukraine: party to the 1958 New York Convention',
        'Kyiv forums: ICAC and Maritime Arbitration Commission at the UCCI',
        'In-house forensic expert institution for damages quantum',
        'Insolvency-practitioner tools for post-award asset recovery',
      ],
    },
  },
  ua: {
    metaTitle: 'Міжнародний арбітраж — визнання і виконання арбітражних рішень в Україні · Litigant',
    metaDescription:
      'Адвокати з міжнародного комерційного арбітражу: МКАС і МАК при ТПП України, супровід справ у LCIA, ICC, SCC, LMAA, визнання та виконання іноземних арбітражних рішень, забезпечувальні заходи, розшук активів.',
    keywords: 'міжнародний арбітраж адвокат, МКАС адвокат, визнання іноземного арбітражного рішення, виконання арбітражного рішення Україна, Нью-Йоркська конвенція',
    h1: 'Міжнародний арбітраж: визнання і виконання рішень, забезпечення та розшук активів',
    intro: [
      'Арбітражне рішення варте рівно стільки, скільки за ним вдається стягнути. Якщо боржник, його активи чи докази в Україні, результат арбітражу в Лондоні, Парижі, Стокгольмі чи Відні залежить від українських судів: забезпечувальних заходів, визнання рішення і виконання.',
      'Litigant веде справи в МКАС і Морській арбітражній комісії при ТПП України та працює як український юрист разом з іноземними фірмами в справах LCIA, ICC, SCC, VIAC і LMAA. Додаємо те, чого бракує більшості арбітражних команд на місці: оцінку збитків власною експертною установою, інструменти арбітражного керуючого для розшуку активів і практику визнання та виконання.',
    ],
    servicesTitle: 'Послуги з міжнародного арбітражу',
    services: [
      ['Визнання і виконання іноземних арбітражних рішень', 'Україна — учасниця Нью-Йоркської конвенції 1958 року. Отримуємо визнання іноземних рішень в українських судах і виконуємо їх за рахунок активів боржника — або захищаємо українських клієнтів від виконання.'],
      ['Забезпечувальні заходи', 'Арешт активів, рахунків і корпоративних прав в Україні на підтримку арбітражу з місцем в Україні чи за кордоном — до або під час розгляду.'],
      ['Справи в МКАС і МАК при ТПП України', 'Позовні заяви та відзиви, докази, слухання, оскарження арбітражних рішень.'],
      ['Український юрист для іноземних команд', 'Висновки щодо українського права, збирання доказів в Україні, підготовка свідків, взаємодія з реєстрами та судами.'],
      ['Оцінка збитків і експертні докази', 'Звіти власної експертної установи: упущена вигода, вартість відновлення, фінансовий аналіз відповідача.'],
      ['Розшук активів і стягнення після рішення', 'Пошук активів боржника в Україні й за кордоном, оскарження фраудаторних правочинів, банкрутство як інструмент стягнення.'],
    ],
    whenTitle: 'Коли до нас звертаються',
    whenLead: 'Типові доручення. Що раніше підключається український юрист, то більше вдається стягнути.',
    whenItems: [
      'Є арбітражне рішення проти української компанії — треба визнати й виконати',
      'Починаєте арбітраж і боїтеся, що відповідач виведе активи з України',
      'Іноземній фірмі потрібні висновки з українського права, докази чи свідки',
      'Спір за українським контрактом передано до МКАС або МАК',
      'Проти українського клієнта виконують іноземне арбітражне рішення',
    ],
    faqTitle: 'Питання про міжнародний арбітраж',
    faqLead: 'Що зазвичай питають іноземні компанії та їхні юристи.',
    faq: [
      ['Чи є Україна учасницею Нью-Йоркської конвенції?', 'Так. Іноземні арбітражні рішення визнаються й виконуються в Україні на підставі Конвенції 1958 року та Цивільного процесуального кодексу. Відмова можлива лише з обмежених підстав, передбачених Конвенцією.'],
      ['Чи можна арештувати активи в Україні до або під час іноземного арбітражу?', 'Так. Українські суди можуть застосовувати забезпечувальні заходи на підтримку міжнародного арбітражу, зокрема з місцем за кордоном.'],
      ['Чи замінюєте ви нашу основну юридичну фірму?', 'Ні. Зазвичай працюємо поруч з нею як український юрист — англійською.'],
      ['Як формується вартість?', 'Погодинно, фіксовано за етап, з лімітом або з частковим гонораром успіху при стягненні — після аналізу рішення чи документів спору.'],
    ],
    ctaTitle: 'Є рішення до виконання або спір іде в арбітраж?',
    ctaText: 'Надішліть рішення або короткий опис спору і контрагента — повернемося з першою оцінкою перспектив виконання та забезпечення в Україні.',
    ctaButton: 'Подати арбітражну справу',
    backToOverview: '← Усі практики Litigant',
    breadcrumbHome: 'Головна',
    breadcrumbPractices: 'Експертиза',
    breadcrumbCurrent: 'Міжнародний арбітраж',
  },
  ro: {
    metaTitle: 'Arbitraj internațional în Ucraina — recunoașterea și executarea sentințelor · Litigant',
    metaDescription:
      'Avocat ucrainean în arbitrajul comercial internațional: ICAC și Comisia de Arbitraj Maritim de pe lângă CCI a Ucrainei, sprijin în procedurile LCIA, ICC, SCC, recunoașterea și executarea sentințelor străine, măsuri asigurătorii, identificarea activelor.',
    keywords: 'avocat arbitraj internațional Ucraina, executare sentință arbitrală Ucraina, Convenția de la New York Ucraina, ICAC Ucraina',
    h1: 'Arbitraj internațional în Ucraina: executarea sentințelor, măsuri asigurătorii și identificarea activelor',
    intro: [
      'O sentință arbitrală valorează cât se poate recupera. Când debitorul, activele sau probele sunt în Ucraina, rezultatul unui arbitraj la Londra, Paris, Stockholm sau Viena depinde de instanțele ucrainene: măsuri asigurătorii, recunoaștere și executare.',
      'Litigant acționează în procedurile ICAC și ale Comisiei de Arbitraj Maritim de pe lângă CCI a Ucrainei și ca avocat ucrainean alături de firme străine în cazuri LCIA, ICC, SCC, VIAC și LMAA, cu o instituție proprie de expertiză pentru cuantificarea daunelor.',
    ],
    servicesTitle: 'Servicii de arbitraj',
    services: [
      ['Recunoașterea și executarea sentințelor străine', 'Ucraina este parte la Convenția de la New York din 1958. Obținem recunoașterea sentințelor străine în instanțele ucrainene și le executăm asupra activelor debitorului — sau apărăm clienții ucraineni.'],
      ['Măsuri asigurătorii', 'Sechestrul activelor, conturilor și participațiilor în Ucraina în sprijinul arbitrajului cu sediul în Ucraina sau în străinătate.'],
      ['Proceduri la ICAC și CAM (Kiev)', 'Cereri de arbitrare și întâmpinări, probe, audieri, contestarea sentințelor.'],
      ['Cuantificarea daunelor și probe de expertiză', 'Rapoarte ale instituției noastre de expertiză: profit nerealizat, cost de înlocuire, analiză financiară.'],
      ['Identificarea activelor și recuperare', 'Cartografierea activelor debitorului, contestarea transferurilor frauduloase, insolvența ca instrument de recuperare.'],
    ],
    whenTitle: 'Când ne contactează clienții',
    whenLead: 'Mandate tipice. Cu cât avocatul ucrainean intervine mai devreme, cu atât se recuperează mai mult.',
    whenItems: [
      'Dețineți o sentință împotriva unei companii ucrainene și trebuie executată',
      'Începeți un arbitraj și vă temeți că pârâtul își va muta activele din Ucraina',
      'Firma dvs. străină are nevoie de expertiză în dreptul ucrainean sau de probe',
      'Un litigiu dintr-un contract ucrainean este trimis la ICAC sau CAM',
    ],
    faqTitle: 'Întrebări despre arbitrajul internațional',
    faqLead: 'Ce întreabă de obicei companiile străine și avocații lor.',
    faq: [
      ['Este Ucraina parte la Convenția de la New York?', 'Da. Sentințele arbitrale străine sunt recunoscute și executate în Ucraina în baza Convenției din 1958 și a Codului de procedură civilă, refuzul fiind posibil doar pe motivele limitate ale Convenției.'],
      ['Pot fi sechestrate activele din Ucraina în timpul unui arbitraj străin?', 'Da. Instanțele ucrainene pot dispune măsuri asigurătorii în sprijinul arbitrajului internațional, inclusiv cu sediul în străinătate.'],
      ['Cum se stabilesc onorariile?', 'Pe oră, fix pe etapă, plafonat sau parțial în funcție de succes la executare.'],
    ],
    ctaTitle: 'O sentință de executat sau un litigiu care merge în arbitraj?',
    ctaText: 'Trimiteți sentința sau o scurtă descriere a litigiului — revenim cu o primă evaluare a perspectivelor de executare în Ucraina.',
    ctaButton: 'Trimite un caz de arbitraj',
    backToOverview: '← Toate practicile Litigant',
    breadcrumbHome: 'Acasă',
    breadcrumbPractices: 'Practici',
    breadcrumbCurrent: 'Arbitraj internațional',
  },
};
