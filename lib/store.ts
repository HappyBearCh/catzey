import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

// ─── Data directory ──────────────────────────────────────────────────────────

const DATA_DIR = path.join(process.cwd(), 'data');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readJson<T>(file: string): T[] {
  const p = path.join(DATA_DIR, file);
  if (!fs.existsSync(p)) return [];
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8')) as T[];
  } catch {
    return [];
  }
}

function writeJson<T>(file: string, data: T[]): void {
  ensureDataDir();
  fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2), 'utf8');
}

function newId(): string {
  return randomUUID().replace(/-/g, '').slice(0, 25);
}

function nowIso(): string {
  return new Date().toISOString();
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ArticleRecord {
  [key: string]: unknown;
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  imageUrl: string | null;
  category: string;
  source: string;
  sourceUrl: string;
  publishedAt: string;
  published: boolean;
  scheduledAt: string | null;
  views: number;
  tags: string[];
  entities: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ScrapedItemRecord {
  [key: string]: unknown;
  id: string;
  title: string;
  description: string | null;
  sourceUrl: string;
  source: string;
  category: string;
  imageUrl: string | null;
  pubDate: string | null;
  scrapedAt: string;
  status: string;
}

export interface SubscriberRecord {
  [key: string]: unknown;
  id: string;
  email: string;
  token: string;
  createdAt: string;
}

// ─── Global cache ─────────────────────────────────────────────────────────────

interface StoreCache {
  articles: ArticleRecord[] | null;
  scrapedItems: ScrapedItemRecord[] | null;
  subscribers: SubscriberRecord[] | null;
}

const g = globalThis as unknown as { __jsonStore?: StoreCache };
if (!g.__jsonStore) g.__jsonStore = { articles: null, scrapedItems: null, subscribers: null };
const cache = g.__jsonStore;

function getArticles(): ArticleRecord[] {
  if (!cache.articles) cache.articles = readJson<ArticleRecord>('articles.json');
  return cache.articles;
}
function saveArticles(): void { writeJson('articles.json', getArticles()); }

function getScrapedItems(): ScrapedItemRecord[] {
  if (!cache.scrapedItems) cache.scrapedItems = readJson<ScrapedItemRecord>('scraped-items.json');
  return cache.scrapedItems;
}
function saveScrapedItems(): void { writeJson('scraped-items.json', getScrapedItems()); }

function getSubscribers(): SubscriberRecord[] {
  if (!cache.subscribers) cache.subscribers = readJson<SubscriberRecord>('subscribers.json');
  return cache.subscribers;
}
function saveSubscribers(): void { writeJson('subscribers.json', getSubscribers()); }

// ─── Where / orderBy / select helpers ────────────────────────────────────────

type Rec = Record<string, unknown>;

function toMs(v: unknown): number {
  if (v instanceof Date) return v.getTime();
  if (typeof v === 'string') return new Date(v).getTime();
  return Number(v);
}

function matchValue(fieldValue: unknown, condition: unknown): boolean {
  if (condition === null) return fieldValue === null || fieldValue === undefined;
  if (condition === undefined) return true;

  if (typeof condition === 'object' && !Array.isArray(condition)) {
    const c = condition as Rec;

    if ('in' in c && Array.isArray(c.in)) {
      return (c.in as unknown[]).includes(fieldValue);
    }
    if ('not' in c) {
      const notVal = c.not;
      if (notVal === null) return fieldValue !== null && fieldValue !== undefined;
      if (typeof notVal === 'object' && notVal !== null) return !matchValue(fieldValue, notVal);
      return fieldValue !== notVal;
    }
    if ('equals' in c) return fieldValue === c.equals;
    if ('notIn' in c && Array.isArray(c.notIn)) return !(c.notIn as unknown[]).includes(fieldValue);
    if ('gt' in c) return Number(fieldValue) > Number(c.gt);
    if ('gte' in c) return toMs(fieldValue) >= toMs(c.gte);
    // `lt` sat missing beside its three siblings, so the scraper's retry and
    // stuck-claim sweeps in app/api/cron/process silently matched nothing.
    if ('lt' in c) return toMs(fieldValue) < toMs(c.lt);
    if ('lte' in c) return toMs(fieldValue) <= toMs(c.lte);
    // Same omission as `has`: /numerology/daily narrows the daily desk out of
    // the shared "numerology" category by slug prefix, and with no startsWith
    // the archive rendered empty even though five columns were published.
    if ('startsWith' in c) {
      const s = String(fieldValue ?? '');
      const q = String(c.startsWith ?? '');
      return c.mode === 'insensitive' ? s.toLowerCase().startsWith(q.toLowerCase()) : s.startsWith(q);
    }
    if ('endsWith' in c) {
      const s = String(fieldValue ?? '');
      const q = String(c.endsWith ?? '');
      return c.mode === 'insensitive' ? s.toLowerCase().endsWith(q.toLowerCase()) : s.endsWith(q);
    }
    if ('contains' in c) {
      const s = String(fieldValue ?? '');
      const q = String(c.contains ?? '');
      return c.mode === 'insensitive'
        ? s.toLowerCase().includes(q.toLowerCase())
        : s.includes(q);
    }
    if ('hasSome' in c && Array.isArray(c.hasSome)) {
      if (!Array.isArray(fieldValue)) return false;
      return (c.hasSome as string[]).some((t) => (fieldValue as string[]).includes(t));
    }
    // Prisma's scalar-list membership test. Without it `{ entities: { has: x } }`
    // fell through to the identity check at the bottom and never matched, which
    // emptied every /topic/<entity> archive and turned the ~500 topic URLs the
    // sitemap advertises into 404s.
    if ('has' in c) {
      if (!Array.isArray(fieldValue)) return false;
      return (fieldValue as unknown[]).includes(c.has);
    }
    if ('hasEvery' in c && Array.isArray(c.hasEvery)) {
      if (!Array.isArray(fieldValue)) return false;
      return (c.hasEvery as unknown[]).every((t) => (fieldValue as unknown[]).includes(t));
    }
  }

  return fieldValue === condition;
}

function matchWhere(record: Rec, where: Rec): boolean {
  for (const [key, condition] of Object.entries(where)) {
    if (key === 'OR') {
      const ors = condition as Rec[];
      if (!ors.some((c) => matchWhere(record, c))) return false;
      continue;
    }
    if (key === 'AND') {
      const ands = condition as Rec[];
      if (!ands.every((c) => matchWhere(record, c))) return false;
      continue;
    }
    if (!matchValue(record[key], condition)) return false;
  }
  return true;
}

function applyOrderBy<T extends Rec>(arr: T[], orderBy?: Rec | Rec[]): T[] {
  if (!orderBy) return arr;
  const ob = Array.isArray(orderBy) ? orderBy[0] : orderBy;
  if (!ob) return arr;
  const [field, dir] = Object.entries(ob)[0];
  return [...arr].sort((a, b) => {
    const av = a[field];
    const bv = b[field];
    let diff: number;
    if (av === null || av === undefined) diff = -1;
    else if (bv === null || bv === undefined) diff = 1;
    else if (typeof av === 'string' && typeof bv === 'string') {
      // Try date comparison
      const an = new Date(av).getTime();
      const bn = new Date(bv).getTime();
      diff = isNaN(an) || isNaN(bn) ? av.localeCompare(bv) : an - bn;
    } else {
      diff = Number(av) - Number(bv);
    }
    return dir === 'desc' ? -diff : diff;
  });
}

function applySelect<T>(record: T, select?: Rec | null): T {
  if (!select) return record;
  const keys = Object.entries(select).filter(([, v]) => v).map(([k]) => k);
  const out: Rec = {};
  for (const k of keys) out[k] = (record as Rec)[k];
  return out as T;
}

function applySelectMany<T>(arr: T[], select?: Rec | null): T[] {
  if (!select) return arr;
  return arr.map((r) => applySelect(r, select));
}

function applyUpdateData<T extends Rec>(record: T, data: Rec): T {
  const updated = { ...record } as T;
  for (const [k, v] of Object.entries(data)) {
    if (v !== null && typeof v === 'object' && !Array.isArray(v) && 'increment' in (v as Rec)) {
      (updated as Rec)[k] = (Number((record as Rec)[k]) || 0) + Number((v as Rec).increment);
    } else {
      (updated as Rec)[k] = v;
    }
  }
  return updated;
}

// ─── Pure query engine ───────────────────────────────────────────────────────
// These operate on an arbitrary in-memory array and implement the subset of the
// Prisma query API the app uses. They back both the file-backed store below and
// the resilient database fallback in lib/db.ts, so query semantics stay in sync.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyArgs = any;

export function queryMany<T extends Rec>(data: T[], args?: AnyArgs): T[] {
  let d = data as Rec[];
  const where = args?.where as Rec | undefined;
  if (where) d = d.filter((r) => matchWhere(r, where));
  d = applyOrderBy(d, args?.orderBy);
  if (args?.skip) d = d.slice(args.skip as number);
  if (args?.take) d = d.slice(0, args.take as number);
  return applySelectMany(d, args?.select) as T[];
}

export function queryOne<T extends Rec>(data: T[], args?: AnyArgs): T | null {
  const where = args?.where as Rec | undefined;
  const found = (where ? data.find((r) => matchWhere(r as Rec, where)) : data[0]) ?? null;
  if (!found) return null;
  return applySelect(found, args?.select) as T;
}

export function countRecords<T extends Rec>(data: T[], args?: AnyArgs): number {
  const where = args?.where as Rec | undefined;
  return where ? data.filter((r) => matchWhere(r as Rec, where)).length : data.length;
}

export function groupByRecords<T extends Rec>(data: T[], args: AnyArgs): Rec[] {
  let d = data as Rec[];
  const where = args?.where as Rec | undefined;
  if (where) d = d.filter((r) => matchWhere(r, where));

  const byFields = args.by as string[];
  const countField = args._count ? Object.keys(args._count as Rec)[0] : null;
  const maxField = args._max ? Object.keys(args._max as Rec)[0] : null;

  const groups = new Map<string, Rec[]>();
  for (const record of d) {
    const key = byFields.map((f) => String(record[f] ?? '')).join('\x00');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(record);
  }

  const result: Rec[] = [];
  for (const [, records] of groups) {
    const entry: Rec = {};
    for (const f of byFields) entry[f] = records[0][f];
    if (countField) {
      // `_count: { _all: true }` counts rows, not non-null values of a column
      // named "_all" — the old filter looked up a field that never exists and
      // reported 0 for every group, which is why the sitemap listed no
      // paginated category pages.
      entry._count = {
        [countField]:
          countField === '_all'
            ? records.length
            : records.filter((r) => r[countField] != null).length,
      };
    }
    if (maxField) {
      const vals = records.map((r) => r[maxField]).filter((v) => v != null);
      entry._max = { [maxField]: vals.length ? vals.reduce((a, b) => (toMs(a) > toMs(b) ? a : b)) : null };
    }
    result.push(entry);
  }

  const orderBy = args.orderBy as Rec | undefined;
  if (orderBy) {
    const [aggKey, innerOrDir] = Object.entries(orderBy)[0];
    if (typeof innerOrDir === 'object' && innerOrDir !== null) {
      const [subField, dir] = Object.entries(innerOrDir as Rec)[0];
      result.sort((a, b) => {
        const av = toMs((a[aggKey] as Rec)?.[subField]);
        const bv = toMs((b[aggKey] as Rec)?.[subField]);
        const diff = (isNaN(av) ? 0 : av) - (isNaN(bv) ? 0 : bv);
        return dir === 'desc' ? -diff : diff;
      });
    } else {
      result.sort((a, b) => {
        const av = a[aggKey];
        const bv = b[aggKey];
        const diff = toMs(av) - toMs(bv);
        return innerOrDir === 'desc' ? -diff : diff;
      });
    }
  }

  return result;
}

export function aggregateRecords<T extends Rec>(data: T[], args: AnyArgs): Rec {
  const result: Rec = {};
  if (args._sum) {
    const sumFields = Object.keys(args._sum as Rec);
    result._sum = Object.fromEntries(
      sumFields.map((f) => [f, data.reduce((acc, r) => acc + (Number((r as Rec)[f]) || 0), 0)]),
    );
  }
  if (args._count) {
    const countFields = Object.keys(args._count as Rec);
    result._count = Object.fromEntries(countFields.map((f) => [f, data.filter((r) => (r as Rec)[f] != null).length]));
  }
  return result;
}

// ─── Article ─────────────────────────────────────────────────────────────────

const article = {
  async findMany(args?: AnyArgs): Promise<AnyArgs[]> {
    return queryMany(getArticles() as Rec[], args);
  },

  async findUnique(args: AnyArgs): Promise<AnyArgs | null> {
    return queryOne(getArticles() as Rec[], args);
  },

  async findFirst(args?: AnyArgs): Promise<AnyArgs | null> {
    return queryOne(getArticles() as Rec[], args);
  },

  async create(args: AnyArgs): Promise<AnyArgs> {
    const data = args.data as Rec;
    const now = nowIso();
    const record: ArticleRecord = {
      id: newId(),
      title: String(data.title ?? ''),
      content: String(data.content ?? ''),
      excerpt: String(data.excerpt ?? ''),
      slug: String(data.slug ?? ''),
      imageUrl: (data.imageUrl as string | null) ?? null,
      category: String(data.category ?? 'manga'),
      source: String(data.source ?? ''),
      sourceUrl: String(data.sourceUrl ?? ''),
      publishedAt: data.publishedAt instanceof Date
        ? data.publishedAt.toISOString()
        : String(data.publishedAt ?? now),
      published: Boolean(data.published ?? false),
      scheduledAt: data.scheduledAt instanceof Date
        ? data.scheduledAt.toISOString()
        : (data.scheduledAt as string | null) ?? null,
      views: Number(data.views ?? 0),
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
      entities: Array.isArray(data.entities) ? (data.entities as string[]) : [],
      createdAt: now,
      updatedAt: now,
    };
    const arr = getArticles();
    arr.push(record);
    saveArticles();
    return record;
  },

  async update(args: AnyArgs): Promise<AnyArgs> {
    const where = args.where as Rec;
    const data = args.data as Rec;
    const arr = getArticles();
    const idx = arr.findIndex((r) => matchWhere(r as Rec, where));
    if (idx === -1) throw new Error('Article not found');
    const updated = applyUpdateData(arr[idx] as Rec, data);
    (updated as Rec).updatedAt = nowIso();
    // coerce Date objects back to ISO strings
    if (updated.scheduledAt instanceof Date) updated.scheduledAt = (updated.scheduledAt as Date).toISOString();
    arr[idx] = updated as ArticleRecord;
    cache.articles = arr;
    saveArticles();
    return applySelect(updated, args.select);
  },

  async updateMany(args: AnyArgs): Promise<{ count: number }> {
    const where = args.where as Rec;
    const data = args.data as Rec;
    const arr = getArticles();
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
      if (matchWhere(arr[i] as Rec, where)) {
        const updated = applyUpdateData(arr[i] as Rec, data);
        (updated as Rec).updatedAt = nowIso();
        if (updated.scheduledAt instanceof Date) updated.scheduledAt = (updated.scheduledAt as Date).toISOString();
        arr[i] = updated as ArticleRecord;
        count++;
      }
    }
    cache.articles = arr;
    saveArticles();
    return { count };
  },

  async delete(args: AnyArgs): Promise<AnyArgs> {
    const where = args.where as Rec;
    const arr = getArticles();
    const idx = arr.findIndex((r) => matchWhere(r as Rec, where));
    if (idx === -1) throw new Error('Article not found');
    const [deleted] = arr.splice(idx, 1);
    cache.articles = arr;
    saveArticles();
    return deleted;
  },

  async deleteMany(args: AnyArgs): Promise<{ count: number }> {
    const where = args.where as Rec;
    const arr = getArticles();
    const before = arr.length;
    const kept = arr.filter((r) => !matchWhere(r as Rec, where));
    cache.articles = kept;
    saveArticles();
    return { count: before - kept.length };
  },

  async count(args?: AnyArgs): Promise<number> {
    return countRecords(getArticles() as Rec[], args);
  },

  async groupBy(args: AnyArgs): Promise<AnyArgs[]> {
    return groupByRecords(getArticles() as Rec[], args);
  },

  async aggregate(args: AnyArgs): Promise<AnyArgs> {
    return aggregateRecords(getArticles() as Rec[], args);
  },
};

// ─── ScrapedItem ─────────────────────────────────────────────────────────────

const scrapedItem = {
  async findMany(args?: AnyArgs): Promise<AnyArgs[]> {
    let data = getScrapedItems() as Rec[];
    const where = args?.where as Rec | undefined;
    if (where) data = data.filter((r) => matchWhere(r, where));
    data = applyOrderBy(data, args?.orderBy);
    if (args?.skip) data = data.slice(args.skip as number);
    if (args?.take) data = data.slice(0, args.take as number);
    return applySelectMany(data, args?.select);
  },

  async findUnique(args: AnyArgs): Promise<AnyArgs | null> {
    const where = args?.where as Rec;
    const data = getScrapedItems() as Rec[];
    return data.find((r) => matchWhere(r, where)) ?? null;
  },

  async create(args: AnyArgs): Promise<AnyArgs> {
    const data = args.data as Rec;
    const now = nowIso();
    const record: ScrapedItemRecord = {
      id: newId(),
      title: String(data.title ?? ''),
      description: (data.description as string | null) ?? null,
      sourceUrl: String(data.sourceUrl ?? ''),
      source: String(data.source ?? ''),
      category: String(data.category ?? 'manga'),
      imageUrl: (data.imageUrl as string | null) ?? null,
      pubDate: data.pubDate instanceof Date
        ? data.pubDate.toISOString()
        : (data.pubDate as string | null) ?? null,
      scrapedAt: now,
      status: String(data.status ?? 'pending'),
    };
    const arr = getScrapedItems();
    arr.push(record);
    cache.scrapedItems = arr;
    saveScrapedItems();
    return record;
  },

  async update(args: AnyArgs): Promise<AnyArgs> {
    const where = args.where as Rec;
    const data = args.data as Rec;
    const arr = getScrapedItems();
    const idx = arr.findIndex((r) => matchWhere(r as Rec, where));
    if (idx === -1) throw new Error('ScrapedItem not found');
    const updated = applyUpdateData(arr[idx] as Rec, data);
    arr[idx] = updated as ScrapedItemRecord;
    cache.scrapedItems = arr;
    saveScrapedItems();
    return updated;
  },

  async updateMany(args: AnyArgs): Promise<{ count: number }> {
    const where = args.where as Rec;
    const data = args.data as Rec;
    const arr = getScrapedItems();
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
      if (matchWhere(arr[i] as Rec, where)) {
        arr[i] = applyUpdateData(arr[i] as Rec, data) as ScrapedItemRecord;
        count++;
      }
    }
    cache.scrapedItems = arr;
    saveScrapedItems();
    return { count };
  },

  async deleteMany(args: AnyArgs): Promise<{ count: number }> {
    const where = args.where as Rec;
    const arr = getScrapedItems();
    const before = arr.length;
    const kept = arr.filter((r) => !matchWhere(r as Rec, where));
    cache.scrapedItems = kept;
    saveScrapedItems();
    return { count: before - kept.length };
  },
};

