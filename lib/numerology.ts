// Numerology engine for Catzye — every headline, category, and day is read
// through its numbers. Ported from the numerolo project (src/numerology.js) to
// TypeScript, extended with rich per-number meanings and editorial themes so the
// whole site can carry a numerological perspective.

// ── Pythagorean letter → number mapping ──────────────────────────────────────
const LETTER_VALUES: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
};

const VOWELS = new Set(['A', 'E', 'I', 'O', 'U']);

// ── Chaldean letter → number mapping (9 is sacred, unassigned) ────────────────
const CHALDEAN_VALUES: Record<string, number> = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, K: 2, R: 2,
  C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  E: 5, H: 5, N: 5, X: 5,
  U: 6, V: 6, W: 6,
  O: 7, Z: 7,
  F: 8, P: 8,
};

export type MasterOrDigit = number;

// ── Meanings, themes, and the full editorial profile for every number ─────────
export const NUMBER_MEANINGS: Record<number, string> = {
  1: 'Leader & Pioneer',
  2: 'Diplomat & Cooperator',
  3: 'Creative Communicator',
  4: 'Builder & Organizer',
  5: 'Freedom Seeker',
  6: 'Nurturer & Harmonizer',
  7: 'Analyst & Seeker',
  8: 'Visionary & Achiever',
  9: 'Humanitarian & Sage',
  11: 'Visionary (Master 11)',
  22: 'Master Builder (22)',
  33: 'Master Teacher (33)',
};

export interface NumberProfile {
  number: number;
  title: string; // short archetype, e.g. "Leader & Pioneer"
  keyword: string; // single word, e.g. "initiative"
  vibration: string; // one-line vibe, e.g. "beginnings, leadership, and the will to act alone"
  meaning: string; // a sentence for readers
  keywords: string[]; // tag-like descriptors
  color: string; // hex used for the number badge accent
  master?: boolean;
}

export const NUMBER_PROFILES: Record<number, NumberProfile> = {
  1: {
    number: 1,
    title: 'Leader & Pioneer',
    keyword: 'initiative',
    vibration: 'beginnings, leadership, and the will to act alone',
    meaning:
      'The 1 is the spark of a new cycle — independence, ambition, and the courage to go first. It rewards originality and self-reliance but tips into ego when it forgets everyone else.',
    keywords: ['independence', 'ambition', 'origination', 'drive', 'self-reliance'],
    color: '#ef4444',
  },
  2: {
    number: 2,
    title: 'Diplomat & Cooperator',
    keyword: 'cooperation',
    vibration: 'partnership, diplomacy, and the search for balance',
    meaning:
      'The 2 is the peacemaker — sensitive, intuitive, and attuned to others. It builds through partnership and patience, and struggles when it loses itself trying to keep everyone happy.',
    keywords: ['partnership', 'balance', 'sensitivity', 'diplomacy', 'patience'],
    color: '#f97316',
  },
  3: {
    number: 3,
    title: 'Creative Communicator',
    keyword: 'expression',
    vibration: 'communication, creativity, and the public stage',
    meaning:
      'The 3 is the storyteller — expressive, social, and endlessly creative. It shines on the public stage and scatters its gifts when it refuses to focus.',
    keywords: ['creativity', 'expression', 'joy', 'communication', 'imagination'],
    color: '#eab308',
  },
  4: {
    number: 4,
    title: 'Builder & Organizer',
    keyword: 'foundation',
    vibration: 'structure, labour, and the building of lasting systems',
    meaning:
      'The 4 is the builder — disciplined, practical, and loyal to the long game. It creates order and endurance, and hardens into rigidity when it fears change.',
    keywords: ['structure', 'discipline', 'stability', 'work', 'order'],
    color: '#22c55e',
  },
  5: {
    number: 5,
    title: 'Freedom Seeker',
    keyword: 'change',
    vibration: 'freedom, disruption, and restless movement',
    meaning:
      'The 5 is the adventurer — curious, magnetic, and allergic to routine. It thrives on change and connection, and burns out when freedom becomes mere escape.',
    keywords: ['freedom', 'change', 'adventure', 'curiosity', 'movement'],
    color: '#14b8a6',
  },
  6: {
    number: 6,
    title: 'Nurturer & Harmonizer',
    keyword: 'responsibility',
    vibration: 'care, community, and the weight of duty',
    meaning:
      'The 6 is the caretaker — warm, responsible, and devoted to home and community. It heals and harmonizes, and grows heavy when duty turns into control.',
    keywords: ['responsibility', 'care', 'harmony', 'family', 'service'],
    color: '#6366f1',
  },
  7: {
    number: 7,
    title: 'Analyst & Seeker',
    keyword: 'inquiry',
    vibration: 'analysis, secrecy, and the search for truth',
    meaning:
      'The 7 is the seeker — analytical, introspective, and drawn to the hidden. It uncovers truth through solitude, and withdraws too far when it mistrusts the world.',
    keywords: ['analysis', 'wisdom', 'introspection', 'mystery', 'truth'],
    color: '#8b5cf6',
  },
  8: {
    number: 8,
    title: 'Visionary & Achiever',
    keyword: 'power',
    vibration: 'money, authority, and the machinery of ambition',
    meaning:
      'The 8 is the executive — ambitious, capable, and built for scale. It masters money and authority, and loses its footing when power becomes the only measure.',
    keywords: ['power', 'ambition', 'authority', 'abundance', 'achievement'],
    color: '#d946ef',
  },
  9: {
    number: 9,
    title: 'Humanitarian & Sage',
    keyword: 'reckoning',
    vibration: 'endings, compassion, and the closing of cycles',
    meaning:
      'The 9 is the humanitarian — compassionate, wise, and ready to let go. It completes cycles and gives generously, and grows melancholy when it clings to what is over.',
    keywords: ['compassion', 'completion', 'wisdom', 'idealism', 'release'],
    color: '#ec4899',
  },
  11: {
    number: 11,
    title: 'Visionary (Master 11)',
    keyword: 'vision',
    vibration: 'inspiration, tension, and heightened awareness',
    meaning:
      'The Master 11 is the illuminator — intuitive, inspired, and electric. It channels vision and insight, and frays under the nervous tension of its own high voltage.',
    keywords: ['intuition', 'inspiration', 'vision', 'awareness', 'idealism'],
    color: '#a855f7',
    master: true,
  },
  22: {
    number: 22,
    title: 'Master Builder (22)',
    keyword: 'construction',
    vibration: 'grand vision made concrete and built to last',
    meaning:
      'The Master 22 is the master builder — a dreamer with blueprints, turning grand vision into lasting reality. It achieves the monumental, and stalls when the scale overwhelms it.',
    keywords: ['manifestation', 'vision', 'scale', 'legacy', 'discipline'],
    color: '#7c3aed',
    master: true,
  },
  33: {
    number: 33,
    title: 'Master Teacher (33)',
    keyword: 'service',
    vibration: 'healing, teaching, and devotion to others',
    meaning:
      'The Master 33 is the teacher — compassionate, selfless, and devoted to lifting others. It heals through love and wisdom, and risks losing itself in the needs of everyone else.',
    keywords: ['devotion', 'healing', 'teaching', 'compassion', 'selflessness'],
    color: '#c026d3',
  },
};

