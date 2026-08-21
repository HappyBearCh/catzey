import Link from 'next/link';
import { composeReading, type TextKind } from '@/lib/numerologize';
import { getGroup } from '@/lib/number-groups';

interface Props {
  /** The exact string being reduced — a category label, a genre, a tag, a name. */
  title: string;
  kind?: TextKind;
  /** What the title names, for the eyebrow: "category", "genre", "season". */
  label?: string;
  entities?: string[];
  /** Hash seed; pass a slug where one exists so the wording is stable. */
  seed?: string;
  className?: string;
}

/**
 * The reading of a page that has no stored body to write into.
 *
 * Articles, glossary entries and the rest carry their reading inside their own
 * text, put there by scripts/numerologize.ts. Index pages — a category, a genre,
 * a season, a tag — have no such text: they are assembled from a label and a
 * query. This renders the identical reading for them at request time, from the
 * same composer and the same arithmetic, so a section heading is read exactly as
 * a headline is.
 */
export function NumberReading({
  title,
  kind = 'section',
  label = 'section',
  entities,
  seed,
  className = '',
}: Props) {
  const reading = composeReading({ title, kind, entities, seed: seed ?? title });
  const n = reading.numbers.value;
  const group = getGroup(n);

  return (
    <section
      className={`border-y-2 border-ink dark:border-parchment py-6 ${className}`}
      aria-label={`Numerological reading of ${title}`}
    >
      <div className="flex items-start gap-5">
        <Link
          href={`/number/${n}`}
          className="sigil shrink-0 w-16 h-16 text-2xl border border-seal hover:border-seal transition-colors"
          aria-label={`Filed under ${n}, ${group.shelf}`}
        >
          {n}
        </Link>

        <div className="min-w-0 flex-1">
          <p className="eyebrow mb-1.5">
            The {label} by its numbers · {group.shelf}
          </p>
          <p className="font-display text-lg italic leading-snug text-ink-2 dark:text-parchment/80">
            {reading.standfirst}
          </p>

          <div
            className="num-working"
            dangerouslySetInnerHTML={{ __html: stripWrapper(reading.arithmetic) }}
          />

          {/* Only the interpretive paragraph is shown here. The full four-part
              reading belongs on a text; an index page needs the gist and a way
              through to the shelf. */}
          <p className="text-sm leading-relaxed text-ink-2 dark:text-parchment/70">
            {stripTags(reading.paragraphs[1])}
          </p>

          <Link
            href={`/number/${n}`}
            className="inline-block eyebrow mt-3 text-gold hover:text-seal dark:hover:text-gold-pale transition-colors"
          >
            {group.shelf} — {group.tagline} →
          </Link>
        </div>
      </div>
    </section>
  );
}

// The composer returns the working already wrapped in its own div; this reuses
// the cells inside a wrapper that carries the section's own layout classes.
function stripWrapper(html: string): string {
  return html.replace(/^<div[^>]*>/, '').replace(/<\/div>$/, '');
}

// The interpretive paragraph carries no markup today, but it is composed from
// entity names that could contain one, so it is flattened before display.
function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, '');
}
