export type Graph = Record<string, string[]>;
export function pathExists(g:Graph, s:string, t:string): boolean {
  const q=[s]; const seen=new Set([s]);
  while(q.length){ const u=q.shift()!; if(u===t) return true; for(const v of (g[u]||[])) if(!seen.has(v)){ seen.add(v); q.push(v); } }
  return false;
}
export function dfsOrder(g:Graph, s:string): string[] {
  const res:string[]=[]; const seen=new Set<string>();
  (function dfs(u:string){ if(seen.has(u)) return; seen.add(u); res.push(u); for(const v of (g[u]||[])) dfs(v); })(s);
  return res;
}
