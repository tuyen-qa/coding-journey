export function mergeSort(a:number[]): number[] {
  if(a.length<=1) return a.slice();
  const mid=Math.floor(a.length/2);
  const L=mergeSort(a.slice(0,mid)), R=mergeSort(a.slice(mid));
  const res:number[]=[]; let i=0,j=0;
  while(i<L.length && j<R.length){ if(L[i]<=R[j]) res.push(L[i++]); else res.push(R[j++]); }
  while(i<L.length) res.push(L[i++]); while(j<R.length) res.push(R[j++]); return res;
}
export function binarySearch(a:number[], x:number): number {
  let l=0,r=a.length-1;
  while(l<=r){ const m=(l+r>>1); if(a[m]===x) return m; if(a[m]<x) l=m+1; else r=m-1; }
  return -1;
}