export function getProfile(n: number): NumberProfile {
  return NUMBER_PROFILES[n] ?? NUMBER_PROFILES[9];
}

export function getMeaning(n: number): string {
  return NUMBER_MEANINGS[n] ?? 'Unknown';
}

// ── Normalisation & reduction ─────────────────────────────────────────────────
function normalize(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toUpperCase()
    .replace(/[^A-Z]/g, '');
}

// Reduce a sum to a single digit, preserving master numbers 11, 22, 33.
export function reduce(n: number): number {
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    n = String(n)
      .split('')
      .reduce((s, d) => s + Number(d), 0);
  }
  return n;
}

// Each reduction step: 44 → [44, 8]; 11 → [11]; 29 → [29, 11].
export function reductionSteps(n: number): number[] {
  const steps = [n];
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    n = String(n)
      .split('')
      .reduce((s, d) => s + Number(d), 0);
    steps.push(n);
  }
  return steps;
}

// ── Core Pythagorean numbers ──────────────────────────────────────────────────
export function destinyNumber(name: string): number {
  const letters = normalize(name);
  if (!letters.length) return 0;
  const sum = [...letters].reduce((s, l) => s + (LETTER_VALUES[l] || 0), 0);
  return reduce(sum);
}

export function heartDesireNumber(name: string): number {
  const vowels = [...normalize(name)].filter((l) => VOWELS.has(l));
  if (!vowels.length) return 0;
  return reduce(vowels.reduce((s, l) => s + LETTER_VALUES[l], 0));
}

export function dreamNumber(name: string): number {
  const consonants = [...normalize(name)].filter((l) => !VOWELS.has(l));
  if (!consonants.length) return 0;
  return reduce(consonants.reduce((s, l) => s + LETTER_VALUES[l], 0));
}

export interface CoreNumbers {
  destiny: number;
  heartDesire: number;
  dream: number;
}

export function computeAll(name: string): CoreNumbers {
  return {
    destiny: destinyNumber(name),
    heartDesire: heartDesireNumber(name),
    dream: dreamNumber(name),
  };
}

