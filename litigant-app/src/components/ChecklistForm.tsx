'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { trackEvent, trackConversion, claritySet } from '@/lib/analytics';

type Status = 'idle' | 'sending' | 'ok' | 'err';
type UpsellStatus = 'idle' | 'sending' | 'ok' | 'err';

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
  const [upsell, setUpsell] = useState<UpsellStatus>('idle');
  const [contact, setContact] = useState('');
  const [utm, setUtm] = useState<Record<string, string>>({});

  useEffect(() => {
    setUtm(readUtm());
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;
    const fd = new FormData(e.currentTarget);
    const c = String(fd.get('contact') || '').trim();
    if (!c) {
      setStatus('err');
      return;
    }
    setContact(c);
    const payload = {
      // /api/lead-magnet requires `name`. Single-step UX collects only contact,
      // so we attach a synthetic owner label so the row in Sheets is meaningful.
      name: '(checklist downloader)',
      contact: c,
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
      claritySet('lead_magnet_submitted', 'true');
    } catch {
      setStatus('err');
    }
  }

  async function onUpsell() {
    if (upsell === 'sending') return;
    const payload = {
      name: '(checklist upsell)',
      position: 'unknown',
      company: 'unknown',
      industry: 'unknown',
      asset_value: 'unknown',
      challenge: 'Checklist downloader requested follow-up consultation',
      contact,
      locale,
      page:
        typeof window !== 'undefined'
          ? `${window.location.href}#checklist_upsell`
          : 'checklist_upsell',
      ...utm
    };
    setUpsell('sending');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('bad-status');
      setUpsell('ok');
      trackEvent('checklist_upsell_click');
      trackConversion('checklist_upsell');
      claritySet('checklist_upsell_lead', 'true');
    } catch {
      setUpsell('err');
    }
  }

  if (status === 'ok') {
    return (
      <div className="checklist-step2">
        <div className="st st-k">{t('fOk')}</div>
        {upsell === 'ok' ? (
          <div className="cl-upsell-ok">{t('upsellOk')}</div>
        ) : (
          <div className="cl-upsell">
            <h3>{t('upsellTitle')}</h3>
            <p>{t('upsellText')}</p>
            <button
              type="button"
              className="btn btn-g"
              onClick={onUpsell}
              disabled={upsell === 'sending'}
            >
              {upsell === 'sending' ? t('upsellSending') : t('upsellCta')}
            </button>
            {upsell === 'err' && <div className="st st-e">{t('fErr')}</div>}
          </div>
        )}
      </div>
    );
  }

  return (
    <form className="checklist-form" onSubmit={onSubmit} noValidate>
      <p className="cl-urgency">{t('urgency')}</p>
      <h3>{t('formTitle')}</h3>
      <p>{t('formSub')}</p>
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
      <p className="cl-social">{t('socialProof')}</p>
      {status === 'err' && <div className="st st-e">{t('fErr')}</div>}
    </form>
  );
}
