'use client';

import { useEffect, useState } from 'react';

interface Props {
  defaultText: string;
  linkedinText: string;
  googleText: string;
}

/**
 * SSR-safe UTM-aware swap. Renders defaultText during hydration so
 * server and client agree, then swaps after mount when utm_source is
 * present in URL or sessionStorage.
 */
export default function HeroTag({ defaultText, linkedinText, googleText }: Props) {
  const [text, setText] = useState(defaultText);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    let utm = '';
    try {
      utm = new URL(window.location.href).searchParams.get('utm_source') || '';
      if (!utm) utm = window.sessionStorage.getItem('utm_source') || '';
    } catch {
      /* ignore */
    }
    const v = utm.toLowerCase();
    if (v === 'linkedin') setText(linkedinText);
    else if (v === 'google') setText(googleText);
  }, [linkedinText, googleText]);

  return <span className="hero-tag">{text}</span>;
}
