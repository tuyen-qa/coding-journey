import { strict as assert } from 'assert';
import { subsets, permuteUnique } from '../src/index.js';

const ss = subsets([1,2]);
// 4 tập con
assert.equal(ss.length, 4);
// chứa [] và [1,2] (không kiểm tra thứ tự)
const hasEmpty = ss.some(a=>a.length===0);
const hasFull = ss.some(a=>a.length===2 && a.includes(1) && a.includes(2));
assert.ok(hasEmpty && hasFull);

const perms = permuteUnique([1,1,2]);
// 3 hoán vị
const key = a=>a.join(',');
const set = new Set(perms.map(key));
assert.equal(set.size, 3);
assert.ok(set.has('1,1,2') && set.has('1,2,1') && set.has('2,1,1'));

console.log('PB-16 OK');
