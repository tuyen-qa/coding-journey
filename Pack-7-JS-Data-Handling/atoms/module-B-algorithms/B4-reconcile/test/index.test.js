import { strict as assert } from 'assert';
import { jaroWinkler, reconcile } from '../src/index.js';
const s = jaroWinkler('Nguyen Van A','Nguyen V. A'); assert.ok(s>0.9);
const pairs = reconcile([{name:'Alice'}],[{name:'Alicia'},{name:'Bob'}], 0.85);
assert.equal(pairs.length,1);
console.log('B4 OK');
