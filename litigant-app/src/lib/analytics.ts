type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[][] };
  }
}

export function trackEvent(eventName: string, params?: Params) {
  if (typeof window === 'undefined') return;

  const cleaned: Params = {};
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== '') cleaned[k] = v;
    }
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, cleaned);
  } else if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: eventName, ...cleaned });
  }

  if (typeof window.fbq === 'function') {
    window.fbq('track', eventName, cleaned);
  }
}

export function trackConversion(label: string, params?: Params) {
  const id = process.env.NEXT_PUBLIC_GADS_ID;
  const conv = process.env.NEXT_PUBLIC_GADS_CONVERSION_LABEL;
  if (!id || !conv || typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', 'conversion', {
    send_to: `${id}/${conv}`,
    event_label: label,
    ...params
  });
}

// Microsoft Clarity custom tag — used to segment session recordings
// (e.g. only "users who submitted a lead"). No-op when Clarity hasn't loaded
// or consent was declined.
export function claritySet(key: string, value: string) {
  if (typeof window === 'undefined') return;
  if (typeof window.clarity !== 'function') return;
  try {
    window.clarity('set', key, value);
  } catch {
    /* swallow */
  }
}
