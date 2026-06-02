'use client';

import { useTransition } from 'react';
import { setArticleDisplayLang } from './actions';

const OPTIONS = [
  { value: 'en', label: 'EN only', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { value: 'bs', label: 'BS only', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  { value: 'both', label: 'EN + BS', color: 'bg-green-100 text-green-700 border-green-200' },
] as const;

export function DisplayLangButton({
  id,
  displayLang,
}: {
  id: string;
  displayLang: string;
}) {
  const [pending, startTransition] = useTransition();
  const current = OPTIONS.find((o) => o.value === displayLang) ?? OPTIONS[2];

  function cycle() {
    const idx = OPTIONS.findIndex((o) => o.value === displayLang);
    const next = OPTIONS[(idx + 1) % OPTIONS.length];
    startTransition(() => setArticleDisplayLang(id, next.value));
  }

  return (
    <button
      onClick={cycle}
      disabled={pending}
      title="Click to cycle: EN only → BS only → EN + BS"
      className={`inline-flex items-center text-2xs font-bold border px-2 py-0.5 rounded-full transition-opacity ${current.color} ${pending ? 'opacity-50' : 'hover:opacity-80 cursor-pointer'}`}
    >
      {pending ? '…' : current.label}
    </button>
  );
}
