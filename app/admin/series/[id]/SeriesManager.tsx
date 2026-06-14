'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ArticleRow {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  seriesOrder: number | null;
  publishedAt: Date;
}

interface SeriesData {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  synopsis: string | null;
  status: string | null;
  genres: string[];
  externalUrl: string | null;
  topics: string[];
  articles: ArticleRow[];
}

export function SeriesManager({ series }: { series: SeriesData }) {
  const router = useRouter();
  const [topics, setTopics] = useState<string[]>(series.topics);
  const [topicsText, setTopicsText] = useState(series.topics.join('\n'));
  const [editingTopics, setEditingTopics] = useState(series.topics.length === 0);
  const [savingTopics, setSavingTopics] = useState(false);
  const [synopsis, setSynopsis] = useState(series.synopsis ?? '');
  const [status, setStatus] = useState(series.status ?? '');
  const [genresText, setGenresText] = useState((series.genres ?? []).join(', '));
  const [externalUrl, setExternalUrl] = useState(series.externalUrl ?? '');
  const [savingMeta, setSavingMeta] = useState(false);
  const [generating, setGenerating] = useState<Record<number, boolean>>({});
  const [genErrors, setGenErrors] = useState<Record<number, string>>({});

  const articleByOrder = Object.fromEntries(
    series.articles.map((a) => [a.seriesOrder, a]),
  );

  async function saveMeta() {
    setSavingMeta(true);
    const genres = genresText.split(',').map((g) => g.trim()).filter(Boolean);
    try {
      await fetch(`/api/admin/series/${series.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ synopsis: synopsis.trim(), status: status || null, genres, externalUrl: externalUrl.trim() }),
      });
      router.refresh();
    } finally {
      setSavingMeta(false);
    }
  }

  async function saveTopics() {
    setSavingTopics(true);
    const parsed = topicsText
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);
    try {
      await fetch(`/api/admin/series/${series.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topics: parsed }),
      });
      setTopics(parsed);
      setEditingTopics(false);
      router.refresh();
    } finally {
      setSavingTopics(false);
    }
  }

  async function generateEssay(topicIndex: number) {
    setGenerating((prev) => ({ ...prev, [topicIndex]: true }));
    setGenErrors((prev) => { const next = { ...prev }; delete next[topicIndex]; return next; });
    try {
      const res = await fetch('/api/admin/generate-essay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seriesId: series.id, topicIndex }),
      });
      const data = await res.json() as { articleId?: string; slug?: string; error?: string };
      if (!res.ok) throw new Error(data.error ?? 'Generation failed');
      router.refresh();
    } catch (err) {
      setGenErrors((prev) => ({ ...prev, [topicIndex]: err instanceof Error ? err.message : 'Failed' }));
    } finally {
      setGenerating((prev) => ({ ...prev, [topicIndex]: false }));
    }
  }

  async function deleteSeries() {
    if (!confirm(`Delete series "${series.title}"? Articles will be unlinked but not deleted.`)) return;
    await fetch(`/api/admin/series/${series.id}`, { method: 'DELETE' });
    router.push('/admin/series');
  }

  return (
    <div className="space-y-5">
      {/* Series metadata */}
      <div className="bg-white rounded-sm shadow-sm">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <h2 className="text-sm font-black uppercase tracking-wider">Series Info</h2>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">Synopsis</label>
            <textarea
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              rows={3}
              placeholder="Brief description of the manga/anime series for the public page…"
              className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-primary resize-y"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-primary bg-white"
              >
                <option value="">— Not set —</option>
                <option value="ongoing">Ongoing</option>
                <option value="complete">Complete</option>
                <option value="hiatus">Hiatus</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">Genres <span className="normal-case font-normal text-gray-400">(comma-separated)</span></label>
              <input
                type="text"
                value={genresText}
                onChange={(e) => setGenresText(e.target.value)}
                placeholder="Action, Fantasy, Shōnen"
                className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">External URL</label>
              <input
                type="url"
                value={externalUrl}
                onChange={(e) => setExternalUrl(e.target.value)}
                placeholder="https://..."
                className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-primary font-mono"
              />
            </div>
          </div>
          <button
            onClick={saveMeta}
            disabled={savingMeta}
            className="bg-primary text-white font-bold text-xs px-4 py-2 rounded-sm hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {savingMeta ? 'Saving…' : 'Save Info'}
          </button>
        </div>
      </div>

      {/* Topics editor */}
      <div className="bg-white rounded-sm shadow-sm">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <h2 className="text-sm font-black uppercase tracking-wider flex-1">Essay Topics</h2>
          {!editingTopics && (
            <button
              onClick={() => setEditingTopics(true)}
              className="text-xs text-gray-400 hover:text-primary transition-colors"
            >
              Edit
            </button>
          )}
        </div>

        {editingTopics ? (
          <div className="p-4 space-y-3">
            <p className="text-xs text-gray-500">One topic per line. Order = essay part number.</p>
            <textarea
              value={topicsText}
              onChange={(e) => setTopicsText(e.target.value)}
              rows={Math.max(6, topicsText.split('\n').length + 2)}
              placeholder={"History of manga from woodblock prints to digital\nManga and sexuality — from shōnen romance to gekiga\nRed-light districts in manga: Yoshiwara and beyond\nThe yakuza manga tradition\nManga and protest: political art from 1960 to today"}
              className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm font-mono focus:outline-none focus:border-primary resize-y"
            />
            <div className="flex gap-2">
              <button
                onClick={saveTopics}
                disabled={savingTopics}
                className="bg-primary text-white font-bold text-xs px-4 py-2 rounded-sm hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {savingTopics ? 'Saving…' : 'Save Topics'}
              </button>
              {topics.length > 0 && (
                <button
                  onClick={() => { setTopicsText(topics.join('\n')); setEditingTopics(false); }}
                  className="text-xs text-gray-400 hover:text-gray-700 px-3 py-2"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        ) : topics.length === 0 ? (
          <div className="p-4 text-sm text-gray-400 italic">No topics yet — click Edit to add them.</div>
        ) : (
          <div className="divide-y divide-gray-50">
            {topics.map((topic, i) => {
              const partNum = i + 1;
              const article = articleByOrder[partNum];
              const isGenerating = generating[i];
              const genError = genErrors[i];

              return (
                <div key={i} className="flex items-start gap-3 px-4 py-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 text-gray-500 text-xs font-black flex items-center justify-center mt-0.5">
                    {partNum}
                  </span>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold leading-snug">{topic}</p>
                    {article && (
                      <p className="text-2xs text-gray-400 mt-0.5 line-clamp-1 italic">{article.title}</p>
                    )}
                    {genError && <p className="text-2xs text-red-500 mt-0.5">{genError}</p>}
                  </div>

                  <div className="flex-shrink-0 flex items-center gap-2">
                    {article ? (
                      <>
                        <span className={`text-2xs font-bold px-2 py-0.5 rounded-full ${
                          article.published ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                        }`}>
                          {article.published ? 'Published' : 'Draft'}
                        </span>
                        <a
                          href={`/admin/article/${article.id}`}
                          className="text-xs font-semibold text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </a>
                        <a
                          href={`/article/${article.slug}`}
                          target="_blank"
                          className="text-xs text-gray-400 hover:text-primary"
                        >
                          View ↗
                        </a>
                      </>
                    ) : (
                      <button
                        onClick={() => generateEssay(i)}
                        disabled={isGenerating}
                        className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-sm bg-violet-50 text-violet-700 border border-violet-200 hover:bg-violet-100 transition-colors disabled:opacity-50"
                      >
                        {isGenerating ? (
                          <>
                            <span className="w-3 h-3 border-2 border-violet-300 border-t-violet-600 rounded-full animate-spin" />
                            Generating…
                          </>
                        ) : (
                          '✨ Generate Essay'
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Danger zone */}
      <div className="bg-white rounded-sm shadow-sm p-4">
        <button
          onClick={deleteSeries}
          className="text-xs text-red-400 hover:text-red-600 transition-colors"
        >
          Delete this series (articles will be unlinked)
        </button>
      </div>
    </div>
  );
}
