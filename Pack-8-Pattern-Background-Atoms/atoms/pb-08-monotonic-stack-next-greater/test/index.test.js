import { strict as assert } from 'assert';
import { nextGreater } from '../src/index.js';
assert.deepEqual(nextGreater([2,1,2,4,3]),[4,2,4,-1,-1]);
assert.deepEqual(nextGreater([1]),[-1]);
console.log('PB-08 OK');
