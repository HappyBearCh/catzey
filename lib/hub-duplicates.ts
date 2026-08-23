import { cache } from 'react';
import { prisma } from '@/lib/db';
import { tagSlug } from '@/lib/tag-slug';
import { entitySlug } from '@/lib/entity-slug';

// Tags and entities are two hand-written lists on the same articles, and they
// overlap heavily: "Astarion" is filed as both. Now that topic URLs are slugged
// the same way tag URLs are, 241 slugs exist at /tag/<s> and /topic/<s> alike —
// and 76 of those pairs list a byte-identical set of articles. Two URLs, one
// page: exactly the duplication Google resolves by picking one itself, usually
// not the one you would have chosen.
//
// So the duplicates are declared rather than left to chance. Where the two
// archives are effectively the same set, the tag points its canonical at the
// topic — the topic hub is the richer page (curated intro, key facts, related
// topics, an aggregate rating where the archive has scored reviews), so it is
// the one worth consolidating onto.
//
// Only near-identical pairs are collapsed. Where a tag genuinely covers fewer
// or different articles than the same-named entity, both stay as they are: a
// cross-canonical between pages that are not duplicates is ignored at best and
// drops the smaller page from the index at worst.
const OVERLAP_THRESHOLD = 0.9;

// Process-memoised, not request-memoised, for the same reason as the entity
// canon: this walks every published article, and React's cache() would repeat
// that walk on every uncached tag and topic render.
const globalForDupes = globalThis as unknown as { hubDuplicates?: Promise<Map<string, string>> };

function buildDuplicateMap(): Promise<Map<string, string>> {
  return (globalForDupes.hubDuplicates ??= computeDuplicateMap());
}

async function computeDuplicateMap(): Promise<Map<string, string>> {
  const byTag = new Map<string, Set<string>>();
  const byEntity = new Map<string, Set<string>>();

  try {
    const rows = await prisma.article.findMany({
      where: { published: true },
      select: { slug: true, tags: true, entities: true },
    });
    for (const row of rows) {
      for (const tag of (row.tags as string[] | null) ?? []) {
        const s = tagSlug(tag);
        if (!s) continue;
        (byTag.get(s) ?? byTag.set(s, new Set()).get(s)!).add(row.slug);
      }
      for (const entity of (row.entities as string[] | null) ?? []) {
        const s = entitySlug(entity);
        if (!s) continue;
        (byEntity.get(s) ?? byEntity.set(s, new Set()).get(s)!).add(row.slug);
      }
    }
  } catch {
    return new Map();
  }

  const duplicates = new Map<string, string>();
  for (const [slug, tagged] of byTag) {
    const entitled = byEntity.get(slug);
    // Both sides have to clear the same >=2 threshold the two routes use to
    // decide indexability; collapsing onto a page that noindexes itself would
    // strand the tag archive.
    if (!entitled || tagged.size < 2 || entitled.size < 2) continue;
    let shared = 0;
    for (const s of tagged) if (entitled.has(s)) shared += 1;
    const union = tagged.size + entitled.size - shared;
    if (union > 0 && shared / union >= OVERLAP_THRESHOLD) duplicates.set(slug, slug);
  }
  return duplicates;
}

/**
 * The topic slug a tag archive should canonicalise onto, or null when the two
 * are not the same page.
 */
export const topicCanonicalForTag = cache(async (slug: string): Promise<string | null> => {
  return (await buildDuplicateMap()).get(slug) ?? null;
});

/** Every tag slug that defers to a topic hub — the sitemap skips these. */
export const duplicateTagSlugs = cache(async (): Promise<Set<string>> => {
  return new Set((await buildDuplicateMap()).keys());
});
