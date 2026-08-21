import Link from 'next/link';
import { titleValue, getGroup } from '@/lib/number-groups';
import { getShelfNeighbours } from '@/lib/shelves';

interface Props {
  title: string;
  /** This text's own path, so it is not listed as a neighbour of itself. */
  selfHref: string;
  limit?: number;
  className?: string;
}

/**
 * What else sits on the same shelf.
 *
 * The full reading lives in the body of every text, written there by
 * scripts/numerologize.ts. What the body cannot know is the rest of the shelf —
 * that needs the whole index — so this is the one part of the numerological
 * apparatus assembled at render time.
 */
export async function ShelfNeighbours({ title, selfHref, limit = 6, className = '' }: Props) {
  const n = titleValue(title);
  const group = getGroup(n);
  const neighbours = await getShelfNeighbours(title, selfHref, limit);

  if (neighbours.length === 0) return null;

  return (
    <aside
      className={`border-t-2 border-ink dark:border-parchment pt-5 ${className}`}
      aria-label={`Also filed under ${n}`}
    >
      <div className="flex items-baseline gap-3 mb-4">
        <Link
          href={`/number/${n}`}
          className="sigil sigil-md shrink-0 hover:opacity-75 transition-opacity"
          aria-hidden="true"
        >
          {n}
        </Link>
        <div className="min-w-0">
          <p className="eyebrow">Also on {group.shelf}</p>
          <p className="text-sm text-ink-muted dark:text-parchment/55 mt-0.5">{group.tagline}</p>
        </div>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
        {neighbours.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group flex items-baseline gap-3 py-2.5 border-b border-rule/30 dark:border-rule"
            >
              <span className="eyebrow shrink-0 whitespace-nowrap basis-[5.5rem] text-ink-muted dark:text-parchment/40">
                {item.kindLabel}
              </span>
              <span className="min-w-0 font-display text-[0.95rem] leading-snug text-ink dark:text-parchment group-hover:text-gold transition-colors line-clamp-2">
                {item.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href={`/number/${n}`}
        className="inline-block eyebrow mt-4 text-gold hover:text-seal dark:hover:text-gold-pale transition-colors"
      >
        The whole shelf →
      </Link>
    </aside>
  );
}
