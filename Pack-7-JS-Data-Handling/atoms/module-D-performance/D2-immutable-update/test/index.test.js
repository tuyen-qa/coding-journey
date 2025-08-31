import { strict as assert } from 'assert';
import { update, diff } from '../src/index.js';
const a={user:{name:'A',age:1}}, b=update(a,'user.age',2);
assert.equal(a.user.age,1); assert.equal(b.user.age,2); assert.notEqual(a.user, b.user);
const d = diff(a,b); assert.deepEqual(d,{user:{age:2}});
console.log('D2 OK');
