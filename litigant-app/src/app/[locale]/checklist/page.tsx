import { useTranslations } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

import PageHero from '@/components/PageHero';
import ChecklistForm from '@/components/ChecklistForm';
import { Link } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';
import { SITE_URL, alternates } from '@/lib/seo';
import { buildBreadcrumb } from '@/lib/jsonld';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'checklist' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: `${SITE_URL}/${locale}/checklist`, ...alternates('/checklist') }
  };
}

export default function ChecklistPage({
  params: { locale }
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);
  const t = useTranslations('checklist');
  const tNav = useTranslations('nav');

  const items = t.raw('items') as string[];

  const breadcrumbLd = buildBreadcrumb(locale, [
    { name: tNav('home'), href: '/' },
    { name: t('breadcrumb'), href: '/checklist' }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <PageHero breadcrumb={t('breadcrumb')} title={t('title')} lead={t('lead')} />

      <section className="sec">
        <div className="wrap">
          <ol className="checklist-list">
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>

          <ChecklistForm />

          <div className="practice-cta" style={{ marginTop: '40px' }}>
            <div>
              <h3
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: '20px',
                  fontWeight: 600,
                  marginBottom: '6px',
                  color: 'var(--n)'
                }}
              >
                {t('wccCtaTitle')}
              </h3>
              <p>{t('wccCtaText')}</p>
            </div>
            <Link href="/kontakty">{t('wccCtaAction')}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
