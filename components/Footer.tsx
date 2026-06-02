import Link from 'next/link';
import { Logo } from './Logo';
import { CATEGORIES } from '@/lib/types';
import { NewsletterForm } from './NewsletterForm';

export function Footer({ basePath = '' }: { basePath?: string }) {
  const currentYear = new Date().getFullYear();
  const isBosnian = basePath === '/bs';

  return (
    <footer className="bg-site-dark text-gray-400 mt-12">
      <div className="max-w-8xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand column */}
          <div>
            <Link href={basePath || '/'} className="block mb-4">
              <Logo />
            </Link>
            <p className="text-sm leading-relaxed mb-4">
              Latest manga &amp; anime news from around the world.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
              {isBosnian ? 'Rubrike' : 'Sections'}
            </h3>
            <ul className="space-y-2">
              {CATEGORIES.slice(0, 5).map(({ label, labelBs, slug }) => (
                <li key={slug}>
                  <Link
                    href={`${basePath}/${slug}`}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {isBosnian ? labelBs : label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
              {isBosnian ? 'Više' : 'More'}
            </h3>
            <ul className="space-y-2">
              {CATEGORIES.slice(5).map(({ label, labelBs, slug }) => (
                <li key={slug}>
                  <Link
                    href={`${basePath}/${slug}`}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {isBosnian ? labelBs : label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
              {isBosnian ? 'Newsletter' : 'Newsletter'}
            </h3>
            <p className="text-sm mb-3">
              Weekly digest of the top manga &amp; anime stories.
            </p>
            <NewsletterForm isBosnian={isBosnian} />
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs">
          <p>© {currentYear} Catzye — Manga &amp; Anime News</p>
          <div className="flex items-center gap-4">
            <Link href={`${basePath}/feed.xml`} className="hover:text-white transition-colors">
              RSS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
