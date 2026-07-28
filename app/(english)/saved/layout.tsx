import type { Metadata } from 'next';

// The saved list lives entirely in localStorage, so a crawler only ever sees an
// empty shell. Keep it out of the index (but follow its links) rather than
// letting Google file a zero-content page under the site.
export const metadata: Metadata = {
  title: 'Saved Articles',
  description: 'Articles you have bookmarked on Catzye, stored locally in your browser.',
  robots: { index: false, follow: true },
};

export default function SavedLayout({ children }: { children: React.ReactNode }) {
  return children;
}
