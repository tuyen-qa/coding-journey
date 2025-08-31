import { strict as assert } from 'assert';
import { reverseString, isPalindrome, twoSumSorted } from '../src/index';
assert.equal(reverseString('abc'), 'cba');
assert.equal(isPalindrome('A man, a plan, a canal: Panama'), true);
assert.deepEqual(twoSumSorted([1,2,3,4,6], 7), [1,4]);
console.log('TS DSA-01 OK');
