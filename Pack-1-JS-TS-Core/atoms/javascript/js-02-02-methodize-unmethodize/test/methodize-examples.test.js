// methodize-examples/index.test.js (ESM, run with: node --test)
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  methodize, methodizeChain,
  makeCounter, add, reset, get,
  makeSettings, set, toggle, setPrefixed, has,
  pipe, pipeM,
  QB, where, orderBy, limit, buildQB,
  Client, setHeader, setBase, buildURL,
  EE, on, emit,
  V, rule, validate
} from '../src/methodize-example.js';

describe('helpers', () => {
  it('methodize wraps a pure fn (obj,...args) into a method', () => {
    function greet(obj, x) { return `Hi ${obj.name}${x}`; }
    const o = { name: 'Alice' };
    o.greet = methodize(greet, '!'); // preset '!'
    assert.equal(o.greet(), 'Hi Alice!');
  });

  it('methodizeChain enables chaining for mutators', () => {
    function bump(obj, n=1) { obj.n = (obj.n||0)+n; }
    const o = { n: 0 };
    o.bump = methodizeChain(bump, 2);
    const ret = o.bump().bump(); // +2 each
    assert.equal(o.n, 4);
    assert.equal(ret, o); // chain returns this
  });
});

describe('1) Counter', () => {
  it('add/reset/get works & chains', () => {
    const c = makeCounter(0);
    c.add(2).add().add(3).reset().add(5);
    assert.equal(c.get(), 5);
  });
});

describe('2) Settings', () => {
  it('set/toggle/has and preset prefix', () => {
    const s = makeSettings();
    s.set('dark', false).toggle('dark').setDev('lang', 'vi');
    assert.equal(s.has('dark'), true);
    assert.equal(s['dev:lang'], 'vi');
  });
});

describe('3) Pipe', () => {
  it('pipe (pure) and methodized version return expected object', () => {
    const box = { x: 2 };
    box.pipe = pipeM;
    const res = box.pipe(
      o => ({ ...o, x: o.x + 1 }),
      o => ({ ...o, y: o.x * 10 }),
      o => ({ ...o, label: `v=${o.x},y=${o.y}` })
    );
    assert.deepEqual(res, { x: 3, y: 30, label: 'v=3,y=30' });
  });
});

describe('4) QueryBuilder', () => {
  it('where/orderBy/limit/build produce the right snapshot', () => {
    const q = new QB()
      .where('age', '>=', 18)
      .orderBy('createdAt', 'desc')
      .limit(10)
      .build();
    assert.deepEqual(q, {
      filters: [{ field: 'age', op: '>=', value: 18 }],
      orders: [{ field: 'createdAt', dir: 'desc' }],
      limit: 10
    });
  });
});

describe('6) HTTP Client', () => {
  it('baseURL + setHeader + url', () => {
    const api = new Client()
      .baseURL('https://api.example.com')
      .setHeader('Authorization', 'Bearer token');
    assert.equal(api.url('/users'), 'https://api.example.com/users');
    assert.equal(api.headers.Authorization, 'Bearer token');
  });
});

describe('7) EventEmitter', () => {
  it('on/emit works with multiple handlers', () => {
    const log = [];
    const e = new EE();
    e.on('tick', x => log.push(['a', x]))
     .on('tick', x => log.push(['b', x]));
    e.emit('tick', 42);
    assert.deepEqual(log, [['a', 42], ['b', 42]]);
  });
});

describe('8) Validator', () => {
  it('rule/check validates properly', () => {
    const v = new V()
      .rule('notEmpty', s => s?.length > 0)
      .rule('email', s => /\S+@\S+\.\S+/.test(s));

    assert.deepEqual(v.check(''), { ok:false, fail:'notEmpty' });
    assert.deepEqual(v.check('tuyen@mail'), { ok:false, fail:'email' });
    assert.deepEqual(v.check('tuyen@mail.com'), { ok:true });
  });
});
