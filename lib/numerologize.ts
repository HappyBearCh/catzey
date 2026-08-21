// The prose composer.
//
// Every text in the reference carries a numerological reading, and every one of
// those readings is written here rather than by hand or by a model. The input is
// a title and whatever the reference already knows about it; the output is HTML.
//
// Two rules govern this file. The reading must be *deterministic* — the same
// title always produces the same words, so the site can be rebuilt from the data
// files at any time and nothing drifts. And it must be *specific* — the numbers
// quoted are the real arithmetic of that exact title, the heaviest word is the
// title's actual heaviest word, and the phrasing is selected from the title's
// own hash so a thousand entries do not read as one entry printed a thousand
// times.

import {
  readTitle,
  detectStoryAngle,
  articleGloss,
  getProfile,
  reduce,
  type WordValue,
} from '@/lib/numerology';
import { titleNumbers, getGroup, type TitleNumbers } from '@/lib/number-groups';

// ── Deterministic selection ──────────────────────────────────────────────────

/** FNV-1a. Small, stable across runs and platforms, which is the whole point. */
export function stableHash(seed: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

function pick<T>(list: readonly T[], seed: string, salt: string): T {
  return list[stableHash(`${salt}:${seed}`) % list.length];
}

// ── What kind of text is being read ──────────────────────────────────────────

export type TextKind =
  | 'article'
  | 'glossary'
  | 'lesson'
  | 'work'
  | 'creator'
  | 'series'
  | 'guide'
  /** A numbered set the medium itself invented — see lib/numbered-sets.ts. */
  | 'set'
  /** An index assembled from a label and a query — a category, genre, tag. */
  | 'section';

interface KindWords {
  /** The thing whose letters were counted: "headline", "term", "name". */
  unit: string;
  /** The text itself: "story", "entry", "explainer". */
  text: string;
  /** Plural of `text`, for group pages. */
  texts: string;
}

const KIND_WORDS: Record<TextKind, KindWords> = {
  article: { unit: 'headline', text: 'report', texts: 'reports' },
  glossary: { unit: 'term', text: 'entry', texts: 'entries' },
  lesson: { unit: 'question', text: 'explainer', texts: 'explainers' },
  work: { unit: 'title', text: 'entry', texts: 'entries' },
  creator: { unit: 'name', text: 'entry', texts: 'entries' },
  series: { unit: 'title', text: 'sequence', texts: 'sequences' },
  guide: { unit: 'title', text: 'guide', texts: 'guides' },
  set: { unit: 'name', text: 'set', texts: 'sets' },
  section: { unit: 'name', text: 'section', texts: 'texts' },
};

export function kindWords(kind: TextKind): KindWords {
  return KIND_WORDS[kind] ?? KIND_WORDS.article;
}

// ── The composed reading ─────────────────────────────────────────────────────

/**
 * A number the subject carries in its own right, rather than one derived from
 * the letters of its title.
 *
 * This is the honest half of the reference. Reducing a title is an imposition —
 * for a manga it usually reduces an English licensing decision rather than
 * anything the author wrote. A figure is not imposed: a series really does run
 * to 22 volumes, a pen name really is written in that many strokes, and a
 * numbered set really was numbered by the person who invented it. Where a
 * figure and the title disagree, the reading says so and the figure wins.
 */
export interface Figure {
  /** What was counted: "volumes", "years of serialisation", "総格". */
  label: string;
  /** The figure as counted, before reduction. */
  raw: number;
  /** That figure reduced, master numbers preserved. */
  value: number;
  /** Where it came from, printed so a reader can check it. */
  note?: string;
}

export function figure(label: string, raw: number, note?: string): Figure {
  return { label, raw, value: reduce(raw), note };
}

export interface ReadingInput {
  title: string;
  kind: TextKind;
  /** Numbers the subject carries in its own right. See Figure. */
  figures?: Figure[];
  /** Named subjects — the first usable one is read in its own right. */
  entities?: string[];
  /** Article category or entry track, mentioned when it sharpens the reading. */
  category?: string;
  /** Overrides the hash seed; defaults to the title. Use a slug for stability. */
  seed?: string;
}

export interface ComposedReading {
  numbers: TitleNumbers;
  /** The heaviest single word in the title, or null for one-word titles. */
  anchor: WordValue | null;
  /** One sentence, printed above the text as a standfirst. */
  standfirst: string;
  /** The body of the reading, as HTML paragraphs. */
  paragraphs: string[];
  /** The word-by-word working, as an HTML block. */
  arithmetic: string;
}

const ORDINAL_WORD: Record<number, string> = {
  1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six',
  7: 'seven', 8: 'eight', 9: 'nine', 11: 'eleven', 22: 'twenty-two', 33: 'thirty-three',
};

function numWord(n: number): string {
  return ORDINAL_WORD[n] ?? String(n);
}

/**
 * The indefinite article for a figure, chosen by how the numeral is said rather
 * than how it is spelled: "an 8", "an 11", "an 18", but "a 7".
 */
function article(n: number): string {
  return /^(8|11|18)/.test(String(n)) ? 'an' : 'a';
}

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** The heaviest word carries the title. Ties break toward the earlier word. */
function findAnchor(words: WordValue[]): WordValue | null {
  if (words.length < 2) return null;
  return words.reduce((best, w) => (w.sum > best.sum ? w : best), words[0]);
}

/** A usable named subject, if the reference knows one. */
function firstEntity(entities?: string[]): string | null {
  const found = (entities ?? [])
    .map((e) => (e || '').trim())
    .find((e) => e.length > 2 && /[A-Za-z]{3}/.test(e));
  return found ?? null;
}

// ── Sentence pools ───────────────────────────────────────────────────────────
// Each pool is a set of shapes for the same job. The selection is by hash, so a
// given title always lands on the same shape, and adjacent entries in a list
// rarely land on the same one.

const STANDFIRST: ((c: Ctx) => string)[] = [
  (c) =>
    c.whole
      ? `${cap(c.unit)} sums to ${c.n} with nothing to reduce — ${c.group.shelf}, where the reference files ${c.group.shape}.`
      : `${cap(c.unit)} sums to ${c.numbers.raw} and reduces to ${c.n} — ${c.group.shelf}, where the reference files ${c.group.shape}.`,
  (c) => `Filed under ${c.n}. ${cap(c.group.shelf)} takes ${c.group.shape}, and this ${c.text} is ${c.group.verb} one.`,
  (c) =>
    c.whole
      ? `The letters of this ${c.unit} total ${c.n} outright — the number of ${c.profile.vibration}.`
      : `The letters of this ${c.unit} total ${c.numbers.raw}, ${article(c.n)} ${c.n} — the number of ${c.profile.vibration}.`,
  (c) => `${cap(article(c.n))} ${c.n} by its ${c.unit}: ${c.profile.title.toLowerCase()}, and therefore ${c.group.shelf.toLowerCase()}.`,
  (c) => `Reduced, this ${c.unit} gives ${c.n}. It sits on ${c.group.shelf} with the rest of ${c.group.shape}.`,
  (c) => `${cap(numWord(c.n))} — ${c.profile.keyword}. That is the reduction of this ${c.unit}, and the shelf it is read from.`,
];

/** Paragraph one: the working. Always quotes real figures from this title. */
const ARITHMETIC_PARA: ((c: Ctx) => string)[] = [
  (c) =>
    c.whole
      ? `Set against the Pythagorean table, the ${c.unit} totals ${c.n} exactly — nothing to reduce, which is rare enough to note.${c.anchorClause}`
      : `Set against the Pythagorean table, the ${c.unit} totals ${c.numbers.raw}. Reduced, that is ${c.n}${c.master ? ', a master number the system declines to reduce further' : ''}.${c.anchorClause}`,
  (c) =>
    c.whole
      ? `The arithmetic is unremarkable and worth doing anyway: ${c.numbers.raw} across ${c.wordCount} ${c.wordCount === 1 ? 'word' : 'words'}, and it lands on ${c.n} without reducing at all.${c.anchorClause}`
      : `The arithmetic is unremarkable and worth doing anyway: ${c.numbers.raw} across ${c.wordCount} ${c.wordCount === 1 ? 'word' : 'words'}, reducing to ${c.n}.${c.anchorClause}`,
  (c) =>
    c.whole
      ? `Counted letter by letter this ${c.unit} comes to ${c.n} and stops there — the sum is already the number.${c.anchorClause}`
      : `Counted letter by letter this ${c.unit} comes to ${c.numbers.raw} — ${c.n} once reduced${c.master ? ', and a master number, so it stops there' : ''}.${c.anchorClause}`,
  (c) =>
    c.whole
      ? `Every letter here carries a digit; together they make ${c.n} on the nose, with no reduction to do.${c.anchorClause}`
      : `Every letter here carries a digit; together they make ${c.numbers.raw}, which folds down to ${c.n}.${c.anchorClause}`,
];

/** Paragraph two: what the number says about this particular subject. */
const MEANING_PARA: ((c: Ctx) => string)[] = [
  (c) =>
    `${cap(numWord(c.n))} is ${c.profile.title.toLowerCase()} — ${c.profile.vibration}. ${c.subjectClause} Read that way, what the ${c.text} is really recording is the ${c.n}'s ${c.gloss}.`,
  (c) =>
    `The ${c.n} governs ${c.profile.vibration}. ${c.subjectClause} It is a lens rather than a verdict, but it is a consistent one: the ${c.n}'s ${c.gloss} is the pressure under this ${c.text}.`,
  (c) =>
    `What the ${c.n} brings is ${c.profile.keyword}. ${c.subjectClause} Whatever else this ${c.text} is doing, it is doing it with the ${c.n}'s ${c.gloss}.`,
  (c) =>
    `${c.subjectClause} The number's contribution is ${c.profile.vibration} — and with it the ${c.n}'s ${c.gloss}, which is the thread the reference follows here.`,
];

/** Paragraph three: the vowel/consonant split — want versus presentation. */
const SPLIT_PARA: ((c: Ctx) => string)[] = [
  (c) =>
    `Split the ${c.unit} again and the vowels give a Heart's Desire of ${c.heart} (${c.heartProfile.keyword}) against a Personality of ${c.personality} (${c.personalityProfile.keyword}) in the consonants — ${c.splitGloss}`,
  (c) =>
    `The vowels alone reduce to ${c.heart}, the consonants to ${c.personality}. ${cap(c.splitGloss)}`,
  (c) =>
    `Beneath the ${c.n} sit two smaller figures: ${c.heart} in the vowels, ${c.personality} in the consonants. ${cap(c.splitGloss)}`,
  (c) =>
    `Heart's Desire ${c.heart}, Personality ${c.personality}: ${c.splitGloss}`,
];

/**
 * The figures paragraph, inserted before the instruction when the subject has
 * numbers of its own. Three cases, because pretending they always agree would
 * be the dishonest version: they agree, they part company, or the subject
 * carries figures that simply say something else.
 */
const FIGURE_PARA: ((c: Ctx) => string)[] = [
  (c) =>
    c.agreeing.length > 0
      ? `It does not rest on the letters alone. ${cap(c.figureList)} — and the ${c.n} arrives there too, by a route that owes nothing to the alphabet. A title can be translated; ${c.agreeingList} cannot.`
      : `The letters give ${c.n}; the subject's own figures do not agree. ${cap(c.figureList)}. Where the two part company the reference trusts the figures, because ${c.figureRationale}.`,
  (c) =>
    c.agreeing.length > 0
      ? `${cap(c.figureList)}. That the ${c.n} turns up in ${c.agreeingList} as well as in the letters is the sort of coincidence this reference collects rather than explains.`
      : `${cap(c.figureList)} — none of which lands on the ${c.n} the title gives. That disagreement is worth more than an agreement would be: ${c.gapClause}.`,
  (c) =>
    c.agreeing.length > 0
      ? `Counted another way the answer holds. ${cap(c.figureList)}, and ${c.agreeingList} reduces to the same ${c.n}. Two systems, one figure.`
      : `Counted another way the answer changes. ${cap(c.figureList)}. The title says ${c.n}; the subject says otherwise, and the subject is the harder evidence.`,
];

/** Paragraph four: the instruction, and the way back to the shelf. */
const ASK_PARA: ((c: Ctx) => string)[] = [
  (c) => `The ${c.n} asks you to ${c.group.asks}. ${c.group.shadow} ${c.shelfLink}`,
  (c) => `Read on the ${c.n}'s terms, this ${c.text} asks you to ${c.group.asks}. ${c.group.shadow} ${c.shelfLink}`,
  (c) => `${c.group.shadow} What the ${c.n} still asks is that you ${c.group.asks}. ${c.shelfLink}`,
  (c) => `${cap(c.group.shelf)} asks one thing of everything on it: ${c.group.asks}. ${c.group.shadow} ${c.shelfLink}`,
];

// ── Context assembled once per title ─────────────────────────────────────────

interface Ctx {
  n: number;
  master: boolean;
  numbers: TitleNumbers;
  profile: ReturnType<typeof getProfile>;
  heart: number;
  personality: number;
  heartProfile: ReturnType<typeof getProfile>;
  personalityProfile: ReturnType<typeof getProfile>;
  group: ReturnType<typeof getGroup> & { verb: string };
  unit: string;
  text: string;
  gloss: string;
  anchorClause: string;
  subjectClause: string;
  splitGloss: string;
  shelfLink: string;
  wordCount: number;
  figures: Figure[];
  /** Figures that landed on the same number the title did. */
  agreeing: Figure[];
  /** "volumes is 22, a 22 and years serialised is 8, an 8" */
  figureList: string;
  /** Why a figure outranks the letters — different for a name than for a work. */
  figureRationale: string;
  /** What the gap between letters and figures is a gap between. */
  gapClause: string;
  /** "its volume count" — the agreeing figures, named. */
  agreeingList: string;
  /**
   * True when the raw sum is already the filed number and no reduction happened
   * — "totals 33, reduces to 33" is not a sentence worth printing, so the
   * phrasings that would say it are swapped out.
   */
  whole: boolean;
}

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** "a", "a and b", "a, b and c" — the reference sets lists the English way. */
function joinList(parts: string[]): string {
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0];
  return `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}`;
}

