'use client';

import { useEffect, useRef, useState } from 'react';
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

export default function CaseForm() {
  const t = useTranslations('contacts');
  const locale = useLocale();
  const [status, setStatus] = useState<Status>('idle');
  const [utm, setUtm] = useState<Record<string, string>>({});
  const startedRef = useRef(false);

  const industries = t.raw('fIndustries') as string[];
  const assets = t.raw('fAssetOptions') as string[];

  useEffect(() => {
    setUtm(readUtm());
  }, []);

  function onFirstFocus() {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent('form_start', { form: 'case' });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;

    const fd = new FormData(e.currentTarget);
    const utm = readUtm();
    const payload = {
      name: String(fd.get('name') || ''),
      position: String(fd.get('position') || ''),
      company: String(fd.get('company') || ''),
      industry: String(fd.get('industry') || ''),
      challenge: String(fd.get('challenge') || ''),
      asset_value: String(fd.get('asset_value') || ''),
      contact: String(fd.get('contact') || ''),
      locale,
      page: typeof window !== 'undefined' ? window.location.href : '',
      utm_source: utm.utm_source || '',
      utm_medium: utm.utm_medium || '',
      utm_campaign: utm.utm_campaign || '',
      utm_content: utm.utm_content || '',
      utm_term: utm.utm_term || ''
    };

    trackEvent('form_submit', { form: 'case', service: payload.industry });

    setStatus('sending');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('bad-status');
      setStatus('ok');
      trackEvent('lead_complete', {
        service: payload.industry,
        value: payload.asset_value
      });
      trackConversion('case_form');
      e.currentTarget.reset();
      startedRef.current = false;
    } catch {
      setStatus('err');
    }
  }

  return (
    <div className="form-wrap">
      <h2>{t('formTitle')}</h2>
      <p className="form-sub">{t('formSub')}</p>

      <form onSubmit={onSubmit} onFocusCapture={onFirstFocus} noValidate>
        <div className="f-row">
          <div>
            <label className="f-lbl">{t('fName')}</label>
            <input className="field" name="name" required placeholder={t('fNamePh')} />
          </div>
          <div>
            <label className="f-lbl">{t('fPosition')}</label>
            <input className="field" name="position" required placeholder={t('fPositionPh')} />
          </div>
        </div>

        <div className="f-row">
          <div>
            <label className="f-lbl">{t('fCompany')}</label>
            <input className="field" name="company" required placeholder={t('fCompanyPh')} />
          </div>
          <div>
            <label className="f-lbl">{t('fIndustry')}</label>
            <select className="field" name="industry" defaultValue="">
              <option value="" disabled>{t('fSelect')}</option>
              {industries.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        <label className="f-lbl">{t('fChallenge')}</label>
        <textarea className="field" name="challenge" required placeholder={t('fChallengePh')} />

        <div className="f-row">
          <div>
            <label className="f-lbl">{t('fAsset')}</label>
            <select className="field" name="asset_value" defaultValue="">
              <option value="" disabled>{t('fSelect')}</option>
              {assets.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="f-lbl">{t('fContact')}</label>
            <input className="field" name="contact" required placeholder={t('fContactPh')} />
          </div>
        </div>

        {UTM_KEYS.map((k) => (
          <input key={k} type="hidden" name={k} value={utm[k] || ''} readOnly />
        ))}

        <button className="btn submit" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? t('fSending') : t('fSubmit')}
        </button>
      </form>

      {status === 'sending' && <div className="st st-s">{t('fSending')}</div>}
      {status === 'ok' && <div className="st st-k">{t('fOk')}</div>}
      {status === 'err' && <div className="st st-e">{t('fErr')}</div>}
    </div>
  );
}
