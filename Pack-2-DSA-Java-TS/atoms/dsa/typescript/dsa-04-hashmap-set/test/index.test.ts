import { strict as assert } from 'assert';
import { twoSum, firstUniqChar } from '../src/index';
assert.deepEqual(twoSum([2,7,11,15],9), [0,1]);
assert.equal(firstUniqChar('leetcode'), 0);
assert.equal(firstUniqChar('loveleetcode'), 2);
console.log('TS DSA-04 OK');
