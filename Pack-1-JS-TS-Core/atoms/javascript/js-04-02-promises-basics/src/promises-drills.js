// src/promises-drills.js
// Practice: ONLY Promise + .then/.catch (no async/await).
// Fill the TODOs to make your tests pass.

// 1) Basic creators
export function makeResolved(x) {
  // TODO: return a Promise that resolves to x (hint: Promise.resolve)
    return Promise.resolve(x);
}

export function makeRejected(msg) {
  // TODO: return a Promise that rejects with msg (hint: Promise.reject)
    return Promise.reject(msg);
}

// 2) Timers
export function delay(ms, value) {
  // TODO: return new Promise that resolves with `value` after `ms` ms
    return new Promise(resolve => setTimeout(() => resolve(value), ms ));
}

export function timeout(ms, reason = 'Timeout!') {
  // TODO: return new Promise that rejects with `reason` after `ms` ms
    return new Promise((_, reject) => {
        setTimeout(() => reject(reason), ms);
    });
}

// 3) Chaining two async steps
// fn1, fn2: (x) => Promise<...>
export function chain2(fn1, fn2, input) {
  // TODO:
  // - Call fn1(input), then pass its resolved value into fn2
  // - Return the final Promise
    return fn1(input).then(result1 => {
        return fn2(result1);
    })
}

// 4) Parallel with Promise.all
export function inParallel(p1, p2) {
  // TODO: return Promise.all([p1, p2])
    return Promise.all([p1, p2]);
}

// 5) Race with timeout
export function withTimeout(promise, ms) {
  // TODO: return Promise.race([promise, timeout(ms)])
    return Promise.race([promise, ms]);
}

// 6) Race between two promises
export function firstWinner(p1, p2) {
  // TODO: return Promise.race([p1, p2])
    return Promise.race([p1, p2]);
}
