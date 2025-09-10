export function once(fn) {
    // 1. state
    let called = false;
    let value;
    // 2. inner function
    return (...args) => {
        // 3. logic before fn calls
        if (!called) {
            called = true;
            value = fn(...args);
        }
        // 4. logic after fn calls => khong co
        // 5. return value
        return value
    }
}

export function debounce(fn, delay=10) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    }
}

export function throttle(fn, interval=0) {
    let last = 0;
    return (...args) => {
        const now = Date.now();
        if(now - last >= interval) {
            last = now;
            return fn(...args);
        }
    }
}

export function memoize(fn) {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        if(cache.has(key)) {
            return cache.get(key);
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    }
}

export function retry(fn, times=3) {
    return async function(...args) {
        let attempt = 0
        while(true) {
            try {
               return await fn(...args);
            } catch (e) {
                if (attempt++ >= times) throw e;
            }
        }
    }
}

export function logWrapper(fn) {
    return (...args) => {
        console.log("[LOG input]:", args);
        const res = fn(...args);
        console.log("[LOG output]:", res);
        return res
    }
}

export function timeWrapper(fn) {
    return (...args) => {
        const start = Date.now();
        const res = fn(...args);
        const end = Date.now();
        console.log(`[LOG time (ms)]: ${end - start}ms`);
        return res
    }
}
