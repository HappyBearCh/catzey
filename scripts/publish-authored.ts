/**
 * Publishes the essays in scripts/authored-essays.ts — prose written directly by
 * Claude in-session, with no generation API involved. The numerology in each was
 * computed with lib/numerology.ts before the prose was written.
 *
 * Idempotent: skips any part whose seriesOrder already exists.
 *
 * Run with: npx tsx scripts/publish-authored.ts
 * Then re-anchor dates:  npx tsx scripts/backdate-series.ts
 */
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { AUTHORED } from './authored-essays';
import { AUTHORED_CROSSING } from './authored-crossing';
import { AUTHORED_AUDIENCE } from './authored-audience';
import { AUTHORED_BELIEF } from './authored-belief';
import { AUTHORED_CHARACTER } from './authored-character';

const ALL = [...AUTHORED, ...AUTHORED_CROSSING, ...AUTHORED_AUDIENCE, ...AUTHORED_BELIEF, ...AUTHORED_CHARACTER];

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

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80);
}

async function uniqueSlug(base: string): Promise<string> {
  let slug = base || 'authored-essay';
  let n = 0;
  while (await prisma.article.findUnique({ where: { slug }, select: { id: true } })) {
    n++;
    slug = `${base}-${n}`;
  }
  return slug;
}

// --sync also re-pushes prose edits onto already-published parts.
const SYNC = process.argv.includes('--sync');

async function main() {
  let published = 0;
  let skipped = 0;
  let synced = 0;

  for (const essay of ALL) {
    const series = await prisma.series.findUnique({ where: { slug: essay.seriesSlug } });
    if (!series) throw new Error(`series not found: ${essay.seriesSlug}`);

    const existing = await prisma.article.findFirst({
      where: { seriesId: series.id, seriesOrder: essay.seriesOrder },
      select: { slug: true },
    });
    if (existing) {
      if (SYNC) {
        // Re-push the authored prose over the stored row. Deliberately does NOT
        // touch slug or publishedAt: the slug is linked from elsewhere and the
        // date is owned by backdate-series.ts.
        const before = await prisma.article.findUnique({
          where: { slug: existing.slug },
          select: { content: true, title: true, excerpt: true, pullQuote: true },
        });
        const changed =
          before?.content !== essay.content ||
          before?.title !== essay.title ||
          before?.excerpt !== essay.excerpt ||
          before?.pullQuote !== essay.pullQuote;
        if (changed) {
          await prisma.article.update({
            where: { slug: existing.slug },
            data: {
              title: essay.title,
              excerpt: essay.excerpt,
              content: essay.content,
              tags: essay.tags,
              entities: essay.entities,
              pullQuote: essay.pullQuote,
            },
          });
          console.log(`  [${essay.seriesSlug}] Part ${essay.seriesOrder}: ↻ synced (${existing.slug})`);
          synced++;
          continue;
        }
      }
      skipped++;
      continue;
    }

    const words = essay.content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
    const slug = await uniqueSlug(slugify(essay.title));

    const article = await prisma.article.create({
      data: {
        title: essay.title,
        excerpt: essay.excerpt,
        content: essay.content,
        slug,
        category: series.category,
        source: 'Catzye Numerology Desk',
        sourceUrl: `https://catzye.com/series/${essay.seriesSlug}/part-${essay.seriesOrder}`,
        publishedAt: new Date(), // backdate-series.ts re-anchors this
        published: true,
        tags: essay.tags,
        entities: essay.entities,
        pullQuote: essay.pullQuote,
        seriesId: series.id,
        seriesOrder: essay.seriesOrder,
      },
    });
    console.log(`  [${essay.seriesSlug}] Part ${essay.seriesOrder}: ✓ /article/${article.slug} (${words} words)`);
    published++;
  }

  console.log(`\npublished ${published}, synced ${synced}, skipped ${skipped}${SYNC ? '' : '  (pass --sync to re-push prose edits)'}`);
  console.log('now run: npx tsx scripts/backdate-series.ts');
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
