import { strict as assert } from 'assert';
import { mergeSort, binarySearch } from '../src/index';
const arr=[5,1,4,2,8,0]; const sorted=mergeSort(arr);
assert.deepEqual(sorted, [0,1,2,4,5,8]);
assert.equal(binarySearch(sorted,4), 3);
assert.equal(binarySearch(sorted,7), -1);
console.log('TS DSA-08 OK');
