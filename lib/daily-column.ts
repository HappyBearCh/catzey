// The daily column desk, which ran for five days in July 2026 and is closed.
//
// The generator that produced the columns is gone. It wrote them to Postgres,
// and since lib/db.ts made data/*.json the published edition no reader has
// touched Postgres — so it had been writing into the void, on no schedule, in
// front of a page that told visitors a new column was on its way.
//
// What outlives it is the two constants /numerology/daily and the front page
// still cut the archive with: the columns share the "numerology" category with
// the essay series, and are told apart from it by their slug prefix.
export const DAILY_CATEGORY = 'numerology';
export const DAILY_SLUG_PREFIX = 'daily-numerology-';
