import glossaryData from '@/data/glossary.json';
import learnData from '@/data/learn.json';
import worksData from '@/data/works.json';
import creatorsData from '@/data/creators.json';

// Educational content is checked into the repo as JSON rather than stored in
// Postgres. It is written once and read on every request, so a database would be
// pure cost: this way the pages compile to fully static HTML with no query, no
// Neon compute, and no ISR revalidation. It also makes every entry reviewable in
// a diff before it ships — see scripts/generate-education.ts, which is what
// writes these files.

export interface GlossaryTerm {
  term: string;
  slug: string;
  /** One sentence, used on cards, in DefinedTerm, and as the meta description. */
  shortDef: string;
  /** Long-form HTML explanation. */
  body: string;
  /** demographic | genre | craft | industry | fandom */
  category: string;
  /** Other spellings people search for ("shounen" for "shonen"). */
  aliases: string[];
  /** Slugs of related terms. */
  related: string[];
  /** Work slugs used as illustrative examples. */
  examples: string[];
  /** ISO date, used for sitemap lastmod. */
  updatedAt: string;
}

export interface LearnTopic {
  slug: string;
  title: string;
  question: string;
  summary: string;
  body: string;
  /** beginner | intermediate | advanced */
  level: string;
  /** basics | genres | craft | history | industry | culture */
  track: string;
  order: number;
  faq: FaqEntry[];
  related: string[];
  /** The curriculum entry this was written from. */
  seed: string;
  /** First published; preserved when an entry is regenerated. */
  createdAt: string;
  updatedAt: string;
}

export interface Work {
  slug: string;
  title: string;
  altTitles: string[];
  synopsis: string;
  body: string;
  demographic: string | null;
  genres: string[];
  creatorSlugs: string[];
  startYear: number | null;
  endYear: number | null;
  status: string | null;
  volumes: number | null;
  magazine: string | null;
  imageUrl: string | null;
  imageAlt: string | null;
  updatedAt: string;
}

export interface Creator {
  slug: string;
  name: string;
  nativeName: string | null;
  role: string;
  bio: string;
  body: string;
  bornYear: number | null;
  notableWorks: string[];
  imageUrl: string | null;
  updatedAt: string;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

const GLOSSARY = glossaryData as unknown as GlossaryTerm[];
const TOPICS = learnData as unknown as LearnTopic[];
const WORKS = worksData as unknown as Work[];
const CREATORS = creatorsData as unknown as Creator[];

// ─── Tracks & taxonomies ─────────────────────────────────────────────────────

export const LEARN_TRACKS = [
  { slug: 'basics', label: 'Manga Basics', blurb: 'What manga is, how to read it, and where to start.' },
  { slug: 'genres', label: 'Genres & Demographics', blurb: 'Shonen, seinen, isekai — what the labels actually mean.' },
  { slug: 'craft', label: 'Art & Craft', blurb: 'Paneling, pacing, lettering, and how a page is built.' },
  { slug: 'history', label: 'History', blurb: 'From Tezuka to today, how the medium got here.' },
  { slug: 'industry', label: 'Industry', blurb: 'Magazines, editors, licensing, and how manga gets made.' },
  { slug: 'culture', label: 'Culture & Fandom', blurb: 'Conventions, doujinshi, scanlation, and fan practice.' },
] as const;

export function getTrack(slug: string) {
  return LEARN_TRACKS.find((t) => t.slug === slug) ?? null;
}

export const GLOSSARY_CATEGORIES = [
  { slug: 'demographic', label: 'Demographics' },
  { slug: 'genre', label: 'Genres' },
  { slug: 'craft', label: 'Craft & Format' },
  { slug: 'industry', label: 'Industry' },
  { slug: 'fandom', label: 'Fandom' },
] as const;

export const LEVELS = ['beginner', 'intermediate', 'advanced'] as const;

// ─── Glossary ────────────────────────────────────────────────────────────────

export function getGlossaryTerm(slug: string): GlossaryTerm | null {
  return GLOSSARY.find((t) => t.slug === slug) ?? null;
}

export function getAllGlossaryTerms(): GlossaryTerm[] {
  return [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term));
}

