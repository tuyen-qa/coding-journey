export function update(obj, path, value){
  const parts = Array.isArray(path)? path: String(path).split('.');
  if(parts.length===0) return obj;
  const [h, ...t] = parts;
  if(t.length===0) return { ...obj, [h]: value };
  return { ...obj, [h]: update(obj?.[h]??{}, t, value) };
}
export function diff(a,b){
  const out={};
  for(const k of new Set([...Object.keys(a),...Object.keys(b)])){
    if(typeof a[k]==='object' && typeof b[k]==='object'){
      const d=diff(a[k],b[k]); if(Object.keys(d).length) out[k]=d;
    } else if(a[k]!==b[k]) out[k]=b[k];
  } return out;
}
