export type WGraph = Record<string, Array<[string, number]>>;
export function dijkstra(g: WGraph, src: string): Record<string, number> {
  const dist: Record<string, number> = {}; const used: Record<string, boolean> = {};
  for(const v of Object.keys(g)) dist[v] = v===src? 0: Infinity;
  while(true){
    let u: string | null = null; let best=Infinity;
    for(const v of Object.keys(g)){ if(!used[v] && dist[v]<best){ best=dist[v]; u=v; } }
    if(u==null) break; used[u]=true;
    for(const [v,w] of g[u]||[]){ if(dist[u]+w < dist[v]) dist[v]=dist[u]+w; }
  }
  return dist;
}
export function lisLength(a:number[]): number {
  const tails:number[]=[];
  for(const x of a){
    let i=0, j=tails.length;
    while(i<j){ const m=(i+j>>1); if(tails[m]<x) i=m+1; else j=m; }
    tails[i]=x;
  }
  return tails.length;
}
