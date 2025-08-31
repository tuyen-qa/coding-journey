package dsa;
public class Dsa02 {
  public static <T> ListNode<T> reverse(ListNode<T> head){
    ListNode<T> prev=null, cur=head;
    while(cur!=null){ ListNode<T> nxt=cur.next; cur.next=prev; prev=cur; cur=nxt; }
    return prev;
  }
  public static <T> boolean hasCycle(ListNode<T> head){
    ListNode<T> slow=head, fast=head;
    while(fast!=null && fast.next!=null){ slow=slow.next; fast=fast.next.next; if(slow==fast) return true; }
    return false;
  }
}
