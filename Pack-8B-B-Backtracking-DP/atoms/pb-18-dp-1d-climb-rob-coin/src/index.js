export function climbStairs(n){
    if(n<=0) return 0;
    if(n<=2) return n;
    let a=1,b=2; // f(1)=1,f(2)=2
    for(let i=3;i<=n;i++){ const c=a+b; a=b; b=c; }
    return b;
}

export function rob(nums){
    let take=0, skip=0;
    for(const x of nums){
        const ntake = skip + x;
        const nskip = Math.max(skip, take);
        take = ntake; skip = nskip;
    }
    return Math.max(take, skip);
}

export function coinChange(coins, amount){
    const INF = 1e15;
    const dp = Array(amount+1).fill(INF);
    dp[0]=0;
    for(const c of coins){
        for(let x=c; x<=amount; x++){
            if(dp[x-c] + 1 < dp[x]) dp[x] = dp[x-c] + 1;
        }
    }
    return dp[amount] >= INF ? -1 : dp[amount];
}
