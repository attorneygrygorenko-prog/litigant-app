import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { SITE_URL, languagesFor } from '@/lib/seo';
import { PRACTICE_KEYS, SLUG_BY_LOCALE } from '@/data/practices';
import { CONSTANTA_SLUG } from '@/data/constanta-ro';

const PATHS = ['', '/pro-nas', '/ekspertyza', '/analityka', '/checklist', '/kontakty'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Standard pages (locale × path) — same slug across locales
  const standard = routing.locales.flatMap((locale) =>
    PATHS.map((path) => {
      const url = `${SITE_URL}/${locale}${path}`;
      const languages = languagesFor({
        ua: `${SITE_URL}/ua${path}`,
        en: `${SITE_URL}/en${path}`,
        ro: `${SITE_URL}/ro${path}`
      });
      return {
        url,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: path === '' ? 1.0 : 0.7,
        alternates: { languages }
      };
    })
  );

  // Practice landings — locale-specific slugs (4 practices × 3 locales = 12 URLs)
  const practiceLandings = routing.locales.flatMap((locale) =>
    PRACTICE_KEYS.map((key) => {
      const slug = SLUG_BY_LOCALE[key];
      const url = `${SITE_URL}/${locale}/ekspertyza/${slug[locale]}`;
      const languages = languagesFor({
        ua: `${SITE_URL}/ua/ekspertyza/${slug.ua}`,
        en: `${SITE_URL}/en/ekspertyza/${slug.en}`,
        ro: `${SITE_URL}/ro/ekspertyza/${slug.ro}`
      });
      return {
        url,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
        alternates: { languages }
      };
    })
  );

  // Romanian-only regional landing (Constanța / Danube maritime corridor).
  // No other-language equivalent, so no hreflang — canonical only.
  const regional = [
    {
      url: `${SITE_URL}/ro/${CONSTANTA_SLUG}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8
    }
  ];

  return [...standard, ...practiceLandings, ...regional];
}
