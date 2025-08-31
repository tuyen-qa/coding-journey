import { strict as assert } from 'assert';
import { minDistance, uniquePathsWithObstacles } from '../src/index.js';

assert.equal(minDistance('horse','ros'), 3);
assert.equal(minDistance('intention','execution'), 5);
assert.equal(minDistance('',''), 0);
assert.equal(minDistance('a',''), 1);

assert.equal(uniquePathsWithObstacles([[0,0,0],[0,1,0],[0,0,0]]), 2);
assert.equal(uniquePathsWithObstacles([[1,0]]), 0);
assert.equal(uniquePathsWithObstacles([]), 0);

console.log('PB-19 OK');
