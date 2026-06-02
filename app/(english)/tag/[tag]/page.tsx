import type { Metadata } from 'next';
import { prisma } from '@/lib/db';
import { ArticleCard } from '@/components/ArticleCard';
import type { Article } from '@/lib/types';

export const revalidate = 3600;

interface Props {
  params: Promise<{ tag: string }>;
}

function decodeTag(raw: string): string {
  return decodeURIComponent(raw).replace(/-/g, ' ');
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const label = decodeTag(tag);
  return {
    title: `#${label}`,
    description: `Articles tagged with "${label}" on Catzye.`,
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const label = decodeTag(tag);

  const articles = await prisma.article.findMany({
    where: {
      published: true,
      displayLang: { in: ['en', 'both'] },
      tags: { has: label },
    },
    orderBy: { publishedAt: 'desc' },
    take: 24,
  }) as Article[];

  return (
    <div className="max-w-8xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="block w-1 h-8 bg-primary" />
        <h1 className="text-3xl font-black tracking-tight">#{label}</h1>
      </div>
      <p className="text-site-gray text-sm mb-8 ml-4">
        {articles.length} article{articles.length !== 1 ? 's' : ''} tagged with &quot;{label}&quot;
      </p>

      {articles.length === 0 ? (
        <div className="py-20 text-center text-gray-400">
          <p className="text-xl font-bold mb-2">No articles yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} size="medium" />
          ))}
        </div>
      )}
    </div>
  );
}
