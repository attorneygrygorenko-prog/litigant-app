import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

const AI_BOTS = ['ClaudeBot', 'Claude-Web', 'GPTBot', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended'];
const SEARCH_BOTS = ['Googlebot', 'Bingbot', 'DuckDuckBot', 'YandexBot'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/api/og', '/llms.txt', '/llms-full.txt'],
        disallow: ['/api/lead']
      },
      ...AI_BOTS.map((ua) => ({
        userAgent: ua,
        allow: ['/', '/llms.txt', '/llms-full.txt']
      })),
      ...SEARCH_BOTS.map((ua) => ({ userAgent: ua, allow: '/' }))
    ],
    sitemap: [`${SITE_URL}/sitemap.xml`],
    host: SITE_URL
  };
}
