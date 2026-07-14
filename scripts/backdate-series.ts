/**
 * One-off repair: the seed scripts originally anchored publishedAt to a fixed
 * base date and stepped FORWARD two days per part, so every essay in a long
 * series landed months in the future (the numerology finale sat in Oct 2027) and
 * therefore never appeared as published content.
 *
 * The seed scripts now walk backwards from "now" instead. This script applies the
 * same rule to the rows already in the database: the final part of each series
 * lands one day ago, and each earlier part steps two days further into the past,
 * preserving series order.
 *
 * Run with: npx tsx scripts/backdate-series.ts
 * Idempotent — safe to re-run; it just recomputes the same dates.
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

const PART_INTERVAL_MS = 2 * 24 * 60 * 60 * 1000;

async function main() {
  const now = Date.now();
  const seriesEnd = now - 24 * 60 * 60 * 1000; // newest part: yesterday

  const allSeries = await prisma.series.findMany({ select: { id: true, slug: true, title: true } });

  for (const s of allSeries) {
    const parts = await prisma.article.findMany({
      where: { seriesId: s.id },
      orderBy: { seriesOrder: 'asc' },
      select: { id: true, seriesOrder: true },
    });
    if (!parts.length) continue;

    const last = parts[parts.length - 1].seriesOrder!;
    let changed = 0;

    for (const p of parts) {
      const publishedAt = new Date(seriesEnd - (last - p.seriesOrder!) * PART_INTERVAL_MS);
      await prisma.article.update({ where: { id: p.id }, data: { publishedAt } });
      changed++;
    }

    const first = new Date(seriesEnd - (last - parts[0].seriesOrder!) * PART_INTERVAL_MS);
    console.log(
      `${s.slug}: ${changed} parts → ${first.toISOString().slice(0, 10)} … ${new Date(seriesEnd).toISOString().slice(0, 10)}`,
    );
  }

  // Anything else still in the future (non-series articles) gets pulled back too.
  const strays = await prisma.article.findMany({
    where: { publishedAt: { gt: new Date(now) } },
    select: { id: true, title: true },
  });
  for (const a of strays) {
    await prisma.article.update({
      where: { id: a.id },
      data: { publishedAt: new Date(seriesEnd) },
    });
  }
  if (strays.length) console.log(`\npulled ${strays.length} stray future article(s) back to yesterday`);

  const remaining = await prisma.article.count({ where: { publishedAt: { gt: new Date() } } });
  console.log(`\narticles still dated in the future: ${remaining}`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
