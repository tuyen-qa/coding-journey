// test/promises-drills.test.js
'use strict';

/**
 * Consolidated drills for Promise testing (ONLY .then/.catch).
 * Replace TODO comments with real assertions and finish implementations.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  makeResolved,
  makeRejected,
  delay,
  timeout,
  chain2,
  inParallel,
  withTimeout,
  firstWinner
} from '../src/promises-drills.js';

// -----------------------------------------------------------------------------
// Section A: resolve / reject
// -----------------------------------------------------------------------------
describe('A) resolve / reject', () => {
  it('makeResolved returns a Promise that resolves to given value', () => {
    return makeResolved(42).then(res => {
      assert.equal(res, 42);
    })
  });

  it('makeRejected returns a Promise that rejects with given message', () => {
    // return makeRejected('boom').then(
    //   () => { throw new Error('Expected rejection'); },
    //   err => {
    //     // TODO: assert err === 'boom'
    //     // assert.equal(err, 'boom');
    //     assert.ok(err, 'boom');
    //   }
    // );
    return makeRejected('boom').catch(err => {
      assert.equal(err, 'boom')
    })
  });
});

// -----------------------------------------------------------------------------
// Section B: timers (new Promise patterns)
// -----------------------------------------------------------------------------
describe('B) timers', () => {
  it('delay resolves after ~30ms with provided value', () => {
    const start = Date.now();
    return delay(30, 'ok').then(v => {
      // TODO: assert time >= 25 and v === 'ok'
      const elapsed = Date.now() - start;
      // assert.ok(elapsed >= 25);
      // assert.equal(v, 'ok');
      assert.ok(elapsed >= 25);
      assert.ok(v, 'ok');
    });
  });

  it('timeout rejects after ~20ms with provided reason', () => {
    const start = Date.now();
    return timeout(20, 'TLE').then(
      () => { throw new Error('Expected rejection'); },
      err => {
        // TODO: assert elapsed >= 15 and err === 'TLE'
        const elapsed = Date.now() - start;
        // assert.ok(elapsed >= 15);
        // assert.equal(err, 'TLE');
        assert.ok(true, 'TODO replace with timing + reason assertions');
      }
    );
  });
});

// -----------------------------------------------------------------------------
// Section C: chaining
// -----------------------------------------------------------------------------
describe('C) chaining with .then (remember to return)', () => {
  function plus1Async(x) { return delay(5, x + 1); }
  function times2Async(x) { return delay(5, x * 2); }

  it('chain2 runs fn1 then fn2 sequentially', () => {
    // Start from 10: (10 + 1) * 2 = 22
    return chain2(plus1Async, times2Async, 10).then(result => {
      // TODO: assert result === 22
      // assert.equal(result, 22);
      assert.ok(true, 'TODO replace with real assertion');
    });
  });

  it('chain2 propagates rejection', () => {
    const bad = () => makeRejected('nope');
    return chain2(bad, times2Async, 10).then(
      () => { throw new Error('Expected rejection'); },
      err => {
        // TODO: assert err === 'nope'
        // assert.equal(err, 'nope');
        assert.ok(true, 'TODO replace with real assertion');
      }
    );
  });
});

// -----------------------------------------------------------------------------
// Section D: Promise.all (parallel)
// -----------------------------------------------------------------------------
describe('D) inParallel with Promise.all', () => {
  it('inParallel returns results in order [p1, p2]', () => {
    const p1 = delay(10, 'A');
    const p2 = delay(15, 'B');
    return inParallel(p1, p2).then(([a, b]) => {
      // TODO: assert a === 'A' and b === 'B'
      // assert.equal(a, 'A'); assert.equal(b, 'B');
      assert.ok(true, 'TODO replace with real assertions');
    });
  });

  it('inParallel rejects if any input rejects', () => {
    const p1 = delay(5, 'A');
    const p2 = makeRejected('X');
    return inParallel(p1, p2).then(
      () => { throw new Error('Expected rejection'); },
      err => {
        // TODO: assert err === 'X'
        // assert.equal(err, 'X');
        assert.ok(true, 'TODO replace with real assertion');
      }
    );
  });
});

// -----------------------------------------------------------------------------
// Section E: Promise.race (timeouts & first-winner)
// -----------------------------------------------------------------------------
describe('E) race', () => {
  it('withTimeout rejects when timeout wins', () => {
    const slow = delay(50, 'SLOW');
    return withTimeout(slow, 10).then(
      () => { throw new Error('Expected timeout to win'); },
      err => {
        // TODO: assert err === 'Timeout!'
        // assert.equal(err, 'Timeout!');
        assert.ok(true, 'TODO replace with real assertion');
      }
    );
  });

  it('withTimeout resolves when original promise wins', () => {
    const fast = delay(5, 'FAST');
    return withTimeout(fast, 50).then(v => {
      // TODO: assert v === 'FAST'
      // assert.equal(v, 'FAST');
      assert.ok(true, 'TODO replace with real assertion');
    });
  });

  it('firstWinner picks the first settled promise (resolve)', () => {
    const p1 = delay(5, 'P1');
    const p2 = delay(20, 'P2');
    return firstWinner(p1, p2).then(v => {
      // TODO: assert v === 'P1'
      // assert.equal(v, 'P1');
      assert.ok(true, 'TODO replace with real assertion');
    });
  });

  it('firstWinner picks the first settled promise (reject)', () => {
    const p1 = makeRejected('ERR');
    const p2 = delay(10, 'OK');
    return firstWinner(p1, p2).then(
      () => { throw new Error('Expected rejection'); },
      err => {
        // TODO: assert err === 'ERR'
        // assert.equal(err, 'ERR');
        assert.ok(true, 'TODO replace with real assertion');
      }
    );
  });
});
