'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { trackEvent } from '@/lib/analytics';

interface Props {
  variant: 'scroll' | 'time';
  onClose: () => void;
}

export default function ScrollTriggerPanel({ variant, onClose }: Props) {
  const t = useTranslations('popups');

  useEffect(() => {
    trackEvent('scroll_trigger_show', { variant });
  }, [variant]);

  const lineA = variant === 'scroll' ? t('scrollText60a') : t('scrollText3a');
  const lineB = variant === 'scroll' ? t('scrollText60b') : t('scrollText3b');
  const cta = variant === 'scroll' ? t('scrollCta60') : t('scrollCta3');

  return (
    <div className="st-panel" role="region" aria-label={lineA}>
      <button
        type="button"
        className="st-close"
        onClick={onClose}
        aria-label={t('scrollClose')}
      >
        ×
      </button>
      <p className="st-line">{lineA}</p>
      <p className="st-line st-line2">{lineB}</p>
      <Link
        href="/kontakty"
        className="btn btn-g st-cta"
        onClick={() => trackEvent('scroll_trigger_click', { variant })}
      >
        {cta}
      </Link>
    </div>
  );
}
