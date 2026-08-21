// Manga's own numerology.
//
// Everywhere else on this site, a number is imposed: the reference takes a title
// and reduces it, and admits that the operation is an imposition. This section
// is the inverse. Shōnen manga is full of sets that were numbered by the person
// who invented them — the Four Emperors, the Twelve Kizuki, the Gotei 13 — and
// those numbers were chosen deliberately, for reasons that can be examined.
//
// The reason the form recurs is structural. Shōnen's hardest problem is making
// relative strength legible at a glance, in black and white, without dialogue. A
// numbered set solves it outright: Upper Rank Three outranks Upper Rank Four and
// no one needs to be told. Once a medium finds a device that cheap, it uses it
// everywhere.
//
// So these entries are filed by their own count rather than by their title's
// letters. It is the one text kind on the site whose shelf nobody imposed.

import setsData from '@/data/numbered-sets.json';
import { reduce } from '@/lib/numerology';

export interface NumberedSet {
  slug: string;
  name: string;
  /** The Japanese name, where the set has one. */
  nativeName: string | null;
  romaji: string | null;
  /** How many members, panels, or categories. The set's own number. */
  count: number;
  /** The work it belongs to, or null for a convention the medium shares. */
  work: string | null;
  /** Slug in data/works.json, when the reference has an entry for that work. */
  workSlug: string | null;
  creatorSlug: string | null;
  /** What sort of set: hierarchy, taxonomy, ensemble, convention, format… */
  form: string;
  shortDef: string;
  body: string;
}

const SETS = setsData as NumberedSet[];

export function getAllNumberedSets(): NumberedSet[] {
  return SETS;
}

export function getNumberedSet(slug: string): NumberedSet | null {
  return SETS.find((s) => s.slug === slug) ?? null;
}

/**
 * The shelf a set is filed on: its own count, reduced.
 *
 * Deliberately not titleValue(). "The Twelve Kizuki" reduced by its letters
 * would say something about an English phrase this reference wrote; reduced by
 * its count it says twelve, which is what Gotouge chose. Where those disagree
 * the count wins, because the count is the evidence.
 */
export function setValue(set: Pick<NumberedSet, 'count'>): number {
  return reduce(set.count);
}

/** Every set filed under one number. */
export function getSetsForNumber(n: number): NumberedSet[] {
  return SETS.filter((s) => setValue(s) === n);
}

/** Sets grouped by count, for the index — 3s together, then 4s, and so on. */
export function getSetsByCount(): { count: number; value: number; sets: NumberedSet[] }[] {
  const counts = [...new Set(SETS.map((s) => s.count))].sort((a, b) => a - b);
  return counts.map((count) => ({
    count,
    value: reduce(count),
    sets: SETS.filter((s) => s.count === count),
  }));
}

/** Other sets that reduce the same way, for the cross-reference on an entry. */
export function getSetNeighbours(slug: string, limit = 5): NumberedSet[] {
  const set = getNumberedSet(slug);
  if (!set) return [];
  return getSetsForNumber(setValue(set))
    .filter((s) => s.slug !== slug)
    .slice(0, limit);
}
