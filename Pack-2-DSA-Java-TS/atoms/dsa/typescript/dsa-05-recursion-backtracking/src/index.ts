export function factorial(n:number): number { if(n<0) throw new Error('neg'); return n<=1? 1 : n*factorial(n-1); }
export function subsets(nums:number[]): number[][] {
  const res:number[][]=[];
  const path:number[]=[];
  function bt(i:number){
    if(i===nums.length){ res.push([...path]); return; }
    bt(i+1);
    path.push(nums[i]); bt(i+1); path.pop();
  }
  bt(0); return res;
}
