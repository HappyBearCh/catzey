// The numerological shelving system.
//
// Every text on Catzye — article, glossary entry, explainer, wiki page, series —
// is reduced to a single number by its title, and that number is where it lives.
// The category taxonomy (manga, anime, industry) says what a text is about; the
// number says what shape it has. This file is the authority for the second one:
// the twelve groups, what each one means, and how any titled thing is filed.

import {
  destinyNumber,
  heartDesireNumber,
  dreamNumber,
  wordValues,
  getProfile,
  type WordValue,
} from '@/lib/numerology';

// The shelves, in reading order. 1–9 are the cardinal groups; 11, 22 and 33 are
// the master numbers, which are never reduced further and therefore hold the
// small number of titles that refuse to settle.
export const GROUP_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33] as const;
export const CARDINAL_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
export const MASTER_NUMBERS = [11, 22, 33] as const;

export interface NumberGroup {
  n: number;
  /** The shelf's name — what this group of texts is called. */
  shelf: string;
  /** One line, used as a subtitle under the numeral. */
  tagline: string;
  /** What a title filed here tends to be doing. Two or three sentences. */
  intro: string;
  /** How to read the texts on this shelf — the instruction to the reader. */
  howToRead: string;
  /** The recurring shape these titles share, phrased as a noun. */
  shape: string;
  /** Where the number overreaches. Kept honest rather than flattering. */
  shadow: string;
  /** Verbs the prose composer uses when writing about a text in this group. */
  verbs: string[];
  /** What the number asks of a reader, phrased to complete "it asks you to …". */
  asks: string;
  master?: boolean;
}

