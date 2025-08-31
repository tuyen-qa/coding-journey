export function topoOrder(n, edges){
  const g = Array.from({length:n}, _=>[]);
  const indeg = Array(n).fill(0);
  for(const [u,v] of edges){ g[u].push(v); indeg[v]++; }
  const q=[], order=[];
  for(let i=0;i<n;i++) if(indeg[i]===0) q.push(i);
  while(q.length){
    const u=q.shift(); order.push(u);
    for(const v of g[u]){
      if(--indeg[v]===0) q.push(v);
    }
  }
  if(order.length!==n) return null;
  return order;
}

export function hasCycleDirected(n, edges){
  const g = Array.from({length:n}, _=>[]);
  for(const [u,v] of edges) g[u].push(v);
  const color = Array(n).fill(0); // 0 white,1 gray,2 black
  let cyc=false;
  function dfs(u){
    color[u]=1;
    for(const v of g[u]){
      if(color[v]===0) dfs(v);
      else if(color[v]===1) {cyc=true; return;}
    }
    color[u]=2;
  }
  for(let i=0;i<n && !cyc;i++){
    if(color[i]===0) dfs(i);
  }
  return cyc;
}
