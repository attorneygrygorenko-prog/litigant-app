'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { trackEvent } from '@/lib/analytics';

const COOKIE_NAME = 'litigant_consent';

function readConsent(): 'accepted' | 'declined' | null {
  if (typeof document === 'undefined') return null;
  const m = document.cookie.split('; ').find((c) => c.startsWith(`${COOKIE_NAME}=`));
  if (!m) return null;
  const v = m.split('=').slice(1).join('=');
  return v === 'accepted' || v === 'declined' ? v : null;
}

function setConsentCookie(value: 'accepted' | 'declined') {
  const days = value === 'accepted' ? 365 : 30;
  const expires = new Date(Date.now() + days * 86400 * 1000).toUTCString();
  document.cookie = `${COOKIE_NAME}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}

export default function CookieBanner() {
  const t = useTranslations('popups');
  const [decided, setDecided] = useState<boolean>(true);

  useEffect(() => {
    setDecided(readConsent() !== null);
  }, []);

  function decide(value: 'accepted' | 'declined') {
    try {
      setConsentCookie(value);
    } catch {
      /* ignore — third-party cookie blocked? */
    }
    if (value === 'accepted') {
      trackEvent('cookie_consent_accepted');
    } else {
      trackEvent('cookie_consent_declined');
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('cookie-consent-change'));
    }
    setDecided(true);
  }

  if (decided) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookies">
      <p className="cookie-text">{t('cookieText')}</p>
      <div className="cookie-acts">
        <button type="button" className="btn btn-g" onClick={() => decide('accepted')}>
          {t('cookieAccept')}
        </button>
        <button type="button" className="btn btn-o" onClick={() => decide('declined')}>
          {t('cookieDecline')}
        </button>
      </div>
    </div>
  );
}
