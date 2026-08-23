import { tagSlug } from '@/lib/tag-slug';

// Pure string helpers, deliberately free of any dependency on Prisma or React
// so the proxy/middleware bundle can import them. The archive-backed resolver
// lives in lib/entity-canon.ts.

// Topic URLs used to carry the raw entity name, percent-escaped:
// /topic/Magic%3A%20The%20Gathering, /topic/Weekly%20Sh%C5%8Dnen%20Jump. That
// put arbitrary punctuation from 900 hand-written articles into the URL space,
// where it is both ugly to a reader and hostile to anything that maps a URL to
// a path — Next's ISR cache writes one directory per rendered route, and a
// colon is not a legal filename character on every platform it might run on.
//
// The slug is the same lossy normalisation tags already use, which is a bonus
// rather than a cost here: "Pokémon" and "Pokemon" reduce to one slug, so the
// URL space agrees with the canonical spelling elected in lib/entity-canon.ts
// instead of contradicting it.
export function entitySlug(entity: string): string {
  return tagSlug(entity);
}

/** Slugs may contain non-ASCII (Japanese titles survive), so hrefs need encoding. */
export function entityHref(entity: string): string {
  return `/topic/${encodeURIComponent(entitySlug(entity))}`;
}
