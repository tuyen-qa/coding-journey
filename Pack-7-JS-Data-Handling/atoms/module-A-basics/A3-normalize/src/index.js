const CAMEL = /[_-]([a-z])/g;
export function toCamel(s){ return s.replace(CAMEL, (_,c)=>c.toUpperCase()); }
export function normalizeKeys(obj){
  const out = {}; for(const [k,v] of Object.entries(obj)){ out[toCamel(k)] = v; } return out;
}
export function normalizeOrder(raw){
  const r = normalizeKeys(raw);
  return {
    id: String(r.id ?? r.orderId ?? ''),
    userId: String(r.userId ?? r.user ?? ''),
    totalCents: Number(r.totalCents ?? r.total ?? 0),
    createdAt: r.createdAt? new Date(r.createdAt) : new Date(0)
  };
}
