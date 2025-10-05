// src/callback-fp-1.js
// Re-implement basic functional utilities with callbacks.

export function map(arr, fn) {
  // TODO:
  // - Create a new array by applying fn(value, index) to each element.
  // - Example: map([1,2,3], x => x * 2) -> [2,4,6]
    const result = []
    arr.forEach((value, index) => {
        result.push(fn(value, index));
    });
    return result;
}

export function filter(arr, fn) {
  // TODO:
  // - Return an array containing elements for which fn(value, index) === true.
  // - Example: filter([1,2,3], x => x % 2 === 0) -> [2]
    return arr.filter((value, index) => fn(value, index));
}

export function reduce(arr, fn, init) {
  // TODO:
  // - Implement reduction with callback (acc, value).
  // - Example: reduce([1,2,3], (acc,v) => acc+v, 0) -> 6
    return arr.reduce((acc, val) => acc + val, init)
}

export function find(arr, fn) {
  // TODO:
  // - Return the first element that satisfies fn, or undefined if none match.
    return arr[arr.findIndex((value) => fn(value))];
}
