import { strict as assert } from 'assert';
import { climbStairs, rob, coinChange } from '../src/index.js';

assert.equal(climbStairs(1), 1);
assert.equal(climbStairs(2), 2);
assert.equal(climbStairs(3), 3);
assert.equal(climbStairs(0), 0);

assert.equal(rob([1,2,3,1]), 4);
assert.equal(rob([2,7,9,3,1]), 12);

assert.equal(coinChange([1,2,5], 11), 3);
assert.equal(coinChange([2], 3), -1);

console.log('PB-18 OK');