// ─── Subscriber ──────────────────────────────────────────────────────────────

const subscriber = {
  async findMany(args?: AnyArgs): Promise<AnyArgs[]> {
    let data = getSubscribers() as Rec[];
    const where = args?.where as Rec | undefined;
    if (where) data = data.filter((r) => matchWhere(r, where));
    return data;
  },

  async upsert(args: AnyArgs): Promise<AnyArgs> {
    const where = args.where as Rec;
    const createData = args.create as Rec;
    const updateData = args.update as Rec;
    const arr = getSubscribers();
    const idx = arr.findIndex((r) => matchWhere(r as Rec, where));
    if (idx >= 0) {
      if (Object.keys(updateData).length > 0) {
        arr[idx] = applyUpdateData(arr[idx] as Rec, updateData) as SubscriberRecord;
        cache.subscribers = arr;
        saveSubscribers();
      }
      return arr[idx];
    }
    const now = nowIso();
    const record: SubscriberRecord = {
      id: newId(),
      email: String(createData.email ?? ''),
      token: newId(),
      createdAt: now,
    };
    arr.push(record);
    cache.subscribers = arr;
    saveSubscribers();
    return record;
  },

  async delete(args: AnyArgs): Promise<AnyArgs> {
    const where = args.where as Rec;
    const arr = getSubscribers();
    const idx = arr.findIndex((r) => matchWhere(r as Rec, where));
    if (idx === -1) throw new Error('Subscriber not found');
    const [deleted] = arr.splice(idx, 1);
    cache.subscribers = arr;
    saveSubscribers();
    return deleted;
  },
};

// ─── Export ──────────────────────────────────────────────────────────────────

export const db = { article, scrapedItem, subscriber };
