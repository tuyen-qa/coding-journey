import { strict as assert } from 'assert';
import { factorial, subsets } from '../src/index';
assert.equal(factorial(5), 120);
const ss=subsets([1,2]); const view=ss.map(a=>a.join('')).sort().join('|');
assert.equal(view, '|1|12|2'); // [],[1],[1,2],[2]
console.log('TS DSA-05 OK');
