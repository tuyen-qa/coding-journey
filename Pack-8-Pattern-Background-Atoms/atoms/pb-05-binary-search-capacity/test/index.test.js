import { strict as assert } from 'assert';
import { minCapacity } from '../src/index.js';
assert.equal(minCapacity([1,2,3,1,1],4),3);
assert.equal(minCapacity([3,2,2,4,1,4],3),6);
console.log('PB-05 OK');
