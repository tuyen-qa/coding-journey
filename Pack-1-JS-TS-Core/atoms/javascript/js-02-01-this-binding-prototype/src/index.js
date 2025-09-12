export function whoAmI() {
    return this?.name;
}

/**
 * 1. Object method
 */
export const user = {
    name: "Alice",
    greet() {
        return "Hi, I'm " + this.name;
    }
}

/**
 * 2. Reuse function cho nhieu object
 */

export function introduce() {
    return "Hello, I'm " + this.name
}

/**
 * 3. Constructor function + prototype
 */
export function Person(name) {
    this.name = name;
}
Person.prototype.sayHi = function() {
    return "Hi, I'm " + this.name
}

/**
 * 4. Callback: Timer
 * Callback mat this, fix bang arrow hoac bind
 */
export const timer = {
    name: "Clock",

    outerLoose() {
        function inner() {
            return this?.name;
        }
        return inner();
    },

    outerArrow() {
        const inner = () => {
            return this.name;
        }
        return inner();
    },

    outerBind() {
        function inner() {
            return this.name;
        }
        const bound = inner.bind(this);
        return bound();
    },

    outerCall() {
        function inner() {
            return this.name;
        }
        return inner.call(this);
    },

    runLoose() {
        return new Promise((resolve) => {
            setTimeout(function () {
                // function thường → this === undefined (strict mode)
                resolve(this?.name); // => undefined
            }, 0);
        });
    },

    runArrow() {
        return new Promise((resolve) => {
            setTimeout(() => {
                // arrow giữ this = timer
                resolve(this.name);
            }, 0);
        });
    },

    runBind() {
        return new Promise((resolve) => {
            setTimeout(function () {
                resolve(this.name);
            }.bind(this), 0); // bind this = timer
        });
    }
};

/**
 * 5. Share method bang call
 */
export const car = {
    speed: 60,
    showSpeed() { return this.speed; }
};
export const bike = { speed: 20 }

//export const bindOnce=(fn,obj)=>function(...args){ return fn.apply(obj,args) }

/* =========================
   1) call / apply / bind
   ========================= */

export function greet(msg, punc = "!") {
    return `${msg} ${this.name} ${punc}`;
}

/* =========================
   2) bindOnce, safeMethod
   ========================= */

export function bindOnce(fn, obj) {
    if (typeof fn !== "function") throw new TypeError(`bindOnce: fn must be a function`);
    return function bound(...args) {
        return fn.apply(obj, args);
    }
}

/* =========================
   3) autoBind cho class instance
   ========================= */

export function autoBind(instance) {
    let proto = Object.getPrototypeOf(instance);
    while (proto && proto !== Object.prototype) {
        for (const key of Object.getOwnPropertyNames(proto)) {
            if (key === 'constructor') continue;
            const desc = Object.getOwnPropertyDescriptor(proto, key);
            if (desc && typeof desc.value === "function") {
                if (instance[key] === desc.value) {
                    instance[key] = desc.value.bind(instance);
                }
            }
        }
        proto = Object.getPrototypeOf(proto);
    }
    return instance;
}

/* =========================
   4) Constructor + Prototype + Prototype Chain
   ========================= */

export function Person(name) {
    this.name = name;
}

Person.prototype.sayHi = function() {
    return "My name is " + this.name;
}

export function Entity(type) {
    this.type = type;
}

Entity.prototype.describe = function() {
    return 'Entity: ' + this.type;
}

export function User(name) {
    Entity.call(this, name);
    this.name = name;
}

User.prototype = Object.create(Entity.prototype);
User.prototype.constructor = User;
// override
User.prototype.describe = function() {
    return 'User: ' + this.name;
}

// Shadowing: gắn method trùng tên lên 1 instance để che bản ở prototype
export function shadowIncDemo() {
    function Counter(n = 0) { this.value = n; }
    Counter.prototype.inc = function (step = 1) { this.value += step; return this.value; };
    const c1 = new Counter(0);
    const c2 = new Counter(0);
    // trước khi shadow
    const sameRefBefore = c1.inc === c2.inc; // true
    // shadow c1
    c1.inc = function (step = 1) { this.value += 10 * step; return this.value; };
    const sameRefAfter = c1.inc === c2.inc; // false
    return { Counter, c1, c2, sameRefBefore, sameRefAfter };
}

/* =========================
   5) Method Borrowing (mượn method bằng call/apply)
   ========================= */

export const formatter = {
    prefix: '[*]',
    format(msg) {
        return this.prefix + msg;
    }
}

/* =========================
   6) API Client (constructor + prototype) & lỗi rơi this
   ========================= */

export function ApiClient(baseUrl) {
    this.baseUrl = baseUrl;
}

ApiClient.prototype.get = function (path) {
    return `GET ${this.baseUrl}/${path}`;
}

ApiClient.prototype.post = function (path, body) {
    return `POST ${this.baseUrl}/${path} :: ${JSON.stringify(body)}`;
}

/* =========================
   7) debounce (wrapper thực tế, giữ this/args của lần cuối)
   ========================= */

export function debounce(fn, ms) {
    let t = null;
    let lastThis;
    let lastArgs;
    let pendingResolves = [];
    return function debounced(...args) {
        lastThis = this;
        lastArgs = args;
        const p = new Promise((resolve) => pendingResolves.push(resolve));
        if (t) clearTimeout(t);
        t = setTimeout(async () => {
            t = null;
            const result = await fn.apply(lastThis, lastArgs);
            for (const r of pendingResolves.splice(0)) r(result);
        }, ms);
        return p;
    };
}
