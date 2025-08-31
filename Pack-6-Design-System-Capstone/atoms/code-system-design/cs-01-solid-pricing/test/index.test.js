import { strict as assert } from 'assert';
import { priceCalculator } from '../src/index.js';
const rules={ A:{unit:1000}, B:{unit:2000, discount:{type:'percent', value:10}} };
assert.equal(priceCalculator([{sku:'A',qty:2},{sku:'B',qty:1}], rules), 1000*2 + 1800);
console.log('CS-01 OK');
