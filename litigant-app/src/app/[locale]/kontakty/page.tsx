import { useTranslations } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

import PageHero from '@/components/PageHero';
import CaseForm from '@/components/CaseForm';
import TrackedLink from '@/components/TrackedLink';
import type { Locale } from '@/i18n/routing';
import { SITE_URL, alternates } from '@/lib/seo';
import { buildBreadcrumb } from '@/lib/jsonld';
import { SOCIAL_LINKS } from '@/data/social';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'contacts' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
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
                  <TrackedLink href="tel:+380445010207" event="phone_click" params={{ location: 'kyiv' }}>+38 (044) 501-02-07</TrackedLink>{'\n'}
                  <TrackedLink href="tel:+380949522996" event="phone_click" params={{ location: 'kyiv' }}>+38 (094) 952-29-96</TrackedLink>{'\n'}
                  <a href="mailto:advocatcompany@gmail.com">advocatcompany@gmail.com</a>
                </div>
              </div>

              <div className="c-card">
                <span className="c-label">{t('odesaLabel')}</span>
                <div className="c-info">
                  {t('odesaAddress')}
                  {'\n\n'}
                  <TrackedLink href="tel:+380932232995" event="phone_click" params={{ location: 'odesa' }}>+38 (093) 223-29-95</TrackedLink>
                </div>
              </div>

              <div className="c-card">
                <span className="c-label">{t('chisinauLabel')}</span>
                <div className="c-info">{t('chisinauText')}</div>
              </div>

              <div className="c-card">
                <span className="c-label">{t('messengersLabel')}</span>
                <div className="messengers">
                  <TrackedLink className="msg-btn" href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" event="messenger_click" params={{ type: 'whatsapp' }}>WhatsApp</TrackedLink>
                  <TrackedLink className="msg-btn" href={SOCIAL_LINKS.telegram} target="_blank" rel="noopener noreferrer" event="messenger_click" params={{ type: 'telegram' }}>Telegram</TrackedLink>
                  <TrackedLink className="msg-btn" href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" event="messenger_click" params={{ type: 'facebook' }}>Facebook</TrackedLink>
                  <TrackedLink className="msg-btn" href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" event="messenger_click" params={{ type: 'instagram' }}>Instagram</TrackedLink>
                  <TrackedLink className="msg-btn" href={SOCIAL_LINKS.threads} target="_blank" rel="noopener noreferrer" event="messenger_click" params={{ type: 'threads' }}>Threads</TrackedLink>
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
