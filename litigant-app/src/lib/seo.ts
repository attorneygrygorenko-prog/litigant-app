import type { Locale } from '@/i18n/routing';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.litigant.legal';

export const OG_LOCALE: Record<Locale, string> = {
  ua: 'uk_UA',
  en: 'en_GB',
  ro: 'ro_MD'
};

export const HTML_LANG: Record<Locale, string> = {
  ua: 'uk',
  en: 'en',
  ro: 'ro'
};

export function pathFor(locale: Locale, pathname: string = '/') {
  const clean = pathname === '/' ? '' : pathname;
  return `${SITE_URL}/${locale}${clean}`;
}

export function alternates(pathname: string = '/') {
  const languages: Record<string, string> = {
    uk: pathFor('ua', pathname),
    en: pathFor('en', pathname),
    ro: pathFor('ro', pathname),
    'x-default': pathFor('ua', pathname)
  };
  return { languages };
}
