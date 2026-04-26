'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

export default function ServiceViewTracker({ service }: { service: string }) {
  useEffect(() => {
    trackEvent('service_view', { service_name: service });
  }, [service]);

  return null;
}
