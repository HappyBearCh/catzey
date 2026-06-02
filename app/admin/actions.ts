'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CATEGORIES } from '@/lib/types';
import { scrapeArticleFromUrl, mirrorImageToBlob } from '@/lib/scraper';
import { summarizeAndTranslate } from '@/lib/translator';
import { postToBluesky } from '@/lib/bluesky';

function revalidateSite() {
  revalidatePath('/');
  revalidatePath('/bs', 'layout');
  for (const { slug } of CATEGORIES) {
    revalidatePath(`/${slug}`);
    revalidatePath(`/bs/${slug}`);
  }
}

export async function scrapeAndCreateArticle(url: string) {
  const raw = await scrapeArticleFromUrl(url);
  if (!raw.title || raw.content.length < 80) {
    throw new Error('Could not extract enough content from that URL.');
  }

  const exists = await prisma.article.findUnique({ where: { sourceUrl: url } });
  if (exists) {
    redirect(`/admin/article/${exists.id}`);
  }

  const processed = await summarizeAndTranslate({
    title: raw.title,
    content: raw.content,
    sourceUrl: url,
    source: raw.source,
  });

  const base = slugify(processed.title);
  let slug = base + '-' + Date.now().toString(36);
  const taken = await prisma.article.findUnique({ where: { slug } });
  if (taken) slug = slug + '-2';

  const blobImageUrl = raw.imageUrl ? await mirrorImageToBlob(raw.imageUrl) : null;

  const article = await prisma.article.create({
    data: {
      title: processed.title,
      excerpt: processed.summary,
      content: processed.content,
      titleBs: processed.titleBs,
      excerptBs: processed.summaryBs,
      contentBs: processed.contentBs,
      category: raw.category,
      source: raw.source,
      sourceUrl: url,
      imageUrl: blobImageUrl ?? raw.imageUrl ?? null,
      slug,
      publishedAt: new Date(),
      published: false,
      tags: processed.keywords,
      entities: processed.entities,
    },
  });

  revalidatePath('/admin');
  redirect(`/admin/article/${article.id}`);
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}

export async function createArticle(data: {
  title: string;
  excerpt: string;
  content: string;
  titleBs?: string;
  excerptBs?: string;
  contentBs?: string;
  displayLang?: string;
  category: string;
  source: string;
  sourceUrl: string;
  imageUrl: string;
}) {
  const validCategory = CATEGORIES.find((c) => c.slug === data.category)?.slug ?? 'manga';
  const base = slugify(data.title);
  const slug = base + '-' + Date.now().toString(36);

  const article = await prisma.article.create({
    data: {
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      titleBs: data.titleBs || null,
      excerptBs: data.excerptBs || null,
      contentBs: data.contentBs || null,
      displayLang: data.displayLang || 'both',
      category: validCategory,
      source: data.source || 'Editorial',
      sourceUrl: data.sourceUrl || `https://catzye.com/article/${slug}`,
      imageUrl: data.imageUrl || null,
      slug,
      publishedAt: new Date(),
      published: false,
    },
  });

  revalidatePath('/admin');
  revalidatePath('/');
  redirect(`/admin/article/${article.id}`);
}

export async function setArticleImage(id: string, imageUrl: string) {
  // Already on Vercel Blob — skip re-upload so ai- prefix is preserved for label detection
  const blobUrl = imageUrl.includes('blob.vercel-storage.com')
    ? imageUrl
    : await mirrorImageToBlob(imageUrl);
  await prisma.article.update({
    where: { id },
    data: { imageUrl: blobUrl ?? imageUrl },
  });
  revalidatePath('/admin');
}

export async function dismissScrapedItems(ids: string[]) {
  if (ids.length === 0) return;
  await prisma.scrapedItem.updateMany({
    where: { id: { in: ids } },
    data: { status: 'dismissed' },
  });
  revalidatePath('/admin');
}

export async function deleteScrapedItems(ids: string[]) {
  if (ids.length === 0) return;
  await prisma.scrapedItem.deleteMany({ where: { id: { in: ids } } });
  revalidatePath('/admin');
}

export async function deleteArticle(id: string) {
  await prisma.article.delete({ where: { id } });
  revalidatePath('/admin');
  revalidateSite();
}

export async function deleteArticles(ids: string[]) {
  if (ids.length === 0) return;
  await prisma.article.deleteMany({ where: { id: { in: ids } } });
  revalidatePath('/admin');
  revalidateSite();
}

export async function publishArticles(ids: string[]) {
  if (ids.length === 0) return;
  await prisma.article.updateMany({
    where: { id: { in: ids } },
    data: { published: true },
  });
  revalidatePath('/admin');
  revalidateSite();
}

export async function publishArticle(id: string) {
  const article = await prisma.article.update({
    where: { id },
    data: { published: true },
    select: { title: true, excerpt: true, slug: true },
  });
  revalidatePath('/admin');
  revalidateSite();
  // Fire-and-forget Bluesky post — don't block the publish action
  postToBluesky({ title: article.title, excerpt: article.excerpt, slug: article.slug }).catch(() => {});
}

export async function unpublishArticle(id: string) {
  await prisma.article.update({ where: { id }, data: { published: false, scheduledAt: null } });
  revalidatePath('/admin');
  revalidateSite();
}

export async function scheduleArticle(id: string, scheduledAt: string) {
  await prisma.article.update({
    where: { id },
    data: { published: false, scheduledAt: new Date(scheduledAt) },
  });
  revalidatePath('/admin');
  revalidateSite();
}

export async function unscheduleArticle(id: string) {
  await prisma.article.update({ where: { id }, data: { scheduledAt: null } });
  revalidatePath('/admin');
  revalidateSite();
}

export async function setArticleDisplayLang(id: string, displayLang: 'en' | 'bs' | 'both') {
  await prisma.article.update({ where: { id }, data: { displayLang } });
  revalidatePath('/admin');
  revalidateSite();
}

export async function updateArticle(
  id: string,
  data: {
    title: string;
    excerpt: string;
    content: string;
    titleBs?: string;
    excerptBs?: string;
    contentBs?: string;
    displayLang?: string;
    category: string;
    slug: string;
    imageUrl: string;
  },
) {
  const validCategory = CATEGORIES.find((c) => c.slug === data.category)?.slug ?? 'manga';

  const current = await prisma.article.findUnique({ where: { id }, select: { slug: true } });
  let slug = data.slug.trim().toLowerCase().replace(/[^\w-]/g, '-').replace(/-+/g, '-').slice(0, 100);
  if (!slug) slug = current?.slug ?? id;
  if (slug !== current?.slug) {
    const conflict = await prisma.article.findUnique({ where: { slug } });
    if (conflict && conflict.id !== id) slug = slug + '-2';
  }

  await prisma.article.update({
    where: { id },
    data: {
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      titleBs: data.titleBs ?? null,
      excerptBs: data.excerptBs ?? null,
      contentBs: data.contentBs ?? null,
      ...(data.displayLang ? { displayLang: data.displayLang } : {}),
      category: validCategory,
      slug,
      imageUrl: data.imageUrl || null,
    },
  });
  revalidatePath('/admin');
  revalidateSite();
  revalidatePath(`/article/${slug}`);
  revalidatePath(`/bs/article/${slug}`);
}
