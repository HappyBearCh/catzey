'use client';

import { useState, useEffect } from 'react';

interface Props {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: Props) {
  const [copied, setCopied] = useState(false);
  const [hasNativeShare, setHasNativeShare] = useState(false);

  useEffect(() => {
    setHasNativeShare(typeof navigator !== 'undefined' && 'share' in navigator);
  }, []);

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function nativeShare() {
    try {
      await navigator.share({ title, url });
    } catch {
      // user cancelled or share failed — silent
    }
  }

  const enc = encodeURIComponent;

  if (hasNativeShare) {
    return (
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={nativeShare}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-sm bg-primary text-white hover:bg-primary-dark transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share
        </button>
        <button
          type="button"
          onClick={copyLink}
          className="text-xs font-semibold px-3 py-1.5 rounded-sm border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-gray-400 transition-colors"
        >
          {copied ? '✓ Copied!' : 'Copy link'}
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">Share:</span>
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
        className="text-xs font-semibold px-3 py-1.5 rounded-sm border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-gray-400 transition-colors"
      >
        {copied ? '✓ Copied!' : 'Copy link'}
      </button>
    </div>
  );
}
