import { strict as assert } from 'assert';
import { lengthOfLIS } from '../src/index.js';

assert.equal(lengthOfLIS([10,9,2,5,3,7,101,18]), 4); // 2,3,7,101
assert.equal(lengthOfLIS([0,1,0,3,2,3]), 4);        // 0,1,2,3
assert.equal(lengthOfLIS([7,7,7,7]), 1);
assert.equal(lengthOfLIS([]), 0);

console.log('PB-20 OK');
