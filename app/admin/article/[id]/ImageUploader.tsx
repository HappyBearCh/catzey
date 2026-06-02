'use client';

import { useRef, useState } from 'react';
import type { ImageCandidate } from '@/lib/imageSearch';

interface Props {
  currentUrl: string | null;
  articleId?: string;
  title?: string;
  excerpt?: string;
  category?: string;
}

function compressImage(file: File, maxPx = 2048, quality = 0.85): Promise<File> {
  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      let { width, height } = img;
      if (width > maxPx || height > maxPx) {
        if (width >= height) { height = Math.round(height * maxPx / width); width = maxPx; }
        else { width = Math.round(width * maxPx / height); height = maxPx; }
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d')!.drawImage(img, 0, 0, width, height);
      const outType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
      canvas.toBlob(
        (blob) => resolve(blob ? new File([blob], file.name, { type: outType }) : file),
        outType,
        quality,
      );
    };
    img.onerror = () => { URL.revokeObjectURL(objectUrl); resolve(file); };
    img.src = objectUrl;
  });
}

export function ImageUploader({ currentUrl, articleId, title, excerpt, category }: Props) {
  const [url, setUrl] = useState(currentUrl ?? '');
  const [preview, setPreview] = useState(currentUrl ?? '');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [panelOpen, setPanelOpen] = useState(false);
  const [keywords, setKeywords] = useState(
    title ? title.split(/\s+/).slice(0, 4).join(', ') : ''
  );
  const [searching, setSearching] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [candidates, setCandidates] = useState<ImageCandidate[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [genLog, setGenLog] = useState<{ time: string; ok: boolean; detail: string }[]>([]);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError(null);
    const compressed = file.type === 'image/gif' ? file : await compressImage(file);
    const form = new FormData();
    form.append('file', compressed);
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
      let data: { url?: string; error?: string };
      try {
        data = await res.json();
      } catch {
        throw new Error(`Server error (HTTP ${res.status})`);
      }
      if (!res.ok) throw new Error(data.error ?? 'Upload failed');
      setUrl(data.url!);
      setPreview(data.url!);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  function pickImage(img: ImageCandidate) {
    setUrl(img.url);
    setPreview(img.url);
    setPanelOpen(false);
    setCandidates([]);
  }

  async function handleSearch() {
    const kws = keywords.split(',').map((s) => s.trim()).filter(Boolean);
    if (!kws.length || searching) return;
    setSearching(true);
    setSearchError(null);
    try {
      const res = await fetch('/api/admin/search-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keywords: kws }),
      });
      const data = await res.json();
      setCandidates(data.images ?? []);
      if ((data.images ?? []).length === 0) setSearchError('No images found — try different keywords');
    } catch (err) {
      setSearchError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setSearching(false);
    }
  }

  async function handleGenerateImage() {
    if (!articleId || generating) return;
    setGenerating(true);
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
        // Auto-select immediately — no extra click required
        pickImage(data.image);
      } else {
        throw new Error(data.error ?? 'Generation failed');
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setGenLog((prev) => [{ time, ok: false, detail: msg }, ...prev]);
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="space-y-2">
      {/* URL input + upload + preview */}
      <div className="flex gap-3 items-start">
        <div className="flex-1 space-y-2">
          <input
            name="imageUrl"
            value={url}
            onChange={(e) => { setUrl(e.target.value); setPreview(e.target.value); }}
            placeholder="https://example.com/image.jpg"
            className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-primary"
          />
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="text-xs font-semibold bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-sm transition-colors disabled:opacity-50"
            >
              {uploading ? 'Uploading…' : '↑ Upload'}
            </button>
            <button
              type="button"
              onClick={() => { setPanelOpen((v) => !v); setCandidates([]); setSearchError(null); }}
              className={`text-xs font-semibold px-3 py-1.5 rounded-sm transition-colors border ${
                panelOpen
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
              }`}
            >
              🔍 Find image
            </button>
            {url && (
              <button
                type="button"
                onClick={() => { setUrl(''); setPreview(''); }}
                className="text-xs text-gray-400 hover:text-red-500 transition-colors"
              >
                Remove
              </button>
            )}
            {uploadError && <span className="text-xs text-red-500">{uploadError}</span>}
          </div>
        </div>

        {preview && (
          <img
            src={preview}
            alt=""
            className="w-24 h-16 object-cover rounded-sm flex-shrink-0 border border-gray-200"
            onError={() => setPreview('')}
          />
        )}
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={handleFile}
      />

      {!url && !panelOpen && (
        <p className="text-2xs text-gray-400">No image — upload a file, paste a URL, or use Find image.</p>
      )}

      {/* Search + AI panel */}
      {panelOpen && (
        <div className="border border-gray-200 rounded-sm p-3 bg-gray-50 space-y-3">
          {/* Keyword row */}
          <div className="flex gap-2">
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleSearch())}
              placeholder="keyword1, keyword2, keyword3"
              className="flex-1 text-xs border border-gray-200 rounded px-2 py-1.5 font-mono bg-white focus:outline-none focus:border-primary"
            />
            <button
              type="button"
              onClick={handleSearch}
              disabled={searching}
              className="flex-shrink-0 text-xs font-semibold text-white bg-primary hover:bg-red-700 disabled:opacity-50 px-3 py-1.5 rounded transition-colors flex items-center gap-1.5"
            >
              {searching ? (
                <span className="animate-spin inline-block w-3 h-3 border-2 border-white/30 border-t-white rounded-full" />
              ) : 'Search'}
            </button>
            {articleId && (
              <button
                type="button"
                onClick={handleGenerateImage}
                disabled={generating}
                title="Generate image with AI — Imagen 4 Fast (~$0.02)"
                className="flex-shrink-0 text-xs font-semibold text-violet-600 hover:text-violet-800 disabled:opacity-50 px-3 py-1.5 rounded border border-violet-200 hover:border-violet-400 bg-white transition-colors flex items-center gap-1"
              >
                {generating ? (
                  <span className="animate-spin inline-block w-3 h-3 border-2 border-violet-300 border-t-violet-600 rounded-full" />
                ) : '✨ AI Generate'}
              </button>
            )}
          </div>

          {/* Generation log */}
          {genLog.length > 0 && (
            <div className="space-y-0.5">
              {genLog.map((entry, i) => (
                <p key={i} className={`text-2xs font-mono ${entry.ok ? 'text-green-700' : 'text-red-500'}`}>
                  {entry.time} {entry.ok ? '✓' : '✗'} {entry.detail}
                </p>
              ))}
            </div>
          )}

          {searchError && (
            <p className="text-2xs text-red-500">{searchError}</p>
          )}

          {/* Image grid */}
          {candidates.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {candidates.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => pickImage(img)}
                  title={`${img.credit}\n${img.description}`}
                  className="group relative flex-shrink-0 rounded overflow-hidden border-2 border-transparent hover:border-primary transition-all"
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
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
