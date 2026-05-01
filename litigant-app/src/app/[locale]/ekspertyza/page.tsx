import { useTranslations } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

import PageHero from '@/components/PageHero';
import ServiceViewTracker from '@/components/ServiceViewTracker';
import { Link } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';
import { SITE_URL, alternates } from '@/lib/seo';
import { buildBreadcrumb, buildFaqJsonLd, type FaqEntry } from '@/lib/jsonld';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'services' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    keywords: t('metaKeywords'),
    alternates: { canonical: `${SITE_URL}/${locale}/ekspertyza`, ...alternates('/ekspertyza') }
  };
}

function ServiceList({ items }: { items: string[][] }) {
  return (
    <div className="svc-list">
      {items.map(([title, text], i) => (
        <div key={i} className="svc">
          <div className="svc-dot" />
          <div>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ServicesPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale);
  const t = useTranslations('services');
  const tNav = useTranslations('nav');

  const block1Items = t.raw('block1Items') as string[][];
  const block2Items = t.raw('block2Items') as string[][];
  const block3Items = t.raw('block3Items') as string[][];
  const block4Items = t.raw('block4Items') as string[][];
  const faq = t.raw('faq') as FaqEntry[];

  const breadcrumbLd = buildBreadcrumb(locale, [
    { name: tNav('home'), href: '/' },
    { name: t('breadcrumb'), href: '/ekspertyza' }
  ]);
  const faqLd = buildFaqJsonLd(locale, 'ekspertyza', faq);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <ServiceViewTracker service="all_practices" />
      <PageHero breadcrumb={t('breadcrumb')} title={t('title')} lead={t('lead')} />

      <section id="wcc" className="sec">
        <div className="wrap">
          <div className="cg">
            <div className="tb">
              <div className="sh">
                <span className="sh-label">01</span>
                <h2>{t('block1Title')}</h2>
                <div className="sh-line"><span /><span /></div>
              </div>
              <p>{t('block1Text')}</p>
            </div>
            <ServiceList items={block1Items} />
          </div>
          <div className="practice-cta">
            <p>{t('ctaQuestion')}</p>
            <Link href="/kontakty">{t('ctaAction')}</Link>
          </div>
        </div>
      </section>

      <section id="gr" className="sec sec-off">
        <div className="wrap">
          <div className="cg">
            <ServiceList items={block2Items} />
            <div className="tb">
              <div className="sh">
                <span className="sh-label">02</span>
                <h2>{t('block2Title')}</h2>
                <div className="sh-line"><span /><span /></div>
              </div>
              <p>{t('block2Text')}</p>
              <Link href="/kontakty" className="btn btn-o" style={{ marginTop: '20px' }}>
                {t('discussCase')}
              </Link>
            </div>
          </div>
          <div className="practice-cta">
            <p>{t('ctaQuestion')}</p>
            <Link href="/kontakty">{t('ctaAction')}</Link>
          </div>
        </div>
      </section>

      <section id="bankrutstvo" className="sec">
        <div className="wrap">
          <div className="cg">
            <div className="tb">
              <div className="sh">
                <span className="sh-label">03</span>
                <h2>{t('block3Title')}</h2>
                <div className="sh-line"><span /><span /></div>
              </div>
              <p>{t('block3Text')}</p>
            </div>
            <ServiceList items={block3Items} />
          </div>
          <div className="practice-cta">
            <p>{t('ctaQuestion')}</p>
            <Link href="/kontakty">{t('ctaAction')}</Link>
          </div>
        </div>
      </section>

      <section id="lobbying" className="sec sec-off">
        <div className="wrap">
          <div className="cg">
            <ServiceList items={block4Items} />
            <div className="tb">
              <div className="sh">
                <span className="sh-label">04</span>
                <h2>{t('block4Title')}</h2>
                <div className="sh-line"><span /><span /></div>
              </div>
              <p>{t('block4Text')}</p>
              <Link href="/kontakty" className="btn btn-o" style={{ marginTop: '20px' }}>
                {t('discussProject')}
              </Link>
            </div>
          </div>
          <div className="practice-cta">
            <p>{t('ctaQuestion')}</p>
            <Link href="/kontakty">{t('ctaAction')}</Link>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sh">
            <span className="sh-label">{t('faqLabel')}</span>
            <h2>{t('faqTitle')}</h2>
            <div className="sh-line"><span /><span /></div>
          </div>
          <div className="faq-list">
            {faq.map((item, i) => (
              <details key={i} className="faq-item">
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="etym-block">
        <div className="wrap">
          <div className="etym-grid">
            <div>
              <span className="etym-label">{t('etymLabel')}</span>
              <h2 className="etym-title">{t('etymTitle')}</h2>
            </div>
            <p className="etym-prose">{t('etymProse')}</p>
          </div>
        </div>
      </section>
    </>
  );
}
