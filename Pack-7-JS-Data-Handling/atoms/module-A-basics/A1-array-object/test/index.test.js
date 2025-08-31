import { strict as assert } from 'assert';
import { mapValues, groupBy, deepFreeze } from '../src/index.js';
const o = {a:1,b:2}; const m = mapValues(o, x=>x*2); assert.deepEqual(m, {a:2,b:4}); assert.deepEqual(o,{a:1,b:2});
const g = groupBy([{t:'A',x:1},{t:'B',x:2},{t:'A',x:3}],'t'); assert.equal(g['A'].length,2);
const frozen = deepFreeze({a:{b:1}}); assert.throws(()=>{ frozen.a.b=2; }, TypeError);
console.log('A1 OK');
