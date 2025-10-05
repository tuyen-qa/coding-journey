// test/callback-advanced-1.test.js
'use strict';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
          processData,
          applyStrategy,
          composeCallbacks,
          callTwice,
          callAll,
          repeatCallback,
          chainTwo,
          makeLogger,
          wrapCallback,
          delayedCallback,
          safeCallback,
          sequence,
          applyIf
} from '../src/callback-advanced-1.js';

describe('callback-advanced-1 (Higher-order)', () => {
  it('A1: processData calls before/after correctly', () => {
    const logs = [];
    processData('X', d => logs.push('before '+d), d => logs.push('after '+d));
    assert.deepEqual(logs, ['before X', 'after X']);
  });

  it('A2: applyStrategy supports addition strategy', () => {
    const add = (a,b)=>a+b;
    assert.equal(applyStrategy(2,3,add),5);
  });

  it('A3: composeCallbacks chains multiple functions', () => {
    let result = [];
    const fn = composeCallbacks(
      x => result.push('a'+x),
      x => result.push('b'+x)
    );
    fn('!');
    assert.deepEqual(result,['a!','b!']);
  });

  it('3.1. callTwice should invoke callback twice', () => {
    let count = 0;
    callTwice(() => count++, 'X');
    assert.equal(count, 2);
  });

  it('3.2. callAll should call each callback with value', () => {
    const log = [];
    callAll('Hi', v => log.push('A'+v), v => log.push('B'+v));
    assert.deepEqual(log, ['AHi','BHi']);
  });

  it('3.3. repeatCallback should run N times', () => {
    const result = [];
    repeatCallback(3, i => result.push(i));
    assert.deepEqual(result, [0,1,2]);
  });

  it('3.4. chainTwo should call first then second', () => {
    const order = [];
    chainTwo(v => order.push('1'+v), v => order.push('2'+v), '!');
    assert.deepEqual(order, ['1!','2!']);
  });

  it('3.5. makeLogger should return a logging callback', () => {
    const logs = [];
    const log = console.log;
    console.log = msg => logs.push(msg);
    const info = makeLogger('INFO');
    info('Start');
    console.log = log;
    assert.deepEqual(logs, ['INFO: Start']);
  });

  it('3.6. wrapCallback should call before, target, after in order', () => {
    const steps = [];
    const wrapped = wrapCallback(
        () => steps.push('before'),
        () => steps.push('after'),
        v => steps.push('target ' + v)
    );
    wrapped('X');
    assert.deepEqual(steps, ['before','target X','after']);
  });

  it('3.7. delayedCallback should call after delay', (t, done) => {
    const start = Date.now();
    delayedCallback(val => {
      const elapsed = Date.now() - start;
      assert.ok(elapsed >= 40, 'should delay around 50ms');
      assert.equal(val, 'Task');
      done();
    }, 50, 'Task');
  });

  it('3.8. safeCallback should catch and log errors', () => {
    const log = console.error;
    let errMsg;
    console.error = msg => errMsg = msg;
    safeCallback(() => { throw new Error('Boom!'); }, 'X');
    console.error = log;
    assert.ok(errMsg.includes('Boom!'));
  });

  it('3.9. sequence should run callbacks in order', () => {
    const order = [];
    sequence('A',
        v => order.push('1'+v),
        v => order.push('2'+v),
        v => order.push('3'+v)
    );
    assert.deepEqual(order, ['1A','2A','3A']);
  });

  it('3.10. applyIf should call only when condition true', () => {
    const result = [];
    applyIf(5, n => n > 3, n => result.push(n));
    applyIf(2, n => n > 3, n => result.push(n));
    assert.deepEqual(result, [5]);
  });
});
