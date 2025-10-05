// test/callback-basic.test.js
'use strict';

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  greetUser,
  mapArray,
  delayedMessage,
  readConfig,
  loadUser,
  loadPosts,
  loadUserAndPosts
} from '../src/callback-basic.js';

describe('callback-basic (Callback practice)', () => {
  it('C1: synchronous callback returns correct value', () => {
    const result = greetUser('Tuyen', n => `Hello ${n}`);
    assert.equal(result, 'Hello Tuyen');
  });

  it('C2: mapArray applies callback to each element', () => {
    const doubled = mapArray([1,2,3], x => x*2);
    assert.deepEqual(doubled, [2,4,6]);
  });

  it('C3: delayedMessage calls callback after delay', (t, done) => {
    const start = Date.now();
    delayedMessage('Hi', 30, msg => {
      const elapsed = Date.now() - start;
      assert.ok(elapsed >= 25, 'should delay ~30ms');
      assert.equal(msg, 'Hi');
      done();
    });
  });

  it('C4: readConfig follows error-first style', (t, done) => {
    readConfig('valid.json', (err, cfg) => {
      assert.equal(err, null);
      assert.deepEqual(cfg, { env: 'dev' });
      readConfig('invalid.json', (err2, cfg2) => {
        assert.equal(err2, 'File not found');
        assert.equal(cfg2, null);
        done();
      });
    });
  });

  it('C5: loadUserAndPosts chains callbacks correctly', (t, done) => {
    loadUserAndPosts(7, (err, posts) => {
      assert.equal(err, null);
      assert.ok(Array.isArray(posts));
      assert.ok(posts[0].includes('User-7'));
      done();
    });
  });
});
