import { prisma } from '@/lib/db';
import { HeroSection } from '@/components/HeroSection';
import { ArticleCard } from '@/components/ArticleCard';
import { BreakingTicker } from '@/components/BreakingTicker';
import { TrendingStrip } from '@/components/TrendingStrip';
import { LoadMoreArticles } from '@/components/LoadMoreArticles';
import { CATEGORIES, bsArticle } from '@/lib/types';
import Link from 'next/link';
import type { Article } from '@/lib/types';

export const revalidate = 1800;

async function getArticles() {
  try {
    return await prisma.article.findMany({
      where: { published: true, displayLang: { in: ['bs', 'both'] } },
      orderBy: { publishedAt: 'desc' },
      take: 30,
    });
  } catch {
    return [] as Article[];
  }
}

export default async function BosnianHomePage() {
  const rawArticles = await getArticles();
  const articles = rawArticles.map(bsArticle);

  if (articles.length === 0) {
    return (
      <div className="max-w-8xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-black mb-4 text-gray-800">Dobrodošli na Catzye</h1>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          Nema još članaka. Skrejper se pokreće svaki sat i automatski će popuniti stranicu.
        </p>
      </div>
    );
  }

  const [featured, ...rest] = articles;
  const secondary = rest.slice(0, 3);
  const gridArticles = rest.slice(3, 9);
  const recentByCategory = CATEGORIES.map(({ labelBs, slug }) => ({
    label: labelBs,
    slug,
    articles: articles.filter((a) => a.category === slug).slice(0, 4),
  })).filter((c) => c.articles.length > 0);

  return (
    <>
      <BreakingTicker articles={articles.slice(0, 5)} />
      <TrendingStrip basePath="/bs" />

      <div className="max-w-8xl mx-auto px-4">
        <section className="my-4">
          <HeroSection
            featured={featured}
            secondary={secondary}
            articleBasePath="/bs/article"
          />
        </section>

        {gridArticles.length > 0 && (
          <section className="my-8">
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-1 h-6 bg-primary" />
              <h2 className="text-lg font-black uppercase tracking-wide">Glavne vijesti</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {gridArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  size="large"
                  articleBasePath="/bs/article"
                />
              ))}
            </div>
          </section>
        )}

        {recentByCategory.map(({ label, slug, articles: catArticles }) => (
          <section key={slug} className="my-8 border-t border-site-border pt-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <span className="block w-1 h-6 bg-primary" />
                <h2 className="text-lg font-black uppercase tracking-wide">{label}</h2>
              </div>
              <Link
                href={`/bs/${slug}`}
                className="text-xs font-bold uppercase tracking-wider text-primary hover:underline"
              >
                Sve vijesti →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {catArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  size="medium"
                  articleBasePath="/bs/article"
                />
              ))}
            </div>
          </section>
        ))}
        <LoadMoreArticles initialSkip={30} basePath="/bs" />
      </div>
    </>
  );
}
