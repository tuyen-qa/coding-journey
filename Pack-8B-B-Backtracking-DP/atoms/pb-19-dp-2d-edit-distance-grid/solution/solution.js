export const minDistance = (a,b)=>{
  const m=a.length,n=b.length, dp=Array.from({length:m+1}, _=>Array(n+1).fill(0));
  for(let i=0;i<=m;i++) dp[i][0]=i;
  for(let j=0;j<=n;j++) dp[0][j]=j;
  for(let i=1;i<=m;i++) for(let j=1;j<=n;j++){
    dp[i][j] = (a[i-1]===b[j-1]) ? dp[i-1][j-1] : 1+Math.min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1]);
  }
  return dp[m][n];
};

export const uniquePathsWithObstacles = (grid)=>{
  const m=grid.length; if(m===0) return 0;
  const n=grid[0].length; const dp=Array.from({length:m}, _=>Array(n).fill(0));
  if(grid[0][0]===1) return 0; dp[0][0]=1;
  for(let i=0;i<m;i++) for(let j=0;j<n;j++){
    if(grid[i][j]===1){ dp[i][j]=0; continue; }
    if(i===0 && j===0) continue;
    dp[i][j]=(i>0?dp[i-1][j]:0) + (j>0?dp[i][j-1]:0);
  }
  return dp[m-1][n-1];
};
