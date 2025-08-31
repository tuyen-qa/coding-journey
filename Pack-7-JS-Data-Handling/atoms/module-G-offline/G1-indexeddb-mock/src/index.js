// Node mock: dùng Map thay vì IDB thực.
const store = new Map();
export const idbCache = {
  async get(k){ return store.get(k); },
  async set(k,v){ store.set(k, { v, t: Date.now() }); }
};
export async function fetchWithCache(url, fetcher, {ttlMs=1000}={}){
  const hit = await idbCache.get(url);
  if(hit && (Date.now()-hit.t) < ttlMs) return hit.v;
  const v = await fetcher(url);
  await idbCache.set(url, v);
  return v;
}
