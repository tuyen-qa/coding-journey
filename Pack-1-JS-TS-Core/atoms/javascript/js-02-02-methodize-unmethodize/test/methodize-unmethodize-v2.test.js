'use strict';

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { unmethodize, unmethodizeSafe, methodize, methodizeChain } from '../src/methodize-unmethodize-v2.js';

describe('unmethodize v2', () => {
  it('throws if method is not a function', () => {
    assert.throws(() => unmethodize(123), TypeError);
  });

  it('works for Array.prototype.slice on arguments', () => {
    const slice = unmethodize(Array.prototype.slice);
    function demo(){ return slice(arguments, 1); }
    assert.deepEqual(demo('a','b','c'), ['b','c']);
  });

  it('works for Object.prototype.hasOwnProperty on object "trần"', () => {
    const o = Object.create(null);
    o.x = 1;
    const hasOwn = unmethodize(Object.prototype.hasOwnProperty);
    const res = hasOwn(o, 'x');
    const res2 = hasOwn(o, 'y');
    assert.deepEqual(hasOwn(o, "x"), true);
    assert.deepEqual(hasOwn(o, "y"), false);
  });

  it('map tren array-like', () => {
    const o = {0:'<li>a</li>',1:'<li>b</li>', length:2}
    const map = unmethodize(Array.prototype.map);
    const res = map(o, e => e.replace(/<\/?li>/g, ''))
    assert.deepEqual(res, ['a', 'b'])
  });

  it('reduce cong don tren array-like', () => {
    const o = {0:1,1:2,2:3,length:3}
    const reduce = unmethodize(Array.prototype.reduce);
    const res = reduce(o, (acc, curr) => acc + curr);
    assert.deepEqual(res, 6)
  });
});

describe('unmethodizeSafe (optional)', () => {
  it('adapts primitive string into object with name', () => {
    const user = { sayHi(){ return 'Hi ' + this.name; } };
    const adapt = x => (typeof x === 'object' ? x : { name: String(x) })
    const safeSayHi = unmethodizeSafe(user.sayHi, adapt);
    assert.equal(safeSayHi({ name:'Alice' }), 'Hi Alice');
    assert.equal(safeSayHi('Tuyen'), 'Hi Tuyen');
  });

  it('no passing adapts as param', () => {
    const user = { sayHi(){ return 'Hi ' + this.name; } };
    const safeSayHi = unmethodizeSafe(user.sayHi);
    assert.equal(safeSayHi({ name:'Alice' }), 'Hi Alice');
  });
});

describe('methodize v2', () => {
  it('throws if fn is not a function', () => {
    assert.throws(() => methodize(null), TypeError);
  });

  it('passes this as first arg; supports preset', () => {
    function setWithPrefix(obj, prefix, key, val){
      obj[prefix + key] = val;
      return obj;
    }
    const o = { };
    o.set = methodize(setWithPrefix, 'x_'); // preset 'x_'
    assert.equal(o.set('age', 20), o);
    assert.equal(o.x_age, 20);
  });
});

describe('methodizeChain (optional)', () => {
  it('always returns this for chaining', () => {
    function addOne(obj){ obj.n = (obj.n||0) + 1; }
    const o = { n: 0 };
    o.bump = methodizeChain(addOne);
    const ret = o.bump().bump();
    assert.equal(ret, o);
    assert.equal(o.n, 2);
  });
});