/**
 * What the vowel/consonant split means, phrased against the two numbers. When
 * they agree the reference says so rather than inventing a tension.
 */
function splitGloss(heart: number, personality: number, kind: TextKind): string {
  const hp = getProfile(heart);
  const pp = getProfile(personality);
  const noun = kind === 'article' ? 'story' : 'subject';
  if (heart === personality) {
    return `the ${noun} wants exactly what it appears to want, which is ${hp.keyword} — an unusually undivided reading.`;
  }
  if (reduce(heart + personality) === heart) {
    return `the presentation folds back into the want: ${pp.keyword} in service of ${hp.keyword}.`;
  }
  return `${hp.keyword} underneath, ${pp.keyword} on the surface. The gap between them is where the ${noun} is most interesting.`;
}

function buildCtx(input: ReadingInput): Ctx {
  const { title, kind } = input;
  const numbers = titleNumbers(title);
  const n = numbers.value;
  const group = getGroup(n);
  const profile = getProfile(n);
  const words = kindWords(kind);
  const seed = input.seed || title;
  const anchor = findAnchor(numbers.words);
  const entity = firstEntity(input.entities);
  const angle = detectStoryAngle(title);

  const anchorClause = anchor
    ? ` The weight sits in “${esc(anchor.word)}”, which carries ${anchor.sum} on its own and reduces to ${anchor.value}.`
    : '';

  // The subject clause is the one place the reading reaches outside the title —
  // into the named subject the reference already recorded, read in its own right.
  let subjectClause: string;
  if (entity) {
    const er = readTitle(entity);
    subjectClause =
      er.destiny === n
        ? `Read on its own, ${esc(entity)} reduces to the same ${n} — the ${words.text} and its subject agree.`
        : `Its named subject, ${esc(entity)}, reads as a ${er.destiny} (${er.profile.title.toLowerCase()}), so the ${words.text} and the thing it describes are pulling in different directions.`;
  } else if (kind === 'article') {
    subjectClause = `The ${words.unit} frames this as ${angle.phrase}.`;
  } else {
    subjectClause = `The reference files it as ${group.shape}.`;
  }

  return {
    n,
    master: n === 11 || n === 22 || n === 33,
    numbers,
    profile,
    heart: numbers.heart,
    personality: numbers.personality,
    heartProfile: getProfile(numbers.heart),
    personalityProfile: getProfile(numbers.personality),
    group: { ...group, verb: pick(group.verbs, seed, 'verb') },
    unit: words.unit,
    text: words.text,
    gloss: articleGloss(n),
    anchorClause,
    subjectClause,
    splitGloss: splitGloss(numbers.heart, numbers.personality, kind),
    whole: numbers.raw === n,
    figures: input.figures ?? [],
    agreeing: (input.figures ?? []).filter((f) => f.value === n),
    figureList: joinList(
      (input.figures ?? []).map((f) =>
        f.raw === f.value
          ? `${f.label} is ${f.raw}`
          : `${f.label} is ${f.raw}, ${article(f.value)} ${f.value}`,
      ),
    ),
    agreeingList: joinList((input.figures ?? []).filter((f) => f.value === n).map((f) => f.label)),
    figureRationale:
      kind === 'creator'
        ? 'the romanisation is a convenience for readers abroad, while the strokes are what the pen name was actually built from'
        : 'a title is a decision somebody made about the thing, and these are the thing',
    gapClause:
      kind === 'creator'
        ? 'it marks the distance between how a name travels and how it was written'
        : 'it marks the gap between what a work is called and what it is',
    shelfLink: `The other ${words.texts} that reduce to ${n} are collected on <a href="/number/${n}">${group.shelf}</a>.`,
    wordCount: numbers.words.length,
  };
}

