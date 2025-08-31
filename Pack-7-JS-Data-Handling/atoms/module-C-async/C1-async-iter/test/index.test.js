import { strict as assert } from 'assert';
import { mapAsync, filterAsync, countAsync } from '../src/index.js';
async function *nums(){ yield* [1,2,3,4,5]; }
const pipe = filterAsync(mapAsync(nums(), x=>x*2), x=>x%4===0);
const n = await countAsync(pipe); assert.equal(n,2);
console.log('C1 OK');
