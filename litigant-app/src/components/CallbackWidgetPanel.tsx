'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { trackEvent, trackConversion, claritySet } from '@/lib/analytics';
import { SOCIAL_LINKS } from '@/data/social';
import {
  FacebookIcon,
  InstagramIcon,
  SignalIcon,
  ViberIcon,
  WhatsAppIcon
} from './SocialIcons';

type Status = 'idle' | 'sending' | 'ok' | 'err';

function readUtm(): Record<string, string> {
  if (typeof document === 'undefined') return {};
  const match = document.cookie.split('; ').find((c) => c.startsWith('litigant_utm='));
  if (!match) return {};
  try {
    return JSON.parse(decodeURIComponent(match.split('=').slice(1).join('=')));
  } catch {
    return {};
  }
}

export default function CallbackWidgetPanel({ onClose }: { onClose: () => void }) {
  const t = useTranslations('popups');
  const locale = useLocale();
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;
    const fd = new FormData(e.currentTarget);
    const contact = String(fd.get('contact') || '').trim();
    if (!contact) {
      setStatus('err');
      return;
    }
    const utm = readUtm();
    const payload = {
      name: '(callback widget)',
      position: 'unknown',
      company: 'unknown',
      industry: 'unknown',
      asset_value: 'unknown',
      challenge: 'Запит на зворотній дзвінок',
      contact,
      locale,
      page:
        typeof window !== 'undefined'
          ? `${window.location.href}#callback_widget`
          : 'callback_widget',
      utm_source: utm.utm_source || '',
      utm_medium: utm.utm_medium || '',
      utm_campaign: utm.utm_campaign || '',
      utm_content: utm.utm_content || '',
      utm_term: utm.utm_term || ''
    };
    setStatus('sending');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('bad-status');
      setStatus('ok');
      trackEvent('callback_requested');
      trackConversion('callback_widget');
      claritySet('callback_lead', 'true');
    } catch {
      setStatus('err');
    }
  }

  return (
    <div className="cb-popup" role="dialog" aria-label={t('callbackTitle')}>
      <h3 className="cb-title">{t('callbackTitle')}</h3>
      {status === 'ok' ? (
        <p className="cb-ok">{t('callbackOk')}</p>
      ) : (
        <form className="cb-form" onSubmit={onSubmit} noValidate>
          <input
            className="field cb-input"
            name="contact"
            type="tel"
            required
            placeholder={t('callbackPh')}
            autoComplete="tel"
          />
          <button
            type="submit"
            className="btn btn-g cb-submit"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? t('callbackSending') : t('callbackCta')}
          </button>
          <p className="cb-hint">{t('callbackHint')}</p>
          {status === 'err' && <div className="st st-e">{t('callbackErr')}</div>}
          <p className="cb-direct">{t('directMessage')}</p>
          <div className="cb-direct-row">
            <a
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              onClick={() => trackEvent('callback_direct_click', { type: 'whatsapp' })}
            >
              <WhatsAppIcon size={24} />
            </a>
            <a
              href={SOCIAL_LINKS.viber}
              aria-label="Viber"
              onClick={() => trackEvent('callback_direct_click', { type: 'viber' })}
            >
              <ViberIcon size={24} />
            </a>
            <a
              href={SOCIAL_LINKS.signal}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Signal"
              onClick={() => trackEvent('callback_direct_click', { type: 'signal' })}
            >
              <SignalIcon size={24} />
            </a>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              onClick={() => trackEvent('callback_direct_click', { type: 'instagram' })}
            >
              <InstagramIcon size={24} />
            </a>
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              onClick={() => trackEvent('callback_direct_click', { type: 'facebook' })}
            >
              <FacebookIcon size={24} />
            </a>
          </div>
        </form>
      )}
      <button
        type="button"
        className="cb-close"
        onClick={onClose}
        aria-label={t('exitClose')}
      >
        ×
      </button>
    </div>
  );
}
