'use client';

import type { ReactNode } from 'react';
import { trackEvent } from '@/lib/analytics';

type Props = {
  href: string;
  event: string;
  params?: Record<string, string>;
  className?: string;
  children: ReactNode;
  target?: string;
  rel?: string;
};

export default function TrackedLink({ href, event, params, className, children, target, rel }: Props) {
  return (
    <a
      href={href}
      className={className}
      target={target}
      rel={rel}
      onClick={() => trackEvent(event, params)}
    >
      {children}
    </a>
  );
}
