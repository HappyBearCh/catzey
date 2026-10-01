import fs from 'fs';
import path from 'path';
import {
  queryMany,
  queryOne,
  countRecords,
  groupByRecords,
  aggregateRecords,
} from '@/lib/store';
import type { Article, Series } from '@/lib/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyArgs = any;
type Row = Record<string, unknown>;

// ─── The reference reads from files, not from a database ─────────────────────
//
// Catzye is a reference, not a feed: the texts are finished, they are versioned
// in git, and every one of them carries a numerological reading composed from
// its own title by scripts/numerologize.ts. That pipeline writes data/*.json,
// which makes those files the published edition — so the site reads them
// directly. There is no database behind it and no write path: to change a text,
// edit the file and redeploy.
//
// Reads go through lib/store.ts, which implements the where/orderBy/select/
// groupBy subset this app uses against plain arrays. The export keeps the
// `prisma.article.findMany(...)` shape the call sites were written against.

const globalEdition = globalThis as unknown as {
  articleEdition?: Row[];
  seriesEdition?: Row[];
};

// ─── The published edition ───────────────────────────────────────────────────

const ARTICLES_FILE = path.join(process.cwd(), 'data', 'articles.json');
const SERIES_FILE = path.join(process.cwd(), 'data', 'series.json');
const DATE_FIELDS = ['publishedAt', 'createdAt', 'updatedAt', 'scheduledAt'] as const;

// The files store dates as ISO strings; callers expect the Date objects Prisma
// would have handed them, so they are revived once at load.
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

function loadEdition(file: string): Row[] {
  try {
    if (!fs.existsSync(file)) return [];
    const parsed = JSON.parse(fs.readFileSync(file, 'utf8'));
    return Array.isArray(parsed) ? parsed.map(reviveDates) : [];
  } catch (err) {
    console.error(`[db] could not read ${path.basename(file)}:`, err instanceof Error ? err.message : err);
    return [];
  }
}

// Parsed once per process and held in module memory. The files are a few
// megabytes and never change at runtime, so re-reading them per request would
// buy nothing.
const articles: Row[] = (globalEdition.articleEdition ??= loadEdition(ARTICLES_FILE).sort(
  (a, b) => toTime(b.publishedAt) - toTime(a.publishedAt),
));
const series: Row[] = (globalEdition.seriesEdition ??= loadEdition(SERIES_FILE));

// ─── Read delegates ──────────────────────────────────────────────────────────

const articleReads = {
  async findMany(args?: AnyArgs) {
    return queryMany(articles, args);
  },
  async findUnique(args: AnyArgs) {
    return queryOne(articles, args);
  },
  async findFirst(args?: AnyArgs) {
    return queryOne(articles, args);
  },
  async count(args?: AnyArgs) {
    return countRecords(articles, args);
  },
  async groupBy(args: AnyArgs) {
    return groupByRecords(articles, args);
  },
  async aggregate(args: AnyArgs) {
    return aggregateRecords(articles, args);
  },
} as const;

// data/series.json stores the series rows only — the `articles` relation is not
// on the row. Callers that ask for `include: { articles }` would otherwise get
// `undefined` and crash on `.length`, so the relation is rebuilt from the
// article edition, honouring the nested where/orderBy/select.
function hydrateSeriesArticles(row: Row | null, args?: AnyArgs): Row | null {
  if (!row) return row;
  const include = args?.include?.articles;
  if (!include) return row;
  const nested = include === true ? {} : include;
  const scoped = articles.filter((a) => a.seriesId === row.id);
  return { ...row, articles: queryMany(scoped, nested) };
}

const seriesReads = {
  async findMany(args?: AnyArgs) {
    return (queryMany(series, args) as Row[]).map((r) => hydrateSeriesArticles(r, args) as Row);
  },
  async findUnique(args: AnyArgs) {
    return hydrateSeriesArticles(queryOne(series, args) as Row | null, args);
  },
  async findFirst(args?: AnyArgs) {
    return hydrateSeriesArticles(queryOne(series, args) as Row | null, args);
  },
  async count(args?: AnyArgs) {
    return countRecords(series, args);
  },
} as const;

// Rows come back as the full record whatever `select` asked for, typed as the
// record; groupBy and aggregate keep Prisma's loosely shaped results.
type Reads<T> = {
  findMany(args?: AnyArgs): Promise<T[]>;
  findUnique(args: AnyArgs): Promise<T | null>;
  findFirst(args?: AnyArgs): Promise<T | null>;
  count(args?: AnyArgs): Promise<number>;
};

export const prisma = {
  article: articleReads as unknown as Reads<Article> & {
    groupBy(args: AnyArgs): Promise<AnyArgs[]>;
    aggregate(args: AnyArgs): Promise<AnyArgs>;
  },
  series: seriesReads as unknown as Reads<Series & { articles: Article[] }>,
};
