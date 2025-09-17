// test/upload-basic.test.js
'use strict';

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  uploadFile,
  compressFile,
  compressThenUpload,
  uploadMany,
  uploadSlow,
  timeout,
  uploadWithTimeout
} from '../src/upload-basic.js';

describe('upload-basic (Promise practice)', () => {
  it('B1: uploadFile resolves with uploaded object', () => {
    const start = Date.now();
    return uploadFile('a.txt', 100).then(info => {
      const elapsed = Date.now() - start;
      assert.ok(elapsed >= 35, 'should delay ~40ms');
      assert.deepEqual(info, { name:'a.txt', sizeKb:100, status:'uploaded' });
    });
  });

  it('B2: compressThenUpload chains correctly', () => {
    return compressThenUpload('b.jpg', 200).then(info => {
      assert.deepEqual(info, { name:'b.jpg', sizeKb:100, status:'uploaded' });
    });
  });

  it('B3: uploadMany runs in parallel via Promise.all', () => {
    const files = [{name:'x.bin', sizeKb:50}, {name:'y.bin', sizeKb:60}];
    return uploadMany(files).then(results => {
      assert.equal(results.length, 2);
      assert.deepEqual(results[0], { name:'x.bin', sizeKb:50, status:'uploaded' });
      assert.deepEqual(results[1], { name:'y.bin', sizeKb:60, status:'uploaded' });
    });
  });

  it('B4: uploadWithTimeout rejects when timeout wins', () => {
    return uploadWithTimeout('slow.iso', 500)
      .then(() => { throw new Error('Expected rejection'); })
      .catch(err => assert.equal(err, 'Timeout!'));
  });
});
