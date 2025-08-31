export function rollingSum(arr, w){
  const out=[]; let sum=0; const q=[];
  for(const x of arr){ q.push(x); sum+=x; if(q.length>w) sum-=q.shift(); out.push(sum); }
  return out;
}
export function movingAvg(arr, w){
  const rs = rollingSum(arr, w);
  return rs.map((s,i)=> i+1<w? s/(i+1) : s/w );
}
