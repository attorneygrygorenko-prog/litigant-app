'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useTransition } from 'react';
import type { Locale } from '@/i18n/routing';

const LOCALES: Locale[] = ['ua', 'en', 'ro'];

interface LangSwitchProps {
  /** Additional className to append to .lsw (e.g., "mob-lang" for in-menu variant). */
  className?: string;
}

export default function LangSwitch({ className = '' }: LangSwitchProps = {}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  const switchTo = (next: Locale) => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  const wrapperClass = className ? `lsw ${className}` : 'lsw';

  return (
    <div className={wrapperClass}>
      {LOCALES.map((l) => (
        <button
          key={l}
          type="button"
          className={`lb ${l === locale ? 'on' : ''}`}
          onClick={() => switchTo(l)}
          aria-label={`Switch to ${l.toUpperCase()}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
