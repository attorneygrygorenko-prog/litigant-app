import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

import PageHero from '@/components/PageHero';
import type { Locale } from '@/i18n/routing';
import { SITE_URL, alternates } from '@/lib/seo';
import { buildBreadcrumb, buildFaqJsonLd, type FaqEntry } from '@/lib/jsonld';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'about' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    keywords: t('metaKeywords'),
    alternates: { canonical: `${SITE_URL}/${locale}/pro-nas`, ...alternates('/pro-nas') }
  };
}

export default function AboutPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale);
  const t = useTranslations('about');
  const tNav = useTranslations('nav');

  const noItems = [t('no1'), t('no2'), t('no3'), t('no4'), t('no5')];
  const faq = t.raw('faq') as FaqEntry[];

  const breadcrumbLd = buildBreadcrumb(locale, [
    { name: tNav('home'), href: '/' },
    { name: t('breadcrumb'), href: '/pro-nas' }
  ]);
  const faqLd = buildFaqJsonLd(locale, 'pro-nas', faq);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <PageHero breadcrumb={t('breadcrumb')} title={t('title')} lead={t('lead')} subtitle={t('subtitle')} />

      <section className="sec">
        <div className="wrap">
          <div className="about-g">
            <div>
              <div className="about-photos">
                <Image
                  className="photo-main"
                  src="/images/photo_1.jpg"
                  alt={`${t('title')} — Litigant Law Office`}
                  width={600}
                  height={800}
                  priority
                />
              </div>
              <div className="about-badge">
                <div className="ab"><div className="ab-n">9+</div><div className="ab-l">{t('badgeYears')}</div></div>
                <div className="ab"><div className="ab-n">НААУ</div><div className="ab-l">{t('badgeCommittee')}</div></div>
                <div className="ab"><div className="ab-n">2016</div><div className="ab-l">{t('badgeLicence')}</div></div>
              </div>
            </div>

            <div className="about-info">
              <span className="role">{t('role')}</span>
              <h2>{t('title')}</h2>
              <p>{t('para1')}</p>
              <p>{t('para2')}</p>
              <p>{t('para3')}</p>

              <div className="cred-grid">
                <div className="cred"><strong>{t('cred1Title')}</strong><p>{t('cred1Text')}</p></div>
                <div className="cred"><strong>{t('cred2Title')}</strong><p>{t('cred2Text')}</p></div>
                <div className="cred"><strong>{t('cred3Title')}</strong><p>{t('cred3Text')}</p></div>
                <div className="cred" style={{ gridColumn: 'span 2' }}>
                  <strong>{t('cred4Title')}</strong>
                  <p>{t('cred4Text')}</p>
                </div>
              </div>

              <div className="tag-row">
                <span className="tag">White-Collar Crime</span>
                <span className="tag">{t('tagCorporate')}</span>
                <span className="tag">{t('tagBankruptcy')}</span>
                <span className="tag">GR · Lobbying</span>
                <span className="tag">{t('tagMaritime')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec sec-off">
        <div className="wrap">
          <div className="sh">
            <span className="sh-label">{t('approachLabel')}</span>
            <h2>{t('approachTitle')}</h2>
            <div className="sh-line"><span /><span /></div>
          </div>

          <div className="cg w">
            <div className="tb">
              <h3>{t('approachH3')}</h3>
              <p>{t('approachP1')}</p>
              <p>{t('approachP2')}</p>
            </div>
            <div>
              <div className="hl">
                <h3>{t('noTitle')}</h3>
                <ul>
                  {noItems.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="info-box" style={{ marginTop: '1px' }}>
                <span className="lbl">{t('regLabel')}</span>
                <p>{t('regText')}</p>
              </div>
            </div>
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
    </>
  );
}
