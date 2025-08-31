import { strict as assert } from 'assert';
import { TreeNode, insertBST, searchBST, inorder, height, isBalanced } from '../src/index.js';

function buildBST(arr){
  let root=null; for(const x of arr) root = insertBST(root, x); return root;
}

const root = buildBST([5,3,7,2,4,6,8]);
// inorder phải là dãy tăng
assert.deepEqual(inorder(root), [2,3,4,5,6,7,8]);
assert.ok(searchBST(root, 4));
assert.equal(searchBST(root, 100), null);

// mở rộng
assert.equal(height(root) >= 3, true);
assert.equal(isBalanced(root), true);

// lệch
let skew=null; [1,2,3,4,5].forEach(x=>skew=insertBST(skew,x));
assert.equal(isBalanced(skew), false);

console.log('PB-11 OK');
