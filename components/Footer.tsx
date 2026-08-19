import Link from 'next/link';
import { Logo } from './Logo';
import { CATEGORIES } from '@/lib/types';
import { getCurrentSeason, getAllSeasons } from '@/lib/seasons';
import { NewsletterForm } from './NewsletterForm';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-rule dark:border-ink-border bg-paper-2 dark:bg-ink-bg-2 text-ink-muted dark:text-paper-2/60 mt-16">
      <div className="max-w-8xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          <div>
            <Link href="/" className="block mb-4">
              <Logo />
            </Link>
            <p className="text-sm leading-relaxed mb-4">
              Latest manga &amp; anime news from around the world.
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm hover:text-seal transition-colors">About</Link>
              </li>
              <li>
                <Link href="/numerology" className="text-sm hover:text-seal transition-colors">Numerology Guide</Link>
              </li>
              <li>
                <Link href="/numerology/daily" className="text-sm hover:text-seal transition-colors">Daily Analysis</Link>
              </li>
              <li>
                <Link href="/editorial-policy" className="text-sm hover:text-seal transition-colors">Editorial Policy</Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-seal transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="eyebrow block mb-4">Sections</h3>
            <ul className="space-y-2">
              {CATEGORIES.slice(0, 5).map(({ label, slug }) => (
                <li key={slug}>
                  <Link href={`/${slug}`} className="text-sm hover:text-seal transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow block mb-4">Learn</h3>
            <ul className="space-y-2 mb-6">
              <li>
                <Link href="/learn" className="text-sm hover:text-seal transition-colors">All Explainers</Link>
              </li>
              <li>
                <Link href="/glossary" className="text-sm hover:text-seal transition-colors">Manga Glossary</Link>
              </li>
              <li>
                <Link href="/wiki" className="text-sm hover:text-seal transition-colors">Series &amp; Creators</Link>
              </li>
              <li>
                <Link href="/guides" className="text-sm hover:text-seal transition-colors">Guides</Link>
              </li>
            </ul>
            <h3 className="eyebrow block mb-4">More</h3>
            <ul className="space-y-2">
              {CATEGORIES.slice(5).map(({ label, slug }) => (
                <li key={slug}>
                  <Link href={`/${slug}`} className="text-sm hover:text-seal transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/series" className="text-sm hover:text-seal transition-colors">Essay Series</Link>
              </li>
              <li>
                <Link href="/trending" className="text-sm hover:text-seal transition-colors">Trending</Link>
              </li>
              <li>
                <Link href="/calendar" className="text-sm hover:text-seal transition-colors">Release Calendar</Link>
              </li>
              <li>
                {/* Driven off the season data rather than hardcoded, so this
                    stops pointing at last season the moment one rolls over. */}
                <Link
                  href={`/season/${getCurrentSeason()?.slug ?? getAllSeasons()[0]?.slug ?? ''}`}
                  className="text-sm hover:text-seal transition-colors"
                >
                  Season Guide
                </Link>
              </li>
            </ul>
          </div>

          <div className="hidden md:block">
            <h3 className="eyebrow block mb-4">Genres</h3>
            <ul className="space-y-2">
              {['isekai', 'shonen', 'romance', 'horror', 'slice-of-life', 'sports', 'mecha', 'seinen'].map((g) => (
                <li key={g}>
                  <Link href={`/genre/${g}`} className="text-sm hover:text-seal transition-colors capitalize">
                    {g.replace('-', ' ')}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow block mb-4">Newsletter</h3>
            <p className="text-sm mb-3">
              Weekly digest of the top manga &amp; anime stories.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs">
          <p>© {currentYear} Catzye — Manga &amp; Anime News</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-seal transition-colors">Privacy</Link>
            <Link href="/feed.xml" className="hover:text-seal transition-colors">RSS</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
