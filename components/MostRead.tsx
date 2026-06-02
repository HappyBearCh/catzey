import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/db';
import { getCategoryLabel, getCategoryLabelBs } from '@/lib/types';

interface MostReadProps {
  currentSlug?: string;
  basePath?: string;
}

export async function MostRead({ currentSlug, basePath = '' }: MostReadProps) {
  const isBosnian = basePath === '/bs';
  const articles = await prisma.article.findMany({
    where: {
      published: true,
      ...(isBosnian
        ? { displayLang: { in: ['bs', 'both'] } }
        : { displayLang: { in: ['en', 'both'] } }),
      ...(currentSlug ? { slug: { not: currentSlug } } : {}),
    },
    orderBy: { views: 'desc' },
    take: 5,
    select: { id: true, slug: true, title: true, titleBs: true, imageUrl: true, category: true, views: true },
  });

  if (articles.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-4">
        <span className="block w-1 h-5 bg-primary" />
        <h2 className="text-sm font-black uppercase tracking-wider">
          {isBosnian ? 'Najpopularnije' : 'Most Read'}
        </h2>
      </div>
      <ol className="space-y-1">
        {articles.map((article, i) => {
          const title = isBosnian ? (article.titleBs ?? article.title) : article.title;
          const href = `${basePath}/article/${article.slug}`;
          const catLabel = isBosnian
            ? getCategoryLabelBs(article.category)
            : getCategoryLabel(article.category);
          return (
            <li key={article.id}>
              <Link
                href={href}
                className="group flex gap-3 items-start py-3 border-b border-site-border last:border-0"
              >
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-white text-xs font-black flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="text-2xs font-bold uppercase tracking-widest text-primary block mb-0.5">
                    {catLabel}
                  </span>
                  <p className="font-bold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {title}
                  </p>
                  <span className="text-xs text-gray-400 mt-1 block">
                    {article.views.toLocaleString()} {isBosnian ? 'pregleda' : 'views'}
                  </span>
                </div>
                {article.imageUrl && (
                  <div className="relative flex-shrink-0 w-16 h-12 overflow-hidden rounded-sm">
                    <Image
                      src={article.imageUrl}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
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
