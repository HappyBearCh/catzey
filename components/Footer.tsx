import Link from 'next/link';
import { GROUP_NUMBERS, getGroup } from '@/lib/number-groups';

const COLUMNS = [
  {
    heading: 'Reference',
    links: [
      { label: 'Learn', href: '/learn' },
      { label: 'Glossary', href: '/glossary' },
      { label: 'Series & creators', href: '/wiki' },
      { label: 'Guides', href: '/guides' },
      { label: 'Essays', href: '/series' },
    ],
  },
  {
    heading: 'Browse',
    links: [
      { label: 'Manga', href: '/manga' },
      { label: 'Anime', href: '/anime' },
      { label: 'Shonen', href: '/genre/shonen' },
      { label: 'Isekai', href: '/genre/isekai' },
      { label: 'Horror', href: '/genre/horror' },
      { label: 'Numbered sets', href: '/sets' },
    ],
  },
  {
    heading: 'About',
    links: [
      { label: 'About', href: '/about' },
      { label: 'How filing works', href: '/numbers' },
      { label: 'Numerology guide', href: '/numerology' },
      { label: 'Editorial policy', href: '/editorial-policy' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-line text-ink-muted dark:text-parchment/60">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-x-8 gap-y-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-3">
              <span className="block w-2.5 h-2.5 rounded-full bg-seal" aria-hidden="true" />
              <span className="font-display text-xl font-black tracking-tight text-ink dark:text-parchment">Catzye</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              A reference to how manga works, and where it came from — each entry read against its numbers.
            </p>

            {/* The twelve shelves, as a row of seals. */}
            <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="The shelves">
              {GROUP_NUMBERS.map((n) => (
                <li key={n}>
                  <Link
                    href={`/number/${n}`}
                    title={getGroup(n).shelf}
                    className="sigil sigil-xs hover:bg-seal hover:text-white transition-colors"
                  >
                    {n}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {COLUMNS.map(({ heading, links }) => (
            <div key={heading}>
              <h2 className="mb-3 font-sans text-xs font-semibold text-ink dark:text-parchment">{heading}</h2>
              {/* Each link is a full-height row so neighbouring links are not
                  too close to tap apart on a phone. */}
              <ul>
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className="inline-block py-1.5 font-sans text-sm hover:text-gold transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-2 font-sans text-xs">
          <p>© {currentYear} Catzye — Manga, filed by number</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="inline-block py-1.5 hover:text-gold transition-colors">Privacy</Link>
            <Link href="/feed.xml" className="inline-block py-1.5 hover:text-gold transition-colors">RSS</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
