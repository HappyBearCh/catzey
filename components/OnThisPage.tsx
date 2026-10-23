import type { Heading } from '@/lib/headings';

/**
 * Jump links to the sections of a long entry. Plain anchors, no script: they
 * work before hydration, and named anchors on a page are what Google draws on
 * for the "Jump to" links under a result. Shown only when there are enough
 * sections for a reader to need a way between them.
 */
export function OnThisPage({ headings, className = '' }: { headings: Heading[]; className?: string }) {
  const sections = headings.filter((h) => h.level === 2);
  if (sections.length < 3) return null;

  return (
    <nav aria-label="On this page" className={`mb-8 ${className}`}>
      <p className="eyebrow mb-2">On this page</p>
      <ul className="flex flex-wrap gap-2">
        {sections.map(({ id, text }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className="inline-block rounded-full border border-line px-3 py-1.5 font-sans text-sm text-ink-2 dark:text-parchment/75 hover:border-gold/40 hover:text-gold transition-colors"
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
