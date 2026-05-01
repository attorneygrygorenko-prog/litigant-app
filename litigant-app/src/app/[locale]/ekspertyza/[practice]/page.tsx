import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

import { Link } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';
import { SITE_URL } from '@/lib/seo';
import {
  PRACTICE_BY_SLUG,
  PRACTICE_KEYS,
  PRACTICES,
  SLUG_BY_LOCALE,
} from '@/data/practices';
import { buildBreadcrumb, buildFaqJsonLd } from '@/lib/jsonld';

export const revalidate = 86400;

interface RouteParams {
  locale: Locale;
  practice: string;
}

/**
 * Pre-render усі (locale × practice-slug) комбінації — Next.js будує їх
 * статично при `next build`. 12 routes = 4 practices × 3 locales.
 */
export function generateStaticParams() {
  const params: { locale: Locale; practice: string }[] = [];
  for (const locale of ['ua', 'en', 'ro'] as const) {
    for (const key of PRACTICE_KEYS) {
      params.push({ locale, practice: SLUG_BY_LOCALE[key][locale] });
    }
  }
  return params;
}

export async function generateMetadata({
  params: { locale, practice },
}: {
  params: RouteParams;
}): Promise<Metadata> {
  const key = PRACTICE_BY_SLUG[practice];
  if (!key) return {};
  const content = PRACTICES[key][locale];
  const slug = SLUG_BY_LOCALE[key];

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    keywords: content.keywords,
    alternates: {
      canonical: `${SITE_URL}/${locale}/ekspertyza/${slug[locale]}`,
      languages: {
        uk: `${SITE_URL}/ua/ekspertyza/${slug.ua}`,
        en: `${SITE_URL}/en/ekspertyza/${slug.en}`,
        ro: `${SITE_URL}/ro/ekspertyza/${slug.ro}`,
        'x-default': `${SITE_URL}/ua/ekspertyza/${slug.ua}`,
      },
    },
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: `${SITE_URL}/${locale}/ekspertyza/${slug[locale]}`,
      type: 'article',
    },
  };
}

export default function PracticeLandingPage({
  params: { locale, practice },
}: {
  params: RouteParams;
}) {
  setRequestLocale(locale);

  const key = PRACTICE_BY_SLUG[practice];
  if (!key) notFound();

  // Redirect to canonical locale-specific slug if user hit wrong-locale slug
  // (e.g., /en/ekspertyza/bankrutstvo → /en/ekspertyza/bankruptcy). Preserves
  // any old backlinks while collapsing duplicate-content into one canonical URL.
  const expectedSlug = SLUG_BY_LOCALE[key][locale];
  if (expectedSlug !== practice) {
    redirect(`/${locale}/ekspertyza/${expectedSlug}`);
  }

  const c = PRACTICES[key][locale];
  const slug = expectedSlug;

  const breadcrumbLd = buildBreadcrumb(locale, [
    { name: c.breadcrumbHome, href: '/' },
    { name: c.breadcrumbPractices, href: '/ekspertyza' },
    { name: c.breadcrumbCurrent, href: `/ekspertyza/${slug}` },
  ]);
  const faqLd = buildFaqJsonLd(
    locale,
    `ekspertyza/${slug}`,
    c.faq.map(([q, a]) => ({ q, a }))
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      {/* Hero */}
      <section className="ph">
        <div className="wrap">
          <div className="bc">
            <Link href="/">{c.breadcrumbHome}</Link>
            <span>/</span>
            <Link href="/ekspertyza">{c.breadcrumbPractices}</Link>
            <span>/</span>
            <span>{c.breadcrumbCurrent}</span>
          </div>
          <h1>{c.h1}</h1>
        </div>
      </section>

      {/* Intro */}
      <section className="sec">
        <div className="wrap" style={{ maxWidth: 820 }}>
          {c.intro.map((p, i) => (
            <p
              key={i}
              style={{
                fontSize: 17,
                lineHeight: 1.8,
                color: 'var(--t)',
                marginBottom: 18,
              }}
            >
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Services list */}
      <section className="sec" style={{ background: 'var(--f)' }}>
        <div className="wrap" style={{ maxWidth: 920 }}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 30, fontWeight: 600, marginBottom: 28, color: 'var(--n)' }}>
            {c.servicesTitle}
          </h2>
          <div className="svc-list">
            {c.services.map(([title, text], i) => (
              <div key={i} className="svc">
                <div className="svc-dot" />
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When clients turn to us */}
      <section className="sec">
        <div className="wrap" style={{ maxWidth: 820 }}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 30, fontWeight: 600, marginBottom: 14, color: 'var(--n)' }}>
            {c.whenTitle}
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--m)', marginBottom: 24 }}>
            {c.whenLead}
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {c.whenItems.map((item, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  gap: 14,
                  alignItems: 'flex-start',
                  padding: '14px 0',
                  borderBottom: '1px solid var(--b)',
                  fontSize: 16,
                  lineHeight: 1.55,
                  color: 'var(--t)',
                }}
              >
                <span
                  style={{
                    color: 'var(--g)',
                    fontWeight: 600,
                    fontSize: 13,
                    flexShrink: 0,
                    marginTop: 4,
                    minWidth: 24,
                  }}
                >
                  0{i + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="sec" style={{ background: 'var(--f)' }}>
        <div className="wrap" style={{ maxWidth: 820 }}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 30, fontWeight: 600, marginBottom: 14, color: 'var(--n)' }}>
            {c.faqTitle}
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--m)', marginBottom: 32 }}>
            {c.faqLead}
          </p>
          <div>
            {c.faq.map(([q, a], i) => (
              <details
                key={i}
                style={{
                  borderTop: i === 0 ? '1px solid var(--b)' : 'none',
                  borderBottom: '1px solid var(--b)',
                  padding: '18px 0',
                }}
              >
                <summary
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize: 18,
                    fontWeight: 600,
                    color: 'var(--n)',
                    cursor: 'pointer',
                    listStyle: 'none',
                    paddingRight: 24,
                    position: 'relative',
                  }}
                >
                  {q}
                </summary>
                <p
                  style={{
                    fontSize: 15.5,
                    lineHeight: 1.8,
                    color: 'var(--t)',
                    marginTop: 12,
                  }}
                >
                  {a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sec" style={{ background: 'var(--n)', color: 'var(--w)' }}>
        <div className="wrap" style={{ maxWidth: 720, textAlign: 'center' }}>
          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 32,
              fontWeight: 600,
              marginBottom: 18,
              color: 'var(--w)',
              letterSpacing: '.04em',
            }}
          >
            {c.ctaTitle}
          </h2>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.75,
              color: 'rgba(255,255,255,.78)',
              marginBottom: 32,
            }}
          >
            {c.ctaText}
          </p>
          <Link
            href="/kontakty"
            style={{
              display: 'inline-block',
              fontFamily: 'var(--sans)',
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: '.12em',
              textTransform: 'uppercase',
              padding: '14px 32px',
              border: '1px solid var(--g1)',
              color: 'var(--g1)',
              textDecoration: 'none',
            }}
          >
            {c.ctaButton}
          </Link>
          <div style={{ marginTop: 32 }}>
            <Link
              href="/ekspertyza"
              style={{
                fontSize: 13,
                color: 'rgba(255,255,255,.6)',
                textDecoration: 'none',
                letterSpacing: '.04em',
              }}
            >
              {c.backToOverview}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
