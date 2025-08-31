import { strict as assert } from 'assert';
import { TreeNode, inorder, bstInsert, bstSearch } from '../src/index';
let root: TreeNode<number> | null = null;
[5,3,7,2,4,6,8].forEach(v=> root=bstInsert(root,v));
assert.deepEqual(inorder(root), [2,3,4,5,6,7,8]);
assert.equal(bstSearch(root, 6), true);
assert.equal(bstSearch(root, 10), false);
console.log('TS DSA-06 OK');
