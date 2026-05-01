import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';
import { buildWebsiteSearch } from '@/lib/jsonld';
import { SLUG_BY_LOCALE } from '@/data/practices';
import HomeInlineForm from '@/components/HomeInlineForm';

export default function HomePage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale);
  const t = useTranslations('home');
  const websiteLd = buildWebsiteSearch(locale);

  // Mapping prac1..prac4 → canonical practice key. Order matches the
  // 4 practices in messages/{ua,en,ro}.json prac1Title..prac4Title.
  const practices = [
    { n: '01', title: t('prac1Title'), text: t('prac1Text'), key: 'wcc' },
    { n: '02', title: t('prac2Title'), text: t('prac2Text'), key: 'state-disputes' },
    { n: '03', title: t('prac3Title'), text: t('prac3Text'), key: 'bankruptcy' },
    { n: '04', title: t('prac4Title'), text: t('prac4Text'), key: 'lobbying-gr' }
  ] as const;

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

  const cases = [
    { tag: t('case1Tag'), challenge: t('case1Challenge'), result: t('case1Result') },
    { tag: t('case2Tag'), challenge: t('case2Challenge'), result: t('case2Result') },
    { tag: t('case3Tag'), challenge: t('case3Challenge'), result: t('case3Result') }
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
          <div className="hero-photo" aria-hidden="true">
            <Image
              src="/images/photo_1.jpg"
              alt=""
              fill
              priority
              sizes="(max-width: 1080px) 0vw, 50vw"
              style={{ objectFit: 'cover' }}
            />
            <div className="hero-photo-overlay" />
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
              <Link
                key={p.n}
                href={`/ekspertyza/${SLUG_BY_LOCALE[p.key][locale]}`}
                className="prac"
              >
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

      <section className="sec sec-cases">
        <div className="wrap">
          <div className="sh">
            <span className="sh-label">{t('casesLabel')}</span>
            <h2>{t('casesTitle')}</h2>
            <div className="sh-line"><span /><span /></div>
          </div>
          <div className="cases-g">
            {cases.map((c, i) => (
              <article key={i} className="case-card">
                <span className="case-tag">{c.tag}</span>
                <p className="case-challenge">{c.challenge}</p>
                <p className="case-result">{c.result}</p>
              </article>
            ))}
          </div>
          <p className="cases-disclaimer">{t('casesDisclaimer')}</p>
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

      <section className="inline-form-sec">
        <div className="wrap inline-form-g">
          <div className="if-left">
            <h2>{t('formHeading')}</h2>
            <p className="if-intro">{t('formIntro')}</p>
            <ul className="if-trust">
              <li>{t('formTrust1')}</li>
              <li>{t('formTrust2')}</li>
              <li>{t('formTrust3')}</li>
            </ul>
          </div>
          <div className="if-right">
            <HomeInlineForm />
          </div>
        </div>
      </section>
    </>
  );
}
