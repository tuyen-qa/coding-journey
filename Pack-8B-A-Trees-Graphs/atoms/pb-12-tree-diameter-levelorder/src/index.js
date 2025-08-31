export class TreeNode{
  constructor(val, left=null, right=null){ this.val=val; this.left=left; this.right=right; }
}
export function insertBST(root, val){
  if(!root) return new TreeNode(val);
  if(val<root.val) root.left = insertBST(root.left,val);
  else root.right = insertBST(root.right,val);
  return root;
}
export function treeDiameter(root){
  let best = 0;
  function h(node){
    if(!node) return 0;
    const L = h(node.left), R = h(node.right);
    best = Math.max(best, L+R); // số cạnh
    return 1 + Math.max(L,R);
  }
  h(root);
  return best;
}
export function levelOrder(root){
  if(!root) return [];
  const q=[root], res=[];
  while(q.length){
    const n=q.length, level=[];
    for(let i=0;i<n;i++){
      const x=q.shift();
      level.push(x.val);
      if(x.left) q.push(x.left);
      if(x.right) q.push(x.right);
    }
    res.push(level);
  }
  return res;
}
