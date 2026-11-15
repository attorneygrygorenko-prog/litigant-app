import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { Link } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';
import { OG_IMAGE, SITE_URL } from '@/lib/seo';
import { SLUG_BY_LOCALE } from '@/data/practices';
import { CONSTANTA_RO as c, CONSTANTA_SLUG } from '@/data/constanta-ro';
import { buildBreadcrumb, buildFaqJsonLd, buildRegionalServiceJsonLd } from '@/lib/jsonld';

/**
 * Romanian-only regional landing for Constanța, the Romanian Danube ports and
 * Giurgiulești (Moldova). Other locales have no equivalent page: /ua/… and
 * /en/… redirect to the maritime practice in that language (keeps LangSwitch
 * working without 404s).
 */
export const revalidate = 86400;

const URL_RO = `${SITE_URL}/ro/${CONSTANTA_SLUG}`;
const MARITIME_RO = `/ekspertyza/${SLUG_BY_LOCALE.maritime.ro}`;
const ARBITRATION_RO = `/ekspertyza/${SLUG_BY_LOCALE['intl-arbitration'].ro}`;

export function generateStaticParams() {
  return [{ locale: 'ro' }];
}

export function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Metadata {
  if (locale !== 'ro') return {};
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    keywords: c.keywords,
    // Single-language page: canonical only, no hreflang set.
    alternates: { canonical: URL_RO },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: URL_RO,
      type: 'article',
      locale: 'ro_RO',
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: c.metaTitle }],
    },
  };
}

const h2 = {
  fontFamily: 'var(--serif)',
  fontSize: 30,
  fontWeight: 600,
  marginBottom: 14,
  color: 'var(--n)',
} as const;

export default function ConstantaLandingPage({ params: { locale } }: { params: { locale: Locale } }) {
  if (locale !== 'ro') {
    redirect(`/${locale}/ekspertyza/${SLUG_BY_LOCALE.maritime[locale]}`);
  }
  setRequestLocale(locale);

  const breadcrumbLd = buildBreadcrumb('ro', [
    { name: c.breadcrumbHome, href: '/' },
    { name: c.breadcrumbPractices, href: '/ekspertyza' },
    { name: c.breadcrumbCurrent, href: `/${CONSTANTA_SLUG}` },
  ]);
  const faqLd = buildFaqJsonLd('ro', CONSTANTA_SLUG, c.faq.map(([q, a]) => ({ q, a })));
  const serviceLd = buildRegionalServiceJsonLd({
    url: URL_RO,
    name: c.h1,
    description: c.metaDescription,
    serviceTypes: c.services.map(([title]) => title),
  });

  return (
    <>
      {[breadcrumbLd, faqLd, serviceLd].map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}

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

      <section className="sec">
        <div className="wrap" style={{ maxWidth: 820 }}>
          {c.intro.map((p, i) => (
            <p key={i} style={{ fontSize: 17, lineHeight: 1.8, color: 'var(--t)', marginBottom: 18 }}>
              {p}
            </p>
          ))}
        </div>
      </section>

      <section className="sec" style={{ background: 'var(--f)' }}>
        <div className="wrap" style={{ maxWidth: 920 }}>
          <h2 style={{ ...h2, marginBottom: 28 }}>{c.servicesTitle}</h2>
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

      <section className="sec">
        <div className="wrap" style={{ maxWidth: 820 }}>
          <h2 style={h2}>{c.whenTitle}</h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--m)', marginBottom: 24 }}>{c.whenLead}</p>
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
                <span style={{ color: 'var(--g)', fontWeight: 600, fontSize: 13, flexShrink: 0, marginTop: 4, minWidth: 24 }}>
                  0{i + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--m)', marginTop: 28 }}>
            Detalii pe practici: <Link href={MARITIME_RO}>drept maritim în Ucraina</Link> ·{' '}
            <Link href={ARBITRATION_RO}>arbitraj internațional și executarea sentințelor</Link>
          </p>
        </div>
      </section>

      <section className="sec" style={{ background: 'var(--f)' }}>
        <div className="wrap" style={{ maxWidth: 820 }}>
          <h2 style={h2}>{c.faqTitle}</h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--m)', marginBottom: 32 }}>{c.faqLead}</p>
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
                }}
              >
                {q}
              </summary>
              <p style={{ fontSize: 15.5, lineHeight: 1.8, color: 'var(--t)', marginTop: 12 }}>{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="sec" style={{ background: 'var(--n)', color: 'var(--w)' }}>
        <div className="wrap" style={{ maxWidth: 720, textAlign: 'center' }}>
          <h2 style={{ ...h2, fontSize: 32, marginBottom: 18, color: 'var(--w)', letterSpacing: '.04em' }}>{c.ctaTitle}</h2>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: 'rgba(255,255,255,.78)', marginBottom: 32 }}>{c.ctaText}</p>
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
            <Link href={MARITIME_RO} style={{ fontSize: 13, color: 'rgba(255,255,255,.6)', textDecoration: 'none', letterSpacing: '.04em' }}>
              {c.backToOverview}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
