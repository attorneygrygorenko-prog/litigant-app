'use client';

import { useEffect } from 'react';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;
const COOKIE_NAME = 'litigant_utm';
const TTL_DAYS = 30;

export default function UtmCapture() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const existingCookie = document.cookie
      .split('; ')
      .find((c) => c.startsWith(`${COOKIE_NAME}=`));

    const url = new URL(window.location.href);
    const collected: Record<string, string> = {};
    for (const key of UTM_KEYS) {
      const value = url.searchParams.get(key);
      if (value) collected[key] = value.slice(0, 200);
    }

    // Mirror UTMs into sessionStorage on every page load — used by HeroTag,
    // ScrollTrigger and any other component that personalises copy by
    // utm_source / utm_campaign.
    try {
      if (Object.keys(collected).length) {
        for (const [k, v] of Object.entries(collected)) {
          window.sessionStorage.setItem(k, v);
        }
      } else if (existingCookie) {
        // First-party cookie → re-hydrate sessionStorage for SPAs that
        // mounted after the original UTM landing.
        try {
          const parsed = JSON.parse(
            decodeURIComponent(existingCookie.split('=').slice(1).join('='))
          );
          for (const [k, v] of Object.entries(parsed)) {
            if (typeof v === 'string') window.sessionStorage.setItem(k, v);
          }
        } catch {
          /* ignore parse error */
        }
      }
    } catch {
      /* sessionStorage unavailable — degrade silently */
    }

    if (existingCookie || Object.keys(collected).length === 0) return;

    const expires = new Date(Date.now() + TTL_DAYS * 86400 * 1000).toUTCString();
    const value = encodeURIComponent(JSON.stringify(collected));
    document.cookie = `${COOKIE_NAME}=${value}; expires=${expires}; path=/; SameSite=Lax`;
  }, []);

  return null;
}
