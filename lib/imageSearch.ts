import axios from 'axios';

export interface ImageCandidate {
  url: string;
  thumbUrl: string;
  credit: string;
  description: string;
}

// Search Wikipedia article thumbnails — relevant, high-quality, always CC-licensed
async function searchWikipedia(query: string, limit: number): Promise<ImageCandidate[]> {
  try {
    const params = new URLSearchParams({
      action: 'query',
      generator: 'search',
      gsrsearch: query,
      gsrlimit: String(limit * 2),
      prop: 'pageimages|info',
      piprop: 'thumbnail|original',
      pithumbsize: '800',
      inprop: 'url',
      format: 'json',
      origin: '*',
    });

    const res = await axios.get(`https://en.wikipedia.org/w/api.php?${params}`, { timeout: 10000 });
    const pages = Object.values((res.data?.query?.pages ?? {}) as Record<string, {
      title: string;
      thumbnail?: { source: string };
      original?: { source: string };
    }>);

    const results: ImageCandidate[] = [];
    for (const page of pages) {
      const src = page.original?.source ?? page.thumbnail?.source;
      if (!src) continue;
      const ext = src.split('?')[0].split('.').pop()?.toLowerCase() ?? '';
      if (!['jpg', 'jpeg', 'png', 'webp'].includes(ext)) continue;
      results.push({
        url: src,
        thumbUrl: page.thumbnail?.source ?? src,
        credit: `Wikipedia — "${page.title}"`,
        description: page.title,
      });
      if (results.length >= limit) break;
    }
    return results;
  } catch {
    return [];
  }
}

// Search Openverse (Creative Commons) — broad CC-licensed image index
async function searchOpenverse(query: string, limit: number): Promise<ImageCandidate[]> {
  try {
    const params = new URLSearchParams({
      q: query,
      license_type: 'commercial',
      mature: 'false',
      page_size: String(limit),
    });

    const res = await axios.get(`https://api.openverse.org/v1/images/?${params}`, {
      timeout: 10000,
      headers: { 'User-Agent': 'Catzye/1.0 (news aggregator; contact via GitHub)' },
    });

    return (res.data?.results ?? []).map((r: {
      url: string;
      thumbnail?: string;
      provider_name?: string;
      creator?: string;
      title?: string;
    }) => ({
      url: r.url,
      thumbUrl: r.thumbnail ?? r.url,
      credit: [r.provider_name, r.creator].filter(Boolean).join(' — ') || 'Openverse',
      description: r.title ?? '',
    }));
  } catch {
    return [];
  }
}

// Wikimedia Commons image file search — deep library of news-relevant media
async function searchWikimediaCommons(query: string, limit: number): Promise<ImageCandidate[]> {
  try {
    const params = new URLSearchParams({
      action: 'query',
      generator: 'search',
      gsrnamespace: '6',
      gsrsearch: query,
      gsrlimit: String(limit * 3),
      prop: 'imageinfo',
      iiprop: 'url|size|extmetadata',
      iiurlwidth: '800',
      format: 'json',
      origin: '*',
    });

    const res = await axios.get(`https://commons.wikimedia.org/w/api.php?${params}`, { timeout: 10000 });
    const pages = Object.values((res.data?.query?.pages ?? {}) as Record<string, {
      title: string;
      imageinfo?: Array<{
        url: string;
        thumburl?: string;
        extmetadata?: Record<string, { value: string }>;
      }>;
    }>);

    const results: ImageCandidate[] = [];
    for (const page of pages) {
      const info = page.imageinfo?.[0];
      if (!info) continue;
      const ext = info.url.split('?')[0].split('.').pop()?.toLowerCase() ?? '';
      if (!['jpg', 'jpeg', 'png', 'webp'].includes(ext)) continue;
      const meta = info.extmetadata ?? {};
      const creditRaw = meta.Credit?.value?.replace(/<[^>]+>/g, '').trim() ?? '';
      results.push({
        url: info.url,
        thumbUrl: info.thumburl ?? info.url,
        credit: `Wikimedia Commons${creditRaw ? ` — ${creditRaw.slice(0, 60)}` : ''}`,
        description: page.title.replace(/^File:/, '').replace(/\.[^.]+$/, ''),
      });
      if (results.length >= limit) break;
    }
    return results;
  } catch {
    return [];
  }
}