// ── Character-by-character breakdown for display ──────────────────────────────
export interface CharCell {
  ch: string;
  letter: string | null;
  value: number;
  isVowel: boolean;
}

export interface ReducedValue {
  value: number;
  raw: number;
  steps: number[];
}

export interface Breakdown {
  chars: CharCell[];
  destiny: ReducedValue;
  heartDesire: ReducedValue;
  dream: ReducedValue;
}

export function computeBreakdown(name: string): Breakdown {
  const chars: CharCell[] = [...name].map((ch) => {
    const norm = ch.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase();
    const letter = /^[A-Z]$/.test(norm) ? norm : null;
    const value = letter ? LETTER_VALUES[letter] || 0 : 0;
    const isVowel = letter ? VOWELS.has(letter) : false;
    return { ch, letter, value, isVowel };
  });

  const letterChars = chars.filter((c) => c.letter);
  const vowelChars = letterChars.filter((c) => c.isVowel);
  const consonantChars = letterChars.filter((c) => !c.isVowel);

  const destinyRaw = letterChars.reduce((s, c) => s + c.value, 0);
  const heartRaw = vowelChars.reduce((s, c) => s + c.value, 0);
  const dreamRaw = consonantChars.reduce((s, c) => s + c.value, 0);

  return {
    chars,
    destiny: { value: reduce(destinyRaw), raw: destinyRaw, steps: reductionSteps(destinyRaw) },
    heartDesire: { value: reduce(heartRaw), raw: heartRaw, steps: reductionSteps(heartRaw) },
    dream: { value: reduce(dreamRaw), raw: dreamRaw, steps: reductionSteps(dreamRaw) },
  };
}

// ── Chaldean numbers ──────────────────────────────────────────────────────────
export interface ChaldeanNumbers {
  compound: number;
  destiny: number;
  heartDesire: number;
  dream: number;
}

export function computeChaldean(name: string): ChaldeanNumbers {
  const letters = normalize(name);
  if (!letters.length) return { compound: 0, destiny: 0, heartDesire: 0, dream: 0 };
  const all = [...letters];
  const vowels = all.filter((l) => VOWELS.has(l));
  const cons = all.filter((l) => !VOWELS.has(l));
  const destRaw = all.reduce((s, l) => s + (CHALDEAN_VALUES[l] || 0), 0);
  const heartRaw = vowels.reduce((s, l) => s + (CHALDEAN_VALUES[l] || 0), 0);
  const dreamRaw = cons.reduce((s, l) => s + (CHALDEAN_VALUES[l] || 0), 0);
  return {
    compound: destRaw,
    destiny: reduce(destRaw),
    heartDesire: reduce(heartRaw),
    dream: reduce(dreamRaw),
  };
}

// ── The article / headline reading ────────────────────────────────────────────
export interface Reading {
  title: string;
  destiny: number;
  heartDesire: number;
  dream: number;
  chaldean: number;
  profile: NumberProfile;
  breakdown: Breakdown;
}

// The full numerological reading of any string (a headline, a title, a name).
export function readTitle(title: string): Reading {
  const core = computeAll(title);
  const chaldean = computeChaldean(title);
  return {
    title,
    destiny: core.destiny,
    heartDesire: core.heartDesire,
    dream: core.dream,
    chaldean: chaldean.destiny,
    profile: getProfile(core.destiny),
    breakdown: computeBreakdown(title),
  };
}

// ── The day's number ──────────────────────────────────────────────────────────
// The Universal Day number: sum the digits of the full calendar date and reduce.
export function universalDayNumber(date: Date = new Date()): number {
  const y = date.getUTCFullYear();
  const m = date.getUTCMonth() + 1;
  const d = date.getUTCDate();
  const digits = `${y}${m}${d}`
    .split('')
    .reduce((s, ch) => s + Number(ch), 0);
  return reduce(digits);
}

export interface TodaysNumber {
  number: number;
  profile: NumberProfile;
  dateLabel: string;
  dateKey: string;
}

export function getTodaysNumber(date: Date = new Date()): TodaysNumber {
  const number = universalDayNumber(date);
  return {
    number,
    profile: getProfile(number),
    dateLabel: date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    }),
    dateKey: [
      date.getUTCFullYear(),
      String(date.getUTCMonth() + 1).padStart(2, '0'),
      String(date.getUTCDate()).padStart(2, '0'),
    ].join('-'),
  };
}

// Does a headline "vibrate" to a given number? (Destiny number match.)
export function vibratesTo(title: string, number: number): boolean {
  return destinyNumber(title) === number;
}
