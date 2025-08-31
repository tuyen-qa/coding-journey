export const slidingWindowMax=(nums,k)=>{
  if(k<=0 || nums.length===0) return [];
  const dq=[], out=[];
  for(let i=0;i<nums.length;i++){
    if(dq.length && dq[0] <= i-k) dq.shift();
    while(dq.length && nums[dq[dq.length-1]] <= nums[i]) dq.pop();
    dq.push(i);
    if(i>=k-1) out.push(nums[dq[0]]);
  }
  return out;
};
