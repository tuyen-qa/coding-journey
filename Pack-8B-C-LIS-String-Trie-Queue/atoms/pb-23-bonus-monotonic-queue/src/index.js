export function slidingWindowMax(nums, k){
  if(k<=0 || nums.length===0) return [];
  const dq=[]; // lưu chỉ số, đảm bảo nums[dq[0]] là max
  const res=[];
  for(let i=0;i<nums.length;i++){
    // loại những chỉ số ngoài cửa sổ
    if(dq.length && dq[0] <= i-k) dq.shift();
    // pop back những phần tử nhỏ hơn hiện tại
    while(dq.length && nums[dq[dq.length-1]] <= nums[i]) dq.pop();
    dq.push(i);
    if(i>=k-1) res.push(nums[dq[0]]);
  }
  return res;
}
