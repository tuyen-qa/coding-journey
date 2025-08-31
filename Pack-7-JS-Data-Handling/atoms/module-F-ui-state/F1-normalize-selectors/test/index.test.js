import { strict as assert } from 'assert';
import { normalizeById, createSelector } from '../src/index.js';
const norm = normalizeById([{id:1,x:1},{id:2,x:2}]); assert.equal(norm.allIds[1],'2');
let runs=0; const sel = createSelector(s=>[s.items], (items)=>{ runs++; return items.reduce((a,b)=>a+b,0); });
const s1={items:[1,2,3]}, s2={items:[1,2,3]}; sel(s1); sel(s1); sel(s2); assert.equal(runs,2);
console.log('F1 OK');
