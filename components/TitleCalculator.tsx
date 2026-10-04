'use client';

import { useEffect, useId, useState } from 'react';
import Link from 'next/link';
import { getGroup, titleNumbers } from '@/lib/number-groups';

export interface ShelfExample {
  title: string;
  href: string;
  kindLabel: string;
}

interface Props {
  /** A few real entries per shelf, so a result points into the reference. */
  examples: Record<number, ShelfExample[]>;
  /** Shown before the reader types anything. */
  placeholder: string;
}

const PARAM = 'title';

/**
 * The filing rule as a tool: type any title and see the arithmetic the
 * reference applies to its own texts. It runs entirely in the browser — the
 * title is never sent anywhere — and the page around it stays static; the
 * title is kept in the address only so a result can be shared.
 */
export function TitleCalculator({ examples, placeholder }: Props) {
  const inputId = useId();
  const [title, setTitle] = useState('');
  const [copied, setCopied] = useState(false);

  // Read a shared title from the address once, on the client.
  useEffect(() => {
    const shared = new URLSearchParams(window.location.search).get(PARAM);
    if (shared) setTitle(shared.slice(0, 120));
  }, []);

  // Keep the address in step without adding history entries.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (title.trim()) url.searchParams.set(PARAM, title.trim());
    else url.searchParams.delete(PARAM);
    window.history.replaceState(null, '', url);
    setCopied(false);
  }, [title]);

  const shown = title.trim() || placeholder;
  const numbers = titleNumbers(shown);
  const hasLetters = numbers.words.length > 0;
  const group = getGroup(numbers.value);
  const shelfExamples = (examples[numbers.value] ?? []).slice(0, 4);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div>
      <label htmlFor={inputId} className="eyebrow block mb-2">
        Type any title
      </label>
      <input
        id={inputId}
        type="text"
        value={title}
        maxLength={120}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck={false}
        className="w-full bg-transparent border-b-2 border-ink dark:border-parchment px-1 py-2 font-display text-2xl text-ink dark:text-parchment placeholder:text-gray-400 focus:outline-none focus:border-gold"
      />

      <div aria-live="polite" className="mt-6">
        {hasLetters ? (
          <>
            <div className="num-working" role="group" aria-label={`Letter values of ${shown}`}>
              {numbers.words.map((w, i) => (
                <span className="num-word" key={`${w.word}-${i}`}>
                  <span className="num-word-text">{w.word}</span>
                  <span className="num-word-value">{w.sum}</span>
                </span>
              ))}
              <span className="num-word num-word-total">
                <span className="num-word-text">total</span>
                <span className="num-word-value">
                  {numbers.raw} → {numbers.value}
                </span>
              </span>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-5 sm:items-start">
              <Link
                href={`/number/${numbers.value}`}
                className="sigil sigil-lg shrink-0 hover:opacity-80 transition-opacity"
                aria-label={`${numbers.value}, ${group.shelf}`}
              >
                {numbers.value}
              </Link>
              <div className="min-w-0">
                <p className="font-display text-2xl font-semibold text-ink dark:text-parchment">
                  {group.shelf}
                </p>
                <p className="italic text-gold mb-2">{group.tagline}</p>
                <p className="text-ink-2 dark:text-parchment/75 leading-relaxed">{group.intro}</p>
                <p className="text-sm text-gray-500 mt-3">
                  Heart&apos;s desire {numbers.heart} · Personality {numbers.personality}
                </p>
              </div>
            </div>

            {shelfExamples.length > 0 && (
              <div className="mt-6">
                <p className="eyebrow mb-2">Also on {group.shelf}</p>
                <ul>
                  {shelfExamples.map((e) => (
                    <li key={e.href}>
                      <Link
                        href={e.href}
                        className="group flex items-baseline gap-3 py-2 border-b border-rule/25 dark:border-rule"
                      >
                        <span className="eyebrow shrink-0 basis-24 text-gray-500">{e.kindLabel}</span>
                        <span className="font-display text-ink-2 dark:text-parchment/80 group-hover:text-gold transition-colors">
                          {e.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {title.trim() && (
              <button
                type="button"
                onClick={copyLink}
                className="mt-6 eyebrow text-gold hover:opacity-70 transition-opacity"
              >
                {copied ? 'Link copied' : 'Copy a link to this reading →'}
              </button>
            )}
          </>
        ) : (
          <p className="text-gray-500">
            Only letters count. A title written entirely in Japanese script or digits has no
            Pythagorean value; try its romanised or English title.
          </p>
        )}
      </div>
    </div>
  );
}
