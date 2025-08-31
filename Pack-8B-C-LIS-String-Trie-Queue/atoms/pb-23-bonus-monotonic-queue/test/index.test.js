import { strict as assert } from 'assert';
import { slidingWindowMax } from '../src/index.js';

assert.deepEqual(slidingWindowMax([1,3,-1,-3,5,3,6,7], 3), [3,3,5,5,6,7]);
assert.deepEqual(slidingWindowMax([1], 1), [1]);
assert.deepEqual(slidingWindowMax([], 3), []);

console.log('PB-23 OK');
