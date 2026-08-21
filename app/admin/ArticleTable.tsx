'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { formatDistanceToNow, format } from 'date-fns';
import { getCategoryLabel } from '@/lib/types';
import { titleValue, getGroup } from '@/lib/number-groups';
import { PublishButton } from './PublishButton';
import { ScheduleButton } from './ScheduleButton';
import { DeleteArticleButton } from './DeleteButtons';
import { deleteArticles, publishArticles } from './actions';
import { useRouter } from 'next/navigation';

export interface AdminArticle {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  source: string;
  published: boolean;
  scheduledAt: Date | null;
  createdAt: Date;
}

interface Props {
  articles: AdminArticle[];
}

function StatusBadge({ article }: { article: AdminArticle }) {
  const isScheduled = !article.published && article.scheduledAt;
  if (article.published) {
    return (
      <span className="inline-flex items-center gap-1 text-2xs font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Live
      </span>
    );
  }
  if (isScheduled) {
    return (
      <span className="inline-flex items-center gap-1 text-2xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
        {format(new Date(article.scheduledAt!), 'MMM d, HH:mm')}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-2xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full whitespace-nowrap">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Draft
    </span>
  );
}

export function ArticleTable({ articles }: Props) {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const allSelected = articles.length > 0 && selected.size === articles.length;
  const someSelected = selected.size > 0 && !allSelected;

  const toggleAll = useCallback(() => {
    setSelected(allSelected ? new Set() : new Set(articles.map((a) => a.id)));
  }, [allSelected, articles]);

  const toggleOne = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  async function handleDeleteSelected() {
    if (!confirm(`Delete ${selected.size} selected article${selected.size !== 1 ? 's' : ''}? This cannot be undone.`)) return;
    await deleteArticles(Array.from(selected));
    setSelected(new Set());
    router.refresh();
  }

  async function handlePublishSelected() {
    if (!confirm(`Publish ${selected.size} selected article${selected.size !== 1 ? 's' : ''}?`)) return;
    await publishArticles(Array.from(selected));
    setSelected(new Set());
    router.refresh();
  }

  return (
    <>
      {selected.size > 0 && (
        <div className="flex flex-wrap items-center gap-3 px-4 py-2 bg-red-50 border-b border-red-100">
          <span className="text-xs font-semibold text-red-700">
            {selected.size} article{selected.size !== 1 ? 's' : ''} selected
          </span>
          <button
            onClick={handlePublishSelected}
            className="text-xs font-bold text-white bg-green-600 hover:bg-green-800 px-3 py-1 rounded-sm transition-colors"
          >
            ✓ Publish Selected ({selected.size})
          </button>
          <button
            onClick={handleDeleteSelected}
            className="text-xs font-bold text-white bg-red-500 hover:bg-red-700 px-3 py-1 rounded-sm transition-colors"
          >
            Delete Selected ({selected.size})
          </button>
          <button
            onClick={() => setSelected(new Set())}
            className="text-xs font-semibold text-red-400 hover:text-red-700"
          >
            Clear
          </button>
        </div>
      )}

      {/* ── Mobile card list ── */}
      <div className="md:hidden divide-y divide-gray-100">
        {articles.length === 0 && (
          <p className="px-4 py-12 text-center text-gray-400 text-sm">No articles found.</p>
        )}
        {articles.map((article) => {
          const isChecked = selected.has(article.id);
          return (
            <div
              key={article.id}
              className={`p-4 transition-colors ${isChecked ? 'bg-red-50/60' : ''}`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleOne(article.id)}
                  className="mt-0.5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-semibold text-sm leading-snug line-clamp-2 flex-1">{article.title}</p>
                    <StatusBadge article={article} />
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-1 mb-2">{article.excerpt}</p>
                  <div className="flex items-center gap-1.5 text-2xs text-gray-400 mb-3 flex-wrap">
                    <span className="inline-block bg-primary/10 text-primary font-bold uppercase tracking-wider px-1.5 py-0.5 rounded">
                      {getCategoryLabel(article.category)}
                    </span>
                    <span
                      className="inline-block border border-amber-500/40 text-amber-700 font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                      title={`Filed under ${titleValue(article.title)} — ${getGroup(titleValue(article.title)).shelf}`}
                    >
                      {titleValue(article.title)} {getGroup(titleValue(article.title)).shelf}
                    </span>
                    <span>·</span>
                    <span>{article.source}</span>
                    <span>·</span>
                    <span>{formatDistanceToNow(new Date(article.createdAt), { addSuffix: true })}</span>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <PublishButton id={article.id} published={article.published} />
                    {!article.published && (
                      <ScheduleButton id={article.id} scheduledAt={article.scheduledAt} />
                    )}
                    <Link href={`/admin/article/${article.id}`} className="text-xs font-semibold text-blue-600 hover:text-blue-800">
                      Edit
                    </Link>
                    <a href={`/admin/preview/${article.id}`} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-violet-600 hover:text-violet-800">
                      Preview ↗
                    </a>
                    {article.published && (
                      <a href={`/article/${article.slug}`} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-gray-400 hover:text-gray-700">
                        Live ↗
                      </a>
                    )}
                    <DeleteArticleButton id={article.id} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Mobile select-all bar */}
        {articles.length > 0 && (
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={allSelected}
                ref={(el) => { if (el) el.indeterminate = someSelected; }}
                onChange={toggleAll}
                className="rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
              />
              <span className="text-xs font-semibold text-gray-500">
                {allSelected ? 'Deselect all' : 'Select all'}
              </span>
            </label>
          </div>
        )}
      </div>

      {/* ── Desktop table ── */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50 text-left">
              <th className="pl-4 py-3 w-8">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => { if (el) el.indeterminate = someSelected; }}
                  onChange={toggleAll}
                  className="rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                />
              </th>
              <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-500">Title</th>
              <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-500">Status</th>
              <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-500">Display</th>
              <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-500">Category</th>
              <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-500">Shelf</th>
              <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-500">Source</th>
              <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-500">Created</th>
              <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {articles.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-12 text-center text-gray-400 text-sm">
                  No articles found.
                </td>
              </tr>
            )}
            {articles.map((article) => {
              const isChecked = selected.has(article.id);
              return (
                <tr
                  key={article.id}
                  className={`transition-colors ${
                    isChecked
                      ? 'bg-red-50/60'
                      : !article.published && article.scheduledAt
                        ? 'bg-blue-50/30 hover:bg-blue-50/50'
                        : !article.published
                          ? 'bg-amber-50/40 hover:bg-amber-50/60'
                          : 'hover:bg-gray-50'
                  }`}
                >
                  <td className="pl-4 py-3 w-8">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleOne(article.id)}
                      className="rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-3 max-w-xs">
                    <p className="font-semibold text-gray-900 line-clamp-2 leading-snug">{article.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{article.excerpt}</p>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <StatusBadge article={article} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-block bg-primary/10 text-primary text-2xs font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                      {getCategoryLabel(article.category)}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className="inline-flex items-center gap-1.5 text-2xs font-bold uppercase tracking-wider text-amber-700"
                      title={getGroup(titleValue(article.title)).tagline}
                    >
                      <span className="w-5 h-5 rounded-full border border-amber-500/50 flex items-center justify-center">
                        {titleValue(article.title)}
                      </span>
                      {getGroup(titleValue(article.title)).shelf}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500 font-medium">{article.source}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-400">
                    <span title={format(new Date(article.createdAt), 'PPP p')}>
                      {formatDistanceToNow(new Date(article.createdAt), { addSuffix: true })}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <PublishButton id={article.id} published={article.published} />
                      {!article.published && (
                        <ScheduleButton id={article.id} scheduledAt={article.scheduledAt} />
                      )}
                      <Link href={`/admin/article/${article.id}`} className="text-xs font-semibold text-blue-600 hover:text-blue-800">
                        Edit
                      </Link>
                      <a href={`/admin/preview/${article.id}`} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-violet-600 hover:text-violet-800">
                        Preview ↗
                      </a>
                      {article.published && (
                        <a href={`/article/${article.slug}`} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-gray-400 hover:text-gray-700">
                          Live ↗
                        </a>
                      )}
                      <DeleteArticleButton id={article.id} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
