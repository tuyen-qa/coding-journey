export function subsets(nums){
  const res=[], cur=[];
  function dfs(i){
    if(i===nums.length){ res.push(cur.slice()); return; }
    // không chọn
    dfs(i+1);
    // chọn
    cur.push(nums[i]);
    dfs(i+1);
    cur.pop();
  }
  dfs(0);
  return res;
}

export function permuteUnique(nums){
  nums = nums.slice().sort((a,b)=>a-b);
  const used = Array(nums.length).fill(false);
  const res=[], cur=[];
  function backtrack(){
    if(cur.length===nums.length){ res.push(cur.slice()); return; }
    for(let i=0;i<nums.length;i++){
      if(used[i]) continue;
      if(i>0 && nums[i]===nums[i-1] && !used[i-1]) continue; // skip duplicate
      used[i]=true; cur.push(nums[i]);
      backtrack();
      cur.pop(); used[i]=false;
    }
  }
  backtrack();
  return res;
}
