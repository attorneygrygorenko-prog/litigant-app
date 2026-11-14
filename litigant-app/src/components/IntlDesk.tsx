import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';
import { SLUG_BY_LOCALE } from '@/data/practices';

/** "International clients" band — maritime law + international arbitration, for foreign principals. */
export default function IntlDesk({ locale }: { locale: Locale }) {
  const t = useTranslations('intl');
  const cards = [
    { n: '01', key: 'maritime' as const, title: t('maritimeTitle'), text: t('maritimeText') },
    { n: '02', key: 'intl-arbitration' as const, title: t('arbTitle'), text: t('arbText') }
  ];
  const facts = [t('fact1'), t('fact2'), t('fact3'), t('fact4')];

  return (
    <section className="lx-intl" id="international">
      <div className="wrap">
        <div className="lx-intl-head">
          <span className="sh-label">{t('label')}</span>
          <h2>{t('title')}</h2>
          <p>{t('text')}</p>
        </div>
        <div className="lx-intl-cards">
          {cards.map((c) => (
            <Link key={c.key} href={`/ekspertyza/${SLUG_BY_LOCALE[c.key][locale]}`} className="lx-intl-card">
              <span className="lx-intl-n">{c.n}</span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <span className="lx-link">{t('more')} <i /></span>
            </Link>
          ))}
        </div>
        <ul className="lx-intl-facts">
          {facts.map((f) => <li key={f}>{f}</li>)}
        </ul>
        <Link href="/kontakty" className="btn btn-g">{t('cta')}</Link>
      </div>
    </section>
  );
}
