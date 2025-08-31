export class TreeNode<T>{
  val:T; left:TreeNode<T>|null=null; right:TreeNode<T>|null=null;
  constructor(val:T){ this.val=val; }
}
export function inorder<T>(root: TreeNode<T> | null): T[] {
  const res:T[]=[];
  function dfs(n:TreeNode<T>|null){ if(!n) return; dfs(n.left); res.push(n.val); dfs(n.right); }
  dfs(root); return res;
}
export function bstInsert(root: TreeNode<number> | null, val:number): TreeNode<number> {
  if(!root) return new TreeNode(val);
  let cur=root; while(true){
    if(val < cur.val){ if(cur.left) cur=cur.left; else { cur.left=new TreeNode(val); break; } }
    else { if(cur.right) cur=cur.right; else { cur.right=new TreeNode(val); break; } }
  } return root;
}
export function bstSearch(root: TreeNode<number> | null, val:number): boolean {
  let cur=root; while(cur){ if(cur.val===val) return true; cur = val<cur.val? cur.left: cur.right; } return false;
}
