'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right';
  className?: string;
  /** Apply a contents-style wrapper (no <div>) so grid / flex parents
      keep treating children as direct items. Use for .prac-grid etc. */
  asContents?: boolean;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className,
  asContents = false
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const offset =
    direction === 'left' ? '-24px, 0' : direction === 'right' ? '24px, 0' : '0, 24px';

  const style: React.CSSProperties = reduced
    ? {}
    : {
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate(0, 0)' : `translate(${offset})`,
        transition: `opacity 0.6s cubic-bezier(.16,1,.3,1) ${delay}ms, transform 0.6s cubic-bezier(.16,1,.3,1) ${delay}ms`,
        ...(asContents ? { display: 'contents' } : {})
      };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
