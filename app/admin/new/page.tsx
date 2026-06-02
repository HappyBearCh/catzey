import Link from 'next/link';
import { CATEGORIES } from '@/lib/types';
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
      titleBs: (formData.get('titleBs') as string) || undefined,
      excerptBs: (formData.get('excerptBs') as string) || undefined,
      contentBs: (formData.get('contentBs') as string) || undefined,
      displayLang: (formData.get('displayLang') as string) || undefined,
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
            Paste a link to a Bosnian article — it will be scraped and translated automatically,
            then saved as a draft for you to review. The original Bosnian content is preserved for /bs.
          </p>
          <form action={handleScrape} className="flex gap-3">
            <input
              name="url"
              type="url"
              required
              placeholder="https://istraga.ba/naslov-clanka/ or https://radiosarajevo.ba/..."
              className="flex-1 border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="bg-primary text-white font-bold text-sm px-5 py-2 rounded-sm hover:bg-red-700 transition-colors whitespace-nowrap"
            >
              ↻ Fetch &amp; Translate
            </button>
          </form>
          <p className="text-2xs text-gray-400 mt-2">
            Works best with istraga.ba and radiosarajevo.ba.
          </p>
        </div>

        {/* Manual form */}
        <NewArticleForm onSubmit={handleCreate} />
      </div>
    </div>
  );
}
