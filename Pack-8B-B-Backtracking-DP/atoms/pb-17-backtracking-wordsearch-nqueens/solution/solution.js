export const exist = (board, word)=>{
  const m=board.length; if(m===0) return false;
  const n=board[0].length;
  const dirs=[[1,0],[-1,0],[0,1],[0,-1]];
  const dfs=(r,c,i)=>{
    if(i===word.length) return true;
    if(r<0||r>=m||c<0||c>=n||board[r][c]!==word[i]) return false;
    const ch=board[r][c]; board[r][c]='#';
    for(const [dr,dc] of dirs) if(dfs(r+dr,c+dc,i+1)){ board[r][c]=ch; return true; }
    board[r][c]=ch; return false;
  };
  for(let r=0;r<m;r++) for(let c=0;c<n;c++) if(dfs(r,c,0)) return true;
  return false;
};

export const solveNQueens = (n)=>{
  const cols=new Set(), d1=new Set(), d2=new Set();
  const board=Array.from({length:n}, _=>Array(n).fill('.'));
  const res=[];
  const go=(r)=>{
    if(r===n){ res.push(board.map(row=>row.join(''))); return; }
    for(let c=0;c<n;c++){
      if(cols.has(c)||d1.has(r-c)||d2.has(r+c)) continue;
      cols.add(c); d1.add(r-c); d2.add(r+c); board[r][c]='Q';
      go(r+1);
      board[r][c]='.'; cols.delete(c); d1.delete(r-c); d2.delete(r+c);
    }
  };
  go(0); return res;
};
