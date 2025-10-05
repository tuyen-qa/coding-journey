// test/callback-advanced-2.test.js
'use strict';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { runParallel, runSeries, waterfall } from '../src/callback-advanced-2.js';

describe('callback-advanced-2 (Async flow)', () => {
  it('A1: runParallel waits for all', (t, done) => {
    let count=0;
    runParallel([
      cb=>setTimeout(()=>{count++;cb();},10),
      cb=>setTimeout(()=>{count++;cb();},20)
    ], ()=>{
      assert.equal(count,2);
      done();
    });
  });

  it('A2: runSeries executes in order', (t, done)=>{
    const order=[];
    runSeries([
      cb=>{order.push(1);setTimeout(cb,10)},
      cb=>{order.push(2);setTimeout(cb,10)}
    ], ()=>{
      assert.deepEqual(order,[1,2]);
      done();
    });
  });

  it('A3: waterfall passes data through chain', (t, done)=>{
    waterfall([
      (r,cb)=>cb(1),
      (r,cb)=>cb(r+1),
      (r,cb)=>cb(r*2)
    ], (res)=>{
      assert.equal(res,4);
      done();
    });
  });
});
