// test/callback-advanced-3.test.js
'use strict';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { EventEmitter } from '../src/callback-advanced-3.js';

describe('callback-advanced-3 (EventEmitter)', () => {
  it('A1: on + emit triggers callbacks', ()=>{
    const e = new EventEmitter();
    let result=null;
    e.on('save', d=>result=d);
    e.emit('save','data');
    assert.equal(result,'data');
  });

  it('A2: off removes listener', ()=>{
    const e = new EventEmitter();
    let count=0; const cb=()=>count++;
    e.on('ev',cb); e.emit('ev'); e.off('ev',cb); e.emit('ev');
    assert.equal(count,1);
  });
});
