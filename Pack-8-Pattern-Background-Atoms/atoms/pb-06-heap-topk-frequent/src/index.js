class MinHeap{
  constructor(){ this.a=[]; }
  size(){ return this.a.length; }
  push(x){ this.a.push(x); this._up(this.a.length-1); }
  pop(){ const a=this.a; if(a.length===1) return a.pop(); const v=a[0]; a[0]=a.pop(); this._down(0); return v; }
  _up(i){ const a=this.a; while(i>0){ const p=(i-1)>>1; if(a[p][0] <= a[i][0]) break; [a[p],a[i]]=[a[i],a[p]]; i=p; } }
  _down(i){ const a=this.a; for(;;){ let l=i*2+1,r=l+1,m=i; if(l<a.length && a[l][0]<a[m][0]) m=l; if(r<a.length && a[r][0]<a[m][0]) m=r; if(m===i) break; [a[m],a[i]]=[a[i],a[m]]; i=m; } }
}
export function topKFrequent(nums, k){
  const freq=new Map(); for(const x of nums) freq.set(x,(freq.get(x)||0)+1);
  const h=new MinHeap();
  for(const [val,f] of freq.entries()){ h.push([f,val]); if(h.size()>k) h.pop(); }
  return h.a.map(([f,v])=>v);
}
