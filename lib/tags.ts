import { cache } from 'react';
import { prisma } from '@/lib/db';

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
    return null;
  }
});