export const NUMBER_GROUPS: Record<number, NumberGroup> = {
  1: {
    n: 1,
    shelf: 'The Opening',
    tagline: 'first moves, single authors, and things that had no precedent',
    intro:
      'A title that reduces to 1 is a title about something starting. These are the debuts, the announcements, the first chapters and the first refusals — texts whose subject had no template to follow and made one. The arithmetic is blunt here: 1 is the number that cannot be divided into a partnership, so its texts tend to describe a single will pushing against an industry that had not asked for it.',
    howToRead:
      'Read these first. Almost everything on the other eleven shelves is a consequence of something filed here, and the entries are short because a beginning has not yet accumulated its complications.',
    shape: 'a first move',
    shadow:
      'The 1 mistakes being first for being right. Several of these texts describe launches that mattered enormously for a year and then mattered to nobody.',
    verbs: ['opens', 'breaks ground', 'goes first', 'declares'],
    asks: 'notice what had to not exist for this to be possible',
  },
  2: {
    n: 2,
    shelf: 'The Pairing',
    tagline: 'two names, two markets, and everything negotiated between them',
    intro:
      'The 2 files everything that needs a second party to exist. Author and editor, studio and committee, mangaka and assistant, Japan and the licensing market that reprints it — a title lands here when its subject cannot be described without naming two sides and the arrangement holding them together. It is the most administrative of the shelves and, for that reason, the one that explains the most.',
    howToRead:
      'Read a 2 alongside the 1 it followed. The pattern is reliable: something began alone, a second party arrived to make it sustainable, and the terms of that arrival are the story.',
    shape: 'a negotiation',
    shadow:
      'The 2 will keep a bad arrangement alive out of politeness. A number of these texts are about partnerships nobody ended in time.',
    verbs: ['balances', 'negotiates', 'pairs', 'answers'],
    asks: 'find the second party, because there always is one',
  },
  3: {
    n: 3,
    shelf: 'The Telling',
    tagline: 'craft, voice, and the machinery of putting a story across',
    intro:
      'The 3 is the number of expression, and its shelf is the craft shelf. Panel grammar, page turns, dialogue, the visual shorthand a medium develops over sixty years so a reader can absorb a fight in four seconds — the texts that reduce to 3 are about technique in the service of being understood. They are the most instructive entries in the reference and the ones most worth rereading.',
    howToRead:
      'These reward slow reading. Each entry describes a device you have already absorbed a thousand times without naming; naming it is the point.',
    shape: 'an act of telling',
    shadow:
      'The 3 talks past the point. Where an entry here runs long, it is usually because the technique was more fun to describe than it was important.',
    verbs: ['expresses', 'renders', 'tells', 'performs'],
    asks: 'watch the technique rather than the plot it is carrying',
  },
  4: {
    n: 4,
    shelf: 'The Structure',
    tagline: 'schedules, formats, volumes, and the frames that hold everything up',
    intro:
      'Four is the number of built things, and this is the shelf of the medium’s load-bearing walls: the weekly deadline, the twenty-page chapter, the tankōbon collection, the serialisation contract, the ranking survey. None of it is glamorous and all of it determines what stories are possible. A title reduces to 4 when its real subject is the frame rather than the picture.',
    howToRead:
      'Read these when a text on another shelf stops making sense. The answer is almost always a constraint documented here.',
    shape: 'a structure',
    shadow:
      'The 4 confuses the frame for the work. Structures outlive their usefulness, and several entries here describe conventions kept long past their reason.',
    verbs: ['builds', 'holds', 'schedules', 'frames'],
    asks: 'look for the constraint the subject was working inside',
  },
  5: {
    n: 5,
    shelf: 'The Turn',
    tagline: 'change, escape, and the moment a form stops behaving',
    intro:
      'Five is restlessness. Its shelf holds the genre breaks, the format experiments and the sudden pivots — a series that changed what it was halfway through, a medium that jumped to a screen, an author who abandoned a working formula for something riskier. These are the least stable texts in the reference and among the most consequential, because a form only survives by occasionally refusing itself.',
    howToRead:
      'Read a 5 against the 4 it broke. Every turn documented here was a departure from a structure someone had considered permanent.',
    shape: 'a turn',
    shadow:
      'The 5 moves for the sake of moving. Not every break documented here led anywhere, and the reference says so where it did not.',
    verbs: ['turns', 'breaks', 'escapes', 'changes'],
    asks: 'ask what was abandoned, and whether it deserved to be',
  },
  6: {
    n: 6,
    shelf: 'The Care',
    tagline: 'audiences, communities, and who a story is responsible to',
    intro:
      'The 6 is the number of responsibility, and its shelf is about readers. Demographic categories that are really promises about who is being looked after, fan communities that keep a dead series alive, editors who protect an author from their own schedule, the domestic scenes a genre returns to when it wants to say what it values — all of it reduces to 6. It is the warmest shelf and the one most concerned with consequence.',
    howToRead:
      'These entries answer a question the others avoid: who was this for, and what did it owe them?',
    shape: 'an obligation',
    shadow:
      'The 6 smothers. The same instinct that protects a readership produces the paternalism several of these entries document.',
    verbs: ['tends', 'holds', 'answers to', 'protects'],
    asks: 'name the people this was answerable to',
  },
  7: {
    n: 7,
    shelf: 'The Inquiry',
    tagline: 'what is unresolved, unexplained, or deliberately withheld',
    intro:
      'Seven withdraws. Its shelf collects the texts about mystery as a technique and mystery as a fact: unfinished series, unexplained authorial decisions, ambiguous endings, the reading of a work its author declined to confirm. These entries are careful with what they claim. Where the reference does not know something, it says so, and most of those admissions live here.',
    howToRead:
      'Read these expecting to be left holding a question. That is the shelf working, not the shelf failing.',
    shape: 'an open question',
    shadow:
      'The 7 mistakes withholding for depth. Some works filed here are obscure because they are unfinished, not because they are deep.',
    verbs: ['withholds', 'examines', 'questions', 'searches'],
    asks: 'sit with the part that was never explained',
  },
  8: {
    n: 8,
    shelf: 'The Ledger',
    tagline: 'money, scale, ownership, and who actually decides',
    intro:
      'Eight is the number of material power, and this shelf is the reference’s business section: print runs, licensing deals, production committees, the arithmetic of what a chapter earns and who receives it. The texts here are the least romantic and the most explanatory, because the question they answer — who is paid, and by whom — determines more of what gets made than any editorial preference ever has.',
    howToRead:
      'Read a text here whenever a decision on another shelf looks inexplicable. The figures usually explain it.',
    shape: 'a reckoning',
    shadow:
      'The 8 measures what is countable and calls the rest noise. Several entries record industries that optimised themselves into exhaustion.',
    verbs: ['counts', 'commands', 'buys', 'weighs'],
    asks: 'follow the money before you judge the decision',
  },
  9: {
    n: 9,
    shelf: 'The Closing',
    tagline: 'endings, legacies, and what a finished thing leaves behind',
    intro:
      'Nine completes. Its shelf is the largest in the reference, because most things are eventually finished and the finishing is what gets written about: final chapters, deaths, retirements, the long afterlife of a series that ended before its readers did. Nine is also the number that returns everything it touches to itself in the arithmetic, which is a decent description of a legacy.',
    howToRead:
      'These entries are best read last, and each of them points back at a 1. The reference is a circle, and this is where it closes.',
    shape: 'a completion',
    shadow:
      'The 9 sentimentalises. An ending is not automatically a meaning, and the reference tries not to pretend otherwise.',
    verbs: ['completes', 'releases', 'closes', 'hands on'],
    asks: 'work out what survived the ending',
  },
  11: {
    n: 11,
    shelf: 'The Signal',
    tagline: 'master number — work that saw something early',
    intro:
      'Eleven is a master number: it is never reduced to its 2. Its shelf is small and strange, holding the texts whose subjects arrived before there was an audience ready for them — the works read as prophetic in hindsight, the artists whose influence outran their sales, the announcements that read as noise at the time and as an inflection point now.',
    howToRead:
      'Read these knowing the reference is applying hindsight. Every entry here was ignored first.',
    shape: 'a signal received early',
    shadow:
      'The 11 is unstable and knows it. Being early and being wrong are indistinguishable until later.',
    verbs: ['signals', 'intuits', 'arrives early', 'sees'],
    asks: 'remember that nobody noticed this at the time',
  },
  22: {
    n: 22,
    shelf: 'The Edifice',
    tagline: 'master number — the vision that actually got built',
    intro:
      'Twenty-two is the Master Builder — the 11’s vision with the 4’s discipline underneath it. Its shelf is the shortest in the reference and the most demanding: the multi-decade serialisations, the studios built to outlast a founder, the single works that reorganised a medium around themselves. A title only lands here by arithmetic accident, which is the honest reason the shelf is short.',
    howToRead:
      'Every entry here describes something enormous that also finished. That combination is rarer than either half.',
    shape: 'an edifice',
    shadow:
      'The 22 crushes the people who build it. The production histories on this shelf are not happy ones.',
    verbs: ['builds', 'realises', 'establishes', 'endures'],
    asks: 'count the years, then count the people',
  },
  33: {
    n: 33,
    shelf: 'The Teaching',
    tagline: 'master number — work that made other work possible',
    intro:
      'Thirty-three is the Master Teacher, the rarest reduction in the system. Its shelf holds the texts about transmission: the studios that were really schools, the assistants who became the next generation, the single manual or single serial that taught a whole cohort how the job is done. Almost nothing reduces to 33, and what does is nearly always about somebody else’s career.',
    howToRead:
      'Read these as the reference’s footnote about itself. Everything Catzye can explain, it learned from something on this shelf.',
    shape: 'a transmission',
    shadow:
      'The 33 gives itself away entirely. The teachers here are frequently better remembered than read.',
    verbs: ['teaches', 'transmits', 'hands down', 'raises'],
    asks: 'trace who learned from this and what they did with it',
  },
};

