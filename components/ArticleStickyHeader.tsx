'use client';

import { useEffect, useState } from 'react';
import { ShareButtons } from './ShareButtons';
import { titleValue } from '@/lib/number-groups';

interface Props {
  title: string;
  url: string;
}

export function ArticleStickyHeader({ title, url }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const h1 = document.querySelector('article h1');
    if (!h1) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(h1);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed left-0 right-0 z-40 bg-white dark:bg-gray-900 border-b border-site-border dark:border-gray-700 shadow-sm transition-all duration-200 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none'
      }`}
      style={{ top: '97px' }}
    >
      <div className="max-w-8xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        <span className="sigil w-6 h-6 text-xs border border-gold/40 shrink-0" aria-hidden="true">
          {titleValue(title)}
        </span>
        <p className="font-bold text-sm line-clamp-1 flex-1 text-gray-900 dark:text-gray-100">{title}</p>
        <ShareButtons url={url} title={title} />
      </div>
    </div>
  );
}
