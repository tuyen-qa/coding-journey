import { strict as assert } from 'assert';
import { mergeConnections } from '../src/index.js';
const p = { edges:[{node:{id:'1'}},{node:{id:'2'}}], pageInfo:{endCursor:'c2', hasNextPage:true} };
const n = { edges:[{node:{id:'2'}},{node:{id:'3'}}], pageInfo:{endCursor:'c3', hasNextPage:false} };
const m = mergeConnections(p,n); 
assert.deepEqual(m.edges.map(e=>e.node.id), ['1','2','3']); assert.equal(m.pageInfo.endCursor,'c3');
console.log('F3 OK');
