import type { Article } from '@/lib/types';
import { ArticleCard } from './ArticleCard';

interface HeroSectionProps {
  featured: Article;
  secondary: Article[];
  articleBasePath?: string;
}

export function HeroSection({ featured, secondary, articleBasePath }: HeroSectionProps) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-site-border">
      {/* Main hero — takes 2/3 width */}
      <div className="lg:col-span-2 bg-white">
        <ArticleCard article={featured} size="hero" articleBasePath={articleBasePath} />
      </div>

      {/* Secondary articles stacked on right */}
      <div className="bg-white flex flex-col divide-y divide-site-border">
        {secondary.slice(0, 3).map((article) => (
          <div key={article.id} className="p-4 flex-1">
            <ArticleCard article={article} size="small" articleBasePath={articleBasePath} />
          </div>
        ))}
      </div>
    </section>
  );
}
