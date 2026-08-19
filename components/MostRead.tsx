import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/db';
import { getCategoryLabel } from '@/lib/types';

interface MostReadProps {
  currentSlug?: string;
}

export async function MostRead({ currentSlug }: MostReadProps) {
  const articles = await prisma.article.findMany({
    where: {
      published: true,
      ...(currentSlug ? { slug: { not: currentSlug } } : {}),
    },
    orderBy: { views: 'desc' },
    take: 5,
    select: { id: true, slug: true, title: true, imageUrl: true, category: true, views: true },
  });

  if (articles.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-4">
        <span className="block w-1 h-5 bg-primary" />
        <h2 className="text-sm font-semibold uppercase tracking-wider">Most Read</h2>
      </div>
      <ol className="space-y-1">
        {articles.map((article, i) => {
          const catLabel = getCategoryLabel(article.category);
          return (
            <li key={article.id}>
              <Link
                href={`/article/${article.slug}`}
                className="group flex gap-3 items-start py-3 border-b border-site-border last:border-0"
              >
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-white text-xs font-semibold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="text-2xs font-bold uppercase tracking-widest text-primary block mb-0.5">
                    {catLabel}
                  </span>
                  <p className="font-bold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </p>
                  <span className="text-xs text-gray-600 mt-1 block">
                    {article.views.toLocaleString()} views
                  </span>
                </div>
                {article.imageUrl && (
                  <div className="relative flex-shrink-0 w-20 h-14 overflow-hidden rounded-sm">
                    <Image src={article.imageUrl} alt="" fill sizes="80px" className="object-cover" />
                  </div>
                )}
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
