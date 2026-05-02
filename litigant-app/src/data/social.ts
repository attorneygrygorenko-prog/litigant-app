// Single source of truth for social / messenger URLs used across
// Footer, /kontakty messengers, CallbackWidgetPanel and JSON-LD sameAs.
export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/iurii.g.attorney',
  instagram: 'https://www.instagram.com/iurii_litigant/',
  threads: 'https://www.threads.com/@iurii_litigant',
  whatsapp: 'https://wa.me/380932232995',
  telegram: 'https://t.me/+380932232995',
  linkedin: 'https://www.linkedin.com/company/litigant-law-office'
} as const;

// Person sameAs feeds Schema.org Person.sameAs — third-party authority
// signals for Google/AI-search E-E-A-T.
export const PERSON_SAME_AS = [
  SOCIAL_LINKS.facebook,
  SOCIAL_LINKS.instagram,
  SOCIAL_LINKS.threads,
  SOCIAL_LINKS.linkedin,
  'https://blog.liga.net/user/yuhryhorenko',
  'https://www.hsa.org.ua/lectors/grygorenko-yurij-sergijovych'
] as const;