// ── Public API ───────────────────────────────────────────────────────────────

export function composeReading(input: ReadingInput): ComposedReading {
  const c = buildCtx(input);
  const seed = input.seed || input.title;

  return {
    numbers: c.numbers,
    anchor: findAnchor(c.numbers.words),
    standfirst: pick(STANDFIRST, seed, 'sf')(c),
    paragraphs: [
      pick(ARITHMETIC_PARA, seed, 'p1')(c),
      pick(MEANING_PARA, seed, 'p2')(c),
      pick(SPLIT_PARA, seed, 'p3')(c),
      ...(c.figures.length > 0 ? [pick(FIGURE_PARA, seed, 'pf')(c)] : []),
      pick(ASK_PARA, seed, 'p4')(c),
    ],
    arithmetic: arithmeticHtml(c.numbers) + figuresHtml(c.figures, c.n),
  };
}

/** The word-by-word working, printed as a plain list so it survives any prose style. */
export function arithmeticHtml(numbers: TitleNumbers): string {
  const cells = numbers.words
    .map(
      (w) =>
        `<span class="num-word"><span class="num-word-text">${esc(w.word)}</span><span class="num-word-value">${w.sum}</span></span>`,
    )
    .join('');
  return (
    `<div class="num-working" role="group" aria-label="Letter values of the title">` +
    `${cells}` +
    `<span class="num-word num-word-total"><span class="num-word-text">total</span><span class="num-word-value">${
      numbers.raw === numbers.value ? numbers.value : `${numbers.raw} → ${numbers.value}`
    }</span></span>` +
    `</div>`
  );
}

