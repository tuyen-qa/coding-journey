import { strict as assert } from 'assert';
import { sortBy, viCompare } from '../src/index.js';
const a=[{n:'b',x:2},{n:'a',x:1},{n:'a',x:3}];
const s=sortBy(a,'n','x'); assert.deepEqual(s.map(i=>i.x), [1,3,2]);
assert.ok(viCompare('ă','b') < 0);
console.log('B2 OK');
