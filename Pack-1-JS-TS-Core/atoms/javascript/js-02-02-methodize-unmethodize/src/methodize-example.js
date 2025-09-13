// methodize-examples/index.js (ESM)

// 0) Helpers
export function methodize(fn, ...preset) {
  if (typeof fn !== 'function') throw new TypeError('methodize: fn must be a function');
  return function (...args) {
    return fn(this, ...preset, ...args);
  };
}

export function methodizeChain(fn, ...preset) {
  if (typeof fn !== 'function') throw new TypeError('methodizeChain: fn must be a function');
  return function (...args) {
    fn(this, ...preset, ...args);
    return this;
  };
}

// 1) Counter (mutator vs accessor)
export function add(obj, step = 1) { obj.value = (obj.value ?? 0) + step; }
export function reset(obj) { obj.value = 0; }
export function get(obj) { return obj.value ?? 0; }

export function makeCounter(initial = 0) {
  const counter = { value: initial };
  counter.add = methodizeChain(add);
  counter.reset = methodizeChain(reset);
  counter.get = methodize(get);
  return counter;
}

// 2) Settings (preset + chain)
export function set(obj, key, val) { obj[key] = val; }
export function toggle(obj, key) { obj[key] = !obj[key]; }
export function setPrefixed(obj, prefix, key, val) { obj[prefix + key] = val; }
export function has(obj, key) { return !!obj[key]; }

export function makeSettings() {
  const s = {};
  s.set = methodizeChain(set);
  s.toggle = methodizeChain(toggle);
  s.has = methodize(has);
  s.setDev = methodizeChain(setPrefixed, 'dev:');
  return s;
}

// 3) Pipe (functional-first → method-first)
export function pipe(obj, ...fns) {
  return fns.reduce((acc, f) => f(acc), obj);
}
export const pipeM = methodize(pipe);

// 4) QueryBuilder (tiny DSL)
export function where(obj, field, op, value) {
  obj.filters.push({ field, op, value }); return obj;
}
export function orderBy(obj, field, dir = 'asc') {
  obj.orders.push({ field, dir }); return obj;
}
export function limit(obj, n) {
  obj.limitN = n; return obj;
}
export function buildQB(obj) {
  return { filters: obj.filters, orders: obj.orders, limit: obj.limitN ?? null };
}

export function QB() { this.filters = []; this.orders = []; this.limitN = null; }
QB.prototype.where = methodizeChain(where);
QB.prototype.orderBy = methodizeChain(orderBy);
QB.prototype.limit = methodizeChain(limit);
QB.prototype.build = methodize(buildQB);

// 5) DOM helpers (browser-only) — left here for reference, not tested in Node
export function addClass(obj, cls) { obj.classList.add(cls); }
export function removeClass(obj, cls) { obj.classList.remove(cls); }
export function text(obj) { return obj.textContent?.trim() ?? ""; }
// Example usage in browser console:
// const el = document.querySelector('#title');
// el.addClass = methodizeChain(addClass);
// el.removeClass = methodizeChain(removeClass);
// el.text = methodize(text);

// 6) HTTP tiny client (mock)
export function setHeader(obj, key, val) { (obj.headers ??= {})[key] = val; return obj; }
export function setBase(obj, base) { obj.base = base; return obj; }
export function buildURL(obj, path) { return (obj.base ?? '') + path; }

export function Client() { this.headers = {}; this.base = ''; }
Client.prototype.setHeader = methodizeChain(setHeader);
Client.prototype.baseURL = methodizeChain(setBase);
Client.prototype.url = methodize(buildURL);

// 7) EventEmitter (mini)
export function on(obj, evt, handler) {
  (obj._evts ??= {})[evt] ??= [];
  obj._evts[evt].push(handler);
  return obj;
}
export function emit(obj, evt, ...args) {
  (obj._evts?.[evt] ?? []).forEach(h => h(...args));
}

export function EE() {}
EE.prototype.on = methodizeChain(on);
EE.prototype.emit = methodize(emit);

// 8) Validator (mini)
export function rule(obj, name, fn) { (obj.rules ??= []).push({ name, fn }); return obj; }
export function validate(obj, value) {
  const failed = (obj.rules ?? []).find(r => !r.fn(value));
  return failed ? { ok: false, fail: failed.name } : { ok: true };
}

export function V() { this.rules = []; }
V.prototype.rule = methodizeChain(rule);
V.prototype.check = methodize(validate);
