// test/orders-basic.test.js
'use strict';

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  getPriceFromCache,
  getShippingFee,
  calcOrderSubtotal,
  calcOrderTotal,
  getProductDetailsSlow,
  timeout,
  getProductFastOrTimeout,
  getProduct,
  smallDelay
} from '../src/orders-basic.js';

describe('orders-basic (Promise practice)', () => {
  it('B1: getPriceFromCache resolves known ids and rejects unknown', () => {
    return getPriceFromCache('A').then(p => {
      assert.equal(p, 100);
      return getPriceFromCache('B');
    }).then(p => {
      assert.equal(p, 50);
      return getPriceFromCache('X');
    }).then(() => {
      throw new Error('Expected rejection for unknown product');
    }, err => {
      assert.equal(err, 'Price not found');
    });
  });

  it('B2: calcOrderSubtotal chains over items using Promise.all', () => {
    const cart = [{id:'A', qty:2}, {id:'B', qty:3}]; // 2*100 + 3*50 = 350
    return calcOrderSubtotal(cart).then(sum => assert.equal(sum, 350));
  });

  it('B2: calcOrderTotal adds shipping fee', () => {
    const cart = [{id:'A', qty:1}]; // 100
    return calcOrderTotal(cart, { city: 'HN' }).then(total => {
      // Expect shipping fee was added (e.g., +10)
      assert.ok(total > 100, 'total should be greater than subtotal');
      assert.equal(typeof total, 'number');
    });
  });

  it('B3: getProductDetailsSlow resolves after ~50ms', () => {
    const start = Date.now();
    return getProductDetailsSlow('X').then(p => {
      const elapsed = Date.now() - start;
      assert.ok(elapsed >= 45, 'should be ~50ms delay');
      assert.deepEqual(p, { id:'X', name:'Slow-X' });
    });
  });

  it('B3: timeout rejects earlier than slow details via race', () => {
    return getProductFastOrTimeout('Y')
      .then(() => { throw new Error('Expected race to reject'); })
      .catch(err => assert.equal(err, 'Timeout!'));
  });

  it('B4: getProduct always returns a Promise', () => {
    return getProduct('A').then(p => {
      assert.deepEqual(p, { id:'A', price: 100 });
      assert.equal(typeof getProduct('A').then, 'function');
    });
  });
});
