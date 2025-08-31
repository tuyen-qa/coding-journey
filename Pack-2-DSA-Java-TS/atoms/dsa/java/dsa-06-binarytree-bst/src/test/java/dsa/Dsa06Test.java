package dsa; import org.junit.jupiter.api.Test; import static org.junit.jupiter.api.Assertions.*; import java.util.*;
public class Dsa06Test{
  @Test void basics(){
    TreeNode root=null; int[] a={5,3,7,2,4,6,8}; for(int v: a) root=Dsa06.bstInsert(root,v);
    List<Integer> out=new ArrayList<>(); Dsa06.inorder(root,out); assertEquals(List.of(2,3,4,5,6,7,8), out);
    assertTrue(Dsa06.bstSearch(root,6)); assertFalse(Dsa06.bstSearch(root,10));
  }
}
