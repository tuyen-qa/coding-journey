export const climbStairs = (n)=>{
  if(n<=0) return 0;
  if(n<=2) return n;
  let a=1,b=2; for(let i=3;i<=n;i++){ [a,b]=[b,a+b]; } return b;
};

export const rob = (nums)=>{
  let take=0, skip=0;
  for(const x of nums){ [take, skip] = [skip + x, Math.max(skip, take)]; }
  return Math.max(take, skip);
};

export const coinChange = (coins, amount)=>{
  const INF=1e15, dp=Array(amount+1).fill(INF); dp[0]=0;
  for(const c of coins) for(let x=c;x<=amount;x++) dp[x]=Math.min(dp[x], dp[x-c]+1);
  return dp[amount] >= INF ? -1 : dp[amount];
};