async function queryAllSources(query: string, count: number): Promise<ImageCandidate[]> {
  // Library of Congress is disabled — images were irrelevant to manga/anime topics
  const [wiki, commons, openverse, pexels, pixabay, flickr, unsplash, europeana, smithsonian, nasa, dpla] = await Promise.allSettled([
    searchWikipedia(query, 2),
    searchWikimediaCommons(query, 2),
    searchOpenverse(query, 2),
    searchPexels(query, 2),
    searchPixabay(query, 2),
    searchFlickr(query, 2),
    searchUnsplash(query, 2),
    searchEuropeana(query, 2),
    searchSmithsonian(query, 2),
    searchNASA(query, 2),
    searchDPLA(query, 2),
  ]);

  const buckets = [
    wiki.status === 'fulfilled' ? wiki.value : [],
    commons.status === 'fulfilled' ? commons.value : [],
    openverse.status === 'fulfilled' ? openverse.value : [],
    pexels.status === 'fulfilled' ? pexels.value : [],
    pixabay.status === 'fulfilled' ? pixabay.value : [],
    flickr.status === 'fulfilled' ? flickr.value : [],
    unsplash.status === 'fulfilled' ? unsplash.value : [],
    europeana.status === 'fulfilled' ? europeana.value : [],
    smithsonian.status === 'fulfilled' ? smithsonian.value : [],
    nasa.status === 'fulfilled' ? nasa.value : [],
    dpla.status === 'fulfilled' ? dpla.value : [],
  ];

  const seen = new Set<string>();
  const mixed: ImageCandidate[] = [];
  for (let i = 0; mixed.length < count; i++) {
    let added = 0;
    for (const bucket of buckets) {
      if (mixed.length >= count) break;
      if (i < bucket.length) {
        const img = bucket[i];
        if (!seen.has(img.url)) {
          seen.add(img.url);
          mixed.push(img);
          added++;
        }
      }
    }
    if (added === 0) break;
  }

  return mixed.slice(0, count);
}

// Pexels — high-quality CC photos, no attribution required (needs PEXELS_API_KEY)
async function searchPexels(query: string, limit: number): Promise<ImageCandidate[]> {
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) return [];
  try {
    const params = new URLSearchParams({ query, per_page: String(limit), orientation: 'landscape' });
    const res = await axios.get(`https://api.pexels.com/v1/search?${params}`, {
      timeout: 10000,
      headers: { Authorization: apiKey },
    });
    return (res.data?.photos ?? []).map((p: {
      src: { large: string; medium: string };
      photographer: string;
      alt?: string;
    }) => ({
      url: p.src.large,
      thumbUrl: p.src.medium,
      credit: `Pexels — ${p.photographer}`,
      description: p.alt ?? '',
    }));
  } catch {
    return [];
  }
}

// Pixabay — CC0 photos, no attribution required (needs PIXABAY_API_KEY)
async function searchPixabay(query: string, limit: number): Promise<ImageCandidate[]> {
  const apiKey = process.env.PIXABAY_API_KEY;
  if (!apiKey) return [];
  try {
    const params = new URLSearchParams({
      key: apiKey,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: String(limit),
      safesearch: 'true',
    });
    const res = await axios.get(`https://pixabay.com/api/?${params}`, { timeout: 10000 });
    return (res.data?.hits ?? []).map((h: {
      largeImageURL: string;
      webformatURL: string;
      user: string;
      tags: string;
    }) => ({
      url: h.largeImageURL,
      thumbUrl: h.webformatURL,
      credit: `Pixabay — ${h.user}`,
      description: h.tags,
    }));
  } catch {
    return [];
  }
}

// Library of Congress — keyless, public domain, strong for political/historical news
async function searchLibraryOfCongress(query: string, limit: number): Promise<ImageCandidate[]> {
  try {
    const params = new URLSearchParams({
      q: query,
      fo: 'json',
      at: 'results',
      fa: 'online-format:image',
      c: String(limit * 3),
    });
    const res = await axios.get(`https://www.loc.gov/search/?${params}`, { timeout: 10000 });
    const items: Array<{
      title?: string;
      image_url?: string[];
      url?: string;
    }> = res.data?.results ?? [];

    const results: ImageCandidate[] = [];
    for (const item of items) {
      const imgUrl = item.image_url?.[0];
      if (!imgUrl) continue;
      const ext = imgUrl.split('?')[0].split('.').pop()?.toLowerCase() ?? '';
      if (!['jpg', 'jpeg', 'png', 'webp'].includes(ext)) continue;
      results.push({
        url: imgUrl,
        thumbUrl: imgUrl,
        credit: 'Library of Congress',
        description: item.title ?? '',
      });
      if (results.length >= limit) break;
    }
    return results;
  } catch {
    return [];
  }
}

