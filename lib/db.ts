import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import {
  queryMany,
  queryOne,
  countRecords,
  groupByRecords,
  aggregateRecords,
} from '@/lib/store';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyArgs = any;
type Row = Record<string, unknown>;

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
  articleSnapshot?: Row[];
  seriesSnapshot?: Row[];
};

const realPrisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = realPrisma;

// ─── Article fallback snapshot ────────────────────────────────────────────────
// A warm copy of published articles kept in module memory (and mirrored to
// data/articles.json during development) so a database outage still serves
// recent content instead of a blank site. On a production cold start it is
// seeded from the committed data/articles.json snapshot. All fallback reads go
// through the same query engine the file-backed store uses (lib/store.ts), so
// where/orderBy/select/groupBy semantics match Prisma's for the subset we use.

const SNAPSHOT_FILE = path.join(process.cwd(), 'data', 'articles.json');
const SERIES_SNAPSHOT_FILE = path.join(process.cwd(), 'data', 'series.json');
const SNAPSHOT_LIMIT = 1000;
const DATE_FIELDS = ['publishedAt', 'createdAt', 'updatedAt', 'scheduledAt'] as const;

function reviveDates(row: Row): Row {
  for (const f of DATE_FIELDS) {
    if (typeof row[f] === 'string') row[f] = new Date(row[f] as string);
  }
  return row;
}

function toTime(v: unknown): number {
  const t = v instanceof Date ? v.getTime() : new Date(v as string).getTime();
  return Number.isNaN(t) ? 0 : t;
}

function loadSeedFrom(file: string): Row[] {
  try {
    if (!fs.existsSync(file)) return [];
    const parsed = JSON.parse(fs.readFileSync(file, 'utf8'));
    return Array.isArray(parsed) ? parsed.map(reviveDates) : [];
  } catch {
    return [];
  }
}

const snapshot: Row[] = globalForPrisma.articleSnapshot ?? loadSeedFrom(SNAPSHOT_FILE);
globalForPrisma.articleSnapshot = snapshot;

// Series are few and small, so the whole table is snapshotted. Without this, the
// series index, series detail, article page, and sitemap all throw when the
// database is down — even though their article reads would have fallen back fine.
const seriesSnapshot: Row[] = globalForPrisma.seriesSnapshot ?? loadSeedFrom(SERIES_SNAPSHOT_FILE);
globalForPrisma.seriesSnapshot = seriesSnapshot;

function persistSnapshot(): void {
  // The repo filesystem is read-only in production; keep the in-memory snapshot
  // there and rely on the committed seed. In dev, mirror to disk so a later run
  // without a database still has content.
  if (process.env.NODE_ENV === 'production') return;
  try {
    fs.writeFileSync(SNAPSHOT_FILE, JSON.stringify(snapshot, null, 2), 'utf8');
  } catch {
    /* best-effort */
  }
}

// Merge freshly-read, full published rows into the snapshot, newest first.
function mirror(rows: Row[]): void {
  const full = rows.filter((r) => r && typeof r.id === 'string' && r.published === true);
  if (full.length === 0) return;
  const byId = new Map(snapshot.map((r) => [r.id as string, r]));
  for (const r of full) byId.set(r.id as string, r);
  const merged = [...byId.values()].sort((a, b) => toTime(b.publishedAt) - toTime(a.publishedAt));
  snapshot.length = 0;
  snapshot.push(...merged.slice(0, SNAPSHOT_LIMIT));
  persistSnapshot();
}

let warned = false;
function warnOnce(op: string, err: unknown): void {
  if (warned) return;
  warned = true;
  console.error(
    `[db] database unavailable, serving article snapshot (${op}):`,
    err instanceof Error ? err.message : err,
  );
}

// Read methods try Postgres first, mirror successful full-record reads into the
// snapshot, and fall back to the snapshot on failure. Writes pass through — a
// down database should still surface write errors to the caller.
const articleReads = {
  async findMany(args?: AnyArgs) {
    try {
      const rows = (await realPrisma.article.findMany(args)) as Row[];
      if (!args?.select) mirror(rows);
      return rows;
    } catch (err) {
      warnOnce('findMany', err);
      return queryMany(snapshot, args);
    }
  },
  async findUnique(args: AnyArgs) {
    try {
      const row = (await realPrisma.article.findUnique(args)) as Row | null;
      if (row && !args?.select) mirror([row]);
      return row;
    } catch (err) {
      warnOnce('findUnique', err);
      return queryOne(snapshot, args);
    }
  },
  async findFirst(args?: AnyArgs) {
    try {
      const row = (await realPrisma.article.findFirst(args)) as Row | null;
      if (row && !args?.select) mirror([row]);
      return row;
    } catch (err) {
      warnOnce('findFirst', err);
      return queryOne(snapshot, args);
    }
  },
  async count(args?: AnyArgs) {
    try {
      return await realPrisma.article.count(args);
    } catch (err) {
      warnOnce('count', err);
      return countRecords(snapshot, args);
    }
  },
  async groupBy(args: AnyArgs) {
    try {
      return await realPrisma.article.groupBy(args);
    } catch (err) {
      warnOnce('groupBy', err);
      return groupByRecords(snapshot, args);
    }
  },
  async aggregate(args: AnyArgs) {
    try {
      return await realPrisma.article.aggregate(args);
    } catch (err) {
      warnOnce('aggregate', err);
      return aggregateRecords(snapshot, args);
    }
  },
} as const;

