import Link from 'next/link';
import { Logo } from './Logo';
import { CATEGORIES } from '@/lib/types';
import { GROUP_NUMBERS, getGroup } from '@/lib/number-groups';
import { getCurrentSeason, getAllSeasons } from '@/lib/seasons';
import { NewsletterForm } from './NewsletterForm';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-ink dark:border-parchment bg-paper-2 dark:bg-ground-2 text-ink-muted dark:text-parchment/55 mt-16">
      <div className="max-w-8xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 mb-8">
          <div>
            <Link href="/" className="block mb-4">
              <Logo />
            </Link>
            <p className="text-sm leading-relaxed mb-4">
              A reference to how manga works, and where it came from — each entry read against its numbers.
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm hover:text-gold transition-colors">About</Link>
              </li>
              <li>
                <Link href="/numerology" className="text-sm hover:text-gold transition-colors">Numerology Guide</Link>
              </li>
              <li>
                <Link href="/numerology/daily" className="text-sm hover:text-gold transition-colors">Daily Analysis</Link>
              </li>
              <li>
                <Link href="/editorial-policy" className="text-sm hover:text-gold transition-colors">Editorial Policy</Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-gold transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* The shelves get the first column after the masthead: they are the
              arrangement, and the category list below is the older cross-cut. */}
          <div>
            <h3 className="eyebrow block mb-4">The Shelves</h3>
            <ul className="space-y-1.5 mb-4">
              {GROUP_NUMBERS.map((n) => (
                <li key={n}>
                  <Link
                    href={`/number/${n}`}
                    className="text-sm hover:text-gold transition-colors flex items-baseline gap-2"
                  >
                    <span className="font-display text-gold/60 w-5 tabular-nums" aria-hidden="true">{n}</span>
                    <span>{getGroup(n).shelf}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/numbers" className="eyebrow hover:text-gold transition-colors">
              How filing works →
            </Link>
            <Link href="/sets" className="eyebrow hover:text-gold transition-colors block mt-2">
              Numbered sets →
            </Link>
          </div>

          <div>
            <h3 className="eyebrow block mb-4">Sections</h3>
            <ul className="space-y-2">
              {CATEGORIES.slice(0, 5).map(({ label, slug }) => (
                <li key={slug}>
                  <Link href={`/${slug}`} className="text-sm hover:text-gold transition-colors">
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
                <Link href="/learn" className="text-sm hover:text-gold transition-colors">All Explainers</Link>
              </li>
              <li>
                <Link href="/glossary" className="text-sm hover:text-gold transition-colors">Manga Glossary</Link>
              </li>
              <li>
                <Link href="/wiki" className="text-sm hover:text-gold transition-colors">Series &amp; Creators</Link>
              </li>
              <li>
                <Link href="/guides" className="text-sm hover:text-gold transition-colors">Guides</Link>
              </li>
            </ul>
            <h3 className="eyebrow block mb-4">More</h3>
            <ul className="space-y-2">
              {CATEGORIES.slice(5).map(({ label, slug }) => (
                <li key={slug}>
                  <Link href={`/${slug}`} className="text-sm hover:text-gold transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/series" className="text-sm hover:text-gold transition-colors">Essay Series</Link>
              </li>
              <li>
                <Link href="/trending" className="text-sm hover:text-gold transition-colors">Trending</Link>
              </li>
              <li>
                <Link href="/calendar" className="text-sm hover:text-gold transition-colors">Release Calendar</Link>
              </li>
              <li>
                {/* Driven off the season data rather than hardcoded, so this
                    stops pointing at last season the moment one rolls over. */}
                <Link
                  href={`/season/${getCurrentSeason()?.slug ?? getAllSeasons()[0]?.slug ?? ''}`}
                  className="text-sm hover:text-gold transition-colors"
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
                  <Link href={`/genre/${g}`} className="text-sm hover:text-gold transition-colors capitalize">
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
            <Link href="/privacy" className="hover:text-gold transition-colors">Privacy</Link>
            <Link href="/feed.xml" className="hover:text-gold transition-colors">RSS</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
