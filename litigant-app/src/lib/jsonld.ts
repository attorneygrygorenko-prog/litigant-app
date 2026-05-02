import type { Locale } from '@/i18n/routing';
import { SITE_URL } from './seo';
import { PERSON_SAME_AS } from '@/data/social';

const FAQ_BY_LOCALE: Record<Locale, { q: string; a: string }[]> = {
  ua: [
    {
      q: 'Які практики охоплює Litigant Law Office?',
      a: 'Litigant спеціалізується на White-Collar Crime, антирейдерській інженерії, корпоративних конфліктах, банкрутстві та реструктуризації, спорах з державою та GR-Litigation.'
    },
    {
      q: 'Як подати заявку на розгляд кейсу?',
      a: 'Заповніть форму пре-аналізу на сайті. Вкажіть посаду (C-level / власник), компанію, галузь, суть виклику та орієнтовну вартість активу під ризиком. Ми повідомимо про рішення протягом 24 годин.'
    },
    {
      q: 'В яких містах працює Litigant?',
      a: 'Головний офіс у Києві (вул. Антоновича, 23). Додатковий офіс в Одесі (вул. Бугаївська, 21). Міжнародне представництво у Кишиневі (Молдова) через статус представника НААУ.'
    },
    {
      q: 'Що таке White-Collar Crime та як Litigant може допомогти?',
      a: 'White-Collar Crime — кримінальні провадження економічного характеру: ухилення від сплати податків, шахрайство, зловживання владою, контрабанда. Litigant забезпечує захист власників бізнесу та менеджменту на всіх стадіях — від досудового розслідування до апеляції.'
    }
  ],
  en: [
    {
      q: 'What practices does Litigant Law Office cover?',
      a: 'Litigant specialises in White-Collar Crime, anti-raiding engineering, corporate conflicts, bankruptcy and restructuring, disputes with the state and GR-Litigation.'
    },
    {
      q: 'How to submit a case for review?',
      a: 'Complete the pre-analysis form on the site. Indicate position (C-level / owner), company, industry, nature of the challenge and estimated value of the asset at risk. We will respond within 24 hours.'
    },
    {
      q: 'Where does Litigant operate?',
      a: 'Main office in Kyiv (23 Antonovycha St). Additional office in Odesa (21 Buhaiivska St). International representation in Chișinău (Moldova) via UBA representative status.'
    },
    {
      q: 'What is White-Collar Crime and how can Litigant help?',
      a: 'White-Collar Crime — criminal proceedings of an economic nature: tax evasion, fraud, abuse of power, smuggling. Litigant provides defence for business owners and management at all stages — from pre-trial investigation to appeal.'
    }
  ],
  ro: [
    {
      q: 'Ce practici acoperă Litigant Law Office?',
      a: 'Litigant este specializat în White-Collar Crime, inginerie anti-raider, conflicte corporative, faliment și restructurare, litigii cu statul și GR-Litigation.'
    },
    {
      q: 'Cum se depune o cerere de analiză a cazului?',
      a: 'Completați formularul de pre-analiză pe site. Indicați funcția (C-level / proprietar), compania, domeniul de activitate, esența provocării și valoarea estimată a activului în risc. Vom răspunde în 24 de ore.'
    },
    {
      q: 'În ce orașe activează Litigant?',
      a: 'Sediul principal — Kyiv (str. Antonovycha, 23). Birou suplimentar în Odesa (str. Buhaiivska, 21). Reprezentare internațională în Chișinău (Moldova) prin statutul de reprezentant UNBA.'
    },
    {
      q: 'Litigant are reprezentanță în Moldova?',
      a: 'Da. Iurii Grygorenko este Reprezentant oficial al UNBA (Asociația Națională a Avocaților din Ucraina) în Republica Moldova, cu sediul la Chișinău. Aceasta asigură coordonarea juridică internațională și colaborarea cu consilieri locali.'
    }
  ]
};

const HTML_LANG_FOR_FAQ: Record<Locale, string> = { ua: 'uk', en: 'en', ro: 'ro' };

