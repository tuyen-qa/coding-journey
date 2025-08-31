import { strict as assert } from 'assert';
import { idbCache, fetchWithCache } from '../src/index.js';
let calls=0; const fetcher = async (u)=>{ calls++; return { url:u, ok:true }; };
const a = await fetchWithCache('x', fetcher, {ttlMs:1000}); const b = await fetchWithCache('x', fetcher, {ttlMs:1000});
assert.equal(a.ok,true); assert.equal(calls,1);
console.log('G1 OK');
