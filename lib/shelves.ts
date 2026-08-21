// One index across every text on the site, filed by number.
//
// The reference has six kinds of text — reports, glossary entries, explainers,
// series and creator pages, guides, and the essay sequences — kept in different
// files with different shapes. A shelf is the one view that ignores all of that:
// it asks each text for its title, reduces it, and puts it with everything else
// that reduced to the same figure. That is the whole taxonomy.

import { cache } from 'react';
import { prisma } from '@/lib/db';
import {
  getAllGlossaryTerms,
  getAllLearnTopics,
  getAllWorks,
  getAllCreators,
} from '@/lib/education';
import { getAllStandaloneGuides } from '@/lib/standalone-guides';
import { getAllGuides } from '@/lib/guides';
import { GROUP_NUMBERS, titleValue, titleNumbers } from '@/lib/number-groups';
import { readingLine, type TextKind } from '@/lib/numerologize';

export interface ShelfEntry {
  title: string;
  href: string;
  kind: TextKind;
  /** What the kind is called on a shelf page. */
  kindLabel: string;
  /** One line of summary, already carrying its number from the rewrite. */
  summary: string;
  /** The reduced value this entry is filed under. */
  value: number;
  /** The raw Pythagorean sum, printed beside the title. */
  raw: number;
  /** ISO date where the text has one, for ordering within a shelf. */
  date?: string;
}

const KIND_LABEL: Record<TextKind, string> = {
  article: 'Report',
  glossary: 'Glossary',
  lesson: 'Explainer',
  work: 'Series',
  creator: 'Creator',
  series: 'Sequence',
  guide: 'Guide',
  // Sections are indexes rather than texts, so nothing is ever shelved as one.
  section: 'Section',
};

function entry(
  title: string,
  href: string,
  kind: TextKind,
  summary: string,
  date?: string,
): ShelfEntry {
  const n = titleNumbers(title);
  return {
    title,
    href,
    kind,
    kindLabel: KIND_LABEL[kind],
    summary: (summary || '').trim() || readingLine({ title, kind }),
    value: n.value,
    raw: n.raw,
    date,
  };
}

/**
 * Every text in the reference, as shelf entries. Reports are the only kind that
 * needs a read through the store; everything else is a direct file import, so
 * this is cheap enough to build per request and React's cache keeps it to once.
 */
export const getAllEntries = cache(async (): Promise<ShelfEntry[]> => {
  const reports = (await prisma.article.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
    select: { title: true, slug: true, excerpt: true, publishedAt: true },
  })) as { title: string; slug: string; excerpt: string; publishedAt: Date }[];

  return [
    ...getAllLearnTopics().map((t) =>
      entry(t.title, `/learn/${t.slug}`, 'lesson', t.summary, t.updatedAt),
    ),
    ...getAllGlossaryTerms().map((t) =>
      entry(t.term, `/glossary/${t.slug}`, 'glossary', t.shortDef, t.updatedAt),
    ),
    ...getAllWorks().map((w) =>
      entry(w.title, `/wiki/series/${w.slug}`, 'work', w.synopsis, w.updatedAt),
    ),
    ...getAllCreators().map((c) =>
      entry(c.name, `/wiki/creator/${c.slug}`, 'creator', c.bio, c.updatedAt),
    ),
    ...getAllStandaloneGuides().map((g) => entry(g.title, `/guides/${g.slug}`, 'guide', g.subtitle)),
    // Category guides live at /{category}/guide rather than under /guides.
    ...getAllGuides().map((g) => entry(g.title, `/${g.slug}/guide`, 'guide', g.subtitle)),
    ...reports.map((a) =>
      entry(a.title, `/article/${a.slug}`, 'article', a.excerpt, new Date(a.publishedAt).toISOString()),
    ),
  ];
});

/** Everything filed under one number, explainers and glossary first. */
export const getShelf = cache(async (n: number): Promise<ShelfEntry[]> => {
  const all = await getAllEntries();
  return all.filter((e) => e.value === n);
});

export interface ShelfCount {
  n: number;
  total: number;
  /** Per-kind totals, in the order the shelf page lists them. */
  byKind: { kind: TextKind; label: string; count: number }[];
}

/** How much sits on each of the twelve shelves — used by the index and the nav. */
export const getShelfCounts = cache(async (): Promise<ShelfCount[]> => {
  const all = await getAllEntries();
  return GROUP_NUMBERS.map((n) => {
    const on = all.filter((e) => e.value === n);
    const kinds = new Map<TextKind, number>();
    for (const e of on) kinds.set(e.kind, (kinds.get(e.kind) ?? 0) + 1);
    return {
      n,
      total: on.length,
      byKind: [...kinds.entries()].map(([kind, count]) => ({
        kind,
        label: KIND_LABEL[kind],
        count,
      })),
    };
  });
});

/**
 * Other texts on the same shelf as this one — the cross-reference printed at the
 * foot of every entry. Excludes the text itself by href.
 */
export const getShelfNeighbours = cache(
  async (title: string, selfHref: string, limit = 6): Promise<ShelfEntry[]> => {
    const shelf = await getShelf(titleValue(title));
    return shelf.filter((e) => e.href !== selfHref).slice(0, limit);
  },
);
