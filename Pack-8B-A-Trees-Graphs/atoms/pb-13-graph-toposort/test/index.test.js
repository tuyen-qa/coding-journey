import { strict as assert } from 'assert';
import { topoOrder, hasCycleDirected } from '../src/index.js';

// DAG
let n=4, edges=[[0,1],[0,2],[1,3],[2,3]];
const order = topoOrder(n, edges);
assert.equal(order.length, 4);
assert.equal(hasCycleDirected(n, edges), false);

// cycle
n=3; edges=[[0,1],[1,2],[2,0]];
assert.equal(topoOrder(n, edges), null);
assert.equal(hasCycleDirected(n, edges), true);

console.log('PB-13 OK');
