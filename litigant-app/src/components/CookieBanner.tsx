'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';

const STORAGE_KEY = 'cookie_consent';

const COPY: Record<string, { text: string; accept: string; decline: string; policy: string }> = {
  en: {
    text: 'We use cookies for analytics and personalized advertising. Read our',
    accept: 'Accept',
    decline: 'Decline',
    policy: 'Privacy Policy'
  },
  ro: {
    text: 'Folosim cookie-uri pentru analiză și publicitate personalizată. Citiți',
    accept: 'Accept',
    decline: 'Refuz',
    policy: 'Politica de confidențialitate'
  },
  ua: {
    text: 'Ми використовуємо cookie для аналітики та реклами. Ознайомтеся з',
    accept: 'Прийняти',
    decline: 'Відхилити',
    policy: 'Політикою конфіденційності'
  }
};

export default function CookieBanner() {
  const locale = useLocale();
  const [decided, setDecided] = useState<boolean>(true);

  useEffect(() => {
    try {
      const v = window.localStorage.getItem(STORAGE_KEY);
      setDecided(v === 'accepted' || v === 'declined');
    } catch {
      setDecided(true);
    }
  }, []);

  function decide(value: 'accepted' | 'declined') {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new Event('cookie-consent-change'));
    setDecided(true);
  }

  if (decided) return null;

  const copy = COPY[locale] || COPY.en;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookies">
      <p className="cookie-text">
        {copy.text} <a href="#">{copy.policy}</a>.
      </p>
      <div className="cookie-acts">
        <button type="button" className="btn btn-g" onClick={() => decide('accepted')}>
          {copy.accept}
        </button>
        <button type="button" className="btn btn-o" onClick={() => decide('declined')}>
          {copy.decline}
        </button>
      </div>
    </div>
  );
}
