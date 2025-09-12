'use strict';

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  // helpers
  unmethodize, methodize,
  // array-like utilities
  slice, map, forEach, hasOwn,
  // plain utils + methodized usage
  set, get, toggle, append, appendWith,
  // StringBuilder DSL
  SB, createSB,
  // QueryBuilder DSL
  QB, createQB,
  // pipe
  pipePlain, pipeMethod
} from '../src/solution.js';

/* ==========  1) Unmethodize built-ins for array-like  ========== */

describe('unmethodize + array-like', () => {
  it('slice(arguments, 1) returns a real array', () => {
    function demo() { return slice(arguments, 1); }
    const arr = demo('x', 'y', 'z');
    assert.equal(Array.isArray(arr), true);
    assert.deepEqual(arr, ['y','z']);
  });

  it('slice on a pseudo array-like object', () => {
    const like = { 0: 'a', 1: 'b', length: 2 };
    const arr = slice(like, 0);
    assert.equal(Array.isArray(arr), true);
    assert.deepEqual(arr, ['a','b']);
  });

  it('map/forEach on array-like', () => {
    const list = { 0: '<li>a</li>', 1: '<li>b</li>', length: 2 };
    const xs = map(list, s => s.replace(/<\/?li>/g, '')); // ['a','b']
    assert.deepEqual(xs, ['a', 'b']);

    const seen = [];
    forEach(list, (v, i) => seen.push([i, v]));
    assert.deepEqual(seen, [[0,'<li>a</li>'], [1,'<li>b</li>']]);
  });

  it('hasOwn works on Object.create(null)', () => {
    const o = Object.create(null);
    o.x = 1;
    assert.equal(hasOwn(o, 'x'), true);
    assert.equal(hasOwn(o, 'y'), false);
  });
});

/* ==========  2) Methodize: create friendly .dot APIs  ========== */

describe('methodize basic set/get/toggle', () => {
  it('set/get/toggle as methods with chaining', () => {
    const o = { name: 'Alice' };
    o.set = methodize(set);
    o.get = methodize(get);
    o.toggle = methodize(toggle);

    assert.equal(o.set('age', 20), o);
    assert.equal(o.get('age'), 20);

    assert.equal(o.toggle('active'), true);
    assert.equal(o.toggle('active'), false);
  });
});

describe('append + appendWith(prefix) method', () => {
  it('append keeps accumulating text; appendWith adds prefix', () => {
    const o = { text: '' };
    o.append = methodize(append);
    o.appendInfo = appendWith('[info] ');
    assert.equal(o.append('hi'), 'hi');
    assert.equal(o.appendInfo(' world'), 'hi[info]  world');
    assert.equal(o.text, 'hi[info]  world');
  });
});

/* ==========  3) Mini Fluent DSLs  ========== */

describe('StringBuilder DSL (SB)', () => {
  it('SB chaining: init -> add -> join', () => {
    const b = createSB();
    const out = b.init().add('Hello').add(' ').add('World').join('');
    assert.equal(out, 'Hello World');
  });
});

describe('QueryBuilder DSL (QB)', () => {
  it('QB chaining: init -> where -> limit -> build', () => {
    const q = createQB();
    const sql = q
      .init()
      .where('age > 18')
      .where("name LIKE 'A%'")
      .limit(10)
      .build();
    assert.equal(sql, "SELECT * FROM T WHERE age > 18 AND name LIKE 'A%' LIMIT 10");
  });

  it('QB defaults when no where/limit', () => {
    const q = createQB();
    const sql = q.init().build();
    assert.equal(sql, "SELECT * FROM T WHERE 1=1");
  });
});

/* ==========  4) Pipe DSL (optional taste)  ========== */

describe('pipePlain & pipeMethod', () => {
  it('pipePlain applies fns in order', () => {
    const o = {};
    pipePlain(
      o,
      obj => obj.a = 1,
      obj => obj.b = obj.a + 1
    );
    assert.deepEqual(o, { a: 1, b: 2 });
  });

  it('pipeMethod enables .pipe(...) chaining style', () => {
    const o = { pipe: pipeMethod };
    o
      .pipe(obj => obj.a = 2)
      .pipe(obj => obj.b = obj.a * 3);
    assert.deepEqual(o, { pipe: o.pipe, a: 2, b: 6 });
  });
});
