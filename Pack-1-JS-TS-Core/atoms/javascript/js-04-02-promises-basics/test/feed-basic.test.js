// test/feed-basic.test.js
'use strict';

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  getUserFromCache,
  getFeedForUser,
  getNotifications,
  getUserFromNetworkSlow,
  timeout,
  getUserFromCacheOrNetwork
} from '../src/feed-basic.js';

describe('feed-basic (Promise practice)', () => {
  it('B1: cache resolve/reject', () => {
    return getUserFromCache(1).then(u => {
      assert.deepEqual(u, { id:1, name:'Alice' });
      return getUserFromCache(2);
    }).then(() => {
      throw new Error('Expected rejection for id!=1');
    }, err => assert.equal(err, 'User not found'));
  });

  it('B2: chain user -> feed', () => {
    return getUserFromCache(1)
      .then(getFeedForUser)
      .then(feed => {
        assert.deepEqual(feed, ['Feed for Alice #1','Feed for Alice #2']);
      });
  });

  it('B3: parallel user + notifications via Promise.all', () => {
    return Promise.all([getUserFromCache(1), getNotifications(1)])
      .then(([u, ns]) => {
        assert.deepEqual(u, { id:1, name:'Alice' });
        assert.deepEqual(ns, ['N1 for 1','N2 for 1']);
      });
  });

  it('B4: race cache-miss -> network vs timeout', () => {
    return getUserFromCacheOrNetwork(99)
      .then(() => { throw new Error('Expected timeout to win'); })
      .catch(err => assert.equal(err, 'Timeout!'));
  });
});
