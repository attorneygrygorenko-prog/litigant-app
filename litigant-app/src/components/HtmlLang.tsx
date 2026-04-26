'use client';

import { useEffect } from 'react';
import type { Locale } from '@/i18n/routing';
import { HTML_LANG } from '@/lib/seo';

export default function HtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = HTML_LANG[locale];
  }, [locale]);
  return null;
}
