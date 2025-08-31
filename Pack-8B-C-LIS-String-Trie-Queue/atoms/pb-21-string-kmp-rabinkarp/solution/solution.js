export const kmpSearch = (text, pat)=>{
  const n=text.length, m=pat.length;
  if(m===0) return 0;
  const lps=Array(m).fill(0);
  for(let i=1,len=0;i<m;){
    if(pat[i]===pat[len]) lps[i++]=++len;
    else if(len) len=lps[len-1];
    else lps[i++]=0;
  }
  for(let i=0,j=0;i<n;){
    if(text[i]===pat[j]){ i++; j++; if(j===m) return i-m; }
    else if(j) j=lps[j-1]; else i++;
  }
  return -1;
};

export const rabinKarp = (text, pat)=>{
  const n=text.length, m=pat.length;
  if(m===0) return 0;
  if(m>n) return -1;
  const base=257, mod=1000000007;
  let hp=0, ht=0, power=1;
  for(let i=0;i<m-1;i++) power=(power*base)%mod;
  for(let i=0;i<m;i++){ hp=(hp*base+pat.charCodeAt(i))%mod; ht=(ht*base+text.charCodeAt(i))%mod; }
  if(hp===ht && text.slice(0,m)===pat) return 0;
  for(let i=m;i<n;i++){
    ht = (ht - (text.charCodeAt(i-m)*power)%mod + mod) % mod;
    ht = (ht*base + text.charCodeAt(i)) % mod;
    const start=i-m+1;
    if(ht===hp && text.slice(start,start+m)===pat) return start;
  }
  return -1;
};
