export class ListNode<T> {
  val: T; next: ListNode<T> | null;
  constructor(val:T, next: ListNode<T>|null=null){ this.val=val; this.next=next; }
}
export function reverse<T>(head: ListNode<T> | null): ListNode<T> | null {
  let prev: ListNode<T> | null = null, curr=head;
  while(curr){ const nxt=curr.next; curr.next=prev; prev=curr; curr=nxt; }
  return prev;
}
export function hasCycle<T>(head: ListNode<T> | null): boolean {
  let slow=head, fast=head;
  while(fast && fast.next){ slow=slow!.next; fast=fast.next.next; if(slow===fast) return true; }
  return false;
}
