import { prisma } from '@/lib/db';
import { CATEGORIES, getCategoryLabel } from '@/lib/types';
import { buildRss, RSS_HEADERS, type RssArticle } from '@/lib/rss';

export const revalidate = 3600;
export const runtime = 'nodejs';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

export async function generateStaticParams() {
  return CATEGORIES.map(({ slug }) => ({ category: slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;

  if (!CATEGORIES.some((c) => c.slug === category)) {
    return new Response('Not found', { status: 404 });
  }

  const label = getCategoryLabel(category);
  let articles: RssArticle[] = [];

  try {
    articles = await prisma.article.findMany({
      where: { published: true, category },
      orderBy: { publishedAt: 'desc' },
      take: 50,
      select: { title: true, slug: true, excerpt: true, category: true, publishedAt: true, imageUrl: true, tags: true },
    });
  } catch {
    // DB unavailable
  }

  const xml = buildRss({
    title: `Catzye — ${label}`,
    link: `${BASE}/${category}`,
    description: `Everything Catzye files under ${label} — reporting, explainers and reference entries.`,
    selfUrl: `${BASE}/${category}/feed.xml`,
    articles,
  });

  return new Response(xml, { headers: RSS_HEADERS });
}
