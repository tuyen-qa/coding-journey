import assert from 'node:assert/strict';
import { compare, isSameValueZero, sameValue } from '../src/index.js';

// --- compare ---
assert.deepEqual(
    compare(5, "5"),
    { loose: true, strict: false, objectIs: false }
);

assert.deepEqual(
    compare(NaN, NaN),
    { loose: false, strict: false, objectIs: true }
);

assert.deepEqual(
    compare(0, -0),
    { loose: true, strict: true, objectIs: false }
);

assert.deepEqual(
    compare({}, {}),
    { loose: false, strict: false, objectIs: false }
);

assert.deepEqual(
    compare([1], "1"),
    { loose: true, strict: false, objectIs: false }
);

assert.deepEqual(
    compare(null, undefined),
    { loose: true, strict: false, objectIs: false }
);

assert.deepEqual(
    compare("a", new String("a")),
    { loose: true, strict: false, objectIs: false }
);

assert.deepEqual(
    compare(Symbol("x"), Symbol("x")),
    { loose: false, strict: false, objectIs: false }
);

// --- isSameValueZero ---
assert.equal(isSameValueZero(NaN, NaN), true);
assert.equal(isSameValueZero(0, -0), true);
assert.equal(isSameValueZero("a", "a"), true);
assert.equal(isSameValueZero({}, {}), false);

// --- sameValue (optional) ---
assert.equal(sameValue(NaN, NaN), true);
assert.equal(sameValue(0, -0), false);


console.log("JS-00 OK (all tests passed)");
