/**
 * Rewrite every text in data/ so it carries its numerological reading.
 *
 *   npx tsx scripts/numerologize.ts          # rewrite in place
 *   npx tsx scripts/numerologize.ts --check  # report only, write nothing
 *
 * The reference is file-backed, so this is the whole publishing pipeline: it
 * reads data/*.json, fits a reading around each text, and writes the files back.
 * No database and no model is involved — every sentence it adds is composed from
 * the title's own arithmetic by lib/numerologize.
 *
 * Running it twice is the same as running it once. HTML bodies carry markers the
 * composer strips before re-injecting; short plain-text fields keep their
 * original in a `…Source` companion, and the rewrite is always applied to that.
 */

import fs from 'fs';
import path from 'path';
import {
  injectReading,
  numerologizeSummary,
  editorCoda,
  figure,
  type Figure,
  type TextKind,
  type ReadingInput,
} from '@/lib/numerologize';
import { titleNumbers, getGroup } from '@/lib/number-groups';
import { workFigures } from '@/lib/work-numbers';
import { readName, readTitleStrokes, findJapaneseTitle } from '@/lib/strokes';

const DATA = path.join(process.cwd(), 'data');
const CHECK = process.argv.includes('--check');

type Row = Record<string, unknown>;

function read(file: string): Row[] {
  const p = path.join(DATA, file);
  if (!fs.existsSync(p)) return [];
  const parsed = JSON.parse(fs.readFileSync(p, 'utf8'));
  return Array.isArray(parsed) ? parsed : [];
}

function write(file: string, rows: Row[]): void {
  if (CHECK) return;
  fs.writeFileSync(path.join(DATA, file), JSON.stringify(rows, null, 2), 'utf8');
}

function str(row: Row, key: string): string {
  const v = row[key];
  return typeof v === 'string' ? v : '';
}

/**
 * Read a plain-text field through its `…Source` companion, creating the
 * companion on first pass. Returns the pristine original every time.
 */
function source(row: Row, key: string): string {
  const companion = `${key}Source`;
  if (typeof row[companion] === 'string') return row[companion] as string;
  const current = str(row, key);
  if (current) row[companion] = current;
  return current;
}

/** The numbers stored on the row so pages need not recompute them. */
function stamp(row: Row, title: string): number {
  const n = titleNumbers(title);
  const group = getGroup(n.value);
  row.numerology = {
    value: n.value,
    raw: n.raw,
    heart: n.heart,
    personality: n.personality,
    shelf: group.shelf,
  };
  return n.value;
}

interface Spec {
  file: string;
  kind: TextKind;
  /** Where the title lives on the row. */
  titleKey: string;
  /** Where the HTML body lives, if the record has one. */
  bodyKey?: string;
  /** Plain-text summary fields to rewrite with the number. */
  summaryKeys?: string[];
  /**
   * Where the number goes in those summaries. Reporting leads with it; a
   * reference definition trails it, so the definition still answers first.
   */
  summaryPosition?: 'lead' | 'coda';
  /** Named subjects, if the record records any. */
  entitiesKey?: string;
  categoryKey?: string;
  seedKey?: string;
  /** Heading for the injected reading section. */
  heading?: (n: number) => string;
  /**
   * Numbers this record carries in its own right — volume counts, stroke
   * counts, years. Unlike the title reduction these were not imposed by the
   * reference, so where they contradict it the reading says so.
   */
  figures?: (row: Row) => Figure[];
}

