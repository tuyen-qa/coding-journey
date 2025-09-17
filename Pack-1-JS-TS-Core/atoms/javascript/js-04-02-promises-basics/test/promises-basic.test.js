// test/promises-basic.test.js
'use strict';

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  getUserFromCache,
  getProfile,
  getPosts,
  getUserSlow,
  timeout,
  getUser
} from '../src/promises-basic.js';

describe('promises-basic (User story)', () => {
  it('Bài 1: getUserFromCache resolves for id=1 and rejects otherwise', () => {
    // success case
    return getUserFromCache(1).then(user => {
      assert.deepEqual(user, { id: 1, name: 'Alice' });
      // also ensures it is a proper Promise
      assert.equal(typeof getUserFromCache(1).then, 'function');
    });
  });

  it('Bài 1 (fail path): getUserFromCache rejects for id!=1', () => {
    return getUserFromCache(2).then(() => {
      throw new Error('Expected rejection for id!=1');
    }, err => {
      assert.equal(err, 'User not found');
    });
  });

  it('Bài 2: Chain getUserFromCache -> getProfile', () => {
    return getUserFromCache(1)
      .then(user => {
        // IMPORTANT: must return here for chaining to work
        return getProfile(user);
      })
      .then(profile => {
        assert.deepEqual(profile, { id: 1, name: 'Alice', age: 20 });
      });
  });

  it('Bài 3: Promise.all to get user and posts in parallel (success)', () => {
    return Promise.all([getUserFromCache(1), getPosts(1)])
      .then(([user, posts]) => {
        assert.deepEqual(user, { id: 1, name: 'Alice' });
        assert.deepEqual(posts, ['Post1 of 1', 'Post2 of 1']);
      });
  });

  it('Bài 3 (fail path): Promise.all fails if one promise rejects', () => {
    return Promise.all([getUserFromCache(2), getPosts(2)])
      .then(() => {
        throw new Error('Expected Promise.all to reject when one promise rejects');
      })
      .catch(err => {
        // any rejection is fine here
        assert.ok(err);
      });
  });

  it('Bài 4: Promise.race with timeout should reject when timeout wins', () => {
    return Promise.race([getUserSlow(1), timeout(1000)])
      .then(() => {
        throw new Error('Expected race to reject due to timeout');
      })
      .catch(err => {
        assert.equal(err, 'Timeout!');
      });
  });

  it('Bài 5: Shape the API - getUser always returns a Promise', () => {
    // id=1 -> resolved immediately
    return getUser(1).then(user => {
      assert.deepEqual(user, { id: 1, name: 'Alice' });
      assert.equal(typeof getUser(1).then, 'function');
    });
  });

  it('Bài 5 (slow path): getUser with id!=1 resolves to SlowUser eventually', () => {
    return getUser(2).then(user => {
      assert.deepEqual(user, { id: 2, name: 'SlowUser' });
    });
  });
});
