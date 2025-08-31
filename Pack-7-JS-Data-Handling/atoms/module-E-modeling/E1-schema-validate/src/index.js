export const t = {
  string: ()=> (v)=> typeof v==='string'? v: (()=>{ throw new Error('string'); })(),
  number: ()=> (v)=> { const n=Number(v); if(Number.isNaN(n)) throw new Error('number'); return n; },
  date: ()=> (v)=> v instanceof Date? v: new Date(v),
  object: (shape)=> (v)=>{
    const out={}; for(const [k,parser] of Object.entries(shape)){ out[k]=parser(v[k]); } return out;
  }
};
