// src/callback-advanced-1.js
// ESM module. Focus on higher-order callback patterns.

//////////////////////////////////////////////////////////////
// 1. Template Method via callback
//////////////////////////////////////////////////////////////
export function processData(data, before, after) {
  // TODO:
  // - Gọi before(data) nếu có
  // - Gọi console.log("Processing:", data)
  // - Gọi after(data) nếu có
    if (before) {
        before(data)
    }
    console.log("Processing:", data)
    if (after) {
        after(data)
    }
}

//////////////////////////////////////////////////////////////
// 2. Strategy Pattern via callback
//////////////////////////////////////////////////////////////
export function applyStrategy(a, b, strategy) {
  // TODO:
  // - Gọi và trả về kết quả của strategy(a, b)
  // - Nếu strategy không phải function -> throw TypeError
    if (typeof strategy !== 'function') {
        return new TypeError('Strategy must be a function');
    }

    return strategy(a ,b)
}

//////////////////////////////////////////////////////////////
// 3.0. Compose multiple callbacks
//////////////////////////////////////////////////////////////
export function composeCallbacks(...callbacks) {
  // TODO:
  // - Trả về 1 function(value) chạy lần lượt tất cả callback
  // - Gợi ý: callbacks.forEach(fn => fn(value))
    return function(value) {
        callbacks.forEach(fn => fn(value));
    }
}


//////////////////////////////////////////////////////////////
// 3.1. Call the same callback twice with the same value
//////////////////////////////////////////////////////////////
export function callTwice(callback, value) {
    // TODO:
    // - Invoke callback(value) two times
    if (typeof callback !== 'function') return new TypeError('Callback must be a function');
    callback(value);
    callback(value);
}

//////////////////////////////////////////////////////////////
// 3.2. Call all provided callbacks once with the given value
//////////////////////////////////////////////////////////////
export function callAll(value, ...callbacks) {
    // TODO:
    // - Call each callback(value)
    callbacks.forEach(callback => {
        if (typeof callback !== 'function') return new TypeError('Callback must be a function');
        callback(value)
    });
}

//////////////////////////////////////////////////////////////
// 3.3. Call a callback N times
//////////////////////////////////////////////////////////////
export function repeatCallback(times, callback) {
    // TODO:
    // - Loop from 0..times-1 and invoke callback(i)
    if (typeof callback !== 'function') return new TypeError('Callback must be a function');
    for (let i = 0; i < times; i++) {
        callback(i)
    }
}

//////////////////////////////////////////////////////////////
// 3.4. Chain two callbacks sequentially
//////////////////////////////////////////////////////////////
export function chainTwo(fn1, fn2, value) {
    // TODO:
    // - Call fn1(value)
    // - Then fn2(value)
    fn1(value);
    fn2(value);
}

//////////////////////////////////////////////////////////////
// 3.5. Return a logger callback with prefix
//////////////////////////////////////////////////////////////
export function makeLogger(prefix) {
    // TODO:
    // - Return a function(msg) that logs `${prefix}: ${msg}`
    return function(msg) {
        console.log(`${prefix}: ${msg}`);
    }
}

//////////////////////////////////////////////////////////////
// 3.6. Wrap a callback with before/after behavior
//////////////////////////////////////////////////////////////
export function wrapCallback(before, after, target) {
    // TODO:
    // - Return function(value) that calls before(value), target(value), after(value)
    return function(value) {
        before(value);
        target(value);
        after(value);
    }
}

//////////////////////////////////////////////////////////////
// 3.7. Call a callback after delay (ms)
//////////////////////////////////////////////////////////////
export function delayedCallback(callback, ms, value) {
    // TODO:
    // - Use setTimeout to call callback(value) after ms ms
    setTimeout(() => {
        callback(value);
    }, ms);
}

//////////////////////////////////////////////////////////////
// 3.8. Safe callback execution
//////////////////////////////////////////////////////////////
export function safeCallback(callback, value) {
    // TODO:
    // - Try callback(value)
    // - Catch and log error message
    try {
        callback(value);
    } catch (e) {
        console.error(e.message)
    }
}

//////////////////////////////////////////////////////////////
// 3.9. Execute callbacks sequentially
//////////////////////////////////////////////////////////////
export function sequence(value, ...callbacks) {
    // TODO:
    // - Run callbacks one by one in order
    for (const callback of callbacks) {
        if(typeof callback !== 'function') throw new TypeError('Callback must be a function');
        callback(value);
    }
}

//////////////////////////////////////////////////////////////
// 3.10. Conditional callback execution
//////////////////////////////////////////////////////////////
export function applyIf(value, condition, callback) {
    // TODO:
    // - If condition(value) is true -> call callback(value)
    if(condition(value)) {
        callback(value);
    }
}

