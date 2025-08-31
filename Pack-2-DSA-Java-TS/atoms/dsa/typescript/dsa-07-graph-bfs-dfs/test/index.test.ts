import { strict as assert } from 'assert';
import { pathExists, dfsOrder, Graph } from '../src/index';
const g:Graph = { A:['B','C'], B:['D'], C:['D'], D:[] };
assert.equal(pathExists(g,'A','D'), true);
assert.deepEqual(dfsOrder(g,'A'), ['A','B','D','C']);
console.log('TS DSA-07 OK');
