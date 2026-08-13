import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { ArticleCard } from '@/components/ArticleCard';
import type { Article } from '@/lib/types';

export const revalidate = 3600;

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

interface Props {
  params: Promise<{ tag: string }>;
}

// The tag space is open-ended, so nothing is prerendered at build. Declaring
// this anyway is what puts the route on ISR: a dynamic segment with no
// generateStaticParams is rendered per request and never cached, which made
// `revalidate` above a no-op and billed a function call for every crawler hit.
export function generateStaticParams() {
  return [] as { tag: string }[];
}

function decodeTag(raw: string): string {
  return decodeURIComponent(raw).replace(/-/g, ' ');
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const label = decodeTag(tag);
  const canonicalUrl = `${BASE}/tag/${tag}`;
  const ogImage = `/og?title=${encodeURIComponent('#' + label + ' — Manga & Anime News')}`;
  // Thin archives (0–1 articles) are noindexed to avoid low-value/duplicate
  // pages eating crawl budget, but stay followable so link equity flows.
  let count = 0;
  try {
    count = await prisma.article.count({ where: { published: true, tags: { has: label } } });
  } catch {}
  return {
    title: `#${label} — Manga & Anime News`,
    description: `Browse all manga and anime articles tagged "${label}" on Catzye.`,
    alternates: { canonical: canonicalUrl },
    ...(count < 2 && { robots: { index: false, follow: true } }),
    openGraph: {
      title: `#${label} | Catzye`,
      description: `Browse all manga and anime articles tagged "${label}" on Catzye.`,
      url: canonicalUrl,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `#${label} | Catzye`,
      images: [ogImage],
    },
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const label = decodeTag(tag);

  const articles = await prisma.article.findMany({
    where: {
      published: true,
      tags: { has: label },
    },
    orderBy: { publishedAt: 'desc' },
    take: 24,
  }) as Article[];

  // Without this, any string a crawler invents mints a cached 200 "no articles"
  // page — a soft 404 that also lets the ISR key space grow without bound.
  if (articles.length === 0) notFound();

  // Related tags: most common co-occurring tags across the result set.
  const tagCounts = new Map<string, number>();
  for (const a of articles) {
    for (const t of a.tags) {
      if (t.toLowerCase() === label.toLowerCase()) continue;
      tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1);
    }
  }
  const relatedTags = [...tagCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([t]) => t);

  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `#${label}`,
    description: `Manga and anime articles tagged "${label}"`,
    url: `${BASE}/tag/${tag}`,
    numberOfItems: articles.length,
    ...(articles.length > 0 && {
      hasPart: articles.slice(0, 10).map((a) => ({
        '@type': 'NewsArticle',
        headline: a.title,
        url: `${BASE}/article/${a.slug}`,
      })),
    }),
  };

  return (
    <div className="max-w-8xl mx-auto px-4 py-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
      <div className="flex items-center gap-3 mb-2">
        <span className="block w-1 h-8 bg-primary" />
        <h1 className="text-3xl font-black tracking-tight">#{label}</h1>
      </div>
      <p className="text-site-gray text-sm mb-8 ml-4">
        {articles.length} article{articles.length !== 1 ? 's' : ''} tagged with &quot;{label}&quot;
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} size="medium" />
        ))}
      </div>

      {relatedTags.length > 0 && (
        <div className="mt-12 pt-6 border-t border-site-border">
          <h2 className="text-sm font-black uppercase tracking-wider mb-3">Related Tags</h2>
          <div className="flex flex-wrap gap-2">
            {relatedTags.map((t) => (
              <Link
                key={t}
                href={`/tag/${encodeURIComponent(t.replace(/\s+/g, '-'))}`}
                className="text-xs px-2.5 py-1 bg-site-light dark:bg-gray-800 text-primary border border-primary/30 hover:bg-primary hover:text-white transition-colors rounded-sm"
              >
                #{t}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
