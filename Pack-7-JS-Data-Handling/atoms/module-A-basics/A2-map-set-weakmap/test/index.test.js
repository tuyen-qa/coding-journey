import { strict as assert } from 'assert';
import { uniqueBy, memoize } from '../src/index.js';
const arr = [{id:1},{id:1},{id:2}]; const u = uniqueBy(arr, x=>x.id); assert.equal(u.length,2);
let calls=0; const fib = memoize(function f(n){ calls++; return n<=1? n: f(n-1)+f(n-2); }); assert.equal(fib(10),55); assert.ok(calls<30);
console.log('A2 OK');
