/**
 * One-time script: remove N1 boilerplate text from all existing articles.
 * Run with: npx tsx scripts/clean-n1-boilerplate.ts
 */
import { PrismaClient } from '@prisma/client';
import { stripKnownBoilerplate } from '../lib/scraper';

const prisma = new PrismaClient();

async function main() {
  const articles = await prisma.article.findMany({
    select: { id: true, content: true, contentBs: true },
  });

  let updated = 0;

  for (const article of articles) {
    const cleanContent = stripKnownBoilerplate(article.content);
    const cleanContentBs = article.contentBs
      ? stripKnownBoilerplate(article.contentBs)
      : null;

    const contentChanged = cleanContent !== article.content;
    const contentBsChanged = cleanContentBs !== article.contentBs;

    if (contentChanged || contentBsChanged) {
      await prisma.article.update({
        where: { id: article.id },
        data: {
          ...(contentChanged ? { content: cleanContent } : {}),
          ...(contentBsChanged ? { contentBs: cleanContentBs } : {}),
        },
      });
      updated++;
      console.log(`Cleaned article ${article.id}`);
    }
  }

  console.log(`\nDone — cleaned ${updated} of ${articles.length} articles.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