export function getGlossaryTermsBySlugs(slugs: string[]): GlossaryTerm[] {
  if (slugs.length === 0) return [];
  const bySlug = new Map(GLOSSARY.map((t) => [t.slug, t]));
  return slugs.flatMap((s) => bySlug.get(s) ?? []);
}

/** Groups terms under their initial letter for the A–Z index. */
export function groupByInitial<T extends { term: string }>(items: T[]): Map<string, T[]> {
  const groups = new Map<string, T[]>();
  for (const item of items) {
    const first = item.term.charAt(0).toUpperCase();
    // Anything not A–Z (Japanese headwords, numerals) collects under '#'.
    const key = /[A-Z]/.test(first) ? first : '#';
    const bucket = groups.get(key);
    if (bucket) bucket.push(item);
    else groups.set(key, [item]);
  }
  return new Map([...groups.entries()].sort(([a], [b]) => (a === '#' ? 1 : b === '#' ? -1 : a.localeCompare(b))));
}

// ─── Learn topics ────────────────────────────────────────────────────────────

export function getLearnTopic(slug: string): LearnTopic | null {
  return TOPICS.find((t) => t.slug === slug) ?? null;
}

export function getAllLearnTopics(): LearnTopic[] {
  return [...TOPICS].sort((a, b) => a.track.localeCompare(b.track) || a.order - b.order);
}

export function getTopicsInTrack(track: string): LearnTopic[] {
  return TOPICS.filter((t) => t.track === track).sort((a, b) => a.order - b.order);
}

/** Previous/next within a track, so every explainer sits on a readable path. */
export function getTopicNeighbours(topic: LearnTopic) {
  const siblings = getTopicsInTrack(topic.track);
  const i = siblings.findIndex((t) => t.slug === topic.slug);
  return {
    prev: i > 0 ? siblings[i - 1] : null,
    next: i >= 0 && i < siblings.length - 1 ? siblings[i + 1] : null,
    position: i + 1,
    total: siblings.length,
  };
}

/** Keeps only entries substantial enough to be worth emitting as FAQ schema. */
export function parseFaq(value: unknown): FaqEntry[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((row) => {
    if (!row || typeof row !== 'object') return [];
    const { question, answer } = row as Record<string, unknown>;
    if (typeof question !== 'string' || typeof answer !== 'string') return [];
    if (!question.trim() || answer.trim().length < 40) return [];
    return [{ question: question.trim(), answer: answer.trim() }];
  });
}

// ─── Works ───────────────────────────────────────────────────────────────────

export function getWork(slug: string): Work | null {
  return WORKS.find((w) => w.slug === slug) ?? null;
}

export function getAllWorks(): Work[] {
  return [...WORKS].sort((a, b) => a.title.localeCompare(b.title));
}

export function getWorksBySlugs(slugs: string[]): Work[] {
  if (slugs.length === 0) return [];
  // Preserve the caller's ordering — notableWorks is ranked, not alphabetical.
  const bySlug = new Map(WORKS.map((w) => [w.slug, w]));
  return slugs.flatMap((s) => bySlug.get(s) ?? []);
}

// ─── Creators ────────────────────────────────────────────────────────────────

export function getCreator(slug: string): Creator | null {
  return CREATORS.find((c) => c.slug === slug) ?? null;
}

export function getAllCreators(): Creator[] {
  return [...CREATORS].sort((a, b) => a.name.localeCompare(b.name));
}

export function getCreatorsBySlugs(slugs: string[]): Creator[] {
  if (slugs.length === 0) return [];
  const bySlug = new Map(CREATORS.map((c) => [c.slug, c]));
  return slugs.flatMap((s) => bySlug.get(s) ?? []);
}

/** Works this creator is credited on, for the reverse link on a profile page. */
export function getWorksByCreator(creatorSlug: string): Work[] {
  return WORKS.filter((w) => w.creatorSlugs.includes(creatorSlug)).sort(
    (a, b) => (a.startYear ?? 0) - (b.startYear ?? 0),
  );
}
