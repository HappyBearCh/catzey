import type { Metadata } from 'next';
import Link from 'next/link';
import { NumberReading } from '@/components/NumberReading';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { ArticleCard } from '@/components/ArticleCard';
import { getTopicInfo } from '@/lib/topic-info';
import { getTopicArticles } from '@/lib/articles';
import { reviewOverall, RATING_SCALE } from '@/lib/reviews';
import type { Article, ReviewData } from '@/lib/types';

export const revalidate = 86400; // archive content; on-demand revalidation covers real changes

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

interface Props {
  params: Promise<{ entity: string }>;
}

// Entities are extracted from articles, so the set is open-ended and nothing is
// prerendered at build. Declaring this anyway is what puts the route on ISR: a
// dynamic segment with no generateStaticParams renders per request and is never
// cached, which made `revalidate` above a no-op.
export function generateStaticParams() {
  return [] as { entity: string }[];
}

function decodeEntity(raw: string): string {
  return decodeURIComponent(raw);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { entity } = await params;
  const name = decodeEntity(entity);
  const canonicalUrl = `${BASE}/topic/${entity}`;
  const ogImage = `/og?title=${encodeURIComponent(name + ' — Manga & Anime News')}`;
  const info = getTopicInfo(name);
  const description = info?.intro ?? `All manga and anime news and updates about ${name} on Catzye.`;
  // Thin archives (0–1 articles) are noindexed to avoid low-value/duplicate
  // pages eating crawl budget, but stay followable so link equity flows.
  let count = 0;
  try {
    count = await prisma.article.count({ where: { published: true, entities: { has: name } } });
  } catch {}
  return {
    title: `${name} — Manga & Anime News`,
    description,
    alternates: { canonical: canonicalUrl },
    // Thin archives are noindexed — but a curated hub is substantial content, so
    // it stays indexable even before it has accumulated its own articles.
    ...(count < 2 && !info && { robots: { index: false, follow: true } }),
    openGraph: {
      title: `${name} | Catzye`,
      description,
      url: canonicalUrl,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${name} | Catzye`,
      images: [ogImage],
    },
  };
}

export default async function TopicPage({ params }: Props) {
  const { entity } = await params;
  const name = decodeEntity(entity);

  // Shared with the gating layout via React's request cache, so the existence
  // check that keeps notFound() returning a real 404 costs no extra query.
  const articles = await getTopicArticles(name);

  // A curated hub is real content and stays up even before it has articles, but
  // an arbitrary entity a crawler invented is a soft 404 — and every one of them
  // would otherwise mint its own cache entry.
  if (articles.length === 0 && !getTopicInfo(name)) notFound();

  // Related topics: most common co-occurring entities across the result set.
  const entityCounts = new Map<string, number>();
  for (const a of articles) {
    for (const e of a.entities) {
      if (e.toLowerCase() === name.toLowerCase()) continue;
      entityCounts.set(e, (entityCounts.get(e) ?? 0) + 1);
    }
  }
  const relatedTopics = [...entityCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([e]) => e);

  const topicInfo = getTopicInfo(name);

  // Roll up scored review articles about this entity into an AggregateRating so
  // the work itself can surface with a star rating in search.
  const scores = articles
    .map((a) => reviewOverall(a.reviewData as ReviewData | null))
    .filter((n): n is number => n != null);
  const aggregateRating = scores.length >= 2
    ? {
        '@type': 'AggregateRating',
        ratingValue: Math.round((scores.reduce((s, n) => s + n, 0) / scores.length) * 10) / 10,
        bestRating: RATING_SCALE,
        worstRating: 1,
        ratingCount: scores.length,
      }
    : null;

  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description: topicInfo?.intro ?? `Manga and anime news about ${name}`,
    url: `${BASE}/topic/${entity}`,
    numberOfItems: articles.length,
    ...(articles.length > 0 && {
      hasPart: articles.slice(0, 10).map((a) => ({
        '@type': 'NewsArticle',
        headline: a.title,
        url: `${BASE}/article/${a.slug}`,
      })),
    }),
  };

  const workLd = aggregateRating
    ? {
        '@context': 'https://schema.org',
        '@type': 'CreativeWorkSeries',
        name,
        url: `${BASE}/topic/${entity}`,
        aggregateRating,
      }
    : null;

  return (
    <div className="max-w-8xl mx-auto px-4 py-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
      {workLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(workLd) }} />
      )}

      <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span aria-hidden="true">›</span>
        <span className="text-primary font-bold">{name}</span>
      </nav>

      <div className="flex items-center gap-3 mb-2">
        <span className="block w-1 h-8 bg-primary" />
        <h1 className="text-3xl font-semibold tracking-tight">{name}</h1>
      </div>
      <p className="text-site-gray text-sm mb-6 ml-4">
        {articles.length} article{articles.length !== 1 ? 's' : ''} about {name}
      </p>

      <NumberReading title={name} label="subject" className="mb-8 ml-4 max-w-3xl" />

      {topicInfo && (
        <div className="mb-8 ml-4 p-5 bg-site-light dark:bg-gray-900 border border-site-border dark:border-gray-700 rounded-sm">
          <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
            {topicInfo.intro}
          </p>
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {topicInfo.facts.map((f) => (
              <div key={f.label}>
                <dt className="text-2xs font-semibold uppercase tracking-wider text-primary mb-0.5">
                  {f.label}
                </dt>
                <dd className="text-sm font-semibold text-gray-800 dark:text-gray-200">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {articles.length === 0 ? (
        <div className="py-20 text-center text-gray-400">
          <p className="text-xl font-bold mb-2">No articles found</p>
          <p className="text-sm">Try searching instead.</p>
          <Link href={`/search?q=${encodeURIComponent(name)}`} className="mt-4 inline-block text-primary hover:underline text-sm font-bold">
            Search for &ldquo;{name}&rdquo; →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} size="medium" />
          ))}
        </div>
      )}

      {relatedTopics.length > 0 && (
        <div className="mt-12 pt-6 border-t border-site-border">
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-3">Related Topics</h2>
          <div className="flex flex-wrap gap-2">
            {relatedTopics.map((e) => (
              <Link
                key={e}
                href={`/topic/${encodeURIComponent(e)}`}
                className="text-xs px-2.5 py-1 bg-blue-50 dark:bg-gray-800 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900 hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors rounded-sm"
              >
                {e}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
