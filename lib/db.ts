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
const SNAPSHOT_LIMIT = 500;
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

function loadSeed(): Row[] {
  try {
    if (!fs.existsSync(SNAPSHOT_FILE)) return [];
    const parsed = JSON.parse(fs.readFileSync(SNAPSHOT_FILE, 'utf8'));
    return Array.isArray(parsed) ? parsed.map(reviveDates) : [];
  } catch {
    return [];
  }
}

const snapshot: Row[] = globalForPrisma.articleSnapshot ?? loadSeed();
globalForPrisma.articleSnapshot = snapshot;

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

const articleDelegate = new Proxy(realPrisma.article as unknown as Row, {
  get(target, prop: string) {
    if (prop in articleReads) return (articleReads as Row)[prop];
    const value = (target as Row)[prop];
    return typeof value === 'function'
      ? (value as (...a: unknown[]) => unknown).bind(target)
      : value;
  },
});

export const prisma = new Proxy(realPrisma, {
  get(target, prop: string) {
    if (prop === 'article') return articleDelegate;
    const value = (target as unknown as Row)[prop];
    return typeof value === 'function'
      ? (value as (...a: unknown[]) => unknown).bind(target)
      : value;
  },
}) as PrismaClient;
