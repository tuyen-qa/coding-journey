export async function *mapAsync(iter, fn){ for await (const x of iter) yield fn(x); }
export async function *filterAsync(iter, pred){ for await (const x of iter) if(await pred(x)) yield x; }
export async function countAsync(iter){ let n=0; for await (const _ of iter) n++; return n; }
