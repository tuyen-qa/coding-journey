import { strict as assert } from 'assert';
import { toCamel, normalizeOrder } from '../src/index.js';
assert.equal(toCamel('user_id'), 'userId');
const o = normalizeOrder({order_id:5, user:'u1', total:'1200', created_at:'2020-01-01'});
assert.equal(o.id,'5'); assert.equal(o.userId,'u1'); assert.equal(o.totalCents,1200); assert.equal(o.createdAt.getUTCFullYear(),2020);
console.log('A3 OK');
