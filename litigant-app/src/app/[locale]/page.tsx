import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';
import { buildWebsiteSearch } from '@/lib/jsonld';
import TrackedLink from '@/components/TrackedLink';

export default function HomePage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale);
  const t = useTranslations('home');
  const websiteLd = buildWebsiteSearch(locale);

  const practices = [
    { n: '01', title: t('prac1Title'), text: t('prac1Text') },
    { n: '02', title: t('prac2Title'), text: t('prac2Text') },
    { n: '03', title: t('prac3Title'), text: t('prac3Text') },
    { n: '04', title: t('prac4Title'), text: t('prac4Text') }
  ];

  const why = [
    { n: '01', title: t('why1Title'), text: t('why1Text') },
    { n: '02', title: t('why2Title'), text: t('why2Text') },
    { n: '03', title: t('why3Title'), text: t('why3Text') },
    { n: '04', title: t('why4Title'), text: t('why4Text') }
  ];

  const proc = [
    { n: '01', title: t('proc1Title'), text: t('proc1Text') },
    { n: '02', title: t('proc2Title'), text: t('proc2Text') },
    { n: '03', title: t('proc3Title'), text: t('proc3Text') },
    { n: '04', title: t('proc4Title'), text: t('proc4Text') }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
      />
      <section className="hero">
        <div className="wrap hero-g">
          <div>
            <span className="hero-tag">{t('heroTag')}</span>
            <h1>
              {t('heroTitle')}
              <span className="sub">{t('heroSubtitle')}</span>
            </h1>
            <div className="hero-line"><span /><span /></div>
            <p className="hero-text">{t('heroText')}</p>
            <p className="hero-etym">{t('heroEtymology')}</p>
            <div className="hero-cta">
              <Link href="/kontakty" className="btn btn-g">{t('ctaSubmit')}</Link>
              <Link href="/ekspertyza" className="btn btn-w">{t('ctaVectors')}</Link>
            </div>
            <div className="hero-stats">
              <div className="hs"><div className="hs-n">9+</div><div className="hs-l">{t('stat1Label')}</div></div>
              <div className="hs"><div className="hs-n">3</div><div className="hs-l">{t('stat2Label')}</div></div>
              <div className="hs"><div className="hs-n">2+</div><div className="hs-l">{t('stat3Label')}</div></div>
            </div>
          </div>
          <div className="vec-block">
            <div className="vec">
              <span className="vec-num">01 — {t('vec1Label')}</span>
              <h3>{t('vec1Title')}</h3>
              <p>{t('vec1Text')}</p>
            </div>
            <div className="vec">
              <span className="vec-num">02 — {t('vec2Label')}</span>
              <h3>{t('vec2Title')}</h3>
              <p>{t('vec2Text')}</p>
            </div>
            <div className="vec">
              <span className="vec-num">03 — {t('vec3Label')}</span>
              <h3>{t('vec3Title')}</h3>
              <p>{t('vec3Text')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="manifesto">
        <div className="wrap">
          <blockquote>{t('manifesto')}</blockquote>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sh">
            <span className="sh-label">{t('practicesLabel')}</span>
            <h2>{t('practicesTitle')}</h2>
            <div className="sh-line"><span /><span /></div>
            <p>{t('practicesIntro')}</p>
          </div>
          <div className="prac-grid">
            {practices.map((p) => (
              <Link key={p.n} href="/ekspertyza" className="prac">
                <span className="prac-n">{p.n}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <span className="prac-more">
                  {t('learnMore')} <span className="prac-arr">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec-dark">
        <div className="wrap">
          <div className="sh">
            <span className="sh-label">{t('principlesLabel')}</span>
            <h2>{t('principlesTitle')}</h2>
          </div>
          <div className="why-g">
            {why.map((w) => (
              <div key={w.n} className="why">
                <span className="why-n">{w.n}</span>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec-off">
        <div className="wrap">
          <div className="sh">
            <span className="sh-label">{t('processLabel')}</span>
            <h2>{t('processTitle')}</h2>
          </div>
          <div className="proc-g">
            {proc.map((p) => (
              <div key={p.n} className="proc">
                <span className="proc-n">{p.n}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="wrap">
        <div className="cta-band">
          <div>
            <h2>{t('ctaBandTitle')}</h2>
            <p>{t('ctaBandText')}</p>
          </div>
          <div className="cta-acts">
            <Link href="/kontakty" className="btn btn-g">{t('ctaSubmit')}</Link>
            <TrackedLink className="btn btn-w" href="tel:+380445010207" event="phone_click" params={{ location: 'kyiv' }}>+38 (044) 501-02-07</TrackedLink>
          </div>
        </div>
      </div>
    </>
  );
}
