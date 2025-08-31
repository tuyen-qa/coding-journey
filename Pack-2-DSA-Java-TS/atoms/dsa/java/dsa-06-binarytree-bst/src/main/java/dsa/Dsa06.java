package dsa; import java.util.*;
public class Dsa06{
  public static void inorder(TreeNode n, List<Integer> out){ if(n==null) return; inorder(n.left,out); out.add(n.val); inorder(n.right,out); }
  public static TreeNode bstInsert(TreeNode root, int v){
    if(root==null) return new TreeNode(v);
    TreeNode cur=root; while(true){
      if(v<cur.val){ if(cur.left!=null) cur=cur.left; else { cur.left=new TreeNode(v); break; } }
      else { if(cur.right!=null) cur=cur.right; else { cur.right=new TreeNode(v); break; } }
    } return root;
  }
  public static boolean bstSearch(TreeNode root, int v){
    TreeNode cur=root; while(cur!=null){ if(cur.val==v) return true; cur = v<cur.val? cur.left: cur.right; } return false;
  }
}
