// 画数 — Japanese stroke counts, and the name divination built on them.
//
// The rest of this reference reduces titles with Pythagorean numerology, which
// for manga means reducing an English string. "Attack on Titan" is a decision
// Kodansha USA made in 2012; 進撃の巨人 is what Isayama wrote. Reading the first
// and calling the result the work's number applies a Greek system to a Japanese
// object, and the site should not do that silently.
//
// 姓名判断 (seimei handan) is the system the culture in question actually uses:
// a name is divided into five figures derived from the stroke counts of its
// characters. It is used in Japan to choose children's names and — the reason it
// belongs here — to choose pen names. A mangaka's 筆名 is a constructed thing,
// and stroke count is one of the things it is constructed around. That makes
// this the one numerological reading on the site whose subject may genuinely
// have been built with the numbers in mind.
//
// The tables below are hand-entered, because a stroke count is a fact and a
// wrong one would be a fact printed wrongly. Anything not in them is not
// guessed: a string containing an uncounted character gets no reading at all,
// and `missingCharacters` reports what would need adding.

// ── Kanji ────────────────────────────────────────────────────────────────────
// Every kanji appearing in a Japanese title or native name in data/. Shinjitai
// forms are counted as written, not as their traditional equivalents: 撃 is 15
// even though 擊 is 17, because 撃 is what is on the cover.
const KANJI_STROKES: Record<string, number> = {
  一: 1,
  人: 2,
  三: 3, 下: 3, 大: 3, 川: 3, 山: 3, 女: 3, 子: 3, 小: 3, 士: 3, 上: 3, 久: 3, 刃: 3,
  今: 4, 内: 4, 日: 4, 井: 4, 太: 4, 友: 4, 介: 4, 月: 4, 少: 4,
  世: 5, 巨: 5, 田: 5, 矢: 5, 平: 5, 本: 5, 史: 5, 弘: 5,
  年: 6, 羽: 6, 向: 6, 弐: 6,
  形: 7, 谷: 7, 沢: 7, 尾: 7, 芥: 7, 見: 7, 克: 7, 吾: 7, 村: 7, 良: 7,
  金: 8, 呪: 8, 明: 8, 呼: 8, 幸: 8, 岸: 8, 斉: 8, 宗: 8, 直: 8, 武: 8, 奈: 8,
  紀: 9, 送: 9, 風: 9, 美: 9, 屋: 9, 海: 9, 栄: 9, 郎: 9, 廻: 9, 荒: 9, 浅: 9,
  洋: 9, 建: 9, 峠: 9, 城: 9, 彦: 9, 畑: 9, 哉: 9, 保: 9,
  鬼: 10, 師: 10, 宮: 10, 浦: 10, 耕: 10, 夏: 10, 高: 10, 帯: 10, 勉: 10, 時: 10,
  進: 11, 術: 11, 鳥: 11, 野: 11, 崎: 11, 堀: 11, 瓶: 11, 冨: 11, 健: 11,
  葬: 12, 創: 12, 越: 12, 晴: 12, 雄: 12, 場: 12, 達: 12, 博: 12,
  滅: 13, 戦: 13, 誠: 13, 遠: 13, 義: 13,
  僕: 14,
  撃: 15,
  鋼: 16, 錬: 16, 薬: 16, 諫: 16, 樹: 16, 樫: 16,
  聲: 17, 駿: 17, 優: 17,
  藤: 18,
  鐘: 20,

  // Added for the numbered sets in data/numbered-sets.json, which bring in the
  // counting kanji and a good deal of Buddhist and military vocabulary.
  二: 2, 七: 2, 八: 2, 十: 2, 力: 2,
  王: 4, 五: 4, 支: 4, 天: 4, 甲: 5, 四: 5, 皇: 9,
  柱: 9, 星: 9, 念: 8, 門: 8, 団: 6, 罪: 13,
  超: 12, 新: 13, 獣: 16, 遁: 12, 影: 15, 護: 20, 廷: 7,
  隊: 12, 幻: 4, 旅: 10,
};

