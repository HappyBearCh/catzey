'use client';

import { useRouter } from 'next/navigation';
import { deleteArticle } from './actions';

export function DeleteArticleButton({ id }: { id: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm('Delete this article?')) return;
    await deleteArticle(id);
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="text-xs font-semibold text-red-400 hover:text-red-700"
    >
      Delete
    </button>
  );
}
