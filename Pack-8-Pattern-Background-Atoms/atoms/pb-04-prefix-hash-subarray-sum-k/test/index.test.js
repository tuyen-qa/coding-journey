import { strict as assert } from 'assert';
import { existsSubarraySumK } from '../src/index.js';
assert.equal(existsSubarraySumK([1,2,3],3),true);
assert.equal(existsSubarraySumK([1,2,3],7),false);
assert.equal(existsSubarraySumK([1,-1,1,-1],0),true);
assert.equal(existsSubarraySumK([],0),false);
console.log('PB-04 OK');
