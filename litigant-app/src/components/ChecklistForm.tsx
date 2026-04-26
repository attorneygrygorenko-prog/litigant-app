'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { trackEvent, trackConversion } from '@/lib/analytics';

type Status = 'idle' | 'sending' | 'ok' | 'err';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;

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

export default function ChecklistForm() {
  const t = useTranslations('checklist');
  const locale = useLocale();
  const [status, setStatus] = useState<Status>('idle');
  const [utm, setUtm] = useState<Record<string, string>>({});

  useEffect(() => {
    setUtm(readUtm());
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get('name') || ''),
      contact: String(fd.get('contact') || ''),
      magnet: 'search-checklist',
      locale,
      page: typeof window !== 'undefined' ? window.location.href : '',
      ...utm
    };

    setStatus('sending');
    try {
      const res = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('bad-status');
      setStatus('ok');
      trackEvent('lead_magnet', { magnet: 'search-checklist' });
      trackConversion('lead_magnet');
      e.currentTarget.reset();
    } catch {
      setStatus('err');
    }
  }

  return (
    <form className="checklist-form" onSubmit={onSubmit} noValidate>
      <h3>{t('formTitle')}</h3>
      <p>{t('formSub')}</p>
      <div>
        <label className="f-lbl">{t('fName')}</label>
        <input name="name" required placeholder={t('fNamePh')} />
      </div>
      <div>
        <label className="f-lbl">{t('fContact')}</label>
        <input name="contact" required placeholder={t('fContactPh')} />
      </div>
      {UTM_KEYS.map((k) => (
        <input key={k} type="hidden" name={k} value={utm[k] || ''} readOnly />
      ))}
      <button className="btn btn-g submit" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? t('fSending') : t('fSubmit')}
      </button>
      {status === 'ok' && <div className="st st-k">{t('fOk')}</div>}
      {status === 'err' && <div className="st st-e">{t('fErr')}</div>}
    </form>
  );
}
