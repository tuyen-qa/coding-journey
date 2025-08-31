export const subsets = (nums)=>{
  const res=[], cur=[];
  const n=nums.length;
  (function dfs(i){
    if(i===n){ res.push(cur.slice()); return; }
    dfs(i+1);
    cur.push(nums[i]); dfs(i+1); cur.pop();
  })(0);
  return res;
};

export const permuteUnique = (nums)=>{
  nums = nums.slice().sort((a,b)=>a-b);
  const used=Array(nums.length).fill(false), res=[], cur=[];
  (function bt(){
    if(cur.length===nums.length){ res.push(cur.slice()); return; }
    for(let i=0;i<nums.length;i++){
      if(used[i]) continue;
      if(i>0 && nums[i]===nums[i-1] && !used[i-1]) continue;
      used[i]=true; cur.push(nums[i]);
      bt();
      cur.pop(); used[i]=false;
    }
  })();
  return res;
};
