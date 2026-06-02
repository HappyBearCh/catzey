'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/lib/types';
import { WysiwygEditor } from '@/components/admin/WysiwygEditor';
import { ImageUploader } from './ImageUploader';
import type { Article } from '@/lib/types';

interface Props {
  article: Article & { scheduledAt?: Date | null; published?: boolean; displayLang: string };
  onUpdate: (formData: FormData) => Promise<void>;
}

export function EditArticleForm({ article, onUpdate }: Props) {
  const [activeTab, setActiveTab] = useState<'en' | 'bs'>('en');

  return (
    <div className="bg-white rounded-sm shadow-sm p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-black">Edit Article</h1>
          <p className="text-xs text-gray-400 mt-1">
            Source:{' '}
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {article.sourceUrl}
            </a>
          </p>
        </div>
        <a
          href={`/article/${article.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-gray-400 hover:text-primary border border-gray-200 px-3 py-1.5 rounded-sm"
        >
          View Live ↗
        </a>
      </div>

      <form action={onUpdate} className="space-y-5">
        {/* Shared fields: Category, Slug, Image */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
              Category
            </label>
            <select
              name="category"
              defaultValue={article.category}
              className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-primary bg-white"
            >
              {CATEGORIES.map(({ label, slug }) => (
                <option key={slug} value={slug}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
              Slug <span className="normal-case font-normal text-gray-400">(URL path)</span>
            </label>
            <input
              name="slug"
              defaultValue={article.slug}
              required
              className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-primary font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
              Display on
            </label>
            <select
              name="displayLang"
              defaultValue={article.displayLang}
              className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-primary bg-white"
            >
              <option value="both">EN + BS (both)</option>
              <option value="en">English only</option>
              <option value="bs">Bosnian only</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
            Image
          </label>
          <ImageUploader
            currentUrl={article.imageUrl}
            articleId={article.id}
            title={article.title}
            excerpt={article.excerpt}
            category={article.category}
          />
        </div>

        {/* Language tabs */}
        <div className="border border-gray-200 rounded-sm overflow-hidden">
          <div className="flex border-b border-gray-200 bg-gray-50">
            <button
              type="button"
              onClick={() => setActiveTab('en')}
              className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'en'
                  ? 'bg-white text-gray-900 border-b-2 border-primary -mb-px'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('bs')}
              className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'bs'
                  ? 'bg-white text-gray-900 border-b-2 border-blue-500 -mb-px'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Bosanski (BS)
            </button>
          </div>

          <div className="p-5 space-y-5">
            {/* English fields */}
            <div className={activeTab === 'en' ? 'block space-y-5' : 'hidden'}>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Title (EN)
                </label>
                <input
                  name="title"
                  defaultValue={article.title}
                  required
                  className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Summary (EN) <span className="normal-case font-normal text-gray-400">(shown in listings)</span>
                </label>
                <textarea
                  name="excerpt"
                  defaultValue={article.excerpt}
                  rows={3}
                  required
                  className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-primary resize-y"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Article Body (EN)
                </label>
                <WysiwygEditor name="content" defaultValue={article.content} rows={18} />
              </div>
            </div>

            {/* Bosnian fields */}
            <div className={activeTab === 'bs' ? 'block space-y-5' : 'hidden'}>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Naslov (BS)
                </label>
                <input
                  name="titleBs"
                  defaultValue={article.titleBs ?? ''}
                  className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Sažetak (BS) <span className="normal-case font-normal text-gray-400">(prikazan u listama)</span>
                </label>
                <textarea
                  name="excerptBs"
                  defaultValue={article.excerptBs ?? ''}
                  rows={3}
                  className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-blue-400 resize-y"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Tekst članka (BS)
                </label>
                <WysiwygEditor name="contentBs" defaultValue={article.contentBs} rows={18} />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="bg-primary text-white font-bold text-sm px-5 py-2.5 rounded-sm hover:bg-red-700 transition-colors"
          >
            Save Changes
          </button>
          <Link
            href="/admin"
            className="text-sm font-semibold text-gray-400 hover:text-gray-700"
          >
            Cancel
          </Link>
        </div>
      </form>

      {/* Metadata */}
      <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-2 md:grid-cols-3 gap-4 text-xs text-gray-400">
        <div>
          <p className="font-bold uppercase tracking-wider mb-1">ID</p>
          <p className="font-mono text-gray-600 break-all">{article.id}</p>
        </div>
        <div>
          <p className="font-bold uppercase tracking-wider mb-1">Source</p>
          <p>{article.source}</p>
        </div>
        <div>
          <p className="font-bold uppercase tracking-wider mb-1">Published At</p>
          <p>{new Date(article.publishedAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
