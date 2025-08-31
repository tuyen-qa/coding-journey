import { strict as assert } from 'assert';
import { fibMemo, fibBottomUp, coinChangeMin } from '../src/index';
assert.equal(fibMemo(10), 55); assert.equal(fibBottomUp(10), 55);
assert.equal(coinChangeMin([1,2,5],11), 3);
console.log('TS DSA-09 OK');
