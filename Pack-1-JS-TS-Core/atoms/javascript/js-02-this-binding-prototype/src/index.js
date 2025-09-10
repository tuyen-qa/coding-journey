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
