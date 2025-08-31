class MinHeap{
  constructor(){ this.a=[]; }
  _up(i){ const a=this.a; while(i>0){ const p=(i-1)>>1; if(a[p][0]<=a[i][0]) break; [a[p],a[i]]=[a[i],a[p]]; i=p; } }
  _down(i){ const a=this.a; for(;;){ let l=2*i+1,r=l+1,m=i; if(l<a.length && a[l][0]<a[m][0]) m=l; if(r<a.length && a[r][0]<a[m][0]) m=r; if(m===i) break; [a[m],a[i]]=[a[i],a[m]]; i=m; } }
  push(x){ this.a.push(x); this._up(this.a.length-1); }
  pop(){ const a=this.a; if(a.length===1) return a.pop(); const v=a[0]; a[0]=a.pop(); this._down(0); return v; }
  size(){ return this.a.length; }
}

export function dijkstra(n, edges, src){
  const g = Array.from({length:n}, _=>[]);
  for(const [u,v,w] of edges){ g[u].push([v,w]); g[v] && (g[v].push([u,w])); } // default coi vô hướng nếu test gán đôi chiều
  const dist = Array(n).fill(Infinity);
  dist[src]=0;
  const h=new MinHeap();
  h.push([0,src]);
  const vis = Array(n).fill(false);
  while(h.size()){
    const [d,u]=h.pop();
    if(vis[u]) continue;
    vis[u]=true;
    for(const [v,w] of g[u]){
      if(dist[v] > d + w){
        dist[v] = d + w;
        h.push([dist[v], v]);
      }
    }
  }
  return dist;
}
