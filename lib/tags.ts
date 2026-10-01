import { cache } from 'react';
import { prisma } from '@/lib/db';
import { tagSlug as tagSlugOf } from '@/lib/tag-slug';

export { tagSlug, tagHref, safeDecode } from '@/lib/tag-slug';

export interface ResolvedTag {
  /** Display label — the spelling used by the most articles. */
  label: string;
  /** Every stored spelling that shares this slug. */
  labels: string[];
  /** Articles carrying any of those spellings. */
  count: number;
}

// Resolving a slug back to its stored labels needs a scan of the tags arrays, so
// it is wrapped in React's request cache: generateMetadata and the page body
// both need it and would otherwise each pay for the scan.
export const resolveTag = cache(async (slug: string): Promise<ResolvedTag | null> => {
  if (!slug) return null;
  return resolveTagFromRows(slug);
});

async function resolveTagFromRows(slug: string): Promise<ResolvedTag | null> {
  try {
    const rows = await prisma.article.findMany({
      where: { published: true },
      select: { tags: true },
    });
    const counts = new Map<string, number>();
    for (const row of rows) {
      for (const tag of row.tags ?? []) {
        if (tagSlugOf(tag) !== slug) continue;
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      }
    }
    if (counts.size === 0) return null;
    const ordered = [...counts.entries()].sort(
      (a, b) => b[1] - a[1] || a[0].localeCompare(b[0]),
    );
    return {
      label: ordered[0][0],
      labels: ordered.map(([tag]) => tag),
      count: ordered.reduce((sum, [, n]) => sum + n, 0),
    };
  } catch {
    return null;
  }
}

/**
 * Every tag slug carried by at least `minCount` published articles.
 *
 * Used by the tag route's generateStaticParams. The tag space is open-ended in
 * principle, but the edition it is derived from is a checked-in file, so the
 * whole set is knowable at build time — and prerendering it is what keeps the
 * route off the ISR write path entirely. The threshold matches the one the page
 * uses to decide indexability: archives below it are noindexed and draw almost
 * no traffic, so they are left to render on demand and cache permanently rather
 * than lengthening every build.
 */
export const allTagSlugs = cache(async (minCount = 1): Promise<string[]> => {
  try {
    const rows = await prisma.article.findMany({
      where: { published: true },
      select: { tags: true },
    });
    const counts = new Map<string, number>();
    for (const row of rows) {
      for (const tag of row.tags ?? []) {
        const slug = tagSlugOf(tag);
        if (!slug) continue;
        counts.set(slug, (counts.get(slug) ?? 0) + 1);
      }
    }
    return [...counts.entries()]
      .filter(([, n]) => n >= minCount)
      .map(([slug]) => slug)
      .sort();
  } catch {
    return [];
  }
});
