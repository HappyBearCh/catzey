import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { AdminHeader } from '../../AdminHeader';
import { SeriesManager } from './SeriesManager';
import { getCategoryLabel } from '@/lib/types';

export const dynamic = 'force-dynamic';

interface Props { params: Promise<{ id: string }> }

async function getSeries(id: string) {
  const series = await prisma.series.findUnique({
    where: { id },
    include: {
      articles: {
        select: { id: true, title: true, slug: true, published: true, seriesOrder: true, publishedAt: true },
        orderBy: { seriesOrder: 'asc' },
      },
    },
  });
  if (!series) return null;
  return { ...series, topics: series.topics as string[] };
}

export default async function SeriesDetailPage({ params }: Props) {
  const { id } = await params;
  const series = await getSeries(id);
  if (!series) notFound();

  return (
    <div>
      <AdminHeader />
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/series" className="text-xs text-gray-400 hover:text-gray-700">← All Series</Link>
          <span className="text-gray-200">·</span>
          <Link
            href={`/series/${series.slug}`}
            target="_blank"
            className="text-xs text-gray-400 hover:text-primary"
          >
            View Public Page ↗
          </Link>
        </div>

        <div>
          <h1 className="text-xl font-black">{series.title}</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            {getCategoryLabel(series.category)} · {series.articles.length}/{series.topics.length} parts generated
          </p>
        </div>

        <SeriesManager series={series} />
      </div>
    </div>
  );
}
