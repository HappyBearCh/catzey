import Link from 'next/link';
import { createArticle, scrapeAndCreateArticle } from '../actions';
import { AdminHeader } from '../AdminHeader';
import { NewArticleForm } from './NewArticleForm';

export default function NewArticlePage() {
  async function handleScrape(formData: FormData) {
    'use server';
    const url = formData.get('url') as string;
    await scrapeAndCreateArticle(url);
  }

  async function handleCreate(formData: FormData) {
    'use server';
    await createArticle({
      title: formData.get('title') as string,
      excerpt: formData.get('excerpt') as string,
      content: formData.get('content') as string,
      category: formData.get('category') as string,
      source: formData.get('source') as string,
      sourceUrl: formData.get('sourceUrl') as string,
      imageUrl: formData.get('imageUrl') as string,
    });
  }

  return (
    <div>
      <AdminHeader />

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
          <Link href="/admin" className="hover:text-primary">Admin</Link>
          <span>›</span>
          <span>New Article</span>
        </div>

        {/* URL scraper */}
        <div className="bg-white rounded-sm shadow-sm p-6">
          <h2 className="text-base font-black mb-1">Generate from URL</h2>
          <p className="text-xs text-gray-400 mb-4">
            Paste a link to a manga or anime article — it will be scraped and rewritten automatically,
            then saved as a draft for you to review.
          </p>
          <form action={handleScrape} className="flex gap-3">
            <input
              name="url"
              type="url"
              required
              placeholder="https://animenewsnetwork.com/... or https://myanimelist.net/..."
              className="flex-1 border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="bg-primary text-white font-bold text-sm px-5 py-2 rounded-sm hover:bg-red-700 transition-colors whitespace-nowrap"
            >
              ↻ Fetch &amp; Rewrite
            </button>
          </form>
        </div>

        {/* Manual form */}
        <NewArticleForm onSubmit={handleCreate} />
      </div>
    </div>
  );
}
