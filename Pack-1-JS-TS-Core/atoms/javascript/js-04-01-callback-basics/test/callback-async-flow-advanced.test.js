import assert from "assert";
import test from "node:test";
import {
    retryWithDelay,
    runWithLimit,
    runParallelStopOnError,
    runSeriesStopOnError,
    retryBackoff,
    processInBatches,
    race,
    waterfallWithError,
    withTimeout,
    delayedQueue,
} from "../src/callback-async-flow-advanced.js";

/**
 * Simple delay utility
 */
function delay(ms) {
    return new Promise((res) => setTimeout(res, ms));
}

/**
 * simulateAPI(successRate, delayMs, cb)
 * - Calls cb(null, "OK") with successRate% chance after delayMs
 * - Otherwise cb("Error")
 */
function simulateAPI(successRate, delayMs, cb) {
    setTimeout(() => {
        if (Math.random() * 100 < successRate) cb(null, "OK");
        else cb("Error");
    }, delayMs);
}

//////////////////////////////////////////////////////////////
// 1. retryWithDelay
//////////////////////////////////////////////////////////////
test("retryWithDelay succeeds after retries", async (t) => {
    let attempts = 0;
    const api = (cb) => {
        attempts++;
        if (attempts < 3) cb("Error");
        else cb(null, "Success");
    };
    await new Promise((res) =>
        retryWithDelay(api, 5, 20, (err, result) => {
            assert.equal(result, "Success");
            assert.equal(attempts, 3);
            res();
        })
    );
});

test("retryWithDelay fails after all attempts", async (t) => {
    let attempts = 0;
    const api = (cb) => {
        attempts++;
        cb("Fail");
    };
    await new Promise((res) =>
        retryWithDelay(api, 3, 10, (err, result) => {
            assert.equal(err, "Fail");
            assert.equal(attempts, 3);
            res();
        })
    );
});

//////////////////////////////////////////////////////////////
// 2. runWithLimit
//////////////////////////////////////////////////////////////
test("runWithLimit runs tasks respecting limit", async (t) => {
    const runOrder = [];
    const tasks = Array.from({ length: 5 }, (_, i) => (cb) => {
        runOrder.push("start-" + i);
        setTimeout(() => {
            runOrder.push("end-" + i);
            cb();
        }, 20);
    });

    await new Promise((res) =>
        runWithLimit(tasks, 2, () => {
            assert.ok(runOrder.includes("start-0"));
            assert.ok(runOrder.includes("end-4"));
            res();
        })
    );
});

//////////////////////////////////////////////////////////////
// 3. runParallelStopOnError
//////////////////////////////////////////////////////////////
test("runParallelStopOnError stops on first error", async (t) => {
    let completed = 0;
    const tasks = [
        (cb) => setTimeout(() => { completed++; cb("Err1"); }, 10),
        (cb) => setTimeout(() => { completed++; cb("Err2"); }, 50),
        (cb) => setTimeout(() => { completed++; cb(); }, 20),
    ];

    await new Promise((res) =>
        runParallelStopOnError(tasks, (err) => {
            assert.equal(err, "Err1");
            assert.ok(completed >= 1);
            res();
        })
    );
});

test("runParallelStopOnError all succeed", async (t) => {
    const tasks = [
        (cb) => setTimeout(() => cb(), 10),
        (cb) => setTimeout(() => cb(), 20),
    ];
    await new Promise((res) =>
        runParallelStopOnError(tasks, (err) => {
            assert.equal(err, null);
            res();
        })
    );
});

//////////////////////////////////////////////////////////////
// 4. runSeriesStopOnError
//////////////////////////////////////////////////////////////
test("runSeriesStopOnError stops at error", async (t) => {
    const order = [];
    const tasks = [
        (cb) => { order.push(1); cb(); },
        (cb) => { order.push(2); cb("Fail"); },
        (cb) => { order.push(3); cb(); },
    ];

    await new Promise((res) =>
        runSeriesStopOnError(tasks, (err) => {
            assert.equal(err, "Fail");
            assert.deepEqual(order, [1, 2]);
            res();
        })
    );
});

test("runSeriesStopOnError completes all without error", async (t) => {
    const order = [];
    const tasks = [
        (cb) => { order.push("A"); cb(); },
        (cb) => { order.push("B"); cb(); },
    ];
    await new Promise((res) =>
        runSeriesStopOnError(tasks, (err) => {
            assert.equal(err, null);
            assert.deepEqual(order, ["A", "B"]);
            res();
        })
    );
});

