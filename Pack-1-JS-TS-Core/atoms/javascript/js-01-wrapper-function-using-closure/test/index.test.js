import {describe, it} from "node:test"
import assert from "node:assert/strict"

import {logWrapper, once, timeWrapper} from "../src/index.js"
const add = (a,b) => a + b;

describe("once(fn)", () => {
    it("fn should only call 1 time", () => {
        const addOnce = once(add);
        const res = addOnce(2,3);
        const res2 = addOnce(3,4);
        assert.deepEqual(res, 5);
        assert.deepEqual(res2, 7);
    })
});

describe("logWrapper", () => {
    it("should log and returns correct result", () => {
        const addLogged = logWrapper(add);
        assert.equal(addLogged(1,2), 3);
    })
});

describe("timeWrapper", () => {
    it("should log time and returns correct result", () => {
        const addLoggedTime = timeWrapper(add);
        assert.equal(addLoggedTime(1,2), 3);
    })
});
