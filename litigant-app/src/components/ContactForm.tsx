'use client';

import { useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { trackEvent } from '@/lib/analytics';

type Status = 'idle' | 'sending' | 'ok' | 'err';

export default function ContactForm() {
  const t = useTranslations('contacts');
  const locale = useLocale();
  const [status, setStatus] = useState<Status>('idle');
  const startedRef = useRef(false);

  function onFirstFocus() {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent('form_start', { form: 'contact_quick' });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get('name') || '').trim(),
      contact: String(fd.get('contact') || '').trim(),
      office: String(fd.get('office') || ''),
      message: String(fd.get('message') || '').trim(),
      locale,
      page: typeof window !== 'undefined' ? window.location.href : ''
    };
    if (!payload.name || !payload.contact || !payload.office) {
      setStatus('err');
      return;
    }
    trackEvent('form_submit', { form: 'contact_quick', office: payload.office });
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('bad-status');
      setStatus('ok');
      trackEvent('contact_quick_complete', { office: payload.office });
      e.currentTarget.reset();
      startedRef.current = false;
    } catch {
      setStatus('err');
    }
  }

  if (status === 'ok') {
    return (
      <div className="qc-form qc-ok-wrap">
        <h3>{t('quickTitle')}</h3>
        <p className="st st-k">{t('quickOk')}</p>
      </div>
    );
  }

  return (
    <form className="qc-form" onSubmit={onSubmit} onFocusCapture={onFirstFocus} noValidate>
      <h3>{t('quickTitle')}</h3>
      <p className="form-sub">{t('quickSub')}</p>

      <div className="qc-row">
        <div>
          <label className="f-lbl">{t('quickName')}</label>
          <input className="field" name="name" required placeholder={t('quickNamePh')} />
        </div>
        <div>
          <label className="f-lbl">{t('quickContact')}</label>
          <input className="field" name="contact" required placeholder={t('quickContactPh')} />
        </div>
      </div>

      <label className="f-lbl">{t('quickOffice')}</label>
      <select className="field" name="office" defaultValue="" required>
        <option value="" disabled>{t('quickOfficeSelect')}</option>
        <option value="kyiv">{t('quickOfficeKyiv')}</option>
        <option value="odesa">{t('quickOfficeOdesa')}</option>
      </select>

      <label className="f-lbl">{t('quickMessage')}</label>
      <textarea className="field" name="message" rows={3} placeholder={t('quickMessagePh')} />

      <button className="btn submit" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? t('quickSending') : t('quickSubmit')}
      </button>

      {status === 'err' && <div className="st st-e">{t('quickErr')}</div>}
    </form>
  );
}
