import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';
import { buildHomeFaqJsonLd, buildWebsiteSearch } from '@/lib/jsonld';
import { SLUG_BY_LOCALE, type PracticeKey } from '@/data/practices';
import HomeInlineForm from '@/components/HomeInlineForm';
import HeroTag from '@/components/HeroTag';
import CounterNumber from '@/components/CounterNumber';
import TextReveal from '@/components/TextReveal';
import ScrollReveal from '@/components/ScrollReveal';
import MagneticButton from '@/components/MagneticButton';
import InView from '@/components/InView';
import IntlDesk from '@/components/IntlDesk';

export default function HomePage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale);
  const t = useTranslations('home');
  const websiteLd = buildWebsiteSearch(locale);
  const homeFaqLd = buildHomeFaqJsonLd(locale);

  // Mapping prac1..prac4 → canonical practice key. Order matches the
  // 4 practices in messages/{ua,en,ro}.json prac1Title..prac4Title.
  const practices = [
    { n: '01', title: t('prac1Title'), text: t('prac1Text'), key: 'wcc' },
    { n: '02', title: t('prac2Title'), text: t('prac2Text'), key: 'state-disputes' },
    { n: '03', title: t('prac3Title'), text: t('prac3Text'), key: 'bankruptcy' },
    { n: '04', title: t('prac4Title'), text: t('prac4Text'), key: 'lobbying-gr' }
  ] as const;

  const why = [
    { n: '01', title: t('whyArchTitle'), text: t('whyArchText') },
    { n: '02', title: t('why1Title'), text: t('why1Text') },
    { n: '03', title: t('why2Title'), text: t('why2Text') },
    { n: '04', title: t('why3Title'), text: t('why3Text') },
    { n: '05', title: t('why4Title'), text: t('why4Text') }
  ];

  const risks: { tag: string; title: string; text: string; key: PracticeKey }[] = [
    { tag: t('risk1Tag'), title: t('risk1Title'), text: t('risk1Text'), key: t('risk1PracticeKey') as PracticeKey },
    { tag: t('risk2Tag'), title: t('risk2Title'), text: t('risk2Text'), key: t('risk2PracticeKey') as PracticeKey },
    { tag: t('risk3Tag'), title: t('risk3Title'), text: t('risk3Text'), key: t('risk3PracticeKey') as PracticeKey }
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqLd) }}
      />
      <section className="hero lx-hero">
        <div className="lx-hero-photo" aria-hidden="true">
          <Image
            src="/images/photo_1.jpg"
            alt=""
            fill
            priority
            sizes="(max-width: 1080px) 100vw, 46vw"
            style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
          />
        </div>
        <div className="lx-hero-grid" aria-hidden="true"><i /><i /><i /></div>
        <div className="wrap lx-hero-in">
          <div className="lx-fade">
            <HeroTag
              defaultText={t('heroTag')}
              linkedinText={t('heroTagLinkedIn')}
              googleText={t('heroTagGoogle')}
            />
          </div>
          <h1 className="lx-h1">
            <TextReveal text={t('heroTitle')} baseDelay={250} step={110} />
          </h1>
          <p className="lx-hero-sub lx-fade lx-d1">{t('heroSubtitle')}</p>
          <p className="hero-text lx-fade lx-d2">{t('heroText')}</p>
          <div className="hero-cta lx-fade lx-d3">
            <MagneticButton>
              <Link href="/kontakty" className="btn btn-g">{t('ctaSubmit')}</Link>
            </MagneticButton>
            <Link href="/ekspertyza" className="btn btn-w">{t('ctaVectors')}</Link>
          </div>
          <p className="hero-calm lx-fade lx-d4">{t('heroCalm')}</p>
        </div>
        <div className="wrap lx-stats lx-fade lx-d4">
          <div className="lx-stat"><div className="lx-stat-n"><CounterNumber end={10} suffix="+" /></div><div className="lx-stat-l">{t('stat1Label')}</div></div>
          <div className="lx-stat"><div className="lx-stat-n">2016</div><div className="lx-stat-l">{t('statSinceLabel')}</div></div>
          <div className="lx-stat"><div className="lx-stat-n"><CounterNumber end={50} suffix="+" /></div><div className="lx-stat-l">{t('statPubLabel')}</div></div>
          <div className="lx-stat"><div className="lx-stat-n"><CounterNumber end={3} /></div><div className="lx-stat-l">{t('statCitiesLabel')}</div></div>
        </div>
        <div className="lx-scroll" aria-hidden="true" />
      </section>

      <section className="manifesto">
        <div className="wrap">
          <ScrollReveal>
            <blockquote>{t('manifesto')}</blockquote>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <p className="manifesto-sub">{t('manifestoSub')}</p>
          </ScrollReveal>
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
            {practices.map((p, i) => (
              <ScrollReveal key={p.n} delay={i * 100}>
                <Link
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
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <IntlDesk locale={locale} />

      <section className="lx-founder">
        <div className="wrap lx-founder-g">
          <InView className="lx-founder-wrap">
            <div className="lx-founder-photo">
              <Image
                src="/images/photo_about.jpg"
                alt={t('founderName')}
                fill
                sizes="(max-width: 1080px) 460px, 40vw"
                style={{ objectFit: 'cover', objectPosition: 'center 15%' }}
              />
            </div>
            <div className="lx-founder-frame" aria-hidden="true" />
          </InView>
          <ScrollReveal>
            <span className="sh-label">{t('founderLabel')}</span>
            <h2>{t('founderName')}</h2>
            <p className="lx-founder-role">{t('founderRole')}</p>
            <p className="lx-founder-text">{t('founderText')}</p>
            <ul className="lx-creds">
              {[1, 2, 3, 4].map((n) => (
                <li key={n}>
                  <span>0{n}</span>
                  {t(`founderCred${n}` as 'founderCred1')}
                </li>
              ))}
            </ul>
            <Link href="/pro-nas" className="lx-link">{t('founderMore')} <i /></Link>
          </ScrollReveal>
        </div>
      </section>

      <section className="lx-marquee" aria-label={t('marqueeLabel')}>
        <p className="lx-marquee-label">{t('marqueeLabel')}</p>
        <div className="lx-marquee-mask">
          <div className="lx-marquee-track">
            {[0, 1].map((copy) =>
              t('marqueeItems').split('|').map((item) => (
                <span key={`${copy}-${item}`} className="lx-marquee-item" aria-hidden={copy === 1 || undefined}>
                  {item}
                </span>
              ))
            )}
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
            {why.map((w, i) => (
              <ScrollReveal key={w.n} delay={i * 100}>
                <div className="why">
                  <span className="why-n">{w.n}</span>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </div>
              </ScrollReveal>
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
              <ScrollReveal key={i} delay={i * 150}>
                <article className="case-card">
                  <span className="case-tag">{c.tag}</span>
                  <p className="case-challenge">{c.challenge}</p>
                  <p className="case-result">{c.result}</p>
                </article>
              </ScrollReveal>
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
            {proc.map((p, i) => (
              <ScrollReveal key={p.n} delay={i * 100}>
                <div className="proc">
                  <span className="proc-n">{p.n}</span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec-risks">
        <div className="wrap">
          <div className="sh">
            <span className="sh-label">{t('risksLabel')}</span>
            <h2>{t('risksTitle')}</h2>
            <div className="sh-line"><span /><span /></div>
          </div>
          <div className="risks-g">
            {risks.map((r, i) => (
              <ScrollReveal key={r.key} delay={i * 120}>
                <Link
                  href={`/ekspertyza/${SLUG_BY_LOCALE[r.key][locale]}`}
                  className="risk-card"
                >
                  <span className="risk-tag">{r.tag}</span>
                  <h3 className="risk-title">{r.title}</h3>
                  <p className="risk-text">{r.text}</p>
                  <span className="risk-cta">
                    {t('risksCta')} <span className="risk-arr">→</span>
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="inline-form-sec">
        <div className="wrap inline-form-g">
          <div className="if-left">
            <h2>{t('formHeading')}</h2>
            <p className="scarcity-note">{t('formCapacity')}</p>
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
