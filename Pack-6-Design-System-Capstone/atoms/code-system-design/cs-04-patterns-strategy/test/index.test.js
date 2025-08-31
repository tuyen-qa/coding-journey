import { strict as assert } from 'assert'; import { applyDiscount } from '../src/index.js';
assert.equal(applyDiscount(1000,{type:'percent',value:10}),900);
assert.equal(applyDiscount(1000,{type:'flat',value:300}),700);
console.log('CS-04 OK');