// ── Kana ─────────────────────────────────────────────────────────────────────
// Only the 46 base forms of each syllabary are listed. Voiced and semi-voiced
// kana are decomposed to their base plus a combining mark (NFD), and the marks
// add strokes by the standard convention: dakuten two, handakuten one. Small
// kana count as their full-size form, and the long vowel mark is one stroke.
const HIRAGANA_STROKES: Record<string, number> = {
  あ: 3, い: 2, う: 2, え: 2, お: 3,
  か: 3, き: 4, く: 1, け: 3, こ: 2,
  さ: 3, し: 1, す: 2, せ: 2, そ: 1,
  た: 4, ち: 3, つ: 1, て: 1, と: 2,
  な: 4, に: 3, ぬ: 2, ね: 2, の: 1,
  は: 3, ひ: 1, ふ: 4, へ: 1, ほ: 4,
  ま: 3, み: 2, む: 3, め: 2, も: 3,
  や: 3, ゆ: 2, よ: 2,
  ら: 2, り: 2, る: 1, れ: 2, ろ: 1,
  わ: 2, を: 3, ん: 1,
};

const KATAKANA_STROKES: Record<string, number> = {
  ア: 2, イ: 2, ウ: 3, エ: 3, オ: 3,
  カ: 2, キ: 3, ク: 2, ケ: 3, コ: 2,
  サ: 3, シ: 3, ス: 2, セ: 2, ソ: 2,
  タ: 3, チ: 3, ツ: 3, テ: 3, ト: 2,
  ナ: 2, ニ: 2, ヌ: 2, ネ: 4, ノ: 1,
  ハ: 2, ヒ: 2, フ: 1, ヘ: 1, ホ: 4,
  マ: 2, ミ: 3, ム: 2, メ: 2, モ: 3,
  ヤ: 2, ユ: 2, ヨ: 3,
  ラ: 2, リ: 2, ル: 2, レ: 1, ロ: 3,
  ワ: 2, ヲ: 3, ン: 2,
};

/** Small kana are written with the same strokes as their full-size form. */
const SMALL_TO_LARGE: Record<string, string> = {
  ぁ: 'あ', ぃ: 'い', ぅ: 'う', ぇ: 'え', ぉ: 'お',
  っ: 'つ', ゃ: 'や', ゅ: 'ゆ', ょ: 'よ', ゎ: 'わ',
  ァ: 'ア', ィ: 'イ', ゥ: 'ウ', ェ: 'エ', ォ: 'オ',
  ッ: 'ツ', ャ: 'ヤ', ュ: 'ユ', ョ: 'ヨ', ヮ: 'ワ',
  ヵ: 'カ', ヶ: 'ケ',
};

const DAKUTEN = '゙';
const HANDAKUTEN = '゚';
const CHOONPU = 'ー';
/** The iteration mark repeats the preceding character, strokes included. */
const ITERATION = '々';

// Punctuation that sits inside the kana Unicode block but is not script: the
// middle dot separating parts of a transliterated foreign name, and the double
// hyphen. Neither carries strokes.
const KANA_PUNCTUATION = new Set(['・', '゠', '、', '。', '「', '」']);

/** Characters that carry no strokes because they are not Japanese script. */
function isCountable(ch: string): boolean {
  if (KANA_PUNCTUATION.has(ch)) return false;
  return /[぀-ヿ㐀-䶿一-鿿々]/.test(ch);
}

interface CountedChar {
  ch: string;
  strokes: number;
}

export interface StrokeCount {
  /** Total strokes across every countable character. */
  total: number;
  /** Per-character working, in order, for display. */
  chars: CountedChar[];
  /** Japanese characters with no entry in the tables. Non-empty means unusable. */
  missing: string[];
  /** Characters skipped because they are not Japanese script — digits, Latin. */
  skipped: string[];
}

/**
 * Count the strokes of a Japanese string.
 *
 * Two kinds of exclusion, kept apart on purpose. `skipped` holds characters that
 * carry no strokes because they are not Japanese script — the "20" in 20世紀少年
 * is not part of its 画数 by definition. `missing` holds Japanese characters the
 * tables do not know, which is ignorance rather than definition, and any string
 * with one is refused rather than under-counted.
 */
