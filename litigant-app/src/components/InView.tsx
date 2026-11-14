'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/** Adds `lx-in` to its wrapper once it scrolls into view (one-shot). CSS does the motion. */
export default function InView({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${className} ${inView ? 'lx-in' : ''}`.trim()}>
      {children}
    </div>
  );
}
