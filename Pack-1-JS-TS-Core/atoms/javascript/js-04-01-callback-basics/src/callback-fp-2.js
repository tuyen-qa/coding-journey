// src/callback-fp-2.js
// Build callback combinators (compose, pipe, once, debounce).

export function compose(...fns) {
  // TODO:
  // - Return a function that composes from right to left.
  // - Example: compose(f, g)(x) -> f(g(x))
    return function (value) {
        let result = value;
        for(let i = fns.length -1; i >=0; i--) {
            result = fns[i](result);
        }
        return result;
    }
}

export function pipe(...fns) {
  // TODO:
  // - Return a function that composes from left to right.
  // - Example: pipe(f, g)(x) -> g(f(x))
    return function(value) {
        let result = value;
        for (let i = 0; i < fns.length; i++) {
            result = fns[i](result);
        }
        return result;
    }
}

export function once(fn) {
  // TODO:
  // - Return a version of fn that only runs once.
    let called = false;
    let res;
    return function (value) {
        if(!called) {
            called = true;
            res = fn(value);
        }
    }
    return res;
}

export function debounce(fn, delay) {
  // TODO:
  // - Return a debounced version of fn that waits for delay ms after the last call.
    let timer
    return function (value) {
        clearTimeout(timer);
        timer = setTimeout(() => fn(value), delay);
    }
}