// Flickr — CC-licensed photos (needs FLICKR_API_KEY)
export async function searchFlickr(query: string, limit: number): Promise<ImageCandidate[]> {
  const apiKey = process.env.FLICKR_API_KEY;
  if (!apiKey) return [];
  try {
    const params = new URLSearchParams({
      method: 'flickr.photos.search',
      api_key: apiKey,
      text: query,
      // CC licenses: 1=BY-NC-SA, 2=BY-NC, 4=BY, 5=BY-SA, 7=No known copyright, 9=CC0, 10=PDM
      license: '4,5,7,9,10',
      content_type: '1',
      media: 'photos',
      sort: 'relevance',
      extras: 'url_z,url_l,owner_name,title',
      per_page: String(limit),
      format: 'json',
      nojsoncallback: '1',
    });
    const res = await axios.get(`https://api.flickr.com/services/rest/?${params}`, { timeout: 10000 });
    return (res.data?.photos?.photo ?? [])
      .filter((p: { url_l?: string; url_z?: string }) => p.url_l || p.url_z)
      .map((p: { url_l?: string; url_z?: string; owner_name?: string; title?: string }) => ({
        url: p.url_l ?? p.url_z!,
        thumbUrl: p.url_z ?? p.url_l!,
        credit: `Flickr — ${p.owner_name ?? 'unknown'}`,
        description: p.title ?? '',
      }));
  } catch {
    return [];
  }
}

// Unsplash — editorial-quality photos (needs UNSPLASH_ACCESS_KEY, free 50 req/hour)
async function searchUnsplash(query: string, limit: number): Promise<ImageCandidate[]> {
  const apiKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!apiKey) return [];
  try {
    const params = new URLSearchParams({
      query,
      per_page: String(limit),
      orientation: 'landscape',
    });
    const res = await axios.get(`https://api.unsplash.com/search/photos?${params}`, {
      timeout: 10000,
      headers: { Authorization: `Client-ID ${apiKey}` },
    });
    return (res.data?.results ?? []).map((p: {
      urls: { full: string; small: string };
      user: { name: string };
      alt_description?: string;
    }) => ({
      url: p.urls.full,
      thumbUrl: p.urls.small,
      credit: `Unsplash — ${p.user.name}`,
      description: p.alt_description ?? '',
    }));
  } catch {
    return [];
  }
}

// Europeana — European cultural heritage, strong Balkans/EU coverage (needs EUROPEANA_API_KEY, free)
async function searchEuropeana(query: string, limit: number): Promise<ImageCandidate[]> {
  const apiKey = process.env.EUROPEANA_API_KEY;
  if (!apiKey) return [];
  try {
    const params = new URLSearchParams({
      wskey: apiKey,
      query,
      media: 'true',
      reusability: 'open',
      rows: String(limit * 2),
      profile: 'rich',
    });
    const res = await axios.get(`https://api.europeana.eu/record/v2/search.json?${params}`, { timeout: 10000 });
    const items: Array<{
      title?: string[];
      edmIsShownBy?: string[];
      edmPreview?: string[];
      dataProvider?: string[];
    }> = res.data?.items ?? [];

    const results: ImageCandidate[] = [];
    for (const item of items) {
      const url = item.edmIsShownBy?.[0];
      if (!url) continue;
      const ext = url.split('?')[0].split('.').pop()?.toLowerCase() ?? '';
      if (!['jpg', 'jpeg', 'png', 'webp'].includes(ext)) continue;
      results.push({
        url,
        thumbUrl: item.edmPreview?.[0] ?? url,
        credit: `Europeana — ${item.dataProvider?.[0] ?? 'European cultural heritage'}`,
        description: item.title?.[0] ?? '',
      });
      if (results.length >= limit) break;
    }
    return results;
  } catch {
    return [];
  }
}

// Smithsonian Open Access — keyless, public domain, historical photos and artifacts
async function searchSmithsonian(query: string, limit: number): Promise<ImageCandidate[]> {
  try {
    const params = new URLSearchParams({
      q: query,
      rows: String(limit * 3),
      online_media_type: 'Images',
    });
    const res = await axios.get(`https://api.si.edu/openaccess/api/v1.0/search?${params}`, { timeout: 10000 });
    const rows: Array<{
      title?: string;
      content?: {
        descriptiveNonRepeating?: {
          online_media?: {
            media?: Array<{ thumbnail?: string; content?: string; type?: string }>;
          };
          data_source?: string;
        };
      };
    }> = res.data?.response?.rows ?? [];

    const results: ImageCandidate[] = [];
    for (const row of rows) {
      const media = row.content?.descriptiveNonRepeating?.online_media?.media;
      const img = media?.find((m) => m.type === 'Images' || m.thumbnail);
      if (!img?.thumbnail && !img?.content) continue;
      const url = img.content ?? img.thumbnail!;
      const ext = url.split('?')[0].split('.').pop()?.toLowerCase() ?? '';
      if (!['jpg', 'jpeg', 'png', 'webp'].includes(ext)) continue;
      results.push({
        url,
        thumbUrl: img.thumbnail ?? url,
        credit: `Smithsonian — ${row.content?.descriptiveNonRepeating?.data_source ?? 'Open Access'}`,
        description: row.title ?? '',
      });
      if (results.length >= limit) break;
    }
    return results;
  } catch {
    return [];
  }
}

