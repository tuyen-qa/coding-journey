import { strict as assert } from 'assert';
import { countComponents } from '../src/index.js';
assert.equal(countComponents(5,[[0,1],[1,2],[3,4]]),2);
assert.equal(countComponents(3,[]),3);
console.log('PB-07 OK');
