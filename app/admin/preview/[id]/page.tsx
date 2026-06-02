import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { format, formatDistanceToNow } from 'date-fns';
import { prisma } from '@/lib/db';
import { getCategoryLabel } from '@/lib/types';
import { TagList } from '@/components/TagList';
import type { Article } from '@/lib/types';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PreviewPage({ params }: Props) {
  const { id } = await params;
  const article = await prisma.article.findUnique({ where: { id } });
  if (!article) notFound();

  const a = article as Article;
  const categoryLabel = getCategoryLabel(a.category);
  const contentIsHtml = a.content.trimStart().startsWith('<');
  const paragraphs = contentIsHtml
    ? []
    : a.content.split(/\n+/).map((p) => p.trim()).filter(Boolean);

  return (
    <div className="min-h-screen bg-white">
      {/* Preview banner */}
      <div className="sticky top-0 z-50 bg-amber-400 text-amber-900 px-4 py-2 flex items-center justify-between gap-4 text-sm font-bold">
        <div className="flex items-center gap-3">
          <span className="bg-amber-600 text-white px-2 py-0.5 text-xs rounded">PREVIEW</span>
          <span>
            {a.published ? 'Published' : 'Draft'} · {a.displayLang === 'both' ? 'EN + BS' : a.displayLang.toUpperCase()}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link href={`/admin/article/${id}`} className="text-amber-900 hover:text-black transition-colors text-xs">
            ← Edit Article
          </Link>
          <Link href="/admin" className="text-amber-900 hover:text-black transition-colors text-xs">
            Admin Dashboard
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-4 uppercase tracking-wider">
          <span>Home</span>
          <span>›</span>
          <span>{categoryLabel}</span>
        </nav>

        <span className="inline-block bg-primary text-white text-2xs font-black uppercase tracking-widest px-2 py-0.5 mb-3">
          {categoryLabel}
        </span>

        <h1 className="text-2xl md:text-4xl font-black leading-tight mb-4">{a.title}</h1>

        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 border-b border-site-border pb-4 mb-6">
          <time>{format(new Date(a.publishedAt), 'MMMM d, yyyy')}</time>
          <span>·</span>
          <span>{Math.max(1, Math.ceil(a.content.split(/\s+/).length / 200))} min read</span>
        </div>

        {a.imageUrl && (
          <div className="relative w-full aspect-video rounded-sm overflow-hidden mb-6">
            <Image src={a.imageUrl} alt={a.title} fill sizes="100vw" className="object-cover" />
          </div>
        )}

        <div className="article-prose text-gray-800">
          {contentIsHtml ? (
            <div dangerouslySetInnerHTML={{ __html: a.content }} />
          ) : (
            paragraphs.map((p, i) => <p key={i}>{p}</p>)
          )}
        </div>

        {a.tags.length > 0 && (
          <div className="mt-6 pt-4 border-t border-site-border">
            <TagList tags={a.tags} />
          </div>
        )}

        {a.entities.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Entities</p>
            <div className="flex flex-wrap gap-2">
              {a.entities.map((e) => (
                <span key={e} className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-sm">{e}</span>
              ))}
            </div>
          </div>
        )}

        {/* Bosnian version */}
        {(a.titleBs || a.contentBs) && (
          <div className="mt-8 pt-6 border-t border-site-border">
            <h2 className="text-sm font-black uppercase tracking-wider text-gray-400 mb-4">Bosnian Version</h2>
            {a.titleBs && <h3 className="text-xl font-black mb-3">{a.titleBs}</h3>}
            {a.excerptBs && <p className="text-gray-500 italic mb-4">{a.excerptBs}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
