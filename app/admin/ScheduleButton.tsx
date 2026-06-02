'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { scheduleArticle, unscheduleArticle } from './actions';

export function ScheduleButton({
  id,
  scheduledAt,
}: {
  id: string;
  scheduledAt: Date | null;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(
    scheduledAt ? toLocalDatetimeValue(scheduledAt) : '',
  );
  const [saving, setSaving] = useState(false);

  function toLocalDatetimeValue(d: Date) {
    const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 16);
  }

  async function handleSchedule() {
    if (!value) return;
    setSaving(true);
    await scheduleArticle(id, value);
    setSaving(false);
    setOpen(false);
    router.refresh();
  }

  async function handleUnschedule() {
    setSaving(true);
    await unscheduleArticle(id);
    setSaving(false);
    router.refresh();
  }

  if (scheduledAt) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-2xs text-blue-600 font-semibold">
          {new Date(scheduledAt).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
        </span>
        <button
          onClick={handleUnschedule}
          disabled={saving}
          className="text-2xs text-gray-400 hover:text-red-500 transition-colors"
        >
          ✕
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="text-xs font-semibold text-blue-500 hover:text-blue-700"
      >
        Schedule
      </button>

      {open && (
        <div className="absolute right-0 top-6 z-20 bg-white border border-gray-200 shadow-lg rounded-sm p-3 w-64">
          <p className="text-2xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            Publish at
          </p>
          <input
            type="datetime-local"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            min={toLocalDatetimeValue(new Date())}
            className="w-full border border-gray-200 rounded-sm px-2 py-1.5 text-xs focus:outline-none focus:border-primary mb-2"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSchedule}
              disabled={saving || !value}
              className="flex-1 bg-blue-600 text-white text-xs font-bold py-1.5 rounded-sm hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {saving ? 'Saving…' : 'Set schedule'}
            </button>
            <button
              onClick={() => setOpen(false)}
              className="text-xs text-gray-400 hover:text-gray-700 px-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
