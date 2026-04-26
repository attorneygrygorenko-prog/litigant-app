'use client';

import { useEffect } from 'react';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;
const COOKIE_NAME = 'litigant_utm';
const TTL_DAYS = 30;

export default function UtmCapture() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const existing = document.cookie.split('; ').find((c) => c.startsWith(`${COOKIE_NAME}=`));
    if (existing) return;

    const url = new URL(window.location.href);
    const collected: Record<string, string> = {};
    for (const key of UTM_KEYS) {
      const value = url.searchParams.get(key);
      if (value) collected[key] = value.slice(0, 200);
    }
    if (Object.keys(collected).length === 0) return;

    const expires = new Date(Date.now() + TTL_DAYS * 86400 * 1000).toUTCString();
    const value = encodeURIComponent(JSON.stringify(collected));
    document.cookie = `${COOKIE_NAME}=${value}; expires=${expires}; path=/; SameSite=Lax`;
  }, []);

  return null;
}
