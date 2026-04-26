import { useTranslations } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

import PageHero from '@/components/PageHero';
import CaseForm from '@/components/CaseForm';
import type { Locale } from '@/i18n/routing';
import { SITE_URL, alternates } from '@/lib/seo';
import { buildBreadcrumb } from '@/lib/jsonld';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'contacts' });
  return {
    title: `${t('title')} — Litigant Law Office`,
    description: t('lead'),
    alternates: { canonical: `${SITE_URL}/${locale}/kontakty`, ...alternates('/kontakty') }
  };
}

export default function ContactsPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale);
  const t = useTranslations('contacts');
  const tNav = useTranslations('nav');

  const breadcrumbLd = buildBreadcrumb(locale, [
    { name: tNav('home'), href: '/' },
    { name: t('breadcrumb'), href: '/kontakty' }
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <PageHero breadcrumb={t('breadcrumb')} title={t('title')} lead={t('lead')} />

      <section className="sec">
        <div className="wrap">
          <div className="contact-g">
            <div className="c-cards">
              <div className="c-card">
                <span className="c-label">{t('kyivLabel')}</span>
                <div className="c-info">
                  {t('kyivAddress')}
                  {'\n\n'}
                  <a href="tel:+380445010207">+38 (044) 501-02-07</a>{'\n'}
                  <a href="tel:+380949522996">+38 (094) 952-29-96</a>{'\n'}
                  <a href="mailto:advocatcompany@gmail.com">advocatcompany@gmail.com</a>
                </div>
              </div>

              <div className="c-card">
                <span className="c-label">{t('odesaLabel')}</span>
                <div className="c-info">
                  {t('odesaAddress')}
                  {'\n\n'}
                  <a href="tel:+380932232995">+38 (093) 223-29-95</a>
                </div>
              </div>

              <div className="c-card">
                <span className="c-label">{t('chisinauLabel')}</span>
                <div className="c-info">{t('chisinauText')}</div>
              </div>

              <div className="c-card">
                <span className="c-label">{t('messengersLabel')}</span>
                <div className="messengers">
                  <a className="msg-btn" href="https://t.me/+380932232995" target="_blank" rel="noopener noreferrer">Telegram</a>
                  <a className="msg-btn" href="https://wa.me/380932232995" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                </div>
              </div>
            </div>

            <CaseForm />
          </div>
        </div>
      </section>
    </>
  );
}
