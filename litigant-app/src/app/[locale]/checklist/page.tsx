import { useTranslations } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

import PageHero from '@/components/PageHero';
import ChecklistForm from '@/components/ChecklistForm';
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

  const steps = t.raw('items') as string[];

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
        <div className="wrap sla-wrap">
          <p className="sla-description">{t('description')}</p>

          <h2 className="sla-process-title">{t('processTitle')}</h2>
          <ol className="sla-steps">
            {steps.map((s, i) => (
              <li key={i}>
                <span className="sla-step-n">{`0${i + 1}`}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>

          <ChecklistForm />

          <p className="sla-disclaimer">{t('disclaimer')}</p>
        </div>
      </section>
    </>
  );
}
