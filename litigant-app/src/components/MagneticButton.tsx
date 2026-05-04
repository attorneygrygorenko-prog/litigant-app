'use client';

import { useEffect, useRef } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

/**
 * Wraps a CTA anchor / button in an inline-block <span> that subtly tracks
 * the cursor. Effect is desktop-only — pointer:fine + hover:hover required.
 * No-op on touch devices, on reduced-motion, and on SSR.
 */
export default function MagneticButton({
  children,
  className,
  strength = 8
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const node = ref.current;
    if (!node) return;

    const onMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      const tx = Math.max(-1, Math.min(1, dx)) * strength;
      const ty = Math.max(-1, Math.min(1, dy)) * strength;
      node.style.transition = 'transform 0.1s ease';
      node.style.transform = `translate(${tx}px, ${ty}px)`;
    };
    const onLeave = () => {
      node.style.transition = 'transform 0.3s ease';
      node.style.transform = 'translate(0, 0)';
    };

    node.addEventListener('mousemove', onMove);
    node.addEventListener('mouseleave', onLeave);
    return () => {
      node.removeEventListener('mousemove', onMove);
      node.removeEventListener('mouseleave', onLeave);
    };
  }, [strength]);

  return (
    <span ref={ref} className={className} style={{ display: 'inline-block', willChange: 'transform' }}>
      {children}
    </span>
  );
}
