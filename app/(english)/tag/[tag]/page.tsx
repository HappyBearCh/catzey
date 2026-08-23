import type { Metadata } from 'next';
import Link from 'next/link';
import { NumberReading } from '@/components/NumberReading';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { ArticleCard } from '@/components/ArticleCard';
import { tagSlug, tagHref, safeDecode, resolveTag } from '@/lib/tags';
import type { Article } from '@/lib/types';
import { topicCanonicalForTag } from '@/lib/hub-duplicates';

export const revalidate = 86400; // archive content; on-demand revalidation covers real changes

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const slug = tagSlug(safeDecode(tag));
  const resolved = await resolveTag(slug);
  // Unresolvable, or about to be redirected to the canonical slug — either way
  // the metadata is never the one that ends up in the index.
  if (!resolved || slug !== tag) return {};

  const label = resolved.label;
  // Where the same slug names an entity carrying effectively the same articles,
  // the topic hub is the canonical page for that subject and this archive is a
  // second address for it. See lib/hub-duplicates.ts.
  const duplicateOfTopic = await topicCanonicalForTag(slug);
  const canonicalUrl = duplicateOfTopic
    ? `${BASE}/topic/${encodeURIComponent(duplicateOfTopic)}`
    : `${BASE}/tag/${encodeURIComponent(slug)}`;
  const ogImage = `/og?title=${encodeURIComponent('#' + label)}`;
  const description = `Browse all manga and anime articles tagged "${label}" on Catzye.`;
  return {
    title: `#${label} — Manga & Anime`,
    description,
    alternates: { canonical: canonicalUrl },
    // Thin archives (0–1 articles) are noindexed to avoid low-value/duplicate
    // pages eating crawl budget, but stay followable so link equity flows.
    ...(resolved.count < 2 && { robots: { index: false, follow: true } }),
    openGraph: {
      siteName: 'Catzye',
      locale: 'en_US',
      type: 'website',
      title: `#${label} | Catzye`,
      description,
      url: `${BASE}/tag/${encodeURIComponent(slug)}`,
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
  const slug = tagSlug(safeDecode(tag));
  // Non-canonical spellings ("One%20Piece", "Editor-In-Chief") are 308'd to the
  // canonical slug by the proxy, before this ever renders. Redirecting here
  // instead would not work: loading.tsx puts a Suspense boundary above this
  // page, so the 200 shell is already flushed by the time a redirect could be
  // thrown and Next degrades it to a <meta http-equiv="refresh"> — a soft
  // redirect that leaves the duplicate URL answering 200.
  const resolved = await resolveTag(slug);
  // Without this, any string a crawler invents mints a cached 200 "no articles"
  // page — a soft 404 that also lets the ISR key space grow without bound.
  if (!resolved) notFound();
  const label = resolved.label;

  const articles = await prisma.article.findMany({
    where: {
      published: true,
      // Matches every stored spelling that shares this slug, so the merged
      // archive shows all of them.
      tags: { hasSome: resolved.labels },
    },
    orderBy: { publishedAt: 'desc' },
    take: 24,
  }) as Article[];

  if (articles.length === 0) notFound();

  // Related tags: most common co-occurring tags across the result set, deduped
  // by slug so variant spellings do not show up twice.
  const tagCounts = new Map<string, { label: string; count: number }>();
  for (const a of articles) {
    for (const t of a.tags) {
      const s = tagSlug(t);
      if (!s || s === slug) continue;
      const cur = tagCounts.get(s);
      if (cur) cur.count++;
      else tagCounts.set(s, { label: t, count: 1 });
    }
  }
  const relatedTags = [...tagCounts.values()]
    .sort((a, b) => b.count - a.count)
    .slice(0, 12)
    .map((t) => t.label);

  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `#${label}`,
    description: `Manga and anime articles tagged "${label}"`,
    url: `${BASE}/tag/${encodeURIComponent(slug)}`,
    numberOfItems: articles.length,
    ...(articles.length > 0 && {
      hasPart: articles.slice(0, 10).map((a) => ({
        '@type': 'Article',
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
        <h1 className="text-3xl font-semibold tracking-tight">#{label}</h1>
      </div>
      <p className="text-site-gray text-sm mb-8 ml-4">
        {articles.length} article{articles.length !== 1 ? 's' : ''} tagged with &quot;{label}&quot;
      </p>

      <NumberReading title={label} label="tag" className="mb-8 ml-4 max-w-3xl" />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} size="medium" />
        ))}
      </div>

      {relatedTags.length > 0 && (
        <div className="mt-12 pt-6 border-t border-site-border">
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-3">Related Tags</h2>
          <div className="flex flex-wrap gap-2">
            {relatedTags.map((t) => (
              <Link
                key={t}
                href={tagHref(t)}
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
