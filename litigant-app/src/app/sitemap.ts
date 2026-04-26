import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { SITE_URL } from '@/lib/seo';

const PATHS = ['', '/pro-nas', '/ekspertyza', '/analityka', '/checklist', '/kontakty'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routing.locales.flatMap((locale) =>
    PATHS.map((path) => {
      const url = `${SITE_URL}/${locale}${path}`;
      const languages: Record<string, string> = {
        uk: `${SITE_URL}/ua${path}`,
        en: `${SITE_URL}/en${path}`,
        ro: `${SITE_URL}/ro${path}`,
        'x-default': `${SITE_URL}/ua${path}`
      };
      return {
        url,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: path === '' ? 1.0 : 0.7,
        alternates: { languages }
      };
    })
  );
}
