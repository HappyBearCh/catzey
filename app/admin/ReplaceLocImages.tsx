'use client';

import { useRef, useState } from 'react';

interface LogLine {
  status: 'start' | 'replaced' | 'kept' | 'error' | 'done' | 'info';
  text: string;
}

export function ReplaceLocImages({ locCount }: { locCount: number }) {
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [log, setLog] = useState<LogLine[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  function append(line: LogLine) {
    setLog((prev) => [...prev, line]);
    requestAnimationFrame(() => {
      if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
    });
  }

  async function start() {
    if (running) return;
    setRunning(true);
    setDone(false);
    setLog([]);

    try {
      const res = await fetch('/api/admin/replace-loc-images', { method: 'POST' });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
        append({ status: 'error', text: data.error ?? `HTTP ${res.status}` });
        setRunning(false);
        return;
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buf = '';

      while (true) {
        const { done: streamDone, value } = await reader.read();
        if (streamDone) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split('\n');
        buf = lines.pop() ?? '';
        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const msg = JSON.parse(line) as {
              type: string;
              total?: number;
              i?: number;
              title?: string;
              status?: string;
              detail?: string;
              replaced?: number;
              kept?: number;
              errors?: number;
            };
            if (msg.type === 'start') {
              append({ status: 'start', text: `Found ${msg.total} Library of Congress images to replace…` });
            } else if (msg.type === 'progress') {
              const prefix = `[${String(msg.i).padStart(3)}/${msg.total}]`;
              const short = (msg.title ?? '').slice(0, 52);
              if (msg.status === 'replaced') {
                append({ status: 'replaced', text: `${prefix} ${short} — ${msg.detail}` });
              } else if (msg.status === 'kept') {
                append({ status: 'kept', text: `${prefix} ${short} — ${msg.detail}` });
              } else {
                append({ status: 'error', text: `${prefix} ${short} — ${msg.detail}` });
              }
            } else if (msg.type === 'done') {
              append({ status: 'done', text: `Done — replaced: ${msg.replaced}, kept LoC: ${msg.kept}, errors: ${msg.errors}` });
              setDone(true);
            }
          } catch {
            // non-JSON line, skip
          }
        }
      }
    } catch (err) {
      append({ status: 'error', text: String(err) });
    } finally {
      setRunning(false);
    }
  }

  if (locCount === 0 && !done) return null;

  return (
    <div className="bg-white rounded-sm shadow-sm border-l-4 border-orange-400">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
        <span className="w-2 h-2 rounded-full bg-orange-400" />
        <h2 className="text-sm font-black uppercase tracking-wider flex-1">
          Library of Congress Images
        </h2>
        {locCount > 0 && !done && (
          <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-0.5 rounded-full">
            {locCount} remaining
          </span>
        )}
        {done && (
          <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">
            Done
          </span>
        )}
      </div>

      <div className="px-4 py-3 flex items-center gap-4">
        <p className="text-xs text-gray-500 flex-1">
          {done
            ? 'Replacement complete. Refresh the page to see updated image credits.'
            : `${locCount} article${locCount === 1 ? '' : 's'} still use Library of Congress images. Click to replace them all with Flickr photos.`}
        </p>
        {!done && (
          <button
            onClick={start}
            disabled={running}
            className="flex-shrink-0 text-xs font-bold px-4 py-2 rounded-sm transition-colors bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white flex items-center gap-2"
          >
            {running && (
              <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            )}
            {running ? 'Replacing…' : 'Replace with Flickr'}
          </button>
        )}
      </div>

      {log.length > 0 && (
        <div
          ref={logRef}
          className="mx-4 mb-4 bg-gray-950 rounded text-2xs font-mono leading-relaxed max-h-64 overflow-y-auto p-3 space-y-0.5"
        >
          {log.map((line, i) => (
            <p
              key={i}
              className={
                line.status === 'replaced' ? 'text-green-400' :
                line.status === 'kept' ? 'text-yellow-400' :
                line.status === 'error' ? 'text-red-400' :
                line.status === 'done' ? 'text-cyan-300 font-bold' :
                'text-gray-400'
              }
            >
              {line.text}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
