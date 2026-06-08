import type { Article } from '@/lib/types';

interface BreakingTickerProps {
  articles: Article[];
}

export function BreakingTicker({ articles }: BreakingTickerProps) {
  if (!articles.length) return null;

  const tickerText = articles.map((a) => a.title).join('   ·   ');

  return (
    <div className="bg-primary text-white flex items-center overflow-hidden">
      <span className="flex-shrink-0 bg-black text-white text-2xs font-black uppercase tracking-widest px-3 py-2 mr-3">
        BREAKING
      </span>
      <div className="flex-1 overflow-hidden py-2">
        <p
          className="inline-block whitespace-nowrap animate-marquee text-sm font-medium"
          style={{ animationDuration: `${Math.max(30, tickerText.length * 0.08)}s` }}
        >
          {tickerText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{tickerText}
        </p>
      </div>
    </div>
  );
}
