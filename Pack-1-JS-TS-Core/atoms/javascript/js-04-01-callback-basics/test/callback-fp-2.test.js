// test/callback-fp-2.test.js
'use strict';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { compose, pipe, once, debounce } from '../src/callback-fp-2.js';

describe('callback-fp-2 (Combinators)', ()=>{
  it('compose works right-to-left', ()=>{
    const add1 = x=>x+1; const mul2 = x=>x*2;
    const f = compose(add1, mul2);
    assert.equal(f(3), 7); // (3*2)+1
  });

  it('pipe works left-to-right', ()=>{
    const add1 = x=>x+1; const mul2 = x=>x*2;
    const f = pipe(add1, mul2);
    assert.equal(f(3), 8); // (3+1)*2
  });

  it('once runs callback only once', ()=>{
    let c=0; const fn = once(()=>c++);
    fn(); fn();
    assert.equal(c,1);
  });

  it('debounce delays execution', (t, done)=>{
    let called=0;
    const fn = debounce(()=>{called++; done();},30);
    fn(); fn(); fn();
    setTimeout(()=>assert.equal(called,1),40);
  });
});
