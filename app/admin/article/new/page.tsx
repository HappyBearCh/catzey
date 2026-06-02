import Link from 'next/link';
import { CATEGORIES } from '@/lib/types';
import { createArticle, scrapeAndCreateArticle } from '../../actions';
import { AdminHeader } from '../../AdminHeader';

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

        {/* ── URL scraper ── */}
        <div className="bg-white rounded-sm shadow-sm p-6">
          <h2 className="text-base font-black mb-1">Generate from URL</h2>
          <p className="text-xs text-gray-400 mb-4">
            Paste a link to a Bosnian article — it will be scraped and translated automatically, then saved as a draft for you to review.
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
          <p className="text-2xs text-gray-400 mt-2">Works best with istraga.ba and radiosarajevo.ba. Other Bosnian sites may work too.</p>
        </div>

        {/* ── Manual form ── */}
        <div className="bg-white rounded-sm shadow-sm p-6">
          <h2 className="text-base font-black mb-4">Write Manually</h2>

          <form action={handleCreate} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                Title <span className="text-primary">*</span>
              </label>
              <input
                name="title"
                required
                placeholder="Article headline"
                className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Category <span className="text-primary">*</span>
                </label>
                <select
                  name="category"
                  defaultValue="bosnia"
                  className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-primary bg-white"
                >
                  {CATEGORIES.map(({ label, slug }) => (
                    <option key={slug} value={slug}>{label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Source
                </label>
                <input
                  name="source"
                  defaultValue="Editorial"
                  className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                Image URL <span className="normal-case font-normal text-gray-400">(optional)</span>
              </label>
              <input
                name="imageUrl"
                type="url"
                placeholder="https://example.com/image.jpg"
                className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                Source URL <span className="normal-case font-normal text-gray-400">(optional)</span>
              </label>
              <input
                name="sourceUrl"
                type="url"
                placeholder="https://example.com/original"
                className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                Summary <span className="text-primary">*</span>
              </label>
              <textarea
                name="excerpt"
                rows={3}
                required
                placeholder="1-2 sentence summary shown in listings"
                className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-primary resize-y"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                Article Body <span className="text-primary">*</span>
              </label>
              <textarea
                name="content"
                rows={18}
                required
                placeholder="Full article text. Separate paragraphs with blank lines."
                className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-primary resize-y font-mono"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="bg-site-dark text-white font-bold text-sm px-5 py-2.5 rounded-sm hover:bg-gray-800 transition-colors"
              >
                Create Draft
              </button>
              <Link href="/admin" className="text-sm font-semibold text-gray-400 hover:text-gray-700">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
