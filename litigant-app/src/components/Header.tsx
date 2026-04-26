'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link, usePathname } from '@/i18n/routing';
import { NAV_ITEMS } from '@/lib/nav';
import LangSwitch from './LangSwitch';

export default function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className={`bar ${scrolled ? 'up' : ''}`}>
        <div className="wrap bar-in">
          <Link href="/" className="logo">
            <div className="logo-sq">
              <Image src="/images/logo.png" alt="Litigant Law Office logo" width={28} height={28} />
            </div>
            <div className="logo-text">
              <span className="logo-name">LITIGANT</span>
              <span className="logo-sub">{t('lawOffice')}</span>
            </div>
          </Link>

          <nav>
            {NAV_ITEMS.map((item) => (
              <Link key={item.key} href={item.href} className={`nl ${isActive(item.href) ? 'on' : ''}`}>
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="bar-r">
            <LangSwitch />
            <Link href="/kontakty" className="bar-cta">
              {t('submitCase')}
            </Link>
            <button className="ham" onClick={() => setOpen(true)} aria-label={t('menu')}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <div className={`mob ${open ? 'open' : ''}`}>
        <div className="mob-header">
          <Link href="/" className="logo-name" style={{ color: '#fff' }}>LITIGANT</Link>
          <button
            onClick={() => setOpen(false)}
            aria-label={t('close')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,.7)', fontSize: '28px', padding: '8px', lineHeight: 1 }}
          >
            ✕
          </button>
        </div>
        {NAV_ITEMS.map((item) => (
          <Link key={item.key} href={item.href} className={`nl ${isActive(item.href) ? 'on' : ''}`}>
            {t(item.key)}
          </Link>
        ))}
        <Link href="/kontakty" className="mob-cta">
          {t('submitCaseFull')}
        </Link>
      </div>
    </>
  );
}
