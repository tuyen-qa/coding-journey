package dsa; import org.junit.jupiter.api.Test; import static org.junit.jupiter.api.Assertions.*;
public class Dsa02Test{
  @Test void reverseAndCycle(){
    ListNode<Integer> a=new ListNode<>(1); ListNode<Integer> b=new ListNode<>(2); ListNode<Integer> c=new ListNode<>(3); a.next=b; b.next=c;
    ListNode<Integer> r=Dsa02.reverse(a); assertEquals(3, r.val);
    ListNode<Integer> x=new ListNode<>(1); ListNode<Integer> y=new ListNode<>(2); ListNode<Integer> z=new ListNode<>(3); x.next=y; y.next=z; z.next=y;
    assertTrue(Dsa02.hasCycle(x));
  }
}
