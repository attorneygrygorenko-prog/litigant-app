import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp']
  },
  // 301 redirects — common English/transliterated URL guesses pointing at
  // the real Ukrainian-route slugs. Saves users from 404 dead-ends without
  // adding new routes. Applied for all 3 locales (ua/en/ro).
  async redirects() {
    const pairs = [
      ['/about', '/pro-nas'],
      ['/contacts', '/kontakty'],
      ['/contact', '/kontakty'],
      ['/analytics', '/analityka'],
      ['/blog', '/analityka'],
      ['/expertise', '/ekspertyza'],
      ['/services', '/ekspertyza']
    ];
    const locales = ['ua', 'en', 'ro'];
    return pairs.flatMap(([from, to]) =>
      locales.map((loc) => ({
        source: `/${loc}${from}`,
        destination: `/${loc}${to}`,
        permanent: true
      }))
    );
  }
};

export default withNextIntl(nextConfig);
