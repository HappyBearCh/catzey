'use client';

import { useState } from 'react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return <p className="text-green-400 text-sm font-semibold">✓ You&apos;re subscribed!</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email…"
        required
        className="bg-white/10 border border-white/15 text-white placeholder-gray-400 text-xs rounded-sm px-3 py-2 focus:outline-none focus:border-white/40 w-full"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="bg-primary text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-sm hover:bg-primary-dark transition-colors disabled:opacity-50"
      >
        {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
      </button>
      {status === 'error' && (
        <p className="text-red-400 text-xs">Something went wrong. Try again.</p>
      )}
    </form>
  );
}
