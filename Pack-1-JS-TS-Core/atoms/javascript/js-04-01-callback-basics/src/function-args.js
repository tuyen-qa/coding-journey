// src/function-args.js
// Practice: Function as Argument (callback basics)
// Fill the TODOs

// 1. Call fn once
export function callOnce(fn) {
  // TODO: gọi fn() đúng 1 lần
   fn();
}

// 2. Call fn n times
export function callNTimes(fn, n) {
  // TODO: dùng vòng lặp gọi fn() n lần
    for (let i = 0; i < n; i++) {
        fn();
    }
}

// 3. Custom map
export function mapArray(arr, fn) {
  // TODO: tạo mảng mới, push fn(x) cho từng phần tử
    return arr.map(i => fn(i));
}

// 4. Custom filter
export function filterArray(arr, fn) {
  // TODO: tạo mảng mới, push phần tử nếu fn(x) === true
    return arr.filter(i => fn(i) === true);
}

// 5. withDelay: decorator
export function withDelay(fn, ms) {
  // TODO: trả về function mới
  // khi gọi sẽ setTimeout(fn, ms)
  return function (...args) {
      setTimeout(() => fn(...args), ms);
  }
}
