import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

import PageHero from '@/components/PageHero';
import { Link } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';
import { SITE_URL, alternates } from '@/lib/seo';
import { getOgPreview } from '@/lib/og';
import { ARTICLES } from '@/data/articles';
import { buildBreadcrumb, buildArticleList } from '@/lib/jsonld';

type DeepLink = { href: string; label: string };

function categoryDeepLink(
  category: string,
  t: (k: string) => string
): DeepLink | null {
  const c = category.toLowerCase();
  if (c.includes('банкрут') || c.includes('bankrupt') || c.includes('faliment')) {
    return { href: '/ekspertyza#bankrutstvo', label: t('deepLinkBankruptcy') };
  }
  if (c.includes('white-collar') || c.includes('white collar')) {
    return { href: '/ekspertyza#wcc', label: t('deepLinkWcc') };
  }
  if (c.includes('gr') || c.includes('лобі') || c.includes('lobby')) {
    return { href: '/ekspertyza#gr', label: t('deepLinkGr') };
  }
  return null;
}

export const revalidate = 86400;

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'blog' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: `${SITE_URL}/${locale}/analityka`, ...alternates('/analityka') }
  };
}

function fmtDate(raw: string | undefined, locale: Locale): string {
  if (!raw) return '';
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return raw;
  const lang = locale === 'ua' ? 'uk-UA' : locale === 'ro' ? 'ro-RO' : 'en-GB';
  return new Intl.DateTimeFormat(lang, { year: 'numeric', month: 'short', day: 'numeric' }).format(d);
}

export default async function BlogPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'blog' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  const previews = await Promise.allSettled(ARTICLES.map((a) => getOgPreview(a.url)));

  const cards = ARTICLES.map((article, i) => {
    const settled = previews[i];
    const og = settled.status === 'fulfilled' ? settled.value : null;
    return {
      url: article.url,
      category: article.category,
      date: fmtDate(article.date, locale),
      rawDate: article.date,
      title: og?.title ?? article.url,
      description: og?.description ?? '',
      image: og?.image ?? '/images/og-fallback.svg',
      hostname: og?.hostname ?? '',
      siteName: og?.hostname ?? ''
    };
  });

  const breadcrumbLd = buildBreadcrumb(locale, [
    { name: tNav('home'), href: '/' },
    { name: t('breadcrumb'), href: '/analityka' }
  ]);
  const articleLd = buildArticleList(
    cards.map((c) => ({
      url: c.url,
      title: c.title,
      description: c.description,
      image: c.image && !c.image.startsWith('/') ? c.image : null,
      datePublished: c.rawDate,
      publisher: c.siteName
    }))
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <PageHero breadcrumb={t('breadcrumb')} title={t('title')} lead={t('lead')} />

      <section className="sec">
        <div className="wrap">
          <div className="blog-g">
            {cards.map((card, i) => {
              const deep = categoryDeepLink(card.category, t);
              return (
                <div key={`${card.url}-${i}`} className="blog-cell">
                  <a
                    href={card.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="blog-card"
                  >
                    <div className="blog-img">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={card.image} alt="" loading="lazy" referrerPolicy="no-referrer" />
                    </div>
                    {card.category && <span className="blog-cat">{card.category}</span>}
                    <h3>{card.title}</h3>
                    {card.description && <p>{card.description}</p>}
                    <div className="blog-meta">
                      <span>{card.date || t('author')}</span>
                      <span className="blog-src">
                        {card.hostname} <span className="ext-arr">↗</span>
                      </span>
                    </div>
                  </a>
                  {deep && (
                    <Link href={deep.href} className="blog-deep-link">
                      {deep.label}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
