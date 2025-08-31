export function sortBy(arr, ...keys){
  const a = arr.slice();
  a.sort((x,y)=>{
    for(const k of keys){
      const dir = k.startsWith('-')? -1: 1;
      const key = k.replace(/^-/, '');
      if(x[key] < y[key]) return -1*dir;
      if(x[key] > y[key]) return 1*dir;
    }
    return 0;
  });
  return a;
}
export function viCompare(a,b){
  return new Intl.Collator('vi').compare(a,b);
}
