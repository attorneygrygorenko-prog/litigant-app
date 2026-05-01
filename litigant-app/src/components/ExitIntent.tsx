'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

// Heavy modal + form code is lazy-loaded only after the trigger fires.
// This keeps the layout-level mount lightweight on every page.
const ExitIntentDialog = dynamic(() => import('./ExitIntentDialog'), { ssr: false });

const SESSION_KEY = 'exit_intent_shown';
const IDLE_MS = 45_000;

export default function ExitIntent() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!pathname || /\/kontakty\/?$/.test(pathname)) return;
    try {
      if (window.sessionStorage.getItem(SESSION_KEY)) return;
    } catch {
      /* sessionStorage unavailable — bail to avoid spamming */
      return;
    }

    let fired = false;
    const fire = () => {
      if (fired) return;
      fired = true;
      try {
        window.sessionStorage.setItem(SESSION_KEY, '1');
      } catch {
        /* ignore */
      }
      setShow(true);
    };

    const onMouseLeave = (e: MouseEvent) => {
      // Top-edge intent: cursor crosses above the viewport.
      if (e.clientY <= 0) fire();
    };

    document.addEventListener('mouseleave', onMouseLeave);
    const idleTimer = window.setTimeout(fire, IDLE_MS);

    return () => {
      document.removeEventListener('mouseleave', onMouseLeave);
      window.clearTimeout(idleTimer);
    };
  }, [pathname]);

  if (!show) return null;
  return <ExitIntentDialog onClose={() => setShow(false)} />;
}
