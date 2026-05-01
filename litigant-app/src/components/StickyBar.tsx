'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { trackEvent } from '@/lib/analytics';

const SCROLL_THRESHOLD = 300;

export default function StickyBar() {
  const t = useTranslations('popups');
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!pathname || /\/kontakty\/?$/.test(pathname)) return;

    const onScroll = () => {
      setShow(window.scrollY > SCROLL_THRESHOLD);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  if (!show || !pathname || /\/kontakty\/?$/.test(pathname)) return null;

  return (
    <div className="sticky-bar" role="region" aria-label={t('stickyText')}>
      <span className="sticky-text">{t('stickyText')}</span>
      <Link
        href="/kontakty"
        className="sticky-cta"
        onClick={() => trackEvent('sticky_bar_click')}
      >
        {t('stickyCta')}
      </Link>
    </div>
  );
}
