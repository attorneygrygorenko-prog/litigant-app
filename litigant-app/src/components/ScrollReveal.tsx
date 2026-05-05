'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right';
  className?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const hasRevealed = useRef(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    if (hasRevealed.current) {
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !hasRevealed.current) {
            hasRevealed.current = true;
            setVisible(true);
            obs.disconnect();
          }
        }
      },
      // [0, 0.1] catches both "first pixel in" and "10% in" — covers tall
      // sections that never reach 15% intersection. rootMargin shrinks the
      // root rect 50px from the bottom so reveal triggers slightly before
      // the element fully clears the fold.
      { threshold: [0, 0.1], rootMargin: '0px 0px -50px 0px' }
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
        transition: `opacity 0.6s cubic-bezier(.16,1,.3,1) ${delay}ms, transform 0.6s cubic-bezier(.16,1,.3,1) ${delay}ms`
      };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
