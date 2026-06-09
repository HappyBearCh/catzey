import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { updateArticle } from '../../actions';
import { AdminHeader } from '../../AdminHeader';
import { EditArticleForm } from './EditArticleForm';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params;
  const article = await prisma.article.findUnique({ where: { id } });
  if (!article) notFound();

  async function handleUpdate(formData: FormData) {
    'use server';
    await updateArticle(id, {
      title: formData.get('title') as string,
      excerpt: formData.get('excerpt') as string,
      content: formData.get('content') as string,
      category: formData.get('category') as string,
      slug: formData.get('slug') as string,
      imageUrl: formData.get('imageUrl') as string,
    });
    redirect('/admin');
  }

  return (
    <div>
      <AdminHeader />

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
          <Link href="/admin" className="hover:text-primary">Admin</Link>
          <span>›</span>
          <span>Edit Article</span>
        </div>

        <EditArticleForm article={article} onUpdate={handleUpdate} />
      </div>
    </div>
  );
}
