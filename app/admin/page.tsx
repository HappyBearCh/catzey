import { prisma } from '@/lib/db';
import { CATEGORIES, getCategoryLabel } from '@/lib/types';
import { titleValue, getGroup, GROUP_NUMBERS } from '@/lib/number-groups';
import { formatDistanceToNow, format } from 'date-fns';
import Link from 'next/link';
import { AdminHeader } from './AdminHeader';
import { PublishButton } from './PublishButton';
import { ScheduleButton } from './ScheduleButton';
import { NewArticleButton } from './NewArticleButton';
import { DeleteArticleButton } from './DeleteButtons';
import { ArticleTable } from './ArticleTable';
import { PendingItems } from './PendingItems';
import { ReplaceLocImages } from './ReplaceLocImages';

export const dynamic = 'force-dynamic';

async function getStats() {
  const [total, published, drafts, scheduled, bySource, byCategory, totalViews, locImages] = await Promise.all([
    prisma.article.count(),
    prisma.article.count({ where: { published: true } }),
    prisma.article.count({ where: { published: false, scheduledAt: null } }),
    prisma.article.count({ where: { published: false, scheduledAt: { not: null } } }),
    prisma.article.groupBy({ by: ['source'], _count: { id: true } }),
    prisma.article.groupBy({
      by: ['category'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
    }),
    prisma.article.aggregate({ _sum: { views: true } }),
    prisma.article.count({ where: { imageUrl: { contains: 'loc.gov' } } }),
  ]);
  return { total, published, drafts, scheduled, bySource, byCategory, totalViews: totalViews._sum.views ?? 0, locImages };
}

async function getShelfSpread() {
  const rows = await prisma.article.findMany({ select: { title: true } });
  const counts = new Map<number, number>();
  for (const r of rows) {
    const n = titleValue(r.title);
    counts.set(n, (counts.get(n) ?? 0) + 1);
  }
  return GROUP_NUMBERS.map((n: number) => ({ n, count: counts.get(n) ?? 0 }));
}

async function getSourceHealth() {
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const [weekly, latest] = await Promise.all([
    prisma.article.groupBy({
      by: ['source'],
      where: { publishedAt: { gte: since } },
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
    }),
    prisma.article.groupBy({
      by: ['source'],
      _max: { publishedAt: true },
      orderBy: { _max: { publishedAt: 'desc' } },
    }),
  ]);
  const latestMap = Object.fromEntries(latest.map((r) => [r.source, r._max.publishedAt]));
  return weekly.map((r) => ({
    source: r.source,
    weeklyCount: r._count.id,
    lastArticle: latestMap[r.source] ?? null,
  }));
}

async function getTopArticles() {
  return prisma.article.findMany({
    where: { published: true, views: { gt: 0 } },
    orderBy: { views: 'desc' },
    take: 10,
    select: { id: true, slug: true, title: true, category: true, views: true, publishedAt: true },
  });
}

async function getPending() {
  return prisma.scrapedItem.findMany({
    where: { status: 'pending' },
    orderBy: { scrapedAt: 'desc' },
    take: 100,
  });
}

async function getDrafts() {
  return prisma.article.findMany({
    where: { published: false, scheduledAt: null },
    orderBy: { createdAt: 'desc' },
  });
}

async function getScheduled() {
  return prisma.article.findMany({
    where: { published: false, scheduledAt: { not: null } },
    orderBy: { scheduledAt: 'asc' },
  });
}

async function getArticles(page: number, search: string, category: string, filter: string) {
  const limit = 20;
  const skip = (page - 1) * limit;
  const publishedFilter =
    filter === 'drafts'
      ? { published: false, scheduledAt: null }
      : filter === 'published'
        ? { published: true }
        : filter === 'scheduled'
          ? { published: false, scheduledAt: { not: null } }
          : {};
  const where = {
    ...publishedFilter,
    ...(search ? { title: { contains: search, mode: 'insensitive' as const } } : {}),
    ...(category ? { category } : {}),
  };
  const [articles, count] = await Promise.all([
    prisma.article.findMany({ where, orderBy: { createdAt: 'desc' }, take: limit, skip }),
    prisma.article.count({ where }),
  ]);
  return { articles, count, pages: Math.ceil(count / limit) };
}

interface Props {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
    filter?: string;
  }>;
}

