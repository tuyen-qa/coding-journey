import { strict as assert } from 'assert';
import { aggregate } from '../src/index.js';
const data=[{userId:'u1',totalCents:100},{userId:'u1',totalCents:200},{userId:'u2',totalCents:50}];
const out=aggregate(data); 
assert.equal(out[0].key,'u1'); assert.equal(out[0].sum,300); assert.equal(out[1].sum,50);
console.log('B1 OK');
