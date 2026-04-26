import './globals.css';
import type { ReactNode } from 'react';
import { Josefin_Sans, Outfit } from 'next/font/google';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const serif = Josefin_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '600'],
  variable: '--font-serif',
  display: 'swap'
});

const sans = Outfit({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap'
});

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uk" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
        <VercelAnalytics />
        <SpeedInsights />
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
        {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
      </body>
    </html>
  );
}
