export function uniqueBy(arr, keyFn){
  const seen = new Set(); const out=[];
  for(const it of arr){ const k = keyFn(it); if(!seen.has(k)){ seen.add(k); out.push(it); } } return out;
}
export function memoize(fn){
  const cache = new Map();
  return (...args)=>{
    const k = JSON.stringify(args);
    if(cache.has(k)) return cache.get(k);
    const v = fn(...args); cache.set(k, v); return v;
  };
}
