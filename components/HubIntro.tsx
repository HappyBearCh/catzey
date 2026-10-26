import Link from 'next/link';
import type { HubReference } from '@/lib/hub-intro';

/** Splits "text [label](href) text" into text and links, rendered as JSX. */
function withLinks(text: string) {
  const parts: React.ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  for (let m = re.exec(text); m; m = re.exec(text)) {
    parts.push(text.slice(last, m.index));
    parts.push(
      <Link key={m.index} href={m[2]} className="text-gold underline underline-offset-2 hover:no-underline">
        {m[1]}
      </Link>,
    );
    last = m.index + m[0].length;
  }
  parts.push(text.slice(last));
  return parts;
}

/**
 * The opening of a tag or topic hub: a hand-written framing of the subject, or,
 * when the subject has an entry in the reference, that entry's summary and a
 * way to it. Either way the hub says what it is about before it lists essays.
 */
export function HubIntro({
  intro,
  reference,
  className = '',
}: {
  intro?: string | null;
  reference?: HubReference | null;
  className?: string;
}) {
  if (!intro && !reference) return null;
  return (
    <div className={`manga-panel p-5 md:p-6 max-w-3xl ${className}`}>
      {intro && <p className="leading-relaxed text-ink-2 dark:text-parchment/85">{withLinks(intro)}</p>}
      {reference && (
        <div className={intro ? 'mt-5 pt-5 border-t border-line' : ''}>
          <p className="eyebrow text-gold mb-1">From the {reference.kind === 'Glossary' ? 'glossary' : 'wiki'}</p>
          <p className="font-display text-xl font-bold text-ink dark:text-parchment">{reference.title}</p>
          {reference.facts.length > 0 && (
            <p className="mt-0.5 font-sans text-sm capitalize text-ink-muted dark:text-parchment/60">
              {reference.facts.join(' · ')}
            </p>
          )}
          <p className="mt-2 leading-relaxed text-ink-2 dark:text-parchment/85">{reference.summary}</p>
          <Link
            href={reference.href}
            className="mt-3 inline-block py-1.5 font-sans text-sm font-semibold text-gold hover:underline underline-offset-4"
          >
            Read the {reference.kind === 'Glossary' ? 'glossary entry' : 'full entry'} on {reference.title} →
          </Link>
        </div>
      )}
    </div>
  );
}
