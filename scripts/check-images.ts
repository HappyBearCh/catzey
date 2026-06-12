import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function classifyImage(url: string): string {
  if (url.includes('wikipedia.org') || url.includes('wikimedia.org')) return 'wikipedia/wikimedia';
  if (url.includes('openverse')) return 'openverse';
  if (url.includes('pexels')) return 'pexels';
  if (url.includes('pixabay')) return 'pixabay';
  if (url.includes('unsplash')) return 'unsplash';
  if (url.includes('flickr.com') || url.includes('staticflickr.com')) return 'flickr';
  if (url.includes('loc.gov')) return 'library-of-congress';
  if (url.includes('nasa.gov') || url.includes('images-assets.nasa')) return 'nasa';
  if (url.includes('europeana')) return 'europeana';
  if (url.includes('si.edu') || url.includes('smithsonian')) return 'smithsonian';
  if (url.includes('dp.la') || url.includes('dpla')) return 'dpla';
  if (url.includes('vercel-storage.com') || url.includes('blob.vercel')) return 'vercel-blob (mirrored from source)';
  return 'other';
}

async function main() {
  const articles = await prisma.article.findMany({
    select: { id: true, title: true, imageUrl: true, published: true },
    orderBy: { publishedAt: 'desc' },
  });

  const withImage = articles.filter(a => a.imageUrl);
  const noImage = articles.filter(a => !a.imageUrl);

  const groups: Record<string, Array<{ title: string; imageUrl: string; published: boolean }>> = {};
  for (const a of withImage) {
    const group = classifyImage(a.imageUrl!);
    (groups[group] = groups[group] ?? []).push({ title: a.title, imageUrl: a.imageUrl!, published: a.published });
  }

  console.log('=== ARTICLE IMAGE BREAKDOWN ===\n');
  console.log(`Total articles: ${articles.length}`);
  console.log(`With image: ${withImage.length}`);
  console.log(`No image: ${noImage.length}\n`);

  for (const [group, list] of Object.entries(groups).sort((a, b) => b[1].length - a[1].length)) {
    console.log(`── ${group} (${list.length}) ──`);
    for (const a of list) {
      console.log(`  [${a.published ? 'pub' : 'draft'}] ${a.title.substring(0, 70)}`);
      console.log(`         ${a.imageUrl.substring(0, 90)}`);
    }
    console.log();
  }

  if (noImage.length > 0) {
    console.log(`── no image (${noImage.length}) ──`);
    for (const a of noImage) {
      console.log(`  [${a.published ? 'pub' : 'draft'}] ${a.title.substring(0, 70)}`);
    }
  }

  await prisma.$disconnect();
}

main().catch(err => { console.error(err); process.exit(1); });
