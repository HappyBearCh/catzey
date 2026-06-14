'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/lib/types';
import { WysiwygEditor } from '@/components/admin/WysiwygEditor';
import { ImageUploader } from './ImageUploader';
import type { Article, ReviewData } from '@/lib/types';

interface Props {
  article: Article & { scheduledAt?: Date | null; published?: boolean };
  onUpdate: (formData: FormData) => Promise<void>;
}

export function EditArticleForm({ article, onUpdate }: Props) {
  const existing = article.reviewData as ReviewData | null | undefined;
  const [showReview, setShowReview] = useState(!!existing);

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
            Image
          </label>
          <ImageUploader
            currentUrl={article.imageUrl}
            currentCredit={article.imageCredit}
            articleId={article.id}
            title={article.title}
            excerpt={article.excerpt}
            category={article.category}
          />
        </div>

        <div className="border border-gray-200 rounded-sm p-5 space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
              Title
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
              Summary <span className="normal-case font-normal text-gray-400">(shown in listings)</span>
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
              Article Body
            </label>
            <WysiwygEditor name="content" defaultValue={article.content} rows={18} />
          </div>
        </div>

        {/* Chapter Review Scores */}
        <div className="border border-gray-200 rounded-sm overflow-hidden">
          <button
            type="button"
            onClick={() => setShowReview((v) => !v)}
            className="w-full flex items-center justify-between px-5 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
          >
            <span className="text-xs font-black uppercase tracking-wider text-gray-600">
              Chapter Review Scores {existing ? '✓' : '(optional)'}
            </span>
            <span className="text-gray-400 text-xs">{showReview ? '▲ Hide' : '▼ Add'}</span>
          </button>
          {showReview && (
            <div className="p-5 space-y-4">
              <p className="text-xs text-gray-400">Fill in scores to display a review scorecard on the article. Leave blank to hide.</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {(['story', 'art', 'pacing', 'characters'] as const).map((field) => (
                  <div key={field}>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1 capitalize">
                      {field} <span className="normal-case font-normal text-gray-400">(1–10)</span>
                    </label>
                    <input
                      type="number"
                      name={`review_${field}`}
                      min={0}
                      max={10}
                      step={0.5}
                      defaultValue={existing?.[field] ?? ''}
                      placeholder="—"
                      className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-primary text-center"
                    />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                    Chapter Number
                  </label>
                  <input
                    type="text"
                    name="review_chapter"
                    defaultValue={existing?.chapterNumber ?? ''}
                    placeholder="e.g. 123"
                    className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Verdict <span className="normal-case font-normal text-gray-400">(short summary)</span>
                </label>
                <textarea
                  name="review_verdict"
                  defaultValue={existing?.verdict ?? ''}
                  rows={2}
                  placeholder="A one-sentence verdict on this chapter…"
                  className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-primary resize-y"
                />
              </div>
            </div>
          )}
        </div>

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

      <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-400">
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
        <div>
          <p className="font-bold uppercase tracking-wider mb-1">Image Credit</p>
          <p className="text-gray-600">{article.imageCredit ?? <span className="italic text-gray-400">unknown</span>}</p>
        </div>
      </div>
    </div>
  );
}