function mirrorSeries(rows: Row[]): void {
  const full = rows.filter((r) => r && typeof r.id === 'string');
  if (full.length === 0) return;
  const byId = new Map(seriesSnapshot.map((r) => [r.id as string, r]));
  for (const r of full) byId.set(r.id as string, r);
  seriesSnapshot.length = 0;
  seriesSnapshot.push(...byId.values());
  if (process.env.NODE_ENV === 'production') return;
  try {
    fs.writeFileSync(SERIES_SNAPSHOT_FILE, JSON.stringify(seriesSnapshot, null, 2), 'utf8');
  } catch {
    /* best-effort */
  }
}

// data/series.json snapshots the series table only — the `articles` relation is
// not stored on the row. Callers that ask for `include: { articles }` would
// otherwise get `undefined` and crash on `.length`, taking down /series, the
// series detail page, and the article page's series banner during an outage.
// Rebuild the relation from the article snapshot, honouring the nested
// where/orderBy/select so the shape matches what Prisma would have returned.
function hydrateSeriesArticles(row: Row | null, args?: AnyArgs): Row | null {
  if (!row) return row;
  const include = args?.include?.articles;
  if (!include) return row;
  const nested = include === true ? {} : include;
  const scoped = snapshot.filter((a) => a.seriesId === row.id);
  return { ...row, articles: queryMany(scoped, nested) };
}

const seriesReads = {
  async findMany(args?: AnyArgs) {
    try {
      const rows = (await realPrisma.series.findMany(args)) as Row[];
      if (!args?.select && !args?.include) mirrorSeries(rows);
      return rows;
    } catch (err) {
      warnOnce('series.findMany', err);
      return (queryMany(seriesSnapshot, args) as Row[]).map(
        (r) => hydrateSeriesArticles(r, args) as Row,
      );
    }
  },
  async findUnique(args: AnyArgs) {
    try {
      const row = (await realPrisma.series.findUnique(args)) as Row | null;
      if (row && !args?.select && !args?.include) mirrorSeries([row]);
      return row;
    } catch (err) {
      warnOnce('series.findUnique', err);
      return hydrateSeriesArticles(queryOne(seriesSnapshot, args) as Row | null, args);
    }
  },
  async findFirst(args?: AnyArgs) {
    try {
      const row = (await realPrisma.series.findFirst(args)) as Row | null;
      if (row && !args?.select && !args?.include) mirrorSeries([row]);
      return row;
    } catch (err) {
      warnOnce('series.findFirst', err);
      return hydrateSeriesArticles(queryOne(seriesSnapshot, args) as Row | null, args);
    }
  },
  async count(args?: AnyArgs) {
    try {
      return await realPrisma.series.count(args);
    } catch (err) {
      warnOnce('series.count', err);
      return countRecords(seriesSnapshot, args);
    }
  },
} as const;

function delegate(real: unknown, reads: Record<string, unknown>) {
  return new Proxy(real as Row, {
    get(target, prop: string) {
      if (prop in reads) return reads[prop];
      const value = (target as Row)[prop];
      return typeof value === 'function'
        ? (value as (...a: unknown[]) => unknown).bind(target)
        : value;
    },
  });
}

const articleDelegate = delegate(realPrisma.article, articleReads as unknown as Record<string, unknown>);
const seriesDelegate = delegate(realPrisma.series, seriesReads as unknown as Record<string, unknown>);

export const prisma = new Proxy(realPrisma, {
  get(target, prop: string) {
    if (prop === 'article') return articleDelegate;
    if (prop === 'series') return seriesDelegate;
    const value = (target as unknown as Row)[prop];
    return typeof value === 'function'
      ? (value as (...a: unknown[]) => unknown).bind(target)
      : value;
  },
}) as PrismaClient;
