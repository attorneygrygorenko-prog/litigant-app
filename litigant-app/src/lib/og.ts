import * as cheerio from 'cheerio';
import { unstable_cache } from 'next/cache';

export type OgPreview = {
  url: string;
  title: string;
  description: string;
  image: string;
  hostname: string;
  siteName: string;
};

const FETCH_TIMEOUT_MS = 10_000;
const MAX_BYTES = 768 * 1024;
const FALLBACK_IMAGE = '/images/og-fallback.svg';
const UA_PRIMARY =
  'Mozilla/5.0 (compatible; LitigantBot/1.0; +https://litigant.legal) AppleWebKit/537.36';
const UA_FALLBACK = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';

function hostnameOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

function absolute(maybeRelative: string, base: string): string {
  try {
    return new URL(maybeRelative, base).toString();
  } catch {
    return maybeRelative;
  }
}

async function fetchOnce(url: string, ua: string): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, {
      signal: ctrl.signal,
      redirect: 'follow',
      headers: {
        'user-agent': ua,
        accept: 'text/html,application/xhtml+xml',
        'accept-language': 'uk,en;q=0.9,ro;q=0.8'
      }
    });
  } finally {
    clearTimeout(timer);
  }
}

async function readHead(res: Response): Promise<string> {
  if (!res.body) throw new Error('no body');
  const reader = res.body.getReader();
  const decoder = new TextDecoder('utf-8', { fatal: false });
  let received = 0;
  let html = '';
  while (received < MAX_BYTES) {
    const { value, done } = await reader.read();
    if (done) break;
    received += value.byteLength;
    html += decoder.decode(value, { stream: true });
    if (html.includes('</head>')) break;
  }
  try {
    await reader.cancel();
  } catch {}
  return html;
}

async function fetchHtml(url: string): Promise<string> {
  let res = await fetchOnce(url, UA_PRIMARY);
  // Some sites (Liga.net, Cloudflare-protected pages) gate the LitigantBot UA — retry as Googlebot.
  if (res.status === 403 || res.status === 401 || res.status === 429) {
    res = await fetchOnce(url, UA_FALLBACK);
  }
  if (!res.ok) throw new Error(`status ${res.status}`);
  return readHead(res);
}

function parsePreview(url: string, html: string): OgPreview {
  const $ = cheerio.load(html);

  const meta = (selector: string) => $(selector).attr('content')?.trim() ?? '';

  const title =
    meta('meta[property="og:title"]') ||
    meta('meta[name="twitter:title"]') ||
    $('title').first().text().trim();

  const description =
    meta('meta[property="og:description"]') ||
    meta('meta[name="twitter:description"]') ||
    meta('meta[name="description"]');

  const rawImage =
    meta('meta[property="og:image:secure_url"]') ||
    meta('meta[property="og:image:url"]') ||
    meta('meta[property="og:image"]') ||
    meta('meta[name="twitter:image"]') ||
    meta('meta[name="twitter:image:src"]');

  const image = rawImage ? absolute(rawImage, url) : FALLBACK_IMAGE;
  const siteName = meta('meta[property="og:site_name"]');
  const hostname = hostnameOf(url);

  return {
    url,
    title: title.slice(0, 240) || hostname || url,
    description: description.slice(0, 320),
    image,
    hostname,
    siteName: siteName || hostname
  };
}

async function buildPreview(url: string): Promise<OgPreview> {
  try {
    const html = await fetchHtml(url);
    return parsePreview(url, html);
  } catch (err) {
    console.error('[og] fetch failed', url, (err as Error).message);
    const hostname = hostnameOf(url);
    return {
      url,
      title: hostname || url,
      description: '',
      image: FALLBACK_IMAGE,
      hostname,
      siteName: hostname
    };
  }
}

export const getOgPreview = unstable_cache(
  async (url: string) => buildPreview(url),
  ['og-preview-v2'],
  { revalidate: 86400, tags: ['og-preview'] }
);
