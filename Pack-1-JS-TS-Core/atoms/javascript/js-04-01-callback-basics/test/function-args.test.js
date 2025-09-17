// test/function-args.test.js
'use strict';

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  callOnce,
  callNTimes,
  mapArray,
  filterArray,
  withDelay
} from '../src/function-args.js';

// Section 1: Basic calls
describe('Function as Argument Basics', () => {
  it('callOnce calls function exactly one time', () => {
    let count = 0;
    callOnce(() => count++);
    assert.equal(count, 1);
  });

  it('callNTimes calls function n times', () => {
    let count = 0;
    callNTimes(() => count++, 5);
    assert.equal(count, 5);
  });
});

// Section 2: Array ops
describe('mapArray & filterArray', () => {
  it('mapArray doubles values', () => {
    const res = mapArray([1,2,3], x => x * 2);
    assert.deepEqual(res, [2,4,6]);
  });

  it('filterArray keeps even values', () => {
    const res = filterArray([1,2,3,4], x => x % 2 === 0);
    assert.deepEqual(res, [2,4]);
  });
});

// Section 3: withDelay
describe('withDelay', () => {
  it('delays execution of a function', async () => {
    let flag = false;
    const delayed = withDelay(() => { flag = true; }, 20);
    delayed();
    assert.equal(flag, false); // chưa gọi ngay
    await new Promise(res => setTimeout(res, 30));
    assert.equal(flag, true); // đã gọi sau 20ms
  });
});
