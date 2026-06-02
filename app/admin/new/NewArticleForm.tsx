'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/lib/types';
import { WysiwygEditor } from '@/components/admin/WysiwygEditor';

interface Props {
  onSubmit: (formData: FormData) => Promise<void>;
}

export function NewArticleForm({ onSubmit }: Props) {
  const [activeTab, setActiveTab] = useState<'en' | 'bs'>('en');

  return (
    <div className="bg-white rounded-sm shadow-sm p-6">
      <h2 className="text-base font-black mb-4">Write Manually</h2>

      <form action={onSubmit} className="space-y-5">
        {/* Shared fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
              Category <span className="text-primary">*</span>
            </label>
            <select
              name="category"
              defaultValue="manga"
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
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
              Display on
            </label>
            <select
              name="displayLang"
              defaultValue="both"
              className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-primary bg-white"
            >
              <option value="both">EN + BS (both)</option>
              <option value="en">English only</option>
              <option value="bs">Bosnian only</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                  Title (EN) <span className="text-primary">*</span>
                </label>
                <input
                  name="title"
                  required
                  placeholder="Article headline in English"
                  className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Summary (EN) <span className="text-primary">*</span>
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
                  Article Body (EN) <span className="text-primary">*</span>
                </label>
                <WysiwygEditor name="content" rows={16} />
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
                  placeholder="Naslov članka na bosanskom"
                  className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Sažetak (BS)
                </label>
                <textarea
                  name="excerptBs"
                  rows={3}
                  placeholder="Kratki sažetak prikazan u listama"
                  className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-blue-400 resize-y"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Tekst članka (BS)
                </label>
                <WysiwygEditor name="contentBs" rows={16} />
              </div>
            </div>
          </div>
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
  );
}
