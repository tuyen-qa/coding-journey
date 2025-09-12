export function methodizeBasic(fn) {
    return function (...args) {
        return fn(this, ...args)
    }
}

export function unmethodizeBasic(method) {
    return function (obj, ...args) {
        return method.call(obj, ...args)
    }
}
