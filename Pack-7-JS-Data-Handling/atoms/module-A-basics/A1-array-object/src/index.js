export function mapValues(obj, fn){
  const out = {}; for(const [k,v] of Object.entries(obj)) out[k] = fn(v, k); return out;
}
export function groupBy(arr, key){
  const out = {}; for(const it of arr){ const k = typeof key==='function'? key(it): it[key]; (out[k]??=([])).push(it); } return out;
}
export function deepFreeze(obj){
  Object.freeze(obj);
  for(const k of Object.getOwnPropertyNames(obj)){
    const v = obj[k]; if(v && typeof v === 'object' && !Object.isFrozen(v)) deepFreeze(v);
  } return obj;
}
