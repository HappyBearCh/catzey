/**
 * Regenerates the committed fallback snapshots that keep catzye.com serving
 * content when the database is unreachable (see lib/db.ts).
 *
 *   data/articles.json — every series essay plus the most recent news articles
 *   data/series.json   — the whole series table (small)
 *
 * Every essay is included because a series page listing parts that 404 is worse
 * than useless; news is capped because it is long-tailed and the snapshot is
 * committed to git.
 *
 * Run locally against the live DB, then commit the regenerated files:
 *   npx tsx scripts/refresh-fallback.ts
 */
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

function loadEnv(file: string) {
  const full = path.resolve(process.cwd(), file);
  if (!fs.existsSync(full)) return;
  for (const line of fs.readFileSync(full, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    if (process.env[m[1]]) continue;
    let val = m[2].trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1);
    process.env[m[1]] = val;
  }
}
loadEnv('.env');
loadEnv('.env.local');

const prisma = new PrismaClient();

const NEWS_LIMIT = 400;
const DATA_DIR = path.join(process.cwd(), 'data');

async function main() {
  const essays = await prisma.article.findMany({
    where: { published: true, seriesId: { not: null } },
    orderBy: { publishedAt: 'desc' },
  });

  const news = await prisma.article.findMany({
    where: { published: true, seriesId: null },
    orderBy: { publishedAt: 'desc' },
    take: NEWS_LIMIT,
  });

  const articles = [...essays, ...news].sort(
    (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime(),
  );

  const series = await prisma.series.findMany({ orderBy: { createdAt: 'asc' } });

  fs.mkdirSync(DATA_DIR, { recursive: true });
  const articlesFile = path.join(DATA_DIR, 'articles.json');
  const seriesFile = path.join(DATA_DIR, 'series.json');
  fs.writeFileSync(articlesFile, JSON.stringify(articles, null, 2), 'utf8');
  fs.writeFileSync(seriesFile, JSON.stringify(series, null, 2), 'utf8');

  const mb = (f: string) => (fs.statSync(f).size / 1024 / 1024).toFixed(2);
  console.log(`data/articles.json — ${articles.length} rows (${essays.length} essays + ${news.length} news), ${mb(articlesFile)} MB`);
  console.log(`data/series.json   — ${series.length} rows, ${mb(seriesFile)} MB`);
  console.log(`\nCommit both files so a database outage still serves content.`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
