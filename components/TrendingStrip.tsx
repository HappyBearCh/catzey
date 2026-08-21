import Link from 'next/link';
import { prisma } from '@/lib/db';
import { getCategoryLabel } from '@/lib/types';
import { titleValue } from '@/lib/number-groups';

export async function TrendingStrip() {
  const since = new Date(Date.now() - 48 * 60 * 60 * 1000);

  let articles = await prisma.article.findMany({
    where: { published: true, publishedAt: { gte: since }, views: { gt: 0 } },
    orderBy: { views: 'desc' },
    take: 5,
    select: { id: true, slug: true, title: true, category: true, views: true },
  });

  if (articles.length < 3) {
    articles = await prisma.article.findMany({
      where: { published: true, views: { gt: 0 } },
      orderBy: { views: 'desc' },
      take: 5,
      select: { id: true, slug: true, title: true, category: true, views: true },
    });
  }

  if (articles.length < 3) return null;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 border-b border-site-border dark:border-gray-700">
      <div className="max-w-8xl mx-auto px-4 py-2 flex items-center gap-4 overflow-x-auto scrollbar-hide">
        <span className="flex-shrink-0 inline-flex items-center gap-1.5 bg-primary text-white text-2xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
          </svg>
          Trending
        </span>
        <div className="flex items-center gap-0 divide-x divide-site-border">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/article/${article.slug}`}
              className="flex-shrink-0 group flex items-center gap-2 px-4 first:pl-0"
            >
              <span className="text-2xs font-bold text-primary uppercase tracking-wider hidden sm:block">
                {getCategoryLabel(article.category)}
                <span className="text-gold/70 font-normal"> · {titleValue(article.title)}</span>
              </span>
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors line-clamp-1 max-w-[180px]">
                {article.title}
              </span>
              <span className="text-2xs text-gray-500 hidden md:block">{article.views.toLocaleString()} views</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
