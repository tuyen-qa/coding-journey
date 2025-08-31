import { strict as assert } from 'assert';
import { dijkstra } from '../src/index.js';

const n=5;
const edges=[[0,1,2],[0,2,4],[1,2,1],[1,3,7],[2,4,3],[3,4,1]]; // coi như vô hướng trong cài đặt
const dist = dijkstra(n, edges, 0);
assert.equal(dist[0], 0);
assert.equal(dist[1], 2);
assert.equal(dist[2], 3);
assert.equal(dist[4], 6); // 0->1->2->4
console.log('PB-14 OK');
