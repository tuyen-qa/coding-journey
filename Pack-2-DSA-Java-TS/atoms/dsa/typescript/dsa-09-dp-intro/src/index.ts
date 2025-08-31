export function fibMemo(n:number, memo:Record<number,number>={}): number {
  if(n<=1) return n;
  if(memo[n]!=null) return memo[n];
  return memo[n]=fibMemo(n-1,memo)+fibMemo(n-2,memo);
}
export function fibBottomUp(n:number): number {
  if(n<=1) return n; let a=0,b=1;
  for(let i=2;i<=n;i++){ const c=a+b; a=b; b=c; } return b;
}
export function coinChangeMin(coins:number[], amount:number): number {
  const INF=1e9; const dp=new Array(amount+1).fill(INF); dp[0]=0;
  for(const c of coins){ for(let x=c; x<=amount; x++) dp[x]=Math.min(dp[x], dp[x-c]+1); }
  return dp[amount]>=INF? -1: dp[amount];
}
