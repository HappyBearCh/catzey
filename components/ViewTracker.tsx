'use client';

import { useEffect } from 'react';

export function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    fetch(`/api/view/${slug}`, { method: 'POST' });
  }, [slug]);
  return null;
}
