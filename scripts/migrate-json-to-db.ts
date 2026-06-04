/**
 * One-time migration: import existing JSON data files into Neon Postgres.
 * Run with: npx tsx scripts/migrate-json-to-db.ts
 */
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const DATA_DIR = path.join(process.cwd(), 'data');

function readJson<T>(file: string): T[] {
  const p = path.join(DATA_DIR, file);
  if (!fs.existsSync(p)) return [];
  try { return JSON.parse(fs.readFileSync(p, 'utf8')) as T[]; } catch { return []; }
}

async function main() {
  const articles = readJson<Record<string, unknown>>('articles.json');
  const scrapedItems = readJson<Record<string, unknown>>('scraped-items.json');
  const subscribers = readJson<Record<string, unknown>>('subscribers.json');

  console.log(`Migrating: ${articles.length} articles, ${scrapedItems.length} scraped items, ${subscribers.length} subscribers`);

  for (const a of articles) {
    await prisma.article.upsert({
      where: { sourceUrl: a.sourceUrl as string },
      create: {
        id: a.id as string,
        title: a.title as string,
        content: a.content as string,
        excerpt: a.excerpt as string,
        titleBs: (a.titleBs as string | null) ?? null,
        contentBs: (a.contentBs as string | null) ?? null,
        excerptBs: (a.excerptBs as string | null) ?? null,
        slug: a.slug as string,
        imageUrl: (a.imageUrl as string | null) ?? null,
        category: a.category as string,
        source: a.source as string,
        sourceUrl: a.sourceUrl as string,
        publishedAt: new Date(a.publishedAt as string),
        published: a.published as boolean,
        scheduledAt: a.scheduledAt ? new Date(a.scheduledAt as string) : null,
        displayLang: (a.displayLang as string) ?? 'both',
        views: (a.views as number) ?? 0,
        tags: (a.tags as string[]) ?? [],
        entities: (a.entities as string[]) ?? [],
        createdAt: new Date(a.createdAt as string),
        updatedAt: new Date(a.updatedAt as string),
      },
      update: {},
    });
  }
  console.log(`✓ Articles done`);

  for (const s of scrapedItems) {
    await prisma.scrapedItem.upsert({
      where: { sourceUrl: s.sourceUrl as string },
      create: {
        id: s.id as string,
        title: s.title as string,
        description: (s.description as string | null) ?? null,
        sourceUrl: s.sourceUrl as string,
        source: s.source as string,
        category: s.category as string,
        imageUrl: (s.imageUrl as string | null) ?? null,
        pubDate: s.pubDate ? new Date(s.pubDate as string) : null,
        scrapedAt: new Date(s.scrapedAt as string),
        status: (s.status as string) ?? 'pending',
      },
      update: {},
    });
  }
  console.log(`✓ Scraped items done`);

  for (const sub of subscribers) {
    await prisma.subscriber.upsert({
      where: { email: sub.email as string },
      create: {
        id: sub.id as string,
        email: sub.email as string,
        token: sub.token as string,
        createdAt: new Date(sub.createdAt as string),
      },
      update: {},
    });
  }
  console.log(`✓ Subscribers done`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
