'use client';

import { useEffect, useRef, useState } from 'react';

const DARK_SECTION_CLASSES = ['hero', 'sec-dark', 'sec-cases', 'inline-form-sec'];

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setEnabled(true);

    const node = ref.current;
    if (!node) return;

    let mouseX = -1000;
    let mouseY = -1000;
    let curX = mouseX;
    let curY = mouseY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Visibility check — synchronous on mousemove (cheap, no per-frame cost).
      const el = document.elementFromPoint(mouseX, mouseY);
      let inDark = false;
      let cur: Element | null = el;
      while (cur && cur !== document.body) {
        const cl = cur.classList;
        if (cl) {
          for (const c of DARK_SECTION_CLASSES) {
            if (cl.contains(c)) {
              inDark = true;
              break;
            }
          }
          if (inDark) break;
        }
        cur = cur.parentElement;
      }
      node.style.opacity = inDark ? '1' : '0';
    };

    const tick = () => {
      curX += (mouseX - curX) * 0.08;
      curY += (mouseY - curY) * 0.08;
      node.style.transform = `translate3d(${curX - 150}px, ${curY - 150}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 300,
        height: 300,
        pointerEvents: 'none',
        background:
          'radial-gradient(circle, rgba(184,148,30,0.06) 0%, transparent 70%)',
        zIndex: 1,
        opacity: 0,
        transition: 'opacity 0.3s ease',
        willChange: 'transform'
      }}
    />
  );
}
