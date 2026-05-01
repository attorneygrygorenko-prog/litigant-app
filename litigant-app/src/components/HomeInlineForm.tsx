'use client';

import { useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { trackEvent, trackConversion } from '@/lib/analytics';

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

export default function HomeInlineForm() {
  const t = useTranslations('home');
  const locale = useLocale();
  const [status, setStatus] = useState<Status>('idle');
  const startedRef = useRef(false);

  function onFirstFocus() {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent('form_start', { form: 'home_inline' });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;

    const fd = new FormData(e.currentTarget);
    const utm = readUtm();
    const challenge = String(fd.get('challenge') || '').trim();
    const contact = String(fd.get('contact') || '').trim();

    if (!challenge || !contact) {
      setStatus('err');
      return;
    }

    const payload = {
      name: '(homepage form)',
      position: 'unknown',
      company: 'unknown',
      industry: 'unknown',
      asset_value: 'unknown',
      challenge,
      contact,
      locale,
      page:
        typeof window !== 'undefined'
          ? `${window.location.href}#homepage_inline`
          : 'homepage_inline',
      utm_source: utm.utm_source || '',
      utm_medium: utm.utm_medium || '',
      utm_campaign: utm.utm_campaign || '',
      utm_content: utm.utm_content || '',
      utm_term: utm.utm_term || ''
    };

    trackEvent('form_submit', { form: 'home_inline' });
    setStatus('sending');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('bad-status');
      setStatus('ok');
      trackEvent('lead_complete', { form: 'home_inline' });
      trackConversion('home_inline_form');
      e.currentTarget.reset();
      startedRef.current = false;
    } catch {
      setStatus('err');
    }
  }

  if (status === 'ok') {
    return (
      <div className="if-form if-ok">
        <p>{t('formOk')}</p>
      </div>
    );
  }

  return (
    <form className="if-form" onSubmit={onSubmit} onFocusCapture={onFirstFocus} noValidate>
      <textarea
        className="field"
        name="challenge"
        required
        rows={4}
        placeholder={t('formChallengePh')}
      />
      <input
        className="field"
        name="contact"
        type="text"
        required
        placeholder={t('formContactPh')}
        autoComplete="off"
      />
      <button className="btn btn-g if-submit" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? t('formSending') : `${t('formSubmit')} →`}
      </button>
      <p className="if-micro">{t('formMicro')}</p>
      {status === 'err' && <div className="st st-e">{t('formErr')}</div>}
    </form>
  );
}