export function buildJsonLd(locale: Locale) {
  const faqs = FAQ_BY_LOCALE[locale];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LegalService',
        '@id': `${SITE_URL}/#firm`,
        name: 'Litigant Law Office',
        alternateName: 'АБ ЛІТІҐЕНТ',
        url: SITE_URL,
        logo: `${SITE_URL}/images/logo.png`,
        description:
          locale === 'ro'
            ? 'Birou de avocați specializat în White-Collar Crime, conflicte corporative, faliment și GR-Litigation. Chișinău, Kyiv, Odesa.'
            : locale === 'en'
            ? 'Law firm specialised in White-Collar Crime, corporate conflicts, bankruptcy and GR-Litigation. Kyiv, Odesa, Chișinău.'
            : 'Адвокатське бюро зі спеціалізацією на White-Collar Crime, корпоративних конфліктах, банкрутстві та GR-Litigation. Київ, Одеса, Кишинів.',
        telephone: '+380445010207',
        email: 'advocatcompany@gmail.com',
        areaServed: ['UA', 'MD'],
        knowsLanguage: ['uk', 'en', 'ro'],
        priceRange: '$$$$',
        address: [
          {
            '@type': 'PostalAddress',
            addressLocality: 'Kyiv',
            postalCode: '01004',
            streetAddress: 'вул. Антоновича, 23, літ. В',
            addressCountry: 'UA'
          },
          {
            '@type': 'PostalAddress',
            addressLocality: 'Odesa',
            postalCode: '65005',
            streetAddress: 'вул. Бугаївська, 21, оф. 701',
            addressCountry: 'UA'
          }
        ],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+380445010207',
            contactType: 'customer service',
            areaServed: 'UA',
            availableLanguage: ['uk', 'en', 'ro'],
            contactOption: 'TollFree',
            // Kyiv office line
            description: 'Київ — головний офіс'
          },
          {
            '@type': 'ContactPoint',
            telephone: '+380932232995',
            contactType: 'customer service',
            areaServed: 'UA',
            availableLanguage: ['uk', 'en'],
            description: 'Одеса — додатковий офіс'
          }
        ],
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '18:00'
          }
        ],
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 50.4332,
          longitude: 30.5168
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Practices',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'White-Collar Crime' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Anti-Raiding Engineering' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bankruptcy & Restructuring' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'GR & Lobbying' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Disputes with the State' } }
          ]
        },
        knowsAbout: [
          'White-Collar Crime Ukraine',
          'Bankruptcy Law Ukraine',
          'Corporate Conflicts',
          'Government Relations Ukraine',
          'Anti-Raiding',
          'Debt Restructuring'
        ],
        sameAs: PERSON_SAME_AS
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#founder`,
        name: 'Юрій Григоренко',
        alternateName: 'Iurii Grygorenko',
        jobTitle: 'Managing Partner, Attorney, Arbitration Manager',
        worksFor: { '@id': `${SITE_URL}/#firm` },
        url: SITE_URL,
        sameAs: PERSON_SAME_AS,
        knowsAbout: [
          'White-Collar Crime Ukraine',
          'Bankruptcy Law Ukraine',
          'Corporate Conflicts',
          'Government Relations Ukraine',
          'Anti-Raiding',
          'Debt Restructuring'
        ],
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Bar certificate',
          identifier: '№ 002787',
          recognizedBy: { '@type': 'Organization', name: 'Bar Council of Odesa Region' },
          dateCreated: '2016-03-16'
        },
        memberOf: {
          '@type': 'Organization',
          name: 'Ukrainian National Bar Association (UBA)'
        }
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/${locale}#faq`,
        inLanguage: HTML_LANG_FOR_FAQ[locale],
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a }
        }))
      }
    ]
  };
}

export type BreadcrumbItem = { name: string; href: string };

export function buildBreadcrumb(locale: Locale, items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.href.startsWith('http') ? it.href : `${SITE_URL}/${locale}${it.href === '/' ? '' : it.href}`
    }))
  };
}

export function buildWebsiteSearch(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'Litigant Law Office',
    inLanguage: HTML_LANG_FOR_FAQ[locale],
    publisher: { '@id': `${SITE_URL}/#firm` },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/${locale}/analityka?q={search_term_string}` },
      'query-input': 'required name=search_term_string'
    }
  };
}

export type ArticleEntry = {
  url: string;
  title: string;
  description: string;
  image: string | null;
  datePublished?: string;
  publisher: string;
};

export function buildArticleList(items: ArticleEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Article',
        url: a.url,
        headline: a.title,
        description: a.description || undefined,
        image: a.image || undefined,
        datePublished: a.datePublished || undefined,
        author: {
          '@type': 'Person',
          '@id': `${SITE_URL}/#founder`,
          name: 'Юрій Григоренко',
          alternateName: 'Iurii Grygorenko'
        },
        publisher: { '@type': 'Organization', name: a.publisher }
      }
    }))
  };
}

export type FaqEntry = { q: string; a: string };

export function buildFaqJsonLd(locale: Locale, scopeId: string, items: FaqEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/${locale}/${scopeId}#faq`,
    inLanguage: HTML_LANG_FOR_FAQ[locale],
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a }
    }))
  };
}
