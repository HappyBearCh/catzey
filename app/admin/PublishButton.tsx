'use client';

import { useRouter } from 'next/navigation';
import { publishArticle, unpublishArticle } from './actions';

export function PublishButton({ id, published }: { id: string; published: boolean }) {
  const router = useRouter();

  async function handleClick() {
    if (published) {
      if (!confirm('Unpublish this article? It will be hidden from the site.')) return;
      await unpublishArticle(id);
    } else {
      await publishArticle(id);
    }
    router.refresh();
  }

  return published ? (
    <button
      onClick={handleClick}
      className="text-xs font-semibold text-amber-500 hover:text-amber-700"
    >
      Unpublish
    </button>
  ) : (
    <button
      onClick={handleClick}
      className="text-xs font-bold text-green-600 hover:text-green-800 bg-green-50 hover:bg-green-100 border border-green-200 px-2 py-0.5 rounded transition-colors"
    >
      ✓ Publish
    </button>
  );
}
