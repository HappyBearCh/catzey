import { prisma } from '@/lib/db';
import { HeroSection } from '@/components/HeroSection';
import { ArticleCard } from '@/components/ArticleCard';
import { BreakingTicker } from '@/components/BreakingTicker';
import { TrendingStrip } from '@/components/TrendingStrip';
import { LoadMoreArticles } from '@/components/LoadMoreArticles';
import { CATEGORIES } from '@/lib/types';
import Link from 'next/link';
import type { Article } from '@/lib/types';

export const revalidate = 1800; // Revalidate every 30 minutes

async function getArticles() {
  try {
    return await prisma.article.findMany({
      where: { published: true, displayLang: { in: ['en', 'both'] } },
      orderBy: { publishedAt: 'desc' },
      take: 30,
    });
  } catch {
    return [] as Article[];
  }
}

export default async function HomePage() {
  const articles = await getArticles();

  if (articles.length === 0) {
    return (
      <div className="max-w-8xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-black mb-4 text-gray-800">Welcome to Catzye</h1>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          No articles yet. The scraper runs every hour pulling from manga &amp; anime news sites and will populate automatically.
          You can also trigger it manually:
        </p>
        <code className="block bg-gray-100 rounded px-4 py-2 text-sm text-gray-700 max-w-lg mx-auto">
          curl -H &quot;Authorization: Bearer $CRON_SECRET&quot; /api/cron/scrape
        </code>
        <p className="text-gray-400 text-sm mt-8">
          Make sure <code className="bg-gray-100 px-1 rounded">DATABASE_URL</code>,{' '}
          <code className="bg-gray-100 px-1 rounded">GEMINI_API_KEY</code>, and{' '}
          <code className="bg-gray-100 px-1 rounded">CRON_SECRET</code> are set in your
          environment.
        </p>
      </div>
    );
  }

  const [featured, ...rest] = articles;
  const secondary = rest.slice(0, 3);
  const gridArticles = rest.slice(3, 9);
  const recentByCategory = CATEGORIES.map(({ label, slug }) => ({
    label,
    slug,
    articles: articles.filter((a) => a.category === slug).slice(0, 4),
  })).filter((c) => c.articles.length > 0);

  return (
    <>
      {/* Breaking news ticker */}
      <BreakingTicker articles={articles.slice(0, 5)} />
      <TrendingStrip />

      <div className="max-w-8xl mx-auto px-4">
        {/* Hero section */}
        <section className="my-4">
          <HeroSection featured={featured} secondary={secondary} />
        </section>

        {/* Top stories grid */}
        {gridArticles.length > 0 && (
          <section className="my-8">
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-1 h-6 bg-primary" />
              <h2 className="text-lg font-black uppercase tracking-wide">Top Stories</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {gridArticles.map((article) => (
                <ArticleCard key={article.id} article={article} size="large" />
              ))}
            </div>
          </section>
        )}

        {/* Category sections */}
        {recentByCategory.map(({ label, slug, articles: catArticles }) => (
          <section key={slug} className="my-8 border-t border-site-border pt-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <span className="block w-1 h-6 bg-primary" />
                <h2 className="text-lg font-black uppercase tracking-wide">{label}</h2>
              </div>
              <Link
                href={`/${slug}`}
                className="text-sm font-bold uppercase tracking-wider text-primary hover:underline"
              >
                See All →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              {catArticles.map((article) => (
                <ArticleCard key={article.id} article={article} size="medium" />
              ))}
            </div>
          </section>
        ))}
        <LoadMoreArticles initialSkip={30} />
      </div>
    </>
  );
}
