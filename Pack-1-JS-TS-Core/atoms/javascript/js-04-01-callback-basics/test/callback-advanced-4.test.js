// test/callback-advanced-4.test.js
'use strict';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { App } from '../src/callback-advanced-4.js';

describe('callback-advanced-4 (Middleware)', ()=>{
  it('A1: executes middleware chain in order', ()=>{
    const app = new App();
    const trace = [];
    app.use((req,res,next)=>{trace.push('A');next();});
    app.use((req,res,next)=>{trace.push('B');next();});
    app.run({}, {});
    assert.deepEqual(trace,['A','B']);
  });

  it('A2: middleware can modify req/res', ()=>{
    const app = new App();
    const res = {};
    app.use((req,res,next)=>{res.msg='done';next();});
    app.run({},res);
    assert.equal(res.msg,'done');
  });
});
