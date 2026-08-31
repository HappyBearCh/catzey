import { prisma } from '@/lib/db';
import { getGenreInfo, getAllGenres } from '@/lib/genre-info';
import { buildRss, RSS_HEADERS, type RssArticle } from '@/lib/rss';

// Frozen edition (see lib/db.ts) — nothing here changes until the next deploy,
// so a timer only bought re-renders and ISR writes for identical output.
export const revalidate = false;
export const runtime = 'nodejs';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

export async function generateStaticParams() {
  return getAllGenres().map((g) => ({ genre: g.slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ genre: string }> }) {
  const { genre } = await params;
  const info = getGenreInfo(genre);

  if (!info) {
    return new Response('Not found', { status: 404 });
  }

  let articles: RssArticle[] = [];

  try {
    articles = await prisma.article.findMany({
      where: { published: true, tags: { hasSome: info.relatedTags } },
      orderBy: { publishedAt: 'desc' },
      take: 50,
      select: { title: true, slug: true, excerpt: true, category: true, publishedAt: true, imageUrl: true, tags: true },
    });
  } catch {
    // DB unavailable
  }

  const xml = buildRss({
    title: `Catzye — ${info.label} Manga & Anime`,
    link: `${BASE}/genre/${genre}`,
    description: info.description,
    selfUrl: `${BASE}/genre/${genre}/feed.xml`,
    articles,
  });

  return new Response(xml, { headers: RSS_HEADERS });
}
