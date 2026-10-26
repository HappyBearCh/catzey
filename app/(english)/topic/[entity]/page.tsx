import type { Metadata } from 'next';
import Link from 'next/link';
import { NumberReading } from '@/components/NumberReading';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { ArticleCard } from '@/components/ArticleCard';
import { getTopicInfo, getAllTopicInfo } from '@/lib/topic-info';
import { getTopicArticles } from '@/lib/articles';
import { reviewOverall, RATING_SCALE } from '@/lib/reviews';
import type { Article, ReviewData } from '@/lib/types';
import { metaDescription, fullerDescription, essayLdRef, HUB_MIN_TEXTS } from '@/lib/seo';
import { canonicalEntity, canonicalEntitySlugs, entityFromSlug, isIndexableEntity, hubName } from '@/lib/entity-canon';
import { entityHref, entitySlug } from '@/lib/entity-slug';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { HubIntro } from '@/components/HubIntro';
import { findHubReference, getHubIntro, getHubIntroText } from '@/lib/hub-intro';

// Hubs are assembled from a checked-in edition (see lib/db.ts) and cannot change
// between deploys, so a daily revalidate only re-rendered identical output and
// paid an ISR write per region for it. See the note on the tag route.
export const revalidate = false;

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

interface Props {
  params: Promise<{ entity: string }>;
}

// Entities are extracted from the articles, and the articles are a finite
// checked-in file — so the hub set is known at build time after all. Every hub
// the sitemap lists (the HUB_MIN_TEXTS set, matching the page's own indexability cut) is
// prerendered to a static file; the thin, noindexed remainder renders once on
// demand and caches until the next deploy.
export async function generateStaticParams() {
  // Curated hubs are indexable at any essay count, so they are prerendered too.
  const curated = await Promise.all(getAllTopicInfo().map(async (t) => entitySlug(await canonicalEntity(t.name))));
  const slugs = new Set([...(await canonicalEntitySlugs(HUB_MIN_TEXTS)), ...curated.filter(Boolean)]);
  return [...slugs].map((entity) => ({ entity }));
}

// The segment is a slug ("weekly-shonen-jump"). Legacy links carrying the raw
// name still resolve — the proxy 308s them to the slug, but a direct hit must
// not 404 in the meantime — so an unmatched slug falls back to the decoded
// value and is canonicalised from there.
async function resolveEntity(raw: string): Promise<string> {
  let decoded = raw;
  try { decoded = decodeURIComponent(raw); } catch {}
  // A curated hub with no essays yet has no entity to resolve to; its curated
  // name ("Frieren") beats the raw segment ("frieren") as the page's name.
  return (await entityFromSlug(decoded)) ?? getTopicInfo(decoded)?.name ?? decoded;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { entity } = await params;
  const name = await resolveEntity(entity);
  // The archive spells several entities more than one way. Every spelling keeps
  // resolving, but they all point their canonical at the elected one so the
  // variants consolidate into a single hub instead of competing as duplicates.
  const canonicalName = await canonicalEntity(name);
  const canonicalUrl = `${BASE}${entityHref(canonicalName)}`;
  const ogImage = `/og?title=${encodeURIComponent(name)}`;
  const info = getTopicInfo(name);
  // The layout 404s these; the metadata must not describe a hub that isn't there.
  const all = await getTopicArticles(name);
  const listed = all.filter((a) => !a.generated);
  if (!info && all.length === 0) return {};
  // With no intro of its own, the hub is described by what it holds. Essay
  // titles lead with their place in a series, which a snippet does not need.
  const essay = (a: Article) => `“${a.title.replace(/^Part \d+:\s*/, '')}”`;
  const holds =
    listed.length > 0
      ? `${listed.length} essay${listed.length === 1 ? '' : 's'} on ${name}, among them ${essay(listed[0])}.`
      : null;
  const description =
    info?.intro ??
    getHubIntroText('topic', entitySlug(name)) ??
    (findHubReference(name) ? `Essays on ${name}. ${findHubReference(name)!.summary}` : null) ??
    (holds && fullerDescription(holds, listed.slice(1, 3).map((a) => `Also ${essay(a)}.`).join(' '))) ??
    `Everything on Catzye about ${name} — essays and reference entries, filed by number.`;
  // Thin archives (below HUB_MIN_TEXTS hand-written articles) are noindexed to avoid low-value
  // pages eating crawl budget, but stay followable so link equity flows.
  const count = listed.length;
  return {
    title: `${name} — Manga & Anime`,
    description: metaDescription(description),
    alternates: { canonical: canonicalUrl },
    // Thin archives are noindexed. A curated hub carries its own intro and facts,
    // so it is indexable from its first essay; with none it is a shorter copy of
    // the series' wiki entry, which is the page that should answer the search.
    ...((count === 0 || (count < HUB_MIN_TEXTS && !info)) && { robots: { index: false, follow: true } }),
    openGraph: {
      siteName: 'Catzye',
      locale: 'en_US',
      type: 'website',
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
  const name = await resolveEntity(entity);

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
  // Folded to the elected spelling, so a hub is linked once and at the URL
  // that does not redirect.
  const self = await hubName(name);
  const relatedCandidates = [
    ...new Set(
      await Promise.all([...entityCounts.entries()].sort((a, b) => b[1] - a[1]).map(([e]) => hubName(e))),
    ),
  ].filter((e) => e !== self);
  const relatedTopics = (
    await Promise.all(relatedCandidates.map(async (e) => ((await isIndexableEntity(e)) ? e : null)))
  )
    .filter((e): e is string => e !== null)
    .slice(0, 12);

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
    description: topicInfo?.intro ?? `Everything on Catzye about ${name}`,
    url: `${BASE}${entityHref(name)}`,
    numberOfItems: articles.length,
    ...(articles.length > 0 && {
      hasPart: articles.slice(0, 10).map(essayLdRef),
    }),
  };

  const workLd = aggregateRating
    ? {
        '@context': 'https://schema.org',
        '@type': 'CreativeWorkSeries',
        name,
        url: `${BASE}${entityHref(name)}`,
        aggregateRating,
      }
    : null;

  return (
    <div className="max-w-8xl mx-auto px-4 py-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
      {workLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(workLd) }} />
      )}

      <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name, href: entityHref(name) }]} className="mb-5" />

      <h1 className="font-display text-3xl md:text-[2.6rem] font-bold tracking-tight leading-tight text-ink dark:text-parchment mb-2">{name}</h1>
      <p className="text-site-gray text-sm mb-6">
        {articles.length} article{articles.length !== 1 ? 's' : ''} about {name}
      </p>

      {topicInfo && (
        <div className="mb-8 manga-panel p-5 max-w-3xl">
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

      <HubIntro
        intro={topicInfo ? null : getHubIntro('topic', entitySlug(name))}
        reference={findHubReference(name)}
        className="mb-8"
      />

      <NumberReading title={name} label="subject" className="mb-8 max-w-3xl" />

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
          <h2 className="chapter-title text-lg mb-4"><span>Related Topics</span></h2>
          <div className="flex flex-wrap gap-2">
            {relatedTopics.map((e) => (
              <Link
                key={e}
                href={entityHref(e)}
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
