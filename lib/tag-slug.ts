// Pure string helpers, deliberately free of any dependency (no Prisma, no
// React) so the proxy/middleware bundle can import them. The DB-backed resolver
// lives in lib/tags.ts, which re-exports everything here.

// Tags are free-form labels written by the scraper and the essay generator, so
// they arrive mixed-case, spaced, apostrophed and hyphenated ("San Diego
// Comic-Con", "Baldur's Gate 3", "sci-fi"). The URL space has to be a single
// normalised form or the same archive is reachable at several addresses — and,
// worse, most of them 404: the old scheme round-tripped a URL back to a label by
// swapping every hyphen for a space, which silently corrupted any tag that
// legitimately contained a hyphen and any tag that was not already lowercase.
//
// So the slug is the canonical identity and the stored label is only ever a
// display string. Slugging is lossy on purpose: "sci-fi" and "sci fi" collapse
// to one page rather than splitting the same topic across two thin archives.
export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    // Apostrophes vanish rather than becoming separators, so "Baldur's Gate"
    // reads as "baldurs-gate" and not "baldur-s-gate".
    .replace(/['’]/g, '')
    // \p{L}/\p{Nd} rather than [a-z0-9] so Japanese titles survive as themselves
    // instead of collapsing to an empty slug. Deliberately \p{Nd} (decimal
    // digits) and not \p{N}: the SQL mirror in lib/tags.ts uses [[:alnum:]],
    // which does not treat things like the ½ in "Ranma ½" as alphanumeric, and
    // the two definitions have to agree exactly or the slug resolves to nothing.
    .replace(/[^\p{L}\p{Nd}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
}

// Slugs may contain non-ASCII characters, so hrefs still need encoding.
export function tagHref(tag: string): string {
  return `/tag/${encodeURIComponent(tagSlug(tag))}`;
}

// Route params arrive percent-decoded, but a label that legitimately contains a
// stray '%' ("100% Cotton") makes a second decode throw. Fall back to the raw
// value rather than 500ing the page.
export function safeDecode(raw: string): string {
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}