// NASA Images — keyless, public domain, strong for science/climate/space news
async function searchNASA(query: string, limit: number): Promise<ImageCandidate[]> {
  try {
    const params = new URLSearchParams({ q: query, media_type: 'image' });
    const res = await axios.get(`https://images-api.nasa.gov/search?${params}`, { timeout: 10000 });
    const items: Array<{
      links?: Array<{ href: string }>;
      data?: Array<{ title?: string; description?: string }>;
    }> = res.data?.collection?.items ?? [];

    const results: ImageCandidate[] = [];
    for (const item of items) {
      const thumb = item.links?.[0]?.href;
      if (!thumb) continue;
      results.push({
        url: thumb.replace('~thumb.jpg', '~large.jpg'),
        thumbUrl: thumb,
        credit: 'NASA',
        description: item.data?.[0]?.title ?? '',
      });
      if (results.length >= limit) break;
    }
    return results;
  } catch {
    return [];
  }
}

// DPLA (Digital Public Library of America) — aggregates US archives/libraries (needs DPLA_API_KEY, free)
async function searchDPLA(query: string, limit: number): Promise<ImageCandidate[]> {
  const apiKey = process.env.DPLA_API_KEY;
  if (!apiKey) return [];
  try {
    const params = new URLSearchParams({
      q: query,
      api_key: apiKey,
      page_size: String(limit * 2),
      'sourceResource.type': 'image',
    });
    const res = await axios.get(`https://api.dp.la/v2/items?${params}`, { timeout: 10000 });
    const docs: Array<{
      object?: string;
      sourceResource?: { title?: string[] };
      dataProvider?: string;
    }> = res.data?.docs ?? [];

    const results: ImageCandidate[] = [];
    for (const doc of docs) {
      const url = doc.object;
      if (!url) continue;
      const ext = url.split('?')[0].split('.').pop()?.toLowerCase() ?? '';
      if (!['jpg', 'jpeg', 'png', 'webp'].includes(ext)) continue;
      results.push({
        url,
        thumbUrl: url,
        credit: `DPLA — ${doc.dataProvider ?? 'US Library'}`,
        description: doc.sourceResource?.title?.[0] ?? '',
      });
      if (results.length >= limit) break;
    }
    return results;
  } catch {
    return [];
  }
}

const STOPWORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'of', 'in', 'on', 'at', 'to', 'for',
  'is', 'was', 'are', 'were', 'by', 'with', 'from', 'that', 'this', 'as',
]);

// Module-level cache — survives across requests on the same warm Vercel instance
const searchCache = new Map<string, { results: ImageCandidate[]; expires: number }>();
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
const CACHE_FETCH_COUNT = 20; // always fetch more than needed so different count= values share one entry

function cacheKey(keywords: string[]): string {
  return keywords.map((k) => k.toLowerCase().trim()).sort().join('|');
}

function pruneCache() {
  if (searchCache.size < 200) return;
  const now = Date.now();
  for (const [k, v] of searchCache) {
    if (v.expires < now) searchCache.delete(k);
  }
}

export async function findImages(keywords: string[], count = 6): Promise<ImageCandidate[]> {
  // Strip stopwords from each keyword phrase, fall back to original if all stripped
  const cleaned = keywords
    .map((kw) =>
      kw.split(/\s+/).filter((w) => !STOPWORDS.has(w.toLowerCase())).join(' ').trim()
    )
    .filter(Boolean);
  const queryKeywords = cleaned.length > 0 ? cleaned : keywords;

  const key = cacheKey(queryKeywords);
  const cached = searchCache.get(key);
  if (cached && cached.expires > Date.now()) {
    return cached.results.slice(0, count);
  }

  pruneCache();

  // Try all keywords combined first
  const combined = await queryAllSources(queryKeywords.slice(0, 4).join(' '), CACHE_FETCH_COUNT);
  if (combined.length > 0) {
    searchCache.set(key, { results: combined, expires: Date.now() + CACHE_TTL_MS });
    return combined.slice(0, count);
  }

  // OR fallback: try each keyword individually, return on first hit
  for (const keyword of queryKeywords) {
    const results = await queryAllSources(keyword, CACHE_FETCH_COUNT);
    if (results.length > 0) {
      searchCache.set(key, { results, expires: Date.now() + CACHE_TTL_MS });
      return results.slice(0, count);
    }
  }

  return [];
}
