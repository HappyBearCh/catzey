import { prisma } from '@/lib/db';
import { buildRss, RSS_HEADERS, type RssArticle } from '@/lib/rss';

// Frozen edition (see lib/db.ts) — the feed changes only on deploy.
export const revalidate = false;
export const runtime = 'nodejs';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

export async function GET() {
  let articles: RssArticle[] = [];

  try {
    articles = await prisma.article.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      take: 50,
      select: { title: true, slug: true, excerpt: true, category: true, publishedAt: true, imageUrl: true, tags: true },
    });
  } catch {
    // DB unavailable
  }

  const xml = buildRss({
    title: 'Catzye — Manga, Filed by Number',
    link: BASE,
    description: 'A reference to how manga works — explainers, a glossary, and entries on series and creators, filed by number.',
    selfUrl: `${BASE}/feed.xml`,
    articles,
  });

  return new Response(xml, { headers: RSS_HEADERS });
}
