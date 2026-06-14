'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CATEGORIES } from '@/lib/types';

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80);
}

export function CreateSeriesForm() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('manga');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/series', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim(), slug: slug.trim() || slugify(title), description: description.trim(), category }),
      });
      const data = await res.json() as { id?: string; error?: string };
      if (!res.ok) throw new Error(data.error ?? 'Failed to create series');
      router.push(`/admin/series/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed');
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">Title</label>
          <input
            value={title}
            onChange={(e) => { setTitle(e.target.value); if (!slug) setSlug(slugify(e.target.value)); }}
            placeholder="Manga & Society"
            required
            className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">Slug</label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="manga-and-society"
            className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm font-mono focus:outline-none focus:border-primary"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm bg-white focus:outline-none focus:border-primary"
          >
            {CATEGORIES.map(({ slug, label }) => (
              <option key={slug} value={slug}>{label}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
          Description <span className="normal-case font-normal text-gray-400">(shown on the series page)</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          placeholder="A deep dive into how manga has reflected and shaped Japanese society across the decades."
          className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-primary resize-y"
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={saving || !title.trim()}
        className="bg-primary text-white font-bold text-sm px-5 py-2 rounded-sm hover:bg-red-700 transition-colors disabled:opacity-50"
      >
        {saving ? 'Creating…' : 'Create Series →'}
      </button>
    </form>
  );
}
