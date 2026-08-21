import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { GROUP_NUMBERS, getGroup, parseGroupParam, titleValue } from '@/lib/number-groups';

/**
 * A query is often a shelf rather than a word — "7", "ledger", "the ledger".
 * Title matching cannot answer that, so the shelf is prepended as its own
 * result and marked so the client can render it differently.
 */
function shelfSuggestion(q: string) {
  const query = q.trim().toLowerCase();
  const n =
    parseGroupParam(query) ??
    GROUP_NUMBERS.find((g) => {
      const shelf = getGroup(g).shelf.toLowerCase();
      return shelf === query || shelf.replace(/^the /, '') === query;
    });
  if (!n) return null;
  return { slug: `number/${n}`, title: `${n} — ${getGroup(n).shelf}`, category: 'shelf', shelf: n };
}

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')?.trim() ?? '';
  if (q.length < 2) return NextResponse.json({ results: [] });

  try {
    const articles = await prisma.article.findMany({
      where: {
        published: true,
        title: { contains: q, mode: 'insensitive' },
      },
      select: { slug: true, title: true, category: true },
      orderBy: { views: 'desc' },
      take: 6,
    });
    const shelf = shelfSuggestion(q);
    const results = articles.map((a) => ({ ...a, shelf: titleValue(a.title) }));
    return NextResponse.json({ results: shelf ? [shelf, ...results.slice(0, 5)] : results });
  } catch {
    return NextResponse.json({ results: [] });
  }
}
