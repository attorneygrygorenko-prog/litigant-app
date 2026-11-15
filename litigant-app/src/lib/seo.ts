import type { Locale } from '@/i18n/routing';

// Production canonical = www.litigant.legal (apex `litigant.legal` 307→www).
// Якщо env-var помилково виставлений без www, нормалізуємо тут — щоб
// canonical/hreflang/og:url не вказували на не-canonical apex.
const RAW_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.litigant.legal';
export const SITE_URL = RAW_SITE_URL.replace(
  '://litigant.legal',
  '://www.litigant.legal'
);

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

/**
 * hreflang map for a page whose URL differs per locale.
 * The single Romanian version is declared three times — `ro` (any Romanian
 * reader), `ro-MD` (Moldova) and `ro-RO` (Romania, incl. Constanța) — all
 * pointing at the same /ro URL, so Google can surface it in both countries.
 * `x-default` stays on EN for foreign visitors.
 */
export function languagesFor(paths: Record<Locale, string>) {
  return {
    uk: paths.ua,
    en: paths.en,
    ro: paths.ro,
    'ro-MD': paths.ro,
    'ro-RO': paths.ro,
    'x-default': paths.en
  } as Record<string, string>;
}

export function alternates(pathname: string = '/') {
  const languages = languagesFor({
    ua: pathFor('ua', pathname),
    en: pathFor('en', pathname),
    ro: pathFor('ro', pathname)
  });
  return { languages };
}

/** Versioned OG image URL — bump `v` whenever the artwork changes so
 *  Telegram/Facebook/LinkedIn (which cache by URL) fetch the new image. */
export const OG_IMAGE = `${SITE_URL}/api/og-image?v=2026-11`;
