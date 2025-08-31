import { strict as assert } from 'assert';
import { ListNode, reverse, hasCycle } from '../src/index';
const a=new ListNode(1), b=new ListNode(2), c=new ListNode(3); a.next=b; b.next=c;
const r = reverse(a);
assert.equal(r?.val, 3); assert.equal(r?.next?.val, 2);
const x=new ListNode(1), y=new ListNode(2), z=new ListNode(3); x.next=y; y.next=z; z.next=y;
assert.equal(hasCycle(x), true);
console.log('TS DSA-02 OK');
