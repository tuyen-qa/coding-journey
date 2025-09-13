'use strict';

/**
 * Skeleton: methodize/unmethodize v2
 * TODO items are small and incremental.
 */

/** 
 * TODO: unmethodize(method)
 * - Validate: method must be function (throw TypeError otherwise)
 * - Return: (obj, ...args) => method.call(obj, ...args)
 */
/**
 * Câu hỏi về usage:
 * Câu hỏi: Tôi muốn làm gì với hàm này?
 * Trả lời: tôi muốn chuyển 1 method trong object sang function thuần
 *
 * Câu hỏi: Tại sao tôi lại muốn chuyển 1 method trong object sang function thuần
 * Trả lời: Vì đôi khi tôi muốn sử dụng method bên ngoài ngữ cảnh của nó.
 *             Ví dụ arguments là 1 array-like (có index, có length) nhưng nó lại không có built-in function slice.
 *             Thay vì phải viết 1 hm function slice cho nó, tôi có thể tái sử dụng Array.prototype.slice
 *
 * Câu hỏi về design:
 * Câu hỏi: Input/Param của unmethodize là gì?
 * Trả lời: là method, vì chúng ta đang muốn biến đổi method này (giống như wrapper function pattern)
 *
 * Câu hỏi: output/return của unmethodize là gì?
 * Trả lời: một function có signature (obj, ...args) => any
 *
 * Câu hỏi: hành vi của nó là handle việc mất this, bằng cách gán this vo obj được call
 * @param method
 */
export function unmethodize(method) {
    if (typeof method !== 'function') throw new TypeError(`${method} is not a function`);
    return function(obj, ...args) {
        return method.call(obj, ...args);
    }
}

/**
 * OPTIONAL: unmethodizeSafe(method, adapt)
 * - If provided, adapt(obj) can convert the incoming obj into a valid receiver
 *   (e.g., if obj is a string, return { name: obj })
 * - Otherwise, behave like unmethodize
 */
export function unmethodizeSafe(method, adapt) {
  if (typeof method !== 'function') throw new TypeError(`${method} is not a function`);
  return function (obj, ...args) {
      const newObj = (typeof adapt === 'function') ? adapt(obj) : obj;
      return method.call(newObj, ...args);
  }
}

/**
 * TODO: methodize(fn, ...preset)
 * - Validate: fn must be function
 * - Return: function(...args) { return fn(this, ...preset, ...args) }
 */
export function methodize(fn, ...preset) {
  // TODO
}

/**
 * OPTIONAL: methodizeChain(fn, ...preset)
 * - Like methodize but always returns `this` (use only for mutators)
 */
export function methodizeChain(fn, ...preset) {
  // TODO (optional)
}
