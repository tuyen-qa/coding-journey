export class LRU{
  constructor(limit=100){ this.limit=limit; this.map=new Map(); }
  get(k){ if(!this.map.has(k)) return undefined; const v=this.map.get(k); this.map.delete(k); this.map.set(k,v); return v; }
  set(k,v){ if(this.map.has(k)) this.map.delete(k); this.map.set(k,v); if(this.map.size>this.limit){ const first=this.map.keys().next().value; this.map.delete(first); } }
}
export function ttlCache(fn, ttlMs=1000){
  const cache=new Map();
  return async (...args)=>{
    const k=JSON.stringify(args); const now=Date.now();
    const hit=cache.get(k);
    if(hit && now-hit.t<ttlMs) return hit.v;
    const v = await fn(...args);
    cache.set(k, {v, t:now}); return v;
  };
}
