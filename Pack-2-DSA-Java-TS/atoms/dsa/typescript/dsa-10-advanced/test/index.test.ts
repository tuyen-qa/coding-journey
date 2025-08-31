import { strict as assert } from 'assert';
import { dijkstra, WGraph, lisLength } from '../src/index';
const g:WGraph = { A:[['B',2],['C',5]], B:[['C',1]], C:[] };
const d = dijkstra(g,'A');
assert.equal(d['A'],0); assert.equal(d['B'],2); assert.equal(d['C'],3);
assert.equal(lisLength([10,9,2,5,3,7,101,18]), 4);
console.log('TS DSA-10 OK');
