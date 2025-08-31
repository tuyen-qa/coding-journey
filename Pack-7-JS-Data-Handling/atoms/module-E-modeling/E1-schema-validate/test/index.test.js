import { strict as assert } from 'assert';
import { t } from '../src/index.js';
const order = t.object({ id: t.string(), total: t.number(), createdAt: t.date() });
const o = order({ id:'1', total:'12', createdAt:'2020-01-01' });
assert.equal(o.total,12); assert.equal(o.createdAt.getUTCFullYear(),2020);
console.log('E1 OK');
