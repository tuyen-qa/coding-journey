'use strict';

/* =========================
   Helpers
   ========================= */

/**
 * TODO: implement unmethodize(method)
 * Input: method phụ thuộc this (vd: Array.prototype.slice)
 * Output: hàm thuần (obj, ...args)
 */
export function unmethodize(method) {
    if (typeof method !== 'function') throw new TypeError(` ${method} is not a function`);
    return function (obj, ...args) {
        return method.call(obj, ...args);
    };
}

/**
 * TODO: implement methodize(fn, ...preset)
 * Input: hàm thuần (obj, ...args)
 * Output: method (this, ...args)
 */
export function methodize(fn, ...preset) {
    if (typeof fn !== 'function') throw new TypeError(` ${fn} is not a function`);
    return function (...args) {
        return fn.call(null, this, ...preset, ...args);
    };
}

/* =========================
   Array-like utilities (unmethodize)
   ========================= */

// TODO: slice = unmethodize(Array.prototype.slice)
export const slice = unmethodize(Array.prototype.slice);

// TODO: map = unmethodize(Array.prototype.map)
export const map = unmethodize(Array.prototype.map);

// TODO: forEach = unmethodize(Array.prototype.forEach)
export const forEach = unmethodize(Array.prototype.forEach);

// TODO: hasOwn = unmethodize(Object.prototype.hasOwnProperty)
export const hasOwn = unmethodize(Array.prototype.hasOwn);

/* =========================
   Plain utils
   ========================= */

// TODO: set(obj, key, val) → gán property
export function set(obj, key, val) {
    obj[key] = val;
    return obj;
}

// TODO: get(obj, key, dflt) → lấy property hoặc default
export function get(obj, key, dflt) {
    return (key in obj) ? obj[key] : dflt;
}

// TODO: toggle(obj, key) → true/false luân phiên
export function toggle(obj, key) {
    obj[key] = !obj[key];
    return obj[key];
}

// TODO: append(obj, s) → nối string vào obj.text
export function append(obj, s) {
    if (typeof obj.text !== 'string') obj.text = '';
    obj.text += s;
    return obj.text;
}

// TODO: appendWith(prefix) → method có partial prefix
export function appendWith(prefix) {
    return methodize((obj, pfx, s) => appendWith(obj, pfx + s), prefix);
}

/* =========================
   StringBuilder mini DSL
   ========================= */

// TODO: sbInit, sbAdd, sbJoin (hàm thuần)
export function sbInit(obj) {
    obj.buf = [];
    return obj;
}

export function sbAdd(obj, s) {
    if (!obj.buf) obj.buf = [];
    obj.buf.push(String(s));
    return obj;
}

export function sbJoin(obj, sep = '') {
    return (obj.buf || []).join(sep);
}

// TODO: SB object = { init, add, join } (methodized)
export const SB = {
    init: methodize(sbInit),
    add: methodize(sbAdd),
    join: methodize(sbJoin),
};

// TODO: createSB() → Object.create(SB)
export function createSB() {
    Object.create(SB);
}

/* =========================
   QueryBuilder mini DSL
   ========================= */

// TODO: qbInit, qbWhere, qbLimit, qbBuild (hàm thuần)
export function qbInit(obj) {
    obj._q = {
        where: [],
        limit: null,
    };
    return obj;
}
export function qbWhere(obj, cond) {
    obj._q.where.push(cond);
    return obj;
}
export function qbLimit(obj, n) {
    obj._q.limit = n;
    return obj;
}
export function qbBuild(obj) {
    const w = obj._q.where.length ? obj._q.where.join(' AND ') : "1=1";
    const l = (obj._q.limit != null) ? (' LIMIT ' + obj._q.limit) : '';
    return `SELECT * FROM T WHERE ${w}${l}`;
}

// TODO: QB object = { init, where, limit, build } (methodized)
export const QB = {
    init: methodize(sbInit),
    where: methodize(qbWhere),
    limit: methodize(qbLimit),
    build: methodize(qbBuild),
};

// TODO: createQB() → Object.create(QB)
export function createQB() {
    return Object.create(QB);
}

/* =========================
   Pipe mini DSL
   ========================= */

// TODO: pipePlain(obj, ...fns) → apply tuần tự fns
export function pipePlain(obj, ...fns) {
    for (const fn of fns) {
        fn(obj)
    }
    return obj;
}

// TODO: pipeMethod = methodize(pipePlain)
export const pipeMethod = methodize((obj, ...fns) => pipePlain(obj, ...fns));
