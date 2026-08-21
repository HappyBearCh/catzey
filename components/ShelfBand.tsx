import Link from 'next/link';
import { GROUP_NUMBERS, getGroup, titleValue } from '@/lib/number-groups';

interface Props {
  /** The titles on this index, used to count what each shelf holds here. */
  titles: string[];
  /** What the counts are counting — "terms", "explainers", "entries". */
  noun: string;
  className?: string;
}

/**
 * The twelve shelves, counted against one index.
 *
 * An index page lists its own contents its own way — alphabetically, by track,
 * by track order. This band sits above that and offers the other axis: how many
 * of these particular texts landed on each shelf, and a way through to the shelf
 * itself, where they sit alongside everything else that reduced the same way.
 * Shelves holding none of this index's texts are shown greyed rather than
 * hidden, so the shape of the distribution stays visible.
 */
export function ShelfBand({ titles, noun, className = '' }: Props) {
  const counts = new Map<number, number>();
  for (const title of titles) {
    const n = titleValue(title);
    counts.set(n, (counts.get(n) ?? 0) + 1);
  }

  return (
    <section className={`border-y border-gold/25 py-4 ${className}`} aria-label="Filed by number">
      <div className="flex items-baseline justify-between gap-4 mb-3">
        <h2 className="eyebrow">Filed by number</h2>
        <Link href="/numbers" className="eyebrow text-gold hover:underline">
          How filing works →
        </Link>
      </div>

      <ul className="flex flex-wrap gap-1.5">
        {GROUP_NUMBERS.map((n) => {
          const count = counts.get(n) ?? 0;
          const group = getGroup(n);
          return (
            <li key={n}>
              <Link
                href={`/number/${n}`}
                title={`${group.shelf} — ${group.tagline}`}
                className={`flex items-center gap-2 border px-2 py-1.5 transition-colors ${
                  count > 0
                    ? 'border-gold/40 hover:bg-gold/10'
                    : 'border-rule/40 dark:border-rule opacity-50 hover:opacity-100'
                }`}
              >
                <span className="sigil w-6 h-6 text-xs border border-gold/30">{n}</span>
                <span className="text-xs leading-tight">
                  <span className="block font-display text-ink dark:text-parchment">
                    {group.shelf}
                  </span>
                  <span className="block text-ink-muted dark:text-parchment/45">
                    {count} {noun}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
