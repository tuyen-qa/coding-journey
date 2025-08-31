import { strict as assert } from 'assert';
import { batchingSink } from '../src/index.js';
const batches=[]; const s = batchingSink({maxItems:3, maxMs:100, onFlush:(b)=>batches.push(b)});
s.push(1); s.push(2); s.push(3); // auto flush by size
await new Promise(r=>setTimeout(r, 10));
s.push(4); await new Promise(r=>setTimeout(r, 120)); // flush by time
assert.deepEqual(batches[0],[1,2,3]); assert.deepEqual(batches[1],[4]);
console.log('C3 OK');
