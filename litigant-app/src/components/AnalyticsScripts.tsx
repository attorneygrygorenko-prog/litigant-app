'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';

const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
const LI_PARTNER_ID = process.env.NEXT_PUBLIC_LI_PARTNER_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;
const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID;

const COOKIE_NAME = 'litigant_consent';
type Consent = 'accepted' | 'declined' | null;

function readConsent(): Consent {
  if (typeof document === 'undefined') return null;
  const m = document.cookie.split('; ').find((c) => c.startsWith(`${COOKIE_NAME}=`));
  if (!m) return null;
  const v = m.split('=').slice(1).join('=');
  return v === 'accepted' || v === 'declined' ? v : null;
}

export default function AnalyticsScripts({ requiresConsent }: { requiresConsent: boolean }) {
  // Even when a locale doesn't legally require consent, we still respect any
  // existing user choice — accept = full load; null + no requirement = full load.
  const [consent, setConsent] = useState<Consent>(() => (requiresConsent ? null : 'accepted'));
  const pathname = usePathname();

  useEffect(() => {
    if (!requiresConsent) {
      setConsent('accepted');
      return;
    }
    setConsent(readConsent());
    const onChange = () => setConsent(readConsent());
    window.addEventListener('cookie-consent-change', onChange);
    return () => window.removeEventListener('cookie-consent-change', onChange);
  }, [requiresConsent]);

  useEffect(() => {
    if (!FB_PIXEL_ID) return;
    if (consent !== 'accepted') return;
    if (typeof window === 'undefined') return;
    const w = window as unknown as { fbq?: (...args: unknown[]) => void };
    if (typeof w.fbq === 'function') w.fbq('track', 'PageView');
  }, [pathname, consent]);

  const fbAllowed = !!FB_PIXEL_ID && consent === 'accepted';
  const liAllowed = !!LI_PARTNER_ID && consent === 'accepted';
  // Clarity records sessions → consent-gated. GA/GADS stays always-on as
  // baseline analytics (no advertising profile), so it works on `declined`.
  const clarityAllowed = !!CLARITY_ID && consent === 'accepted';

  return (
    <>
      {fbAllowed && (
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
            document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {liAllowed && (
        <Script id="linkedin-insight" strategy="lazyOnload">
          {`
            _linkedin_partner_id = "${LI_PARTNER_ID}";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript"; b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);
            })(window.lintrk);
          `}
        </Script>
      )}

      {clarityAllowed && (
        <Script id="ms-clarity" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_ID}");
          `}
        </Script>
      )}

      {GADS_ID && (
        <>
          <Script
            id="gads-loader"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GADS_ID}`}
          />
          <Script id="gads-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GADS_ID}');
            `}
          </Script>
        </>
      )}
    </>
  );
}
