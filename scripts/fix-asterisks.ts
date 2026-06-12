/**
 * One-time script: convert markdown asterisks in existing articles to HTML.
 * Run with: npx tsx scripts/fix-asterisks.ts
 */
import { PrismaClient } from '@prisma/client';
import { markdownToHtml, stripMarkdownInline } from '../lib/translator';

const prisma = new PrismaClient();

const ASTERISK_RE = /\*/;

async function main() {
  const articles = await prisma.article.findMany({
    select: { id: true, content: true, excerpt: true, pullQuote: true, editorNote: true },
  });

  let updated = 0;

  for (const article of articles) {
    const hasAsterisk =
      ASTERISK_RE.test(article.content) ||
      (article.excerpt && ASTERISK_RE.test(article.excerpt)) ||
      (article.pullQuote && ASTERISK_RE.test(article.pullQuote)) ||
      (article.editorNote && ASTERISK_RE.test(article.editorNote));

    if (!hasAsterisk) continue;

    await prisma.article.update({
      where: { id: article.id },
      data: {
        content: markdownToHtml(article.content),
        excerpt: article.excerpt ? stripMarkdownInline(article.excerpt) : undefined,
        pullQuote: article.pullQuote ? stripMarkdownInline(article.pullQuote) : undefined,
        editorNote: article.editorNote ? stripMarkdownInline(article.editorNote) : undefined,
      },
    });

    updated++;
    console.log(`[fix-asterisks] Updated: ${article.id}`);
  }

  console.log(`\nDone — updated ${updated} of ${articles.length} articles.`);
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
