// test/callback-problem-2.test.js
'use strict';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { simulateAPI, retry, queue } from '../src/callback-problem-2.js';

describe('callback-problem-2 (Async simulation)', ()=>{
  it('simulateAPI calls callback with success or error', (t, done)=>{
    simulateAPI(100, (err,res)=>{
      assert.equal(err, null);
      assert.equal(res, 'OK');
      done();
    });
  });

  it('retry eventually succeeds', (t, done)=>{
    let called=0;
    const flakyAPI = cb=>{
      called++;
      if(called<2) return cb('Error', null);
      cb(null,'Success');
    };
    retry(flakyAPI,3,(err,res)=>{
      assert.equal(res,'Success');
      done();
    });
  });

  it('queue executes all tasks sequentially', (t, done)=>{
    const result=[];
    queue([
      cb=>{result.push(1);cb();},
      cb=>{result.push(2);cb();}
    ], ()=>{
      assert.deepEqual(result,[1,2]);
      done();
    });
  });
});