/**
 * The figures, ruled like the letter working above them. Figures matching the
 * filed number are marked, since that agreement is the whole reason to print
 * them side by side.
 */
export function figuresHtml(figures: Figure[], filed: number): string {
  if (figures.length === 0) return '';
  const cells = figures
    .map(
      (f) =>
        `<span class="num-word${f.value === filed ? ' num-word-match' : ''}"${
          f.note ? ` title="${esc(f.note)}"` : ''
        }><span class="num-word-text">${esc(f.label)}</span><span class="num-word-value">${
          f.raw === f.value ? f.raw : `${f.raw} → ${f.value}`
        }</span></span>`,
    )
    .join('');
  return `<div class="num-working num-working-figures" role="group" aria-label="Numbers the subject carries in its own right">${cells}</div>`;
}

// ── Injection into stored text ───────────────────────────────────────────────
// Readings are written into the data files rather than assembled at request
// time, so the JSON on disk is the finished text. The markers make that
// reversible: a rewrite replaces the block between them instead of stacking a
// second copy on top of the first.

export const READING_OPEN = '<!--catzye:reading-->';
export const READING_CLOSE = '<!--/catzye:reading-->';
export const STANDFIRST_OPEN = '<!--catzye:standfirst-->';
export const STANDFIRST_CLOSE = '<!--/catzye:standfirst-->';

