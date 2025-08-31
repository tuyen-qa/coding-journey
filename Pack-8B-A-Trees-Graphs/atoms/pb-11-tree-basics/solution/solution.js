export class TreeNode{
  constructor(val, left=null, right=null){
    this.val = val; this.left = left; this.right = right;
  }
}

export function insertBST(root, val){
  if(root == null) return new TreeNode(val);
  if(val < root.val) root.left = insertBST(root.left, val);
  else root.right = insertBST(root.right, val);
  return root;
}

export function searchBST(root, val){
  let cur = root;
  while(cur){
    if(val === cur.val) return cur;
    cur = val < cur.val ? cur.left : cur.right;
  }
  return null;
}

export function inorder(root){
  const out = [];
  function dfs(node){
    if(!node) return;
    dfs(node.left); out.push(node.val); dfs(node.right);
  }
  dfs(root);
  return out;
}

// Mở rộng
export function height(root){
  if(!root) return 0;
  return 1 + Math.max(height(root.left), height(root.right));
}
export function isBalanced(root){
  let ok = true;
  function h(node){
    if(!node) return 0;
    const L = h(node.left), R = h(node.right);
    if(Math.abs(L-R) > 1) ok = false;
    return 1 + Math.max(L, R);
  }
  h(root);
  return ok;
}
