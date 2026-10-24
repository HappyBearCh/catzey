import type { Metadata } from 'next';
import Link from 'next/link';
import { MangaCover } from '@/components/MangaCover';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { titleValue } from '@/lib/number-groups';
import Image from 'next/image';
import { prisma } from '@/lib/db';
import { getCategoryLabel } from '@/lib/types';

// Frozen edition (see lib/db.ts) — nothing here changes until the next deploy,
// so a timer only bought re-renders and ISR writes for identical output.
export const revalidate = false;

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

export const metadata: Metadata = {
  // The root layout appends "| Catzye"; spelling the brand out here too gave
  // the tab "Essay Series — Catzye | Catzye".
  title: 'Essay Series',
  description: 'In-depth essay series on manga history, culture, and society — from the origins of the medium to its most provocative modern works.',
  alternates: { canonical: `${BASE}/series` },
};

async function getAllSeries() {
  const rows = await prisma.series.findMany({
    include: {
      articles: {
        where: { published: true },
        select: { id: true, seriesOrder: true },
        orderBy: { seriesOrder: 'asc' },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
  return rows
    .filter((s) => s.articles.length > 0)
    .map((s) => ({ ...s, topics: s.topics as string[] }));
}

export default async function SeriesIndexPage() {
  const allSeries = await getAllSeries();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Essay Series — Catzye',
    description: 'In-depth essay series on manga history, culture, and society.',
    url: `${BASE}/series`,
    publisher: { '@type': 'Organization', name: 'Catzye', url: BASE },
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Essay series', href: '/series' }]} />
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-[2.6rem] font-bold tracking-tight leading-tight text-ink dark:text-parchment mb-2">Essay Series</h1>
        <p className="text-gray-500 text-sm max-w-xl">
          Long-form explorations of manga history, culture, and society — one series, multiple deep dives.
        </p>
      </div>

      {allSeries.length === 0 ? (
        <p className="text-gray-400 italic">No series published yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {allSeries.map((s) => {
            const publishedCount = s.articles.length;
            const totalParts = s.topics.length || publishedCount;
            return (
              <Link
                key={s.id}
                href={`/series/${s.slug}`}
                className="group manga-panel block"
              >
                {s.imageUrl ? (
                  <div className="relative w-full aspect-video">
                    <Image src={s.imageUrl} alt={s.title} fill className="object-cover group-hover:scale-[1.02] transition-transform duration-300" />
                  </div>
                ) : (
                  <MangaCover number={titleValue(s.title)} label={getCategoryLabel(s.category)} className="w-full aspect-[16/7] border-b-2 border-[rgb(var(--ink-line))]" />
                )}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xs font-semibold uppercase tracking-widest text-primary">
                      {getCategoryLabel(s.category)}
                      <span className="text-gold font-normal"> · {titleValue(s.title)}</span>
                    </span>
                    <span className="text-gray-300 text-xs">·</span>
                    <span className="text-2xs text-gray-400">{publishedCount} of {totalParts} parts</span>
                  </div>
                  <h2 className="font-semibold text-lg leading-snug mb-1 group-hover:text-primary transition-colors">
                    {s.title}
                  </h2>
                  {s.description && (
                    <p className="text-sm text-gray-500 line-clamp-2">{s.description}</p>
                  )}

                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
