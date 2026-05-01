'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const ScrollTriggerPanel = dynamic(() => import('./ScrollTriggerPanel'), { ssr: false });

const SESSION_KEY = 'scroll_trigger_shown';
const TIMER_MS = 3 * 60 * 1000;
const FAST_TIMER_MS = 10 * 1000;
const SCROLL_RATIO = 0.6;

type Variant = 'scroll' | 'time';

export default function ScrollTrigger() {
  const pathname = usePathname();
  const [variant, setVariant] = useState<Variant | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!pathname) return;
    try {
      if (window.sessionStorage.getItem(SESSION_KEY)) return;
    } catch {
      return;
    }

    let fired = false;
    const fire = (v: Variant) => {
      if (fired) return;
      fired = true;
      try {
        window.sessionStorage.setItem(SESSION_KEY, '1');
      } catch {
        /* ignore */
      }
      setVariant(v);
    };

    let isFastCampaign = false;
    try {
      const url = new URL(window.location.href);
      const utm =
        (url.searchParams.get('utm_campaign') ||
          window.sessionStorage.getItem('utm_campaign') ||
          '').toLowerCase();
      isFastCampaign = utm.includes('bankruptcy');
    } catch {
      /* ignore */
    }

    const timerMs = isFastCampaign ? FAST_TIMER_MS : TIMER_MS;

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const ratio = window.scrollY / max;
      if (ratio >= SCROLL_RATIO) fire('scroll');
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    const timer = window.setTimeout(() => fire('time'), timerMs);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(timer);
    };
  }, [pathname]);

  if (!variant) return null;
  return <ScrollTriggerPanel variant={variant} onClose={() => setVariant(null)} />;
}
