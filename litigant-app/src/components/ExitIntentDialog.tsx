'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { trackEvent, trackConversion, claritySet } from '@/lib/analytics';

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

export default function ExitIntentDialog({ onClose }: { onClose: () => void }) {
  const t = useTranslations('popups');
  const locale = useLocale();
  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    trackEvent('exit_intent_show');
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

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
      name: '(exit intent)',
      position: 'unknown',
      company: 'unknown',
      industry: 'unknown',
      asset_value: 'unknown',
      challenge: 'Exit-intent popup lead',
      contact,
      locale,
      page:
        typeof window !== 'undefined'
          ? `${window.location.href}#exit_intent`
          : 'exit_intent',
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
      trackEvent('exit_intent_submit');
      trackConversion('exit_intent');
      claritySet('exit_intent_lead', 'true');
    } catch {
      setStatus('err');
    }
  }

  return (
    <div
      className="ei-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ei-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="ei-modal">
        <button
          type="button"
          className="ei-close"
          onClick={onClose}
          aria-label={t('exitClose')}
        >
          ×
        </button>
        <span className="ei-label">{t('exitLabel')}</span>
        <h2 id="ei-title" className="ei-title">{t('exitTitle')}</h2>
        <p className="ei-text">{t('exitText')}</p>
        {status === 'ok' ? (
          <div className="ei-ok">{t('exitOk')}</div>
        ) : (
          <form className="ei-form" onSubmit={onSubmit} noValidate>
            <input
              className="field"
              name="contact"
              type="text"
              required
              placeholder={t('exitPh')}
              autoComplete="off"
            />
            <button
              className="btn btn-g ei-submit"
              type="submit"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? t('exitSending') : t('exitCta')}
            </button>
            {status === 'err' && <div className="st st-e">{t('exitErr')}</div>}
          </form>
        )}
        <button type="button" className="ei-decline" onClick={onClose}>
          {t('exitDecline')}
        </button>
      </div>
    </div>
  );
}
