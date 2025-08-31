import { strict as assert } from 'assert';
import { compare } from '../src/index.js';
const res = await compare([['inc', i=>i+1]], [1e3]);
assert.equal(res[0].name,'inc'); assert.equal(res[0].n,1000);
console.log('D3 OK');
