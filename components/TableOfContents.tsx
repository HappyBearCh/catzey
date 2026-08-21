'use client';

import { useEffect, useState } from 'react';
import type { Heading } from '@/lib/headings';
import { titleValue } from '@/lib/number-groups';

interface Props {
  headings: Heading[];
}

export function TableOfContents({ headings }: Props) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0% -70% 0%' }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 3) return null;

  return (
    <div className="mb-6 pb-6 border-b border-site-border dark:border-gray-700">
      <div className="flex items-center gap-2 mb-3">
        <span className="block w-1 h-5 bg-primary" />
        <h2 className="text-sm font-semibold uppercase tracking-wider">Contents</h2>
        <span className="ml-auto text-2xs text-gray-400 dark:text-gray-500" title="Each heading reduced">
          by number
        </span>
      </div>
      <ol className="space-y-1.5">
        {headings.map(({ id, text, level }) => (
          <li key={id} style={{ paddingLeft: level === 3 ? '0.75rem' : undefined }}>
            <button
              type="button"
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className={`text-xs leading-snug text-left w-full transition-colors hover:text-primary ${
                activeId === id
                  ? 'text-primary font-bold'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <span className="text-gold/60 font-display mr-1.5" aria-hidden="true">
                {titleValue(text)}
              </span>
              {text}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
