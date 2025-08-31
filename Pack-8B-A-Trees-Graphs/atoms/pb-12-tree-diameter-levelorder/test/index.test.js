import { strict as assert } from 'assert';
import { TreeNode, insertBST, treeDiameter, levelOrder } from '../src/index.js';

function buildBST(a){ let r=null; for(const x of a) r=insertBST(r,x); return r; }

const root = buildBST([5,3,7,2,4,6,8]);
// Diameter của BST cân đối này: 4 (2-3-5-7-8) theo số cạnh
assert.equal(treeDiameter(root), 4);

const levels = levelOrder(root);
assert.deepEqual(levels[0], [5]);
assert.deepEqual(levels[1].sort((a,b)=>a-b), [3,7]);
assert.equal(Array.isArray(levels[2]), true);

assert.equal(treeDiameter(null), 0);
assert.deepEqual(levelOrder(null), []);

console.log('PB-12 OK');
