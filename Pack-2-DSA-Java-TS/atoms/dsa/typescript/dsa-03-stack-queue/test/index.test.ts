import { strict as assert } from 'assert';
import { MinStack, QueueTwoStacks } from '../src/index';
const s=new MinStack(); s.push(3); s.push(5); s.push(2); assert.equal(s.getMin(),2); s.pop(); assert.equal(s.getMin(),3);
const q=new QueueTwoStacks<number>(); q.enqueue(1); q.enqueue(2); assert.equal(q.dequeue(),1); q.enqueue(3); assert.equal(q.dequeue(),2); assert.equal(q.dequeue(),3);
console.log('TS DSA-03 OK');
