import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { routing, type Locale } from '@/i18n/routing';
import { OG_LOCALE, SITE_URL, alternates } from '@/lib/seo';
import { buildJsonLd } from '@/lib/jsonld';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HtmlLang from '@/components/HtmlLang';
import AnalyticsScripts from '@/components/AnalyticsScripts';
import CookieBanner from '@/components/CookieBanner';
import UtmCapture from '@/components/UtmCapture';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  if (!routing.locales.includes(locale)) notFound();
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    metadataBase: new URL(SITE_URL),
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      ...alternates('/')
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: `${SITE_URL}/${locale}`,
      type: 'website',
      locale: OG_LOCALE[locale],
      alternateLocale: Object.values(OG_LOCALE).filter((l) => l !== OG_LOCALE[locale])
    },
    twitter: {
      card: 'summary',
      title: t('ogTitle'),
      description: t('ogDescription')
    },
    robots: { index: true, follow: true }
  };
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: ReactNode;
  params: { locale: Locale };
}) {
  if (!routing.locales.includes(locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();
  const jsonLd = buildJsonLd(locale);
  const requiresConsent = locale === 'en' || locale === 'ro';

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <HtmlLang locale={locale} />
      {/* JSON-LD inline — plain <script> SSR'иться надійно у Next 14 App Router.
          <Script strategy="beforeInteractive"> для static structured data
          інколи рендериться client-only, що ховає LegalService + Person
          + FAQPage від Google bot. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <UtmCapture />
      <AnalyticsScripts requiresConsent={requiresConsent} />
      <Header />
      <main>{children}</main>
      <Footer />
      {requiresConsent && <CookieBanner />}
    </NextIntlClientProvider>
  );
}
