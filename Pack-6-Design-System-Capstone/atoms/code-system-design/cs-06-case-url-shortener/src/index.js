const ALPH='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
export function encode(num){
  if(num===0) return '0'; let s=''; while(num>0){ s=ALPH[num%62]+s; num=Math.floor(num/62); } return s;
}
export function decode(str){
  let n=0; for(const ch of str){ n = n*62 + ALPH.indexOf(ch); } return n;
}
