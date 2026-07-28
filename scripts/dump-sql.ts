/**
 * Generates a Postgres data dump (INSERT statements) for the Catzye schema.
 *
 * Prefers the live database. When it is unreachable — e.g. the Neon compute
 * quota is exhausted — it falls back to the committed JSON snapshots in data/,
 * which is a subset (lib/db.ts caps the article snapshot at SNAPSHOT_LIMIT) and
 * carries no ScrapedItem/Subscriber rows. The generated file states which
 * source was used at the top, so a dump is never silently mistaken for a
 * complete one.
 *
 *   npx tsx scripts/dump-sql.ts            # -> dump/data.sql
 */
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

type Row = Record<string, unknown>;

const OUT_DIR = path.join(process.cwd(), 'dump');
const DATA_DIR = path.join(process.cwd(), 'data');

// Column order must match the CREATE TABLE in dump/schema.sql so the INSERTs
// stay readable and diffable against it.
const TABLES = {
  Series: ['id', 'title', 'slug', 'description', 'imageUrl', 'category', 'topics',
    'synopsis', 'status', 'genres', 'externalUrl', 'createdAt', 'updatedAt'],
  Article: ['id', 'title', 'content', 'excerpt', 'slug', 'imageUrl', 'imageAlt',
    'imageCredit', 'category', 'source', 'sourceUrl', 'publishedAt', 'published',
    'scheduledAt', 'views', 'tags', 'entities', 'pullQuote', 'editorNote',
    'reviewData', 'seriesId', 'seriesOrder', 'createdAt', 'updatedAt'],
  ScrapedItem: ['id', 'title', 'description', 'sourceUrl', 'source', 'category',
    'imageUrl', 'pubDate', 'scrapedAt', 'status'],
  Subscriber: ['id', 'email', 'token', 'createdAt'],
} as const;

// Columns typed `TEXT[]` in Postgres — they need ARRAY[...] literals, not JSON.
const ARRAY_COLUMNS = new Set(['tags', 'entities', 'genres']);
// Columns typed `JSONB` — serialised as a quoted JSON string cast to jsonb.
const JSON_COLUMNS = new Set(['topics', 'reviewData']);

function quote(s: string): string {
  return `'${s.replace(/'/g, "''")}'`;
}

function literal(column: string, value: unknown): string {
  if (value === null || value === undefined) {
    // A NULL in a `topics`/`genres` column would violate its NOT NULL default,
    // so emit the empty value the schema expects instead.
    if (column === 'topics') return `'[]'::jsonb`;
    if (ARRAY_COLUMNS.has(column)) return `ARRAY[]::TEXT[]`;
    return 'NULL';
  }
  if (ARRAY_COLUMNS.has(column)) {
    const items = Array.isArray(value) ? value : [value];
    if (items.length === 0) return `ARRAY[]::TEXT[]`;
    return `ARRAY[${items.map((v) => quote(String(v))).join(', ')}]::TEXT[]`;
  }
  if (JSON_COLUMNS.has(column)) return `${quote(JSON.stringify(value))}::jsonb`;
  if (value instanceof Date) return quote(value.toISOString());
  if (typeof value === 'boolean') return value ? 'TRUE' : 'FALSE';
  if (typeof value === 'number') return Number.isFinite(value) ? String(value) : 'NULL';
  if (typeof value === 'object') return `${quote(JSON.stringify(value))}::jsonb`;
  return quote(String(value));
}

function insertsFor(table: string, columns: readonly string[], rows: Row[]): string {
  if (rows.length === 0) return `-- ${table}: no rows\n`;
  const cols = columns.map((c) => `"${c}"`).join(', ');
  const values = rows
    .map((r) => `  (${columns.map((c) => literal(c, r[c])).join(', ')})`)
    .join(',\n');
  // ON CONFLICT DO NOTHING keeps the dump replayable onto a non-empty database.
  return `INSERT INTO "${table}" (${cols}) VALUES\n${values}\nON CONFLICT DO NOTHING;\n`;
}

function readSnapshot(file: string): Row[] {
  const full = path.join(DATA_DIR, file);
  if (!fs.existsSync(full)) return [];
  try {
    const parsed = JSON.parse(fs.readFileSync(full, 'utf8'));
    return Array.isArray(parsed) ? (parsed as Row[]) : [];
  } catch {
    return [];
  }
}

async function main() {
  const prisma = new PrismaClient();
  let source: 'database' | 'snapshot' = 'database';
  let series: Row[] = [];
  let articles: Row[] = [];
  let scraped: Row[] = [];
  let subscribers: Row[] = [];

  try {
    [series, articles, scraped, subscribers] = (await Promise.all([
      prisma.series.findMany({ orderBy: { createdAt: 'asc' } }),
      prisma.article.findMany({ orderBy: { createdAt: 'asc' } }),
      prisma.scrapedItem.findMany({ orderBy: { scrapedAt: 'asc' } }),
      prisma.subscriber.findMany({ orderBy: { createdAt: 'asc' } }),
    ])) as unknown as Row[][];
  } catch (err) {
    source = 'snapshot';
    console.warn(`[dump] database unreachable, falling back to data/*.json snapshots`);
    console.warn(`[dump] ${String((err as Error).message).split('\n').filter(Boolean).pop()}`);
    series = readSnapshot('series.json');
    articles = readSnapshot('articles.json');
    scraped = readSnapshot('scraped-items.json');
    subscribers = readSnapshot('subscribers.json');
  } finally {
    await prisma.$disconnect().catch(() => {});
  }

  const header = [
    `-- Catzye data dump`,
    `-- Generated: ${new Date().toISOString()}`,
    `-- Source: ${source === 'database' ? 'live database' : 'committed data/*.json snapshots (PARTIAL — see below)'}`,
    source === 'snapshot'
      ? `--\n-- WARNING: the live database was unreachable. These rows come from the\n-- offline fallback snapshots, which are capped and omit ScrapedItem and\n-- Subscriber data. Re-run against a reachable database for a complete dump.`
      : `--\n-- Complete dump of all four tables.`,
    `--`,
    `-- Load order matters: Series precedes Article because Article.seriesId`,
    `-- carries a foreign key to it. Apply dump/schema.sql first.`,
    ``,
    `BEGIN;`,
    ``,
  ].join('\n');

  const body = [
    insertsFor('Series', TABLES.Series, series),
    insertsFor('Article', TABLES.Article, articles),
    insertsFor('ScrapedItem', TABLES.ScrapedItem, scraped),
    insertsFor('Subscriber', TABLES.Subscriber, subscribers),
  ].join('\n');

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const out = path.join(OUT_DIR, 'data.sql');
  fs.writeFileSync(out, `${header}${body}\nCOMMIT;\n`, 'utf8');

  const mb = (fs.statSync(out).size / 1024 / 1024).toFixed(2);
  console.log(`[dump] wrote ${out} (${mb} MB) from ${source}`);
  console.log(
    `[dump] Series=${series.length} Article=${articles.length} ` +
    `ScrapedItem=${scraped.length} Subscriber=${subscribers.length}`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
