import Link from 'next/link';
import { titleValue, getGroup, titleNumbers } from '@/lib/number-groups';

interface Props {
  /** The exact string that was reduced — a headline, a term, a name. */
  title: string;
  /** Print the raw sum alongside the reduced figure. */
  showSum?: boolean;
  className?: string;
}

/**
 * The one-line filing card: what this text reduces to, and the shelf that puts
 * it on. Small enough to sit under a heading without competing with it.
 */
export function ShelfBadge({ title, showSum = false, className = '' }: Props) {
  const n = titleValue(title);
  const group = getGroup(n);
  const sum = showSum ? titleNumbers(title).raw : null;

  return (
    <Link
      href={`/number/${n}`}
      className={`inline-flex items-center gap-2 border border-seal pl-1 pr-3 py-1 hover:bg-seal/10 transition-colors group ${className}`}
      aria-label={`Filed under ${n}, ${group.shelf}`}
    >
      <span className="sigil sigil-sm">
        {n}
      </span>
      <span className="eyebrow text-ink-2 dark:text-parchment/70 group-hover:text-gold transition-colors">
        {group.shelf}
        {sum !== null && <span className="text-ink-muted dark:text-parchment/40"> · {sum}</span>}
      </span>
    </Link>
  );
}
