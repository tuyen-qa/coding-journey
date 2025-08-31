function jaro(a,b){
  if(a===b) return 1;
  const m = Math.floor(Math.max(a.length,b.length)/2)-1;
  const aFlags=new Array(a.length).fill(false), bFlags=new Array(b.length).fill(false);
  let matches=0;
  for(let i=0;i<a.length;i++){
    const start=Math.max(0,i-m), end=Math.min(i+m+1,b.length);
    for(let j=start;j<end;j++) if(!bFlags[j] && a[i]===b[j]){ aFlags[i]=bFlags[j]=true; matches++; break; }
  }
  if(matches===0) return 0;
  let t=0, k=0;
  for(let i=0;i<a.length;i++) if(aFlags[i]){ while(!bFlags[k]) k++; if(a[i]!==b[k]) t++; k++; }
  t/=2;
  return (matches/a.length + matches/b.length + (matches - t)/matches)/3;
}
export function jaroWinkler(a,b, p=0.1){
  const j=jaro(a,b); let l=0; for(; l<Math.min(4,a.length,b.length) && a[l]===b[l]; l++);
  return j + l*p*(1-j);
}
export function reconcile(A,B, threshold=0.88){
  const out=[];
  for(const a of A){
    let best=null, score=0;
    for(const b of B){
      const s=jaroWinkler(a.name.toLowerCase(), b.name.toLowerCase());
      if(s>score){ score=s; best=b; }
    }
    if(score>=threshold) out.push({ a, b: best, score });
  } return out;
}
