export function numIslands(grid){
  if(!grid || !grid.length) return 0;
  const m=grid.length, n=grid[0].length;
  const vis = Array.from({length:m}, _=>Array(n).fill(false));
  const dirs=[[1,0],[-1,0],[0,1],[0,-1]];
  let count=0;
  function bfs(sr,sc){
    const q=[[sr,sc]]; vis[sr][sc]=true;
    while(q.length){
      const [r,c]=q.shift();
      for(const [dr,dc] of dirs){
        const nr=r+dr, nc=c+dc;
        if(nr>=0&&nr<m&&nc>=0&&nc<n && !vis[nr][nc] && grid[nr][nc]===1){
          vis[nr][nc]=true; q.push([nr,nc]);
        }
      }
    }
  }
  for(let r=0;r<m;r++){
    for(let c=0;c<n;c++){
      if(grid[r][c]===1 && !vis[r][c]){ count++; bfs(r,c); }
    }
  }
  return count;
}
