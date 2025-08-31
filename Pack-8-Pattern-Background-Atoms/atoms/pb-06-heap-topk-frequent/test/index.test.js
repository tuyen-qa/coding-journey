import { strict as assert } from 'assert';
import { topKFrequent } from '../src/index.js';
const out=topKFrequent([1,1,1,2,2,3],2).sort((a,b)=>a-b);
assert.deepEqual(out,[1,2]);
console.log('PB-06 OK');