export default async function AdminPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? '1'));
  const search = params.search ?? '';
  const category = params.category ?? '';
  const filter = params.filter ?? '';

  const [stats, pending, drafts, scheduled, { articles, count, pages }, topArticles, sourceHealth, shelfSpread] = await Promise.all([
    getStats(),
    getPending(),
    getDrafts(),
    getScheduled(),
    getArticles(page, search, category, filter),
    getTopArticles(),
    getSourceHealth(),
    getShelfSpread(),
  ]);

  return (
    <div>
      <AdminHeader />

      <div className="max-w-8xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">

        {/* Top bar */}
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-black uppercase tracking-wide">Dashboard</h1>
          <NewArticleButton />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <StatCard label="Total" value={stats.total} />
          <StatCard label="Published" value={stats.published} accent="green" />
          <StatCard label="Drafts" value={stats.drafts} accent={stats.drafts > 0 ? 'amber' : undefined} />
          <StatCard label="Scheduled" value={stats.scheduled} accent={stats.scheduled > 0 ? 'blue' : undefined} />
          <StatCard label="Pending" value={pending.length} accent={pending.length > 0 ? 'violet' : undefined} />
          <StatCard label="Total Views" value={stats.totalViews} accent="green" />
        </div>

        {/* LoC image replacement tool */}
        <ReplaceLocImages locCount={stats.locImages} />

        {/* Pending scraped items */}
        <PendingItems items={pending} />

        {/* Scheduled queue */}
        {scheduled.length > 0 && (
          <div className="bg-white rounded-sm shadow-sm border-l-4 border-blue-400">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <h2 className="text-sm font-black uppercase tracking-wider">Scheduled</h2>
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">
                {scheduled.length}
              </span>
            </div>
            <div className="divide-y divide-gray-50">
              {scheduled.map((article) => (
                <div key={article.id} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm leading-snug line-clamp-2">{article.title}</p>
                    <p className="text-2xs text-gray-400 mt-0.5">
                      {getCategoryLabel(article.category)} · {article.source}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap text-xs">
                    <span className="inline-flex items-center gap-1 text-2xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                      🕐 {format(new Date(article.scheduledAt!), 'MMM d, HH:mm')}
                    </span>
                    <Link href={`/admin/article/${article.id}`} className="text-xs font-semibold text-blue-600 hover:text-blue-800">Edit</Link>
                    <PublishButton id={article.id} published={false} />
                    <DeleteArticleButton id={article.id} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Drafts queue */}
        {drafts.length > 0 && (
          <div className="bg-white rounded-sm shadow-sm border-l-4 border-amber-400">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <h2 className="text-sm font-black uppercase tracking-wider">Drafts — Awaiting Review</h2>
              <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full">
                {drafts.length}
              </span>
            </div>
            <div className="divide-y divide-gray-50">
              {drafts.map((article) => (
                <div key={article.id} className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                  {article.imageUrl && (
                    <img src={article.imageUrl} alt="" className="w-14 h-10 sm:w-16 sm:h-12 object-cover rounded flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                      <span className="text-2xs font-bold uppercase tracking-wider text-primary">
                        {getCategoryLabel(article.category)}
                      </span>
                      <span className="text-gray-300">·</span>
                      <span className="text-2xs text-gray-400">{article.source}</span>
                      <span className="text-gray-300">·</span>
                      <span className="text-2xs text-gray-400">
                        {formatDistanceToNow(new Date(article.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="font-bold text-sm leading-snug line-clamp-2">{article.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{article.excerpt}</p>
                    <div className="flex items-center gap-3 flex-wrap mt-2">
                      <Link href={`/admin/article/${article.id}`} className="text-xs font-semibold text-blue-600 hover:text-blue-800">
                        Edit
                      </Link>
                      <ScheduleButton id={article.id} scheduledAt={null} />
                      <PublishButton id={article.id} published={false} />
                      <DeleteArticleButton id={article.id} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top articles by views */}
        {topArticles.length > 0 && (
          <div className="bg-white rounded-sm shadow-sm">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <h2 className="text-sm font-black uppercase tracking-wider">Most Read</h2>
            </div>
            <ol className="divide-y divide-gray-50">
              {topArticles.map((article, i) => (
                <li key={article.id} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 text-gray-500 text-xs font-black flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <Link href={`/admin/article/${article.id}`} className="font-semibold text-sm hover:text-primary transition-colors line-clamp-1">
                      {article.title}
                    </Link>
                    <p className="text-2xs text-gray-400">{getCategoryLabel(article.category)} · {format(new Date(article.publishedAt), 'MMM d, yyyy')}</p>
                  </div>
                  <span className="flex-shrink-0 text-xs font-bold text-primary">
                    {article.views.toLocaleString('en-US')} views
                  </span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Source health */}
        {sourceHealth.length > 0 && (
          <div className="bg-white rounded-sm shadow-sm">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <h2 className="text-sm font-black uppercase tracking-wider">Source Health (last 7 days)</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50 text-left">
                    <th className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-500">Source</th>
                    <th className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-500">Articles (7d)</th>
                    <th className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-500">Last Article</th>
                    <th className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {sourceHealth.map((s) => {
                    const hoursSince = s.lastArticle
                      ? (Date.now() - new Date(s.lastArticle).getTime()) / 3600000
                      : Infinity;
                    const status = hoursSince < 6 ? 'healthy' : hoursSince < 24 ? 'slow' : 'stale';
                    return (
                      <tr key={s.source} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-2.5 font-semibold text-sm">{s.source}</td>
                        <td className="px-4 py-2.5 text-sm">{s.weeklyCount}</td>
                        <td className="px-4 py-2.5 text-xs text-gray-400">
                          {s.lastArticle ? formatDistanceToNow(new Date(s.lastArticle), { addSuffix: true }) : '—'}
                        </td>
                        <td className="px-4 py-2.5">
                          <span className={`inline-flex items-center gap-1 text-2xs font-bold px-2 py-0.5 rounded-full ${
                            status === 'healthy' ? 'bg-green-50 text-green-700' :
                            status === 'slow' ? 'bg-amber-50 text-amber-700' :
                            'bg-red-50 text-red-700'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              status === 'healthy' ? 'bg-green-500' :
                              status === 'slow' ? 'bg-amber-400' : 'bg-red-400'
                            }`} />
                            {status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Category breakdown */}
        <div className="bg-white rounded-sm shadow-sm p-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">By Shelf</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {shelfSpread.map(({ n, count: shelfCount }) => (
              <a
                key={n}
                href={`/number/${n}`}
                target="_blank"
                rel="noopener noreferrer"
                title={getGroup(n).tagline}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 hover:bg-primary hover:text-white text-gray-700 transition-colors"
              >
                <span className="font-black">{n}</span>
                {getGroup(n).shelf}
                <span className="bg-black/10 px-1.5 py-0.5 rounded-full">{shelfCount}</span>
              </a>
            ))}
          </div>

          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">By Category</h2>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin"
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                !category && !filter ? 'bg-site-dark text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              All
            </Link>
            {stats.byCategory.map((c) => (
              <Link
                key={c.category}
                href={`/admin?category=${c.category}`}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                  category === c.category
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 hover:bg-primary hover:text-white text-gray-700'
                }`}
              >
                {getCategoryLabel(c.category)}
                <span className="bg-black/10 px-1.5 py-0.5 rounded-full">{c._count.id}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* All articles table */}
        <div className="bg-white rounded-sm shadow-sm">
          <div className="flex flex-col gap-3 p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              {/* Filter tabs — scrollable on mobile */}
              <div className="flex gap-1 bg-gray-100 rounded-sm p-1 overflow-x-auto flex-shrink-0 max-w-full">
                {[
                  { label: 'All', value: '' },
                  { label: 'Published', value: 'published' },
                  { label: 'Scheduled', value: 'scheduled' },
                  { label: 'Drafts', value: 'drafts' },
                ].map((tab) => (
                  <Link
                    key={tab.value}
                    href={`/admin?filter=${tab.value}${search ? `&search=${search}` : ''}${category ? `&category=${category}` : ''}`}
                    className={`px-3 py-1 text-xs font-semibold rounded transition-colors whitespace-nowrap ${
                      filter === tab.value ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    {tab.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Search */}
            <form className="flex gap-2" method="GET" action="/admin">
              {category && <input type="hidden" name="category" value={category} />}
              {filter && <input type="hidden" name="filter" value={filter} />}
              <input
                name="search"
                defaultValue={search}
                placeholder="Search articles…"
                className="flex-1 min-w-0 border border-gray-200 rounded-sm px-3 py-1.5 text-sm focus:outline-none focus:border-primary"
              />
              <button type="submit" className="bg-site-dark text-white text-xs font-bold px-3 py-1.5 rounded-sm hover:bg-gray-800 transition-colors whitespace-nowrap">
                Search
              </button>
              {(search || category || filter) && (
                <Link href="/admin" className="text-xs font-semibold text-gray-400 hover:text-primary px-2 py-1.5 whitespace-nowrap">
                  Clear
                </Link>
              )}
            </form>
          </div>

          <ArticleTable articles={articles} />

          {pages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
              <p className="text-xs text-gray-400">{count} articles · page {page} of {pages}</p>
              <div className="flex gap-1">
                {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={`/admin?page=${p}${search ? `&search=${search}` : ''}${category ? `&category=${category}` : ''}${filter ? `&filter=${filter}` : ''}`}
                    className={`w-7 h-7 flex items-center justify-center text-xs rounded transition-colors ${
                      p === page ? 'bg-primary text-white font-bold' : 'text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {p}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, accent }: { label: string; value: number; accent?: 'green' | 'amber' | 'blue' | 'violet' }) {
  const color =
    accent === 'green' ? 'text-green-600' :
    accent === 'amber' ? 'text-amber-500' :
    accent === 'blue' ? 'text-blue-500' :
    accent === 'violet' ? 'text-violet-600' :
    'text-gray-900';
  return (
    <div className="bg-white rounded-sm shadow-sm p-4">
      <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1 truncate">{label}</p>
      <p className={`text-3xl font-black ${color}`}>{value}</p>
    </div>
  );
}
