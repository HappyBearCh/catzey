'use client';

import { useState } from 'react';

interface Props {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: Props) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const enc = encodeURIComponent;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Share:</span>
      <a
        href={`https://wa.me/?text=${enc(title)}%20${enc(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs font-semibold px-3 py-1.5 rounded-sm bg-green-500 text-white hover:bg-green-600 transition-colors"
      >
        WhatsApp
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs font-semibold px-3 py-1.5 rounded-sm bg-black text-white hover:bg-gray-800 transition-colors"
      >
        X / Twitter
      </a>
      <button
        type="button"
        onClick={copyLink}
        className="text-xs font-semibold px-3 py-1.5 rounded-sm border border-gray-200 text-gray-600 hover:border-gray-400 transition-colors"
      >
        {copied ? '✓ Copied!' : 'Copy link'}
      </button>
    </div>
  );
}
