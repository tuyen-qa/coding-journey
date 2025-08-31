export function lengthOfLIS(nums){
  const tails=[];
  for(const x of nums){
    let l=0, r=tails.length;
    while(l<r){
      const m=(l+r)>>1;
      if(tails[m] < x) l=m+1; else r=m;
    }
    tails[l]=x;
  }
  return tails.length;
}
