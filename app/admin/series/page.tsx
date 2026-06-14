import { prisma } from '@/lib/db';
import Link from 'next/link';
import { AdminHeader } from '../AdminHeader';
import { CreateSeriesForm } from './CreateSeriesForm';
import { getCategoryLabel } from '@/lib/types';

export const dynamic = 'force-dynamic';

async function getAllSeries() {
  const rows = await prisma.series.findMany({
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { articles: true } } },
  });
  return rows.map((s) => ({
    ...s,
    topics: s.topics as string[],
    articleCount: s._count.articles,
  }));
}

export default async function SeriesListPage() {
  const allSeries = await getAllSeries();

  return (
    <div>
      <AdminHeader />
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/admin" className="text-xs text-gray-400 hover:text-gray-700">← Dashboard</Link>
            <h1 className="text-lg font-black uppercase tracking-wide mt-1">Essay Series</h1>
          </div>
        </div>

        {/* Existing series */}
        {allSeries.length > 0 && (
          <div className="bg-white rounded-sm shadow-sm divide-y divide-gray-100">
            {allSeries.map((s) => {
              const generated = s.articleCount;
              const planned = s.topics.length;
              return (
                <Link
                  key={s.id}
                  href={`/admin/series/${s.id}`}
                  className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  {s.imageUrl && (
                    <img src={s.imageUrl} alt="" className="w-14 h-10 object-cover rounded flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm">{s.title}</p>
                    <p className="text-2xs text-gray-400 mt-0.5">
                      {getCategoryLabel(s.category)} · {generated}/{planned} parts generated
                    </p>
                    {s.description && (
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{s.description}</p>
                    )}
                  </div>
                  <div className="flex-shrink-0 flex flex-col items-end gap-1">
                    <div className="flex gap-1">
                      {Array.from({ length: planned }, (_, i) => (
                        <span
                          key={i}
                          className={`w-2 h-2 rounded-full ${i < generated ? 'bg-green-400' : 'bg-gray-200'}`}
                        />
                      ))}
                    </div>
                    <span className="text-2xs text-gray-400">Manage →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Create new series */}
        <div className="bg-white rounded-sm shadow-sm">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="text-sm font-black uppercase tracking-wider">New Series</h2>
          </div>
          <div className="p-4">
            <CreateSeriesForm />
          </div>
        </div>
      </div>
    </div>
  );
}