function stripBlock(html: string, open: string, close: string): string {
  const pattern = new RegExp(
    `${open.replace(/[-[\]{}()*+?.,\\^$|#]/g, '\\$&')}[\\s\\S]*?${close.replace(/[-[\]{}()*+?.,\\^$|#]/g, '\\$&')}\\s*`,
    'g',
  );
  return html.replace(pattern, '');
}

/** Remove any previously injected reading, leaving the original text behind. */
export function stripReading(html: string): string {
  return stripBlock(stripBlock(html || '', STANDFIRST_OPEN, STANDFIRST_CLOSE), READING_OPEN, READING_CLOSE).trim();
}

/**
 * Separate the text from the reading that closes it: `[text, reading]`.
 *
 * Pages that interrupt a body — dropping a pull quote or a related-stories rail
 * after the third paragraph — must do that inside the text and not inside the
 * reading, which is a single argument and reads as nonsense cut in half. Split
 * here first, interrupt the text half, and append the reading whole.
 */
export function splitOffReading(html: string): [string, string] {
  const start = (html || '').indexOf(READING_OPEN);
  if (start === -1) return [html || '', ''];
  return [html.slice(0, start), html.slice(start)];
}

export interface InjectOptions extends ReadingInput {
  /** Heading for the closing block. Defaults to the shelf's own phrasing. */
  heading?: string;
}