export function getGroup(n: number): NumberGroup {
  return NUMBER_GROUPS[n] ?? NUMBER_GROUPS[9];
}

export function isGroupNumber(n: number): boolean {
  return n in NUMBER_GROUPS;
}

/** Parse a /number/[n] route segment into a valid group number, or null. */
export function parseGroupParam(raw: string): number | null {
  const n = Number(raw);
  return Number.isInteger(n) && isGroupNumber(n) ? n : null;
}

// ── Filing ───────────────────────────────────────────────────────────────────

/**
 * The value a text is filed under: the Destiny number of its title, master
 * numbers preserved. This is the one rule the whole site is shelved by, so it
 * lives here rather than being recomputed with variations in a dozen places.
 * An empty or letterless title reduces to 0, which is not a shelf; those are
 * filed under 9, the number that absorbs everything.
 */
export function titleValue(title: string): number {
  const n = destinyNumber(title || '');
  return isGroupNumber(n) ? n : 9;
}

export interface TitleNumbers {
  value: number;
  heart: number;
  personality: number;
  /** Per-word values, in title order — the arithmetic printed under a title. */
  words: WordValue[];
  /** The raw Pythagorean sum before reduction. */
  raw: number;
}

/** Every number the reference prints about a title, computed once. */
export function titleNumbers(title: string): TitleNumbers {
  const words = wordValues(title);
  return {
    value: titleValue(title),
    heart: heartDesireNumber(title || ''),
    personality: dreamNumber(title || ''),
    words,
    raw: words.reduce((s, w) => s + w.sum, 0),
  };
}

/** Bucket any titled collection into the twelve groups, preserving input order. */
export function groupByValue<T extends { title: string }>(items: T[]): Map<number, T[]> {
  const map = new Map<number, T[]>();
  for (const n of GROUP_NUMBERS) map.set(n, []);
  for (const item of items) map.get(titleValue(item.title))!.push(item);
  return map;
}

/** The archetype profile a group shares with the rest of the numerology engine. */
export const groupProfile = getProfile;
