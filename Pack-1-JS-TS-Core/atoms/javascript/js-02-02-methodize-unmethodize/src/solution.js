'use strict';

/**
 * Assignment: Methodize & Unmethodize (practical, simple)
 * Exports:
 * - unmethodize, methodize
 * - slice, map, forEach (unmethodized from Array.prototype.*)
 * - hasOwn (unmethodized from Object.prototype.hasOwnProperty)
 * - set/get/toggle (plain) + methodized usage examples
 * - append (plain) + appendWith(prefix) (returns a methodized fn with partial)
 * - SB (StringBuilder mini DSL) + createSB()
 * - QB (QueryBuilder mini DSL) + createQB()
 * - pipePlain (plain) + pipeMethod (methodized helper)
 */

/* ==========  Core helpers  ========== */

/**
 * unmethodize(method)
 * Convert a method that depends on `this` into a plain function:
 *   (obj, ...args) => method.call(obj, ...args)
 */
export function unmethodize(method) {
  if (typeof method !== 'function') {
    throw new TypeError('unmethodize: method must be a function');
  }
  return function (obj, ...args) {
    return method.call(obj, ...args);
  };
}

/**
 * methodize(fn, ...preset)
 * Convert a plain function (obj, ...args) into a method that uses `this`.
 * Supports partial arguments via ...preset.
 */
export function methodize(fn, ...preset) {
  if (typeof fn !== 'function') {
    throw new TypeError('methodize: fn must be a function');
  }
  return function (...args) {
    return fn(this, ...preset, ...args);
  };
}

/* ==========  Unmethodized built-ins for array-like  ========== */

export const slice   = unmethodize(Array.prototype.slice);
export const map     = unmethodize(Array.prototype.map);
export const forEach = unmethodize(Array.prototype.forEach);
export const hasOwn  = unmethodize(Object.prototype.hasOwnProperty);

/* ==========  Plain utils (to be methodized where needed)  ========== */

export function set(obj, key, val) {
  obj[key] = val;
  return obj; // to allow chaining when methodized
}

export function get(obj, key, dflt) {
  return (key in obj) ? obj[key] : dflt;
}

export function toggle(obj, key) {
  obj[key] = !obj[key];
  return obj[key];
}

export function append(obj, s) {
  if (typeof obj.text !== 'string') obj.text = '';
  obj.text += s;
  return obj.text;
}

/**
 * appendWith(prefix) -> returns a method (to attach on an object)
 * Example:
 *   const o = { text: '' };
 *   o.append = methodize(append);
 *   o.appendInfo = appendWith('[info] ');
 *   o.append('hi');           // 'hi'
 *   o.appendInfo(' world');   // 'hi[info]  world'
 */
export function appendWith(prefix) {
  return methodize((obj, pfx, s) => append(obj, pfx + s), prefix);
}

/* ==========  StringBuilder (mini fluent DSL)  ========== */

export function sbInit(obj)  { obj.buf = []; return obj; }
export function sbAdd(obj, s){ if (!obj.buf) obj.buf = []; obj.buf.push(String(s)); return obj; }
export function sbJoin(obj, sep = '') { return (obj.buf || []).join(sep); }

export const SB = {
  init: methodize(sbInit),
  add:  methodize(sbAdd),
  join: methodize(sbJoin),
};

export function createSB() {
  // simple factory with SB as prototype so methods are available
  return Object.create(SB);
}

/* ==========  QueryBuilder (mini fluent DSL)  ========== */

export function qbInit(obj)       { obj._q = { where: [], limit: null }; return obj; }
export function qbWhere(obj, cnd) { obj._q.where.push(cnd); return obj; }
export function qbLimit(obj, n)   { obj._q.limit = n; return obj; }
export function qbBuild(obj) {
  const w = obj._q.where.length ? obj._q.where.join(' AND ') : '1=1';
  const l = (obj._q.limit != null) ? (' LIMIT ' + obj._q.limit) : '';
  return `SELECT * FROM T WHERE ${w}${l}`;
}

export const QB = {
  init:  methodize(qbInit),
  where: methodize(qbWhere),
  limit: methodize(qbLimit),
  build: methodize(qbBuild),
};

export function createQB() {
  return Object.create(QB);
}

/* ==========  Pipe (plain -> method)  ========== */

export function pipePlain(obj, ...fns) {
  for (const fn of fns) {
    fn(obj);
  }
  return obj;
}

export const pipeMethod = methodize((obj, ...fns) => pipePlain(obj, ...fns));
