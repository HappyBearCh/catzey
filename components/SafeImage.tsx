'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

// Article images are frequently hotlinked from third-party news domains and can
// rot (404) or fail optimization. A broken <img> is bad for UX and image SEO, so
// we degrade gracefully to a branded fallback instead of showing nothing.
export function SafeImage({
  fallback,
  ...props
}: ImageProps & { fallback: React.ReactNode }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <>{fallback}</>;
  return <Image {...props} onError={() => setFailed(true)} />;
}
