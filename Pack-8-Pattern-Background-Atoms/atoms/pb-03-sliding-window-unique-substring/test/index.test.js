import { strict as assert } from 'assert';
import { lengthOfLongestUniqueSubstring } from '../src/index.js';
assert.equal(lengthOfLongestUniqueSubstring('abcabcbb'),3);
assert.equal(lengthOfLongestUniqueSubstring('bbbbb'),1);
assert.equal(lengthOfLongestUniqueSubstring('pwwkew'),3);
assert.equal(lengthOfLongestUniqueSubstring(''),0);
assert.equal(lengthOfLongestUniqueSubstring('dvdf'),3);
console.log('PB-03 OK');