//////////////////////////////////////////////////////////////
// 5. retryBackoff
//////////////////////////////////////////////////////////////
test("retryBackoff doubles delay and succeeds eventually", async (t) => {
    let attempts = 0;
    const api = (cb) => {
        attempts++;
        if (attempts < 3) cb("Error");
        else cb(null, "OK");
    };
    await new Promise((res) =>
        retryBackoff(api, 5, 10, (err, result) => {
            assert.equal(result, "OK");
            assert.ok(attempts >= 3);
            res();
        })
    );
});

//////////////////////////////////////////////////////////////
// 6. processInBatches
//////////////////////////////////////////////////////////////
test("processInBatches processes all items in correct batches", async (t) => {
    const items = [1, 2, 3, 4, 5];
    const batches = [];
    const processor = (batch, cb) => {
        batches.push(batch);
        cb();
    };
    await new Promise((res) =>
        processInBatches(items, 2, processor, () => {
            assert.deepEqual(batches, [[1, 2], [3, 4], [5]]);
            res();
        })
    );
});

//////////////////////////////////////////////////////////////
// 7. race
//////////////////////////////////////////////////////////////
test("race returns first completed result", async (t) => {
    const tasks = [
        (cb) => setTimeout(() => cb(null, "B"), 30),
        (cb) => setTimeout(() => cb(null, "A"), 10),
        (cb) => setTimeout(() => cb(null, "C"), 50),
    ];

    await new Promise((res) =>
        race(tasks, (err, result) => {
            assert.equal(result, "A");
            res();
        })
    );
});

test("race stops after first error", async (t) => {
    const tasks = [
        (cb) => setTimeout(() => cb("Error"), 10),
        (cb) => setTimeout(() => cb(null, "X"), 30),
    ];

    await new Promise((res) =>
        race(tasks, (err, result) => {
            assert.equal(err, "Error");
            res();
        })
    );
});

//////////////////////////////////////////////////////////////
// 8. waterfallWithError
//////////////////////////////////////////////////////////////
test("waterfallWithError stops at first error", async (t) => {
    const tasks = [
        (r, cb) => cb(null, 1),
        (r, cb) => cb("Fail", null),
        (r, cb) => cb(null, 99),
    ];

    await new Promise((res) =>
        waterfallWithError(tasks, (err, result) => {
            assert.equal(err, "Fail");
            assert.equal(result, null);
            res();
        })
    );
});

test("waterfallWithError passes data correctly", async (t) => {
    const tasks = [
        (r, cb) => cb(null, 1),
        (r, cb) => cb(null, r + 1),
        (r, cb) => cb(null, r * 3),
    ];
    await new Promise((res) =>
        waterfallWithError(tasks, (err, result) => {
            assert.equal(result, 6);
            res();
        })
    );
});

//////////////////////////////////////////////////////////////
// 9. withTimeout
//////////////////////////////////////////////////////////////
test("withTimeout triggers timeout if fn too slow", async (t) => {
    const fn = (cb) => setTimeout(() => cb(null, "Done"), 100);
    const wrapped = withTimeout(fn, 30);
    await new Promise((res) =>
        wrapped((err, result) => {
            assert.equal(err, "Timeout");
            assert.equal(result, undefined);
            res();
        })
    );
});

test("withTimeout passes result if fn fast enough", async (t) => {
    const fn = (cb) => setTimeout(() => cb(null, "OK"), 20);
    const wrapped = withTimeout(fn, 100);
    await new Promise((res) =>
        wrapped((err, result) => {
            assert.equal(result, "OK");
            res();
        })
    );
});

//////////////////////////////////////////////////////////////
// 10. delayedQueue
//////////////////////////////////////////////////////////////
test("delayedQueue runs tasks sequentially with delay", async (t) => {
    const timestamps = [];
    const start = Date.now();
    const tasks = [
        (cb) => { timestamps.push(Date.now() - start); cb(); },
        (cb) => { timestamps.push(Date.now() - start); cb(); },
        (cb) => { timestamps.push(Date.now() - start); cb(); },
    ];

    await new Promise((res) =>
        delayedQueue(tasks, 30, () => {
            assert.equal(timestamps.length, 3);
            // Each next should be roughly delayed by ~30ms
            assert.ok(timestamps[1] - timestamps[0] >= 25);
            res();
        })
    );
});
