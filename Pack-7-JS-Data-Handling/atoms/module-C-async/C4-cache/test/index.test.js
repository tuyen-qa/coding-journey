import { strict as assert } from 'assert';
import { LRU, ttlCache } from '../src/index.js';
const lru=new LRU(2); lru.set('a',1); lru.set('b',2); lru.get('a'); lru.set('c',3); assert.equal(lru.get('b'), undefined);
let calls=0; const f = ttlCache(async (x)=>{ calls++; return x*2; }, 50);
const v1=await f(2); const v2=await f(2); assert.equal(v2,4); assert.equal(calls,1);
console.log('C4 OK');
