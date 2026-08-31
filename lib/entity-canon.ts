import { cache } from 'react';
import { prisma } from '@/lib/db';
import { entitySlug } from '@/lib/entity-slug';

// Entity strings were written by hand across 900-odd articles, so the same
// thing is spelled several ways: "Weekly Shonen Jump" on 44 of them and
// "Weekly Shōnen Jump" on 49, "Studio BONES" and "Studio Bones", "Pokémon" and
// "Pokemon". Left alone that gives /topic two half-populated, near-identical
// hubs competing for the same query — twenty such pairs across the archive.
//
// This module folds the variants together. One spelling is elected canonical
// and its hub lists every article filed under any spelling; the others keep
// working as URLs but point their canonical tag at the elected one.

function normalizeKey(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '');
}

interface Canon {
  /** normalized key -> elected display spelling */
  preferred: Map<string, string>;
  /** normalized key -> every spelling seen in the archive */
  variants: Map<string, string[]>;
}

// Memoised per process, not per request. React's cache() only dedupes within a
// single render pass, so a cache()d builder rescanned all 922 articles on every
// uncached hit to /topic, /tag and the article pages — enough GC churn to take
// the server down under a sustained crawl. The archive is a set of files that
// never change at runtime (see lib/db.ts), so the map is built once and held.
const globalForCanon = globalThis as unknown as { entityCanon?: Promise<Canon> };

function buildCanon(): Promise<Canon> {
  return (globalForCanon.entityCanon ??= computeCanon());
}

async function computeCanon(): Promise<Canon> {
  const counts = new Map<string, number>();
  try {
    const rows = await prisma.article.findMany({
      where: { published: true },
      select: { entities: true },
    });
    for (const row of rows) {
      for (const entity of (row.entities as string[] | null) ?? []) {
        const name = entity.trim();
        if (name) counts.set(name, (counts.get(name) ?? 0) + 1);
      }
    }
  } catch {
    // No archive available — every name is its own canon.
  }

  const grouped = new Map<string, string[]>();
  for (const name of counts.keys()) {
    const key = normalizeKey(name);
    if (!key) continue;
    const bucket = grouped.get(key);
    if (bucket) bucket.push(name);
    else grouped.set(key, [name]);
  }

  const preferred = new Map<string, string>();
  for (const [key, names] of grouped) {
    // Most-used spelling wins. Ties go to the one carrying diacritics, which is
    // the correct romanisation ("Shōnen" over "Shonen"), then to the longer
    // string, then alphabetically so the choice is stable across builds.
    const winner = [...names].sort((a, b) => {
      const byCount = (counts.get(b) ?? 0) - (counts.get(a) ?? 0);
      if (byCount) return byCount;
      const aMarked = a.normalize('NFD').length - a.length;
      const bMarked = b.normalize('NFD').length - b.length;
      if (aMarked !== bMarked) return bMarked - aMarked;
      if (a.length !== b.length) return b.length - a.length;
      return a.localeCompare(b);
    })[0];
    preferred.set(key, winner);
  }

  return { preferred, variants: grouped };
}

/**
 * The entity a /topic/<slug> URL names, or null if no entity slugs to it.
 * Resolution goes through the elected spelling, so /topic/pokemon lands on the
 * same hub whichever way the articles behind it spell the word.
 */
export const entityFromSlug = cache(async (slug: string): Promise<string | null> => {
  const { preferred, variants } = await buildCanon();
  const wanted = entitySlug(slug);
  if (!wanted) return null;
  for (const [key, names] of variants) {
    // The elected spelling decides the slug; a variant that happens to slug
    // differently ("Disney+" beside "Disney") still resolves through its group.
    if (entitySlug(preferred.get(key) ?? names[0]) === wanted) {
      return preferred.get(key) ?? names[0];
    }
  }
  for (const [key, names] of variants) {
    if (names.some((n) => entitySlug(n) === wanted)) return preferred.get(key) ?? names[0];
  }
  return null;
});

/** The spelling this entity's hub lives at, or the name itself if unseen. */
export const canonicalEntity = cache(async (name: string): Promise<string> => {
  const { preferred } = await buildCanon();
  return preferred.get(normalizeKey(name)) ?? name;
});

/** Every spelling that should feed this entity's hub, the name included. */
export const entityVariants = cache(async (name: string): Promise<string[]> => {
  const { variants } = await buildCanon();
  const found = variants.get(normalizeKey(name));
  if (!found || found.length === 0) return [name];
  return found.includes(name) ? found : [...found, name];
});

/**
 * The whole entity set folded to canonical spellings, with each one's total
 * across every variant. The sitemap uses this so it advertises one URL per
 * thing rather than one per spelling.
 */
const globalForCounts = globalThis as unknown as { entityCounts?: Promise<Map<string, number>> };

export function canonicalEntityCounts(): Promise<Map<string, number>> {
  return (globalForCounts.entityCounts ??= computeCounts());
}

async function computeCounts(): Promise<Map<string, number>> {
  const { preferred, variants } = await buildCanon();
  const counts = new Map<string, number>();
  try {
    const rows = await prisma.article.findMany({
      where: { published: true },
      select: { entities: true },
    });
    for (const row of rows) {
      const seen = new Set<string>();
      for (const entity of (row.entities as string[] | null) ?? []) {
        const key = normalizeKey(entity.trim());
        if (!key || !variants.has(key)) continue;
        // An article naming both "Pokémon" and "Pokemon" still counts once.
        if (seen.has(key)) continue;
        seen.add(key);
        const name = preferred.get(key)!;
        counts.set(name, (counts.get(name) ?? 0) + 1);
      }
    }
  } catch {
    // No archive available.
  }
  return counts;
}

/**
 * Canonical entity slugs for hubs carrying at least `minCount` articles.
 *
 * The topic route's generateStaticParams. Entities are extracted from the
 * articles, so the set is open-ended in principle — but the articles are a
 * checked-in file, so it is fully known at build time, and prerendering it is
 * what keeps the route off the ISR write path. The threshold matches the page's
 * own indexability cut: thinner hubs are noindexed, so they render on demand
 * once and cache permanently instead of lengthening every build.
 */
export const canonicalEntitySlugs = cache(async (minCount = 1): Promise<string[]> => {
  try {
    const counts = await canonicalEntityCounts();
    const slugs = new Set<string>();
    for (const [name, count] of counts) {
      if (count < minCount) continue;
      const slug = entitySlug(name);
      if (slug) slugs.add(slug);
    }
    return [...slugs].sort();
  } catch {
    return [];
  }
});