/**
 * Return `html` with the numerological reading fitted around it: a standfirst
 * above, the full reading below. Idempotent — running it twice is the same as
 * running it once.
 */
export function injectReading(html: string, options: InjectOptions): string {
  const body = stripReading(html);
  const reading = composeReading(options);
  const n = reading.numbers.value;
  const group = getGroup(n);
  const heading = options.heading ?? `Reading the ${numWord(n)}`;

  const standfirst =
    `${STANDFIRST_OPEN}` +
    `<p class="num-standfirst"><a class="num-sigil" href="/number/${n}" aria-label="Filed under ${n}, ${group.shelf}">${n}</a>` +
    `<span>${reading.standfirst}</span></p>` +
    `${STANDFIRST_CLOSE}`;

  const readingBlock =
    `${READING_OPEN}` +
    `<section class="num-reading" aria-label="Numerological reading">` +
    `<h2>${esc(heading)}</h2>` +
    reading.arithmetic +
    reading.paragraphs.map((p) => `<p>${p}</p>`).join('') +
    `</section>` +
    `${READING_CLOSE}`;

  return `${standfirst}\n${body}\n${readingBlock}`;
}

/**
 * A one-line reading for places with no room for the full block — list pages,
 * card decks, meta descriptions, RSS. Plain text, no markup.
 */
