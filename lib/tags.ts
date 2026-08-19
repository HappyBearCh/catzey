import { cache } from 'react';
import { prisma } from '@/lib/db';
import { tagSlug as tagSlugOf } from '@/lib/tag-slug';

export { tagSlug, tagHref, safeDecode } from '@/lib/tag-slug';

// The Postgres mirror of tagSlug(), applied to each element of the tags array.
// [[:alnum:]] is Unicode-aware on a UTF-8 database, matching the \p{L}\p{Nd}
// class used on the JS side. The two are verified to agree across every stored
// tag; if you change one, change the other.
const SLUG_SQL = `trim(both '-' from regexp_replace(regexp_replace(lower(t), '[''’]', '', 'g'), '[^[:alnum:]]+', '-', 'g'))`;

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
// both need it and would otherwise each pay for the query.
export const resolveTag = cache(async (slug: string): Promise<ResolvedTag | null> => {
  if (!slug) return null;
  try {
    const rows = await prisma.$queryRawUnsafe<{ tag: string; count: number }[]>(
      `SELECT t AS tag, COUNT(*)::int AS count
       FROM "Article", unnest(tags) AS t
       WHERE published = true AND ${SLUG_SQL} = $1
       GROUP BY t
       ORDER BY COUNT(*) DESC, t ASC`,
      slug,
    );
    if (rows.length === 0) return null;
    return {
      label: rows[0].tag,
      labels: rows.map((r) => r.tag),
      // Slightly over-counts an article that carries two spellings of the same
      // tag; only ever used against a "is this archive thin?" threshold.
      count: rows.reduce((sum, r) => sum + r.count, 0),
    };
  } catch {
    // Raw SQL bypasses the article snapshot in lib/db.ts, so a Postgres outage
    // used to turn every tag page into a 404 rather than a thinner archive.
    // findMany does go through the fallback, so recompute the same aggregate in
    // JS off whatever rows are available.
    return resolveTagFromRows(slug);
  }
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
