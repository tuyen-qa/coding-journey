// Hoisting & Scope — ESM kata stubs
// Bạn sẽ implement các hàm này để test pass

export function varHoistProbe() {
    // Goal: trong cùng function, đọc x trước khi khai báo var, rồi sau khi gán
    // Kỳ vọng test:
    //   { firstRead: undefined, afterAssign: 10 }
    let firstRead = x;
    var x = 10
    let afterAssign = x;
    return {firstRead, afterAssign};
}

export function letConstTDZProbe() {
    // Goal: truy cập y trước let y = ... để trigger ReferenceError (TDZ)
    let assign = y
    let y = 10;
    return assign;
}

export function callFooBeforeDeclaration() {
    // Goal: gọi foo() trước function declaration trong cùng scope
    // Kỳ vọng trả về "foo"
    let res = foo();
    function foo() {
        return "foo"
    }
    return res
}

export function callBarBeforeInit() {
    // Goal: gọi bar() trước const bar = function()...
    // Kỳ vọng TypeError (undefined is not a function)
    let res = bar();
    var bar = function () {
        return "bar"
    }
    return res;
}

export function scopeLeakDemo() {
    // Goal: var leak ra ngoài block, let thì không
    // Return { varOutside, letAccessOk }
    // varOutside = 1
    // letAccessOk = false (do ReferenceError)
    {
        var a = 1;
        let b = 2;
    }
    const varOutside = a
    let letAccessOk
    try {
        void b;
        letAccessOk = true;
    } catch (e) {
        letAccessOk = false;
    }

    return {varOutside, letAccessOk}
}

export function loopIndexAfterFor(kind = "var", N = 3) {
    // Goal:
    //   - kind="var" => i = N sau loop
    //   - kind="let" => ReferenceError khi đọc i ngoài loop
    if (kind === 'var') {
        for (var iVar = 0; iVar < N ; iVar++) {}
        return iVar
    }
    if (kind === 'let') {
        for (let i = 0; i < N; i++) {}
        return i
    }

    throw new Error("Invalid kind: " + kind);
}

export function arrowBeforeInit() {
    // Goal: giống function expression nhưng với arrow
    // Gọi baz() trước khi const baz = () => "baz";
    // Kỳ vọng TypeError
    baz();
    var baz = () => "baz"
}

// closure
export function makeCounter(n=0) {
    let counter = n
    return function () {
        ++counter;
        return counter;
    }
}

// cache simple with global
const cache = {};
export function squareCached(n) {
    // if(cache[n] !== undefined) return cache[n]
    // console.log("calculating...");
    // cache[n] = n * n;
    // return cache[n];
    return cache[n] ??= n * n;
}

// cache simple with closure
export function makeSquareCached(n) {
    const cache = {};
    return (n) => cache[n] ??= n * n;
}

/*
neu nhu ta viet nhu sau
function makeSqCached(n) {
    const cache = {}
    return cache[n] ?== n * n
}

=> moi lan call makeSqCached() => tao 1 cache = {} moi, luon empty => cache reset moi lan goi => vo nghia
=> neu khong co return function de dung closure, local variable luon bi reset
 */

// memoize la ham boc cua cache, thay vi viet rieng cho square, ta viet 1 factory boc bat ky ham nao
export function memoize(fn) {
    const cache = {}
    return (...args) => {
        const key = JSON.stringify(args);
        return cache[key] ??= fn(...args)
    }
}

