// The query engine behind lib/db.ts: the where/orderBy/select/groupBy subset of
// Prisma's API that this app uses, applied to plain arrays of records read from
// data/*.json.

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
    if ('lt' in c) return toMs(fieldValue) < toMs(c.lt);
    if ('lte' in c) return toMs(fieldValue) <= toMs(c.lte);
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

// ─── Pure query engine ───────────────────────────────────────────────────────
// These operate on an arbitrary in-memory array and implement the subset of the
// Prisma query API the app uses.

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
