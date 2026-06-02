'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import { getCategoryLabel } from '@/lib/types';
import { dismissScrapedItems, setArticleImage, deleteScrapedItems } from './actions';
import type { ImageCandidate } from '@/lib/imageSearch';

interface ScrapedItem {
  id: string;
  title: string;
  sourceUrl: string;
  source: string;
  category: string;
  imageUrl: string | null;
  scrapedAt: Date;
}

interface ProcessResult {
  succeeded: number;
  results: { articleId: string; title: string; images: ImageCandidate[]; keywords: string[] }[];
  failed: { title: string; error: string }[];
}

// ─── Image picker for one processed article ───────────────────────────────────

function ImagePicker({ articleId, title, images: initialImages, keywords: initialKeywords }: {
  articleId: string;
  title: string;
  images: ImageCandidate[];
  keywords: string[];
}) {
  const [picked, setPicked] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [keywords, setKeywords] = useState(initialKeywords.join(', '));
  const [images, setImages] = useState(initialImages);
  const [refreshing, setRefreshing] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [genLog, setGenLog] = useState<{ time: string; ok: boolean; detail: string }[]>([]);

  async function handlePick(img: ImageCandidate) {
    if (saving || done) return;
    setSaving(true);
    try {
      await setArticleImage(articleId, img.url);
      setPicked(img.url);
      setDone(true);
    } finally {
      setSaving(false);
    }
  }

  function handleSkip() {
    setDone(true);
  }

  async function handleRefreshImages() {
    const kws = keywords.split(',').map((s) => s.trim()).filter(Boolean);
    if (!kws.length || refreshing) return;
    setRefreshing(true);
    try {
      const res = await fetch('/api/admin/search-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keywords: kws }),
      });
      const data = await res.json();
      setImages(data.images ?? []);
    } finally {
      setRefreshing(false);
    }
  }

  async function handleGenerateImage() {
    if (generating || done) return;
    setGenerating(true);
    setGenerationError(null);
    const time = new Date().toLocaleTimeString();
    try {
      const res = await fetch('/api/admin/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleId }),
      });
      let data: { image?: ImageCandidate; error?: string; cost?: string; model?: string };
      try {
        data = await res.json();
      } catch {
        throw new Error(`Server error (HTTP ${res.status}) — check Vercel logs`);
      }
      if (data.image) {
        setGenLog((prev) => [{ time, ok: true, detail: `${data.model ?? 'AI'} — ${data.cost ?? '?'}` }, ...prev]);
        // Auto-save immediately — no extra click required
        setSaving(true);
        try {
          await setArticleImage(articleId, data.image.url);
          setPicked(data.image.url);
          setDone(true);
        } finally {
          setSaving(false);
        }
      } else {
        throw new Error(data.error ?? `Generation failed (HTTP ${res.status})`);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setGenerationError(msg);
      setGenLog((prev) => [{ time, ok: false, detail: msg }, ...prev]);
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="border border-gray-200 rounded-sm p-3 bg-gray-50">
      <p className="font-bold text-sm line-clamp-1 mb-2">{title}</p>

      {/* Keywords row */}
      <div className="flex items-center gap-2 mb-3">
        <label className="text-2xs font-bold uppercase tracking-wider text-gray-400 flex-shrink-0">
          Keywords
        </label>
        <input
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          disabled={done || refreshing}
          className="flex-1 text-xs border border-gray-200 rounded px-2 py-1 font-mono bg-white disabled:bg-gray-100 disabled:text-gray-400 focus:outline-none focus:border-primary"
          placeholder="keyword1, keyword2, keyword3"
        />
        <button
          onClick={handleRefreshImages}
          disabled={done || refreshing}
          className="flex-shrink-0 text-xs font-semibold text-blue-600 hover:text-blue-800 disabled:opacity-50 transition-colors px-2 py-1 border border-blue-200 rounded hover:border-blue-400 bg-white disabled:bg-gray-50"
          title="Search images with these keywords"
        >
          {refreshing ? (
            <span className="animate-spin inline-block w-3 h-3 border-2 border-blue-300 border-t-blue-600 rounded-full" />
          ) : (
            'Refresh'
          )}
        </button>
      </div>

      {done ? (
        <div className="flex items-center gap-2 text-xs">
          {picked ? (
            <>
              <img src={picked} alt="" className="w-12 h-8 object-cover rounded" />
              <span className="text-green-700 font-semibold">Image saved</span>
            </>
          ) : (
            <span className="text-gray-500">Skipped — no image</span>
          )}
          <Link href={`/admin/article/${articleId}`} className="ml-auto text-blue-600 hover:underline font-semibold">
            Edit →
          </Link>
        </div>
      ) : (
        <>
          <p className="text-2xs text-gray-500 mb-2 uppercase tracking-wider font-semibold">
            {images.length > 0 ? 'Pick an image:' : 'No images found'}
          </p>
          <div className="flex gap-2 flex-wrap">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => handlePick(img)}
                disabled={saving || refreshing}
                title={`${img.credit}\n${img.description}`}
                className="group relative flex-shrink-0 rounded overflow-hidden border-2 border-transparent hover:border-primary transition-all disabled:opacity-60"
              >
                <img
                  src={img.thumbUrl}
                  alt={img.description}
                  className="w-28 h-20 object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <div className="absolute inset-x-0 bottom-0 bg-black/70 text-white text-2xs px-1 py-0.5 truncate opacity-0 group-hover:opacity-100 transition-opacity">
                  {img.credit.split('—')[0].trim()}
                </div>
                {(saving || refreshing) && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="animate-spin inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                  </div>
                )}
              </button>
            ))}

            <button
              onClick={handleSkip}
              disabled={saving || refreshing || generating}
              className="flex-shrink-0 w-28 h-20 border-2 border-dashed border-gray-300 hover:border-gray-400 text-gray-400 hover:text-gray-600 text-xs font-semibold rounded transition-colors disabled:opacity-50"
            >
              Skip
            </button>

            <button
              onClick={handleGenerateImage}
              disabled={saving || refreshing || generating}
              title="Generate image with AI — Imagen 3 Fast (~$0.02)"
              className="flex-shrink-0 w-28 h-20 border-2 border-dashed border-violet-300 hover:border-violet-500 text-violet-500 hover:text-violet-700 text-xs font-semibold rounded transition-colors disabled:opacity-50 flex flex-col items-center justify-center gap-1"
            >
              {generating ? (
                <span className="animate-spin inline-block w-4 h-4 border-2 border-violet-300 border-t-violet-600 rounded-full" />
              ) : (
                <>
                  <span className="text-base leading-none">✨</span>
                  <span>AI Generate</span>
                </>
              )}
            </button>
          </div>
          {genLog.length > 0 && (
            <div className="mt-2 space-y-0.5">
              {genLog.map((entry, i) => (
                <p key={i} className={`text-2xs font-mono ${entry.ok ? 'text-green-700' : 'text-red-500'}`}>
                  {entry.time} {entry.ok ? '✓' : '✗'} {entry.detail}
                </p>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── Main pending items panel ─────────────────────────────────────────────────

export function PendingItems({ items }: { items: ScrapedItem[] }) {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [processing, setProcessing] = useState(false);
  const [processResult, setProcessResult] = useState<ProcessResult | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (items.length === 0) return null;

  const allSelected = selected.size === items.length;

  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(items.map((i) => i.id)));
  }

  function toggleOne(id: string) {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  }

  async function handleProcess() {
    if (selected.size === 0 || processing) return;
    setProcessing(true);
    setProcessResult(null);
    try {
      const res = await fetch('/api/admin/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: Array.from(selected) }),
      });
      const data: ProcessResult = await res.json();
      setProcessResult(data);
      setSelected(new Set());
      router.refresh();
    } catch (err) {
      setProcessResult({
        succeeded: 0,
        results: [],
        failed: [{ title: 'Request failed', error: String(err) }],
      });
    } finally {
      setProcessing(false);
    }
  }

  async function handleDismiss() {
    if (selected.size === 0 || processing) return;
    setProcessing(true);
    try {
      await dismissScrapedItems(Array.from(selected));
      setSelected(new Set());
      router.refresh();
    } finally {
      setProcessing(false);
    }
  }

  async function handleDelete() {
    if (selected.size === 0 || processing) return;
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    setConfirmDelete(false);
    setProcessing(true);
    try {
      await deleteScrapedItems(Array.from(selected));
      setSelected(new Set());
      router.refresh();
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="bg-white rounded-sm shadow-sm border-l-4 border-violet-400">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
        <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
        <h2 className="text-sm font-black uppercase tracking-wider flex-1">
          Pending — Select to Process
        </h2>
        <span className="bg-violet-100 text-violet-700 text-xs font-bold px-2 py-0.5 rounded-full">
          {items.length}
        </span>
      </div>

      {/* Action bar */}
      <div className="flex items-center gap-3 px-4 py-2 border-b border-gray-100 bg-gray-50">
        <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 cursor-pointer select-none">
          <input type="checkbox" checked={allSelected} onChange={toggleAll} className="rounded" />
          {selected.size === 0 ? 'Select all' : `${selected.size} selected`}
        </label>

        {selected.size > 0 && (
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={handleProcess}
              disabled={processing}
              className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-sm hover:bg-red-700 disabled:opacity-60 transition-colors flex items-center gap-1.5"
            >
              {processing ? (
                <>
                  <span className="animate-spin inline-block w-3 h-3 border-2 border-white/30 border-t-white rounded-full" />
                  Processing…
                </>
              ) : (
                `Process ${selected.size}`
              )}
            </button>
            <button
              onClick={handleDismiss}
              disabled={processing}
              className="text-xs font-semibold text-gray-500 hover:text-gray-700 disabled:opacity-60 transition-colors px-2 py-1.5"
            >
              Dismiss {selected.size}
            </button>
            {confirmDelete ? (
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-red-600 font-semibold">Delete permanently?</span>
                <button
                  onClick={handleDelete}
                  disabled={processing}
                  className="text-xs font-bold text-white bg-red-600 hover:bg-red-700 disabled:opacity-60 transition-colors px-2 py-1 rounded"
                >
                  Yes, delete
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={handleDelete}
                disabled={processing}
                className="text-xs font-semibold text-red-500 hover:text-red-700 disabled:opacity-60 transition-colors px-2 py-1.5"
              >
                Delete {selected.size}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Image picker results after processing */}
      {processResult && (
        <div className="px-4 py-3 border-b border-gray-100 space-y-3">
          <div className="flex items-center justify-between">
            <p className={`text-xs font-semibold ${processResult.succeeded > 0 ? 'text-green-700' : 'text-gray-500'}`}>
              {processResult.succeeded > 0
                ? `✓ ${processResult.succeeded} article${processResult.succeeded !== 1 ? 's' : ''} processed — pick an image for each`
                : 'No articles processed'}
            </p>
            {processResult.succeeded > 0 && (
              <Link href="/admin?filter=drafts" className="text-xs text-blue-600 hover:underline font-semibold">
                View all drafts →
              </Link>
            )}
          </div>

          {processResult.results.map((r) => (
            <ImagePicker
              key={r.articleId}
              articleId={r.articleId}
              title={r.title}
              images={r.images}
              keywords={r.keywords}
            />
          ))}

          {processResult.failed.map((f, i) => (
            <p key={i} className="text-xs text-red-600 font-mono break-all">
              ✗ {f.title.slice(0, 60)}: {f.error}
            </p>
          ))}
        </div>
      )}

      {/* Pending items list */}
      <div className="divide-y divide-gray-50 max-h-[480px] overflow-y-auto">
        {items.map((item) => (
          <label
            key={item.id}
            className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selected.has(item.id)}
              onChange={() => toggleOne(item.id)}
              className="mt-1 rounded flex-shrink-0"
            />
            {item.imageUrl && (
              <img src={item.imageUrl} alt="" className="w-14 h-10 object-cover rounded flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                <span className="text-2xs font-bold uppercase tracking-wider text-primary">
                  {getCategoryLabel(item.category)}
                </span>
                <span className="text-gray-300">·</span>
                <span className="text-2xs text-gray-400">{item.source}</span>
                <span className="text-gray-300">·</span>
                <span className="text-2xs text-gray-400">
                  {formatDistanceToNow(new Date(item.scrapedAt), { addSuffix: true })}
                </span>
              </div>
              <p className="font-bold text-sm leading-snug line-clamp-2">{item.title}</p>
            </div>
            <a
              href={item.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-xs text-gray-400 hover:text-primary flex-shrink-0 mt-1 transition-colors"
              title="Open original article"
            >
              ↗
            </a>
          </label>
        ))}
      </div>
    </div>
  );
}
