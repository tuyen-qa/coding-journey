import { strict as assert } from 'assert';
import { numIslands } from '../src/index.js';

assert.equal(numIslands([[1,1,0,0],[1,0,0,1],[0,0,1,1]]), 2);
assert.equal(numIslands([[0,0],[0,0]]), 0);
assert.equal(numIslands([[1]]), 1);
assert.equal(numIslands([]), 0);

console.log('PB-15 OK');