export function readingLine(input: ReadingInput): string {
  const c = buildCtx(input);
  const seed = input.seed || input.title;
  return pick(
    [
      `${c.n} · ${c.group.shelf} — ${c.profile.vibration}.`,
      `Reduces to ${c.n}: ${c.group.shelf.toLowerCase()}, ${c.profile.keyword}.`,
      `${cap(article(c.n))} ${c.n} — ${c.profile.title.toLowerCase()}, filed under ${c.group.shelf.toLowerCase()}.`,
      c.whole
        ? `${c.n}, unreduced. ${cap(c.group.shelf)}: ${c.group.tagline}.`
        : `${c.numbers.raw} → ${c.n}. ${cap(c.group.shelf)}: ${c.group.tagline}.`,

    ],
    seed,
    'line',
  );
}

/**
 * A summary rewritten to carry its number. `source` must be the pristine
 * original — callers keep it in a `…Source` companion field so a rewrite is
 * always applied to the original text rather than to the previous rewrite.
 *
 * Position matters more than it looks. A report's summary leads with the number,
 * because on a card the shelf is the most useful thing to know about a piece of
 * archived reporting. A reference summary trails it, because those fields are
 * dictionary definitions: they are quoted verbatim into meta descriptions and
 * schema.org, where a sentence that opens on a bare figure is a worse answer to
 * the reader's question than one that opens on the definition.
 */
export function numerologizeSummary(
  source: string,
  input: ReadingInput,
  position: 'lead' | 'coda' = 'lead',
): string {
  const c = buildCtx(input);
  const original = (source || '').trim();
  const seed = input.seed || input.title;

  if (position === 'coda') {
    const coda = pick(
      [
        `Filed under ${c.n}, ${c.group.shelf.toLowerCase()}.`,
        `The ${c.unit} reduces to ${c.n} — ${c.group.shelf.toLowerCase()}.`,
        c.whole
          ? `${c.n} in the letters, with nothing left to reduce.`
          : `${c.numbers.raw} in the letters, reducing to ${c.n}.`,
        `Read from ${c.group.shelf.toLowerCase()}, as ${article(c.n)} ${c.n}.`,
      ],
      seed,
      'coda-sum',
    );
    if (!original) return coda;
    return /[.!?]$/.test(original) ? `${original} ${coda}` : `${original}. ${coda}`;
  }

  const lead = pick(
    [
      `Filed under ${c.n}, ${c.group.shelf.toLowerCase()}.`,
      `${cap(article(c.n))} ${c.n} — ${c.profile.keyword}.`,
      c.whole ? `${c.n} exactly, before any reduction.` : `${c.numbers.raw}, reducing to ${c.n}.`,
      `${cap(c.group.shelf)}: this one reduces to ${c.n}.`,
      `${cap(c.group.shelf)}, by the arithmetic — ${article(c.n)} ${c.n}.`,
    ],
    seed,
    'ex',
  );
  return original ? `${lead} ${original}` : lead;
}

/**
 * One sentence appended to an editor's note, tying the editor's judgement back
 * to the shelf the text is filed on. Written from the pristine note so it is
 * safe to regenerate.
 */
export function editorCoda(input: ReadingInput): string {
  const c = buildCtx(input);
  return pick(
    [
      `Numerologically this is ${article(c.n)} ${c.n}, which is why it is shelved with ${c.group.shelf.toLowerCase()} — ${c.group.tagline}.`,
      `We file it under ${c.n}. Read it as ${c.group.shape}, and ${c.group.asks}.`,
      `On this reference that reduces to ${c.n} — ${c.group.shelf.toLowerCase()}, where ${c.group.shape} is kept.`,
      `The ${c.unit} reduces to ${c.n}: ${c.profile.vibration}. That is the frame we read it in.`,
    ],
    input.seed || input.title,
    'coda',
  );
}
