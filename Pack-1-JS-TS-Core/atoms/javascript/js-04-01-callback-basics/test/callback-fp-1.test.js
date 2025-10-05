// test/callback-fp-1.test.js
'use strict';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { map, filter, reduce, find } from '../src/callback-fp-1.js';

describe('callback-fp-1 (Functional Array Callbacks)', ()=>{
  it('map doubles elements', ()=>{
    assert.deepEqual(map([1,2,3], x=>x*2), [2,4,6]);
  });
  it('filter keeps even numbers', ()=>{
    assert.deepEqual(filter([1,2,3,4], x=>x%2===0), [2,4]);
  });
  it('reduce sums up values', ()=>{
    assert.equal(reduce([1,2,3], (acc,v)=>acc+v, 0), 6);
  });
  it('find returns first match', ()=>{
    assert.equal(find(['a','b','c'], x=>x==='b'), 'b');
  });
});
