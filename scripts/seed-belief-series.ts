/**
 * Seeds the series row for "What the Stories Believe".
 *
 * Like seed-crossing-series.ts and seed-audience-series.ts, this generates
 * nothing. It only creates the Series record. Every essay is written by hand in
 * scripts/authored-belief.ts and published with scripts/publish-authored.ts.
 * No API key required.
 *
 * Run with: npx tsx scripts/seed-belief-series.ts
 * Idempotent — re-running updates the description and leaves articles alone.
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
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    process.env[m[1]] = val;
  }
}
loadEnv('.env');
loadEnv('.env.local');

const prisma = new PrismaClient();

const SERIES = {
  title: 'What the Stories Believe',
  slug: 'what-the-stories-believe',
  category: 'manga',
  description:
    'What manga and anime actually argue. A close-reading series on the moral architecture of the medium — the creed of effort, friendship, and victory; the villain handed a real case; the death that never sticks; work as salvation; and the war memory buried under all of it. On the beliefs a story carries whether or not it means to, written by a critic who has spent six series believing in numbers.',
};

async function main() {
  const series = await prisma.series.upsert({
    where: { slug: SERIES.slug },
    update: { description: SERIES.description, title: SERIES.title, category: SERIES.category },
    create: SERIES,
  });
  const count = await prisma.article.count({ where: { seriesId: series.id } });
  console.log(`Series ready: ${series.title} (${series.id})`);
  console.log(`  slug: ${series.slug}   category: ${series.category}   existing parts: ${count}`);
  console.log('\nnow run: npx tsx scripts/publish-authored.ts');
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
