import { describe, it} from "node:test";
import assert from "node:assert/strict";

import {
    varHoistProbe,
    letConstTDZProbe,
    callFooBeforeDeclaration,
    callBarBeforeInit,
    scopeLeakDemo,
    loopIndexAfterFor,
    arrowBeforeInit,
    makeCounter,
    squareCached
} from "../src/index.js"

describe("Hoisting & Scope - Your Tests", () => {
    it("varHoistProbe: first read is undefined, afterAssign is 10", () => {
        const res = varHoistProbe();
        assert.deepEqual(res, {firstRead: undefined, afterAssign: 10})
    });

    it("letConstTDZProbe: throws ReferenceError due to TDZ", () => {
        assert.throws(() => letConstTDZProbe(), ReferenceError);
    });

    it("callFooBeforeDeclaration returns 'foo'", () => {
        assert.equal(callFooBeforeDeclaration(), "foo");
    });

    it("callBarBeforeInit throws TypeError", () => {
        assert.throws(() => callBarBeforeInit(), TypeError);
    });

    it("scopeLeakDemo: var leaks, let is block-scoped", () => {
        const {varOutside, letAccessOk} = scopeLeakDemo();
        assert.equal(varOutside, 1);
        assert.equal(letAccessOk, false);
    });

    it('loopIndexAfterFor("var"): i is N after loop', () => {
        assert.equal(loopIndexAfterFor("var", 3), 3);
    });

    it('loopIndexAfterFor("let"): reading i outside throws ReferenceError', () => {
        assert.throws(() => loopIndexAfterFor("let"), ReferenceError);
    });

    it("arrowBeforeInit: behaves like function expression (TypeError)", () => {
        assert.throws(() => arrowBeforeInit(), TypeError);
    });
})

describe("makeCounter closure", () => {
    it("makeCounter returns function", () => {
        const c = makeCounter();
        assert.equal(typeof c, "function");
    });

    it("counter starts from given start value", () => {
        const c = makeCounter(5);
        assert.equal(c(), 6);
        assert.equal(c(), 7);
    });

    it("separate counters have independent state", () => {
        const c1 = makeCounter(0);
        const c2 = makeCounter(10);
        assert.equal(c1(), 1);
        assert.equal(c1(), 2);
        assert.equal(c2(), 11);
        assert.equal(c2(), 12);
    });

    it("default start is 0", () => {
        const c = makeCounter();
        assert.equal(c(), 1);
    });
})

describe("cache basic using global variable", () => {

    function makeSpy(fn) {
        let calls = 0
        makeSpy.calls = () => calls;
        return fn
    }

    it("returns same result for same input", () => {
        assert.equal(squareCached(5), 25);
        assert.equal(squareCached(5), 25);
    })
})
