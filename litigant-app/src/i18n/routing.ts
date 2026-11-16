import { defineRouting } from 'next-intl/routing';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['ua', 'en', 'ro'] as const,
  defaultLocale: 'ua',
  localePrefix: 'always',
  // Off: the middleware's automatic `Link` hreflang header used the URL
  // prefix as the language code (`hreflang="ua"` — invalid, Ukrainian is
  // `uk`) and pointed x-default at `/` while the HTML says EN. hreflang is
  // declared once, correctly, in HTML <head> and sitemap (src/lib/seo.ts).
  alternateLinks: false
});

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation(routing);
