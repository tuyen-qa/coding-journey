import { strict as assert } from 'assert';
import { mergeIntervals } from '../src/index.js';
assert.deepEqual(mergeIntervals([[1,3],[2,6],[8,10],[15,18]]),[[1,6],[8,10],[15,18]]);
assert.deepEqual(mergeIntervals([]),[]);
console.log('PB-09 OK');
