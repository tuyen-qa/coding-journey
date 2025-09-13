'use strict';

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { reduce, filter, sumArrayLike } from '../src/arraylike-ops.js';

describe('arraylike reduce/filter via unmethodize', () => {
  it('reduce sums array-like {0:1,1:2,2:3,length:3}', () => {
    const a = {0:1,1:2,2:3,length:3};
    // once you implement reduce:
    const s = reduce(a, (acc, x)=> acc + x, 0);
    assert.equal(s, 6);
    assert.equal(typeof reduce === 'function', true, 'reduce should be a function');
  });

  it('filter keeps uppercase letters', () => {
    const a = {0:'A',1:'b',2:'C',3:'d', length:4};
    // once you implement filter:
    const up = filter(a, ch => ch === ch.toUpperCase());
    assert.deepEqual(up, ['A','C']);
    assert.equal(typeof filter === 'function', true, 'filter should be a function');
  });

  it('sumArrayLike uses reduce under the hood', () => {
    const a = {0:10,1:5,length:2};
    // once you implement:
    assert.equal(sumArrayLike(a), 15);
    assert.equal(typeof sumArrayLike === 'function', true, 'sumArrayLike should be a function');
  });
});