export function countStrokes(input: string): StrokeCount {
  const chars: CountedChar[] = [];
  const missing: string[] = [];
  const skipped: string[] = [];
  let previous: CountedChar | null = null;

  for (const ch of input) {
    if (ch === ITERATION) {
      if (previous) {
        const repeated: CountedChar = { ch, strokes: previous.strokes };
        chars.push(repeated);
        previous = repeated;
      } else {
        missing.push(ch);
      }
      continue;
    }

    if (!isCountable(ch)) {
      if (ch.trim()) skipped.push(ch);
      continue;
    }

    const strokes = strokesFor(ch);
    if (strokes === null) {
      missing.push(ch);
      continue;
    }
    const counted: CountedChar = { ch, strokes };
    chars.push(counted);
    previous = counted;
  }

  return {
    total: chars.reduce((sum, c) => sum + c.strokes, 0),
    chars,
    missing,
    skipped,
  };
}

function strokesFor(ch: string): number | null {
  const kanji = KANJI_STROKES[ch];
  if (kanji !== undefined) return kanji;

  // Voiced kana decompose into a base plus a combining mark; count the base and
  // add for the mark rather than listing seventy variants.
  const decomposed = ch.normalize('NFD');
  const base = SMALL_TO_LARGE[decomposed[0]] ?? decomposed[0];
  const marks = decomposed.slice(1);

  if (base === CHOONPU) return 1;

  const kana = HIRAGANA_STROKES[base] ?? KATAKANA_STROKES[base];
  if (kana === undefined) return null;

  let total = kana;
  for (const mark of marks) {
    if (mark === DAKUTEN) total += 2;
    else if (mark === HANDAKUTEN) total += 1;
    else return null;
  }
  return total;
}

/** The Japanese characters across a set of strings that the tables lack. */
export function missingCharacters(inputs: string[]): string[] {
  const missing = new Set<string>();
  for (const input of inputs) for (const ch of countStrokes(input).missing) missing.add(ch);
  return [...missing];
}

// ── 姓名判断 ──────────────────────────────────────────────────────────────────

export interface SeimeiReading {
  /** 天格 — the surname's strokes. Inherited, so read as what was handed down. */
  tenkaku: number;
  /** 人格 — last of the surname plus first of the given name. The core figure. */
  jinkaku: number;
  /** 地格 — the given name's strokes. What was chosen for the person. */
  chikaku: number;
  /** 外格 — the total less the core. How the name meets people outside it. */
  gaikaku: number;
  /** 総格 — every stroke in the name. */
  soukaku: number;
  surname: string;
  given: string;
}

/**
 * The five figures of seimei handan, for a native name written "姓 名".
 *
 * Returns null unless the name splits into two parts and every character can be
 * counted — a studio name, a mononym, or a name in hangul has no surname to
 * divide from a given name, and inventing the split would be worse than
 * printing nothing.
 */
export function readName(nativeName: string): SeimeiReading | null {
  const parts = (nativeName || '').trim().split(/[\s　]+/).filter(Boolean);
  if (parts.length !== 2) return null;

  const [surname, given] = parts;
  const surnameCount = countStrokes(surname);
  const givenCount = countStrokes(given);
  if (surnameCount.missing.length > 0 || givenCount.missing.length > 0) return null;
  if (surnameCount.chars.length === 0 || givenCount.chars.length === 0) return null;

  const tenkaku = surnameCount.total;
  const chikaku = givenCount.total;
  const soukaku = tenkaku + chikaku;
  const jinkaku =
    surnameCount.chars[surnameCount.chars.length - 1].strokes + givenCount.chars[0].strokes;

  return {
    tenkaku,
    jinkaku,
    chikaku,
    gaikaku: soukaku - jinkaku,
    soukaku,
    surname,
    given,
  };
}

/**
 * The total stroke count of a work's Japanese title.
 *
 * Only 総格 applies here. The five-figure split divides a *name* into inherited
 * and chosen halves, and a title has no surname — applying it anyway would
 * repeat exactly the category error this module exists to correct.
 */
export function readTitleStrokes(japaneseTitle: string): StrokeCount | null {
  const count = countStrokes(japaneseTitle);
  if (count.missing.length > 0 || count.chars.length === 0) return null;
  return count;
}

/** The Japanese string among a work's alternate titles, if it has one. */
export function findJapaneseTitle(altTitles: string[] | null | undefined): string | null {
  return (altTitles ?? []).find((t) => /[぀-ヿ一-鿿]/.test(t)) ?? null;
}
