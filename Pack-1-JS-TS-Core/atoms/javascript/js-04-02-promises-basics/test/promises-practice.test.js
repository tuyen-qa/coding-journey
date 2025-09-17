// test/promises-practice.test.js
'use strict';

/**
 * Consolidated practice tests for Promises (ONLY .then/.catch).
 * Follow the TODOs. Replace placeholders and add assertions.
 * Tip: Always `return` the Promise inside each `it(...)`.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

// === Imports from your practice sources (ESM) ===
import * as PB from '../src/promises-basic.js';   // user story
import * as ORD from '../src/orders-basic.js';    // orders story
import * as FEED from '../src/feed-basic.js';     // news feed story
import * as UP from '../src/upload-basic.js';     // upload story

// -----------------------------------------------------------------------------
// SECTION 1: Resolve / Reject (normalize to Promise)
// -----------------------------------------------------------------------------
describe('Resolve/Reject basics', () => {
  it('PB: getUserFromCache - success path (fill assertion)', () => {
    // TODO:
    // 1) Return the Promise.
    // 2) Assert the resolved value equals { id:1, name:'Alice' }.
    // 3) Optionally assert that PB.getUserFromCache(1) has a .then function.
    return PB.getUserFromCache(1).then(user => {
      // TODO: your assertions here
      // Example:
      // assert.deepEqual(user, { id:1, name:'Alice' });
      // assert.equal(typeof PB.getUserFromCache(1).then, 'function');
      assert.ok(true, 'TODO: replace with real assertions');
    });
  });

  it('PB: getUserFromCache - failure path (choose one style)', () => {
    // TODO: Pick ONE of the two styles and remove the other.
    // Style A: then(success, fail)
    return PB.getUserFromCache(999).then(
      () => { throw new Error('Expected rejection'); },
      err => {
        // TODO: assert the error string
        // assert.equal(err, 'User not found');
        assert.ok(true, 'TODO: replace with real assertion');
      }
    );
    // Style B: .catch
    // return PB.getUserFromCache(999)
    //   .then(() => { throw new Error('Expected rejection'); })
    //   .catch(err => {
    //     // TODO: assert the error string
    //     assert.equal(err, 'User not found');
    //   });
  });

  it('ORD: getPriceFromCache - A/B resolve and X reject', () => {
    // TODO:
    // 1) Chain .then to check 'A' => 100, 'B' => 50
    // 2) Then attempt 'X' and assert it rejects with "Price not found"
    return ORD.getPriceFromCache('A').then(pA => {
      // assert.equal(pA, 100);
      return ORD.getPriceFromCache('B');
    }).then(pB => {
      // assert.equal(pB, 50);
      return ORD.getPriceFromCache('X');
    }).then(() => {
      throw new Error('Expected rejection for unknown product');
    }, err => {
      // assert.equal(err, 'Price not found');
      assert.ok(true, 'TODO: replace with real assertion');
    });
  });

  it('FEED: getUserFromCache - success & failure', () => {
    // TODO: success for id=1, failure for other id
    return FEED.getUserFromCache(1).then(u => {
      // assert.deepEqual(u, { id:1, name:'Alice' });
      return FEED.getUserFromCache(2);
    }).then(() => {
      throw new Error('Expected rejection');
    }, err => {
      // assert.equal(err, 'User not found');
      assert.ok(true, 'TODO: replace with real assertion');
    });
  });
});

// -----------------------------------------------------------------------------
// SECTION 2: Chaining (remember to `return` inside .then)
// -----------------------------------------------------------------------------
describe('Chaining with .then (sequential steps)', () => {
  it('PB: getUserFromCache -> getProfile', () => {
    // TODO:
    // 1) Return PB.getUserFromCache(1)
    // 2) In .then(user => ...), RETURN PB.getProfile(user)
    // 3) In next .then(profile => ...), assert profile shape
    return PB.getUserFromCache(1)
      .then(user => {
        // return PB.getProfile(user);
        // (without return, next then won't wait properly)
        return PB.getProfile(user); // leave this line, replace assertion below
      })
      .then(profile => {
        // assert.deepEqual(profile, { id:1, name:'Alice', age:20 });
        assert.ok(true, 'TODO: replace with real assertion');
      });
  });

  it('ORD: subtotal -> shipping -> total', () => {
    // TODO:
    // 1) Build a cart: [{id:'A', qty:2}, {id:'B', qty:3}] -> expected subtotal 350
    // 2) Chain calcOrderSubtotal(cart) -> then add shipping fee via getShippingFee(address)
    const cart = [{ id: 'A', qty: 2 }, { id: 'B', qty: 3 }];
    return ORD.calcOrderSubtotal(cart)
      .then(sub => {
        // assert.equal(sub, 350);
        return ORD.getShippingFee({ city: 'HN' }).then(fee => sub + fee);
      })
      .then(total => {
        // assert.ok(total > 350);
        // assert.equal(typeof total, 'number');
        assert.ok(true, 'TODO: replace with real assertions');
      });
  });

  it('UP: compressThenUpload chains correctly', () => {
    // TODO: compressThenUpload('b.jpg', 200) should resolve { name:'b.jpg', sizeKb:100, status:'uploaded' }
    return UP.compressThenUpload('b.jpg', 200).then(info => {
      // assert.deepEqual(info, { name:'b.jpg', sizeKb:100, status:'uploaded' });
      assert.ok(true, 'TODO: replace with real assertion');
    });
  });
});

// -----------------------------------------------------------------------------
// SECTION 3: Parallel with Promise.all
// -----------------------------------------------------------------------------
describe('Parallel with Promise.all', () => {
  it('PB: user + posts', () => {
    // TODO: run both in parallel & destructure results
    return Promise.all([PB.getUserFromCache(1), PB.getPosts(1)])
      .then(([user, posts]) => {
        // assert.deepEqual(user, { id:1, name:'Alice' });
        // assert.deepEqual(posts, ['Post1 of 1', 'Post2 of 1']);
        assert.ok(true, 'TODO: replace with real assertions');
      });
  });

  it('FEED: user + notifications', () => {
    // TODO: run cache + notifications together
    return Promise.all([FEED.getUserFromCache(1), FEED.getNotifications(1)])
      .then(([u, ns]) => {
        // assert.deepEqual(u, { id:1, name:'Alice' });
        // assert.deepEqual(ns, ['N1 for 1','N2 for 1']);
        assert.ok(true, 'TODO: replace with real assertions');
      });
  });

  it('ORD: all rejects if any rejects', () => {
    // TODO: make at least one promise reject and assert Promise.all rejects
    return Promise.all([ORD.getPriceFromCache('X'), ORD.getPriceFromCache('A')])
      .then(() => {
        throw new Error('Expected Promise.all to reject');
      })
      .catch(err => {
        // assert.ok(err);
        assert.ok(true, 'TODO: replace with real assertion');
      });
  });
});

// -----------------------------------------------------------------------------
// SECTION 4: Race (timeouts, first result wins)
// -----------------------------------------------------------------------------
describe('Race with Promise.race (timeouts)', () => {
  it('PB: race slow user vs timeout -> expect timeout', () => {
    return Promise.race([PB.getUserSlow(1), PB.timeout(1000)])
      .then(() => {
        throw new Error('Expected race to reject due to timeout');
      })
      .catch(err => {
        // assert.equal(err, 'Timeout!');
        assert.ok(true, 'TODO: replace with real assertion');
      });
  });

  it('ORD: getProductFastOrTimeout rejects when timeout wins', () => {
    return ORD.getProductFastOrTimeout('Y')
      .then(() => { throw new Error('Expected rejection'); })
      .catch(err => {
        // assert.equal(err, 'Timeout!');
        assert.ok(true, 'TODO: replace with real assertion');
      });
  });

  it('UP: uploadWithTimeout rejects when timeout wins', () => {
    return UP.uploadWithTimeout('slow.iso', 500)
      .then(() => { throw new Error('Expected rejection'); })
      .catch(err => {
        // assert.equal(err, 'Timeout!');
        assert.ok(true, 'TODO: replace with real assertion');
      });
  });
});

// -----------------------------------------------------------------------------
// SECTION 5: Shape the API (always return a Promise)
// -----------------------------------------------------------------------------
describe('Shape the API (always return a Promise)', () => {
  it('PB: getUser returns a Promise for both fast and slow paths', () => {
    // TODO:
    // 1) Fast path: id=1 -> resolved object
    // 2) Check typeof PB.getUser(1).then === 'function'
    // 3) Slow path: id!=1 -> eventually resolves to SlowUser
    return PB.getUser(1)
      .then(u => {
        // assert.deepEqual(u, { id:1, name:'Alice' });
        // assert.equal(typeof PB.getUser(1).then, 'function');
        return PB.getUser(2);
      })
      .then(u2 => {
        // assert.deepEqual(u2, { id:2, name:'SlowUser' });
        assert.ok(true, 'TODO: replace with real assertions');
      });
  });

  it('ORD: getProduct returns a Promise across branches', () => {
    // TODO: 'A' -> instant; others -> slow details
    return ORD.getProduct('A').then(p => {
      // assert.deepEqual(p, { id:'A', price: 100 });
      // assert.equal(typeof ORD.getProduct('A').then, 'function');
      return ORD.getProduct('Z');
    }).then(p2 => {
      // assert.deepEqual(p2, { id:'Z', name:'Slow-Z' });
      assert.ok(true, 'TODO: replace with real assertions');
    });
  });
});

// -----------------------------------------------------------------------------
// BONUS: Timing assertion pattern (optional)
// -----------------------------------------------------------------------------
describe('Timing pattern (optional check)', () => {
  it('ORD: getProductDetailsSlow takes ~50ms', () => {
    const start = Date.now();
    return ORD.getProductDetailsSlow('X').then(p => {
      const elapsed = Date.now() - start;
      // assert.ok(elapsed >= 45, 'should be ~50ms delay');
      // assert.deepEqual(p, { id:'X', name:'Slow-X' });
      assert.ok(true, 'TODO: replace with real assertions');
    });
  });

  it('UP: uploadFile takes ~40ms', () => {
    const start = Date.now();
    return UP.uploadFile('a.txt', 100).then(info => {
      const elapsed = Date.now() - start;
      // assert.ok(elapsed >= 35, 'should delay ~40ms');
      // assert.deepEqual(info, { name:'a.txt', sizeKb:100, status:'uploaded' });
      assert.ok(true, 'TODO: replace with real assertions');
    });
  });
});
