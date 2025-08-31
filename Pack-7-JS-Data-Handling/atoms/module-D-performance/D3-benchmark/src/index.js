export async function benchmark(fn, n=1e5){
  const t0=Date.now(); let x=0; for(let i=0;i<n;i++) x+=fn(i); return { ms: Date.now()-t0, x };
}
export async function compare(solutions, sizes=[1e4,5e4,1e5]){
  const out=[];
  for(const [name,fn] of solutions){
    for(const n of sizes){
      const r = await benchmark(fn, n);
      out.push({ name, n, ms: r.ms });
    }
  } return out;
}