const SPECS: Spec[] = [
  {
    file: 'articles.json',
    kind: 'article',
    titleKey: 'title',
    bodyKey: 'content',
    summaryKeys: ['excerpt'],
    entitiesKey: 'entities',
    categoryKey: 'category',
    seedKey: 'slug',
  },
  {
    file: 'glossary.json',
    kind: 'glossary',
    titleKey: 'term',
    bodyKey: 'body',
    summaryKeys: ['shortDef'],
    categoryKey: 'category',
    seedKey: 'slug',
    summaryPosition: 'coda',
    heading: () => 'The term by its numbers',
  },
  {
    file: 'learn.json',
    kind: 'lesson',
    titleKey: 'title',
    bodyKey: 'body',
    summaryKeys: ['summary'],
    categoryKey: 'track',
    seedKey: 'slug',
    summaryPosition: 'coda',
    heading: () => 'Where this explainer is shelved',
  },
  {
    file: 'works.json',
    kind: 'work',
    titleKey: 'title',
    bodyKey: 'body',
    summaryKeys: ['synopsis'],
    categoryKey: 'demographic',
    seedKey: 'slug',
    summaryPosition: 'coda',
    heading: () => 'The title by its numbers',
    figures: (row) => {
      const figures = workFigures(row as never);
      // 総画 — the strokes of the title as the author wrote it. This is the one
      // reading of a manga that is not filtered through a translation.
      const japanese = findJapaneseTitle(row.altTitles as string[] | undefined);
      const strokes = japanese ? readTitleStrokes(japanese) : null;
      if (strokes) {
        figures.unshift(figure('総画 strokes', strokes.total, `${japanese}, as written`));
      }
      return figures;
    },
  },
  {
    file: 'creators.json',
    kind: 'creator',
    titleKey: 'name',
    bodyKey: 'body',
    summaryKeys: ['bio'],
    categoryKey: 'role',
    seedKey: 'slug',
    summaryPosition: 'coda',
    heading: () => 'The name by its numbers',
    figures: (row) => {
      const figures: Figure[] = [];
      // 姓名判断 on the native name. A pen name is a constructed thing and
      // stroke count is one of the things it is constructed around, so of every
      // reading on this site these are the likeliest to have been intended.
      const reading = readName(String(row.nativeName ?? ''));
      if (reading) {
        figures.push(
          figure('人格 core', reading.jinkaku, `${reading.surname} / ${reading.given}, at the join`),
          figure('総格 total', reading.soukaku, `every stroke of ${reading.surname}${reading.given}`),
        );
      }
      if (typeof row.bornYear === 'number' && row.bornYear > 0) {
        figures.push(figure('born', row.bornYear, `born ${row.bornYear}`));
      }
      return figures;
    },
  },
  {
    file: 'series.json',
    kind: 'series',
    titleKey: 'title',
    summaryKeys: ['description', 'synopsis'],
    categoryKey: 'category',
    seedKey: 'slug',
    summaryPosition: 'coda',
  },
];

function processFile(spec: Spec): { file: string; rows: number; byNumber: Map<number, number> } {
  const rows = read(spec.file);
  const byNumber = new Map<number, number>();

  for (const row of rows) {
    const title = str(row, spec.titleKey);
    if (!title) continue;

    const input: ReadingInput = {
      title,
      kind: spec.kind,
      entities: spec.entitiesKey ? (row[spec.entitiesKey] as string[] | undefined) : undefined,
      category: spec.categoryKey ? str(row, spec.categoryKey) : undefined,
      seed: (spec.seedKey && str(row, spec.seedKey)) || title,
      figures: spec.figures?.(row),
    };

    const n = stamp(row, title);
    byNumber.set(n, (byNumber.get(n) ?? 0) + 1);

    if (spec.bodyKey && str(row, spec.bodyKey)) {
      row[spec.bodyKey] = injectReading(str(row, spec.bodyKey), {
        ...input,
        heading: spec.heading?.(n),
      });
    }

    for (const key of spec.summaryKeys ?? []) {
      const original = source(row, key);
      if (original) row[key] = numerologizeSummary(original, input, spec.summaryPosition ?? 'lead');
    }

    // The editor's note is a judgement, so the original is kept whole and the
    // shelf is added to the end of it rather than written over it.
    if (typeof row.editorNote === 'string' || typeof row.editorNoteSource === 'string') {
      const original = source(row, 'editorNote');
      if (original) row.editorNote = `${original.trim()} ${editorCoda(input)}`;
    }

    // Tag the row with its shelf so existing tag pages and search surface it.
    if (Array.isArray(row.tags)) {
      const shelf = getGroup(n).shelf;
      const kept = (row.tags as string[]).filter(
        (t) => !/^number \d+$/i.test(t) && !/^the (opening|pairing|telling|structure|turn|care|inquiry|ledger|closing|signal|edifice|teaching)$/i.test(t),
      );
      row.tags = [...kept, `Number ${n}`, shelf];
    }
  }

  write(spec.file, rows);
  return { file: spec.file, rows: rows.length, byNumber };
}

const totals = new Map<number, number>();
let grand = 0;

for (const spec of SPECS) {
  const result = processFile(spec);
  grand += result.rows;
  for (const [n, c] of result.byNumber) totals.set(n, (totals.get(n) ?? 0) + c);
  const spread = [...result.byNumber.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([n, c]) => `${n}:${c}`)
    .join(' ');
  console.log(`${result.file.padEnd(16)} ${String(result.rows).padStart(5)} texts   ${spread}`);
}

console.log(`\n${grand} texts read${CHECK ? ' (check only, nothing written)' : ' and rewritten'}.`);
console.log('Shelves:');
for (const [n, c] of [...totals.entries()].sort((a, b) => a[0] - b[0])) {
  console.log(`  ${String(n).padStart(2)} ${getGroup(n).shelf.padEnd(14)} ${c}`);
}
