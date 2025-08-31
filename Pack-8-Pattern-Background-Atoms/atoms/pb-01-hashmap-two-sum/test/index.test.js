import { strict as assert } from 'assert';
import { twoSum } from '../src/index.js';
assert.deepEqual(twoSum([2,7,11,15],9),[0,1]);
assert.deepEqual(twoSum([3,2,4],6),[1,2]);
assert.equal(twoSum([1,2,3],100),null);
assert.deepEqual(twoSum([-1,-2,-3],-3),[0,1]);
assert.deepEqual(twoSum([3,3],6),[0,1]);
console.log('PB-01 OK');
