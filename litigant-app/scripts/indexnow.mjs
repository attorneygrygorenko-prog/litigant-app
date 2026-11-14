#!/usr/bin/env node
/**
 * Notify IndexNow about changed URLs on litigant.legal. One request reaches
 * every participating engine (Bing — which also feeds DuckDuckGo, Yahoo,
 * Ecosia and ChatGPT search — plus Seznam, Naver, Yep).
 *
 *   npm run indexnow                      # every URL from the live sitemap
 *   npm run indexnow -- <url> [<url> …]   # only these URLs
 *
 * The key file lives at public/<KEY>.txt and is served at the site root.
 */
const HOST = 'www.litigant.legal';
const KEY = 'a1f113dde7306b571ae9fbe5bf7e8785';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

async function sitemapUrls() {
  const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

const urls = process.argv.length > 2 ? process.argv.slice(2) : await sitemapUrls();
if (urls.length === 0) {
  console.error('no URLs to submit');
  process.exit(1);
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: urls.slice(0, 10000) })
});
console.log(`IndexNow: HTTP ${res.status} for ${urls.length} URL(s)`);
if (res.status >= 400) {
  console.error(await res.text());
  process.exit(1);
}
