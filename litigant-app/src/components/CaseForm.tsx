'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

type Status = 'idle' | 'sending' | 'ok' | 'err';

export default function CaseForm() {
  const t = useTranslations('contacts');
  const locale = useLocale();
  const [status, setStatus] = useState<Status>('idle');

  const industries = t.raw('fIndustries') as string[];
  const assets = t.raw('fAssetOptions') as string[];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get('name') || ''),
      position: String(fd.get('position') || ''),
      company: String(fd.get('company') || ''),
      industry: String(fd.get('industry') || ''),
      challenge: String(fd.get('challenge') || ''),
      asset_value: String(fd.get('asset_value') || ''),
      contact: String(fd.get('contact') || ''),
      locale,
      page: typeof window !== 'undefined' ? window.location.href : ''
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
      e.currentTarget.reset();
    } catch {
      setStatus('err');
    }
  }

  return (
    <div className="form-wrap">
      <h3>{t('formTitle')}</h3>
      <p className="form-sub">{t('formSub')}</p>

      <form onSubmit={onSubmit} noValidate>
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
