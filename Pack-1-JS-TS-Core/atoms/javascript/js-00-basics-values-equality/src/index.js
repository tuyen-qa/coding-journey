/**
 * So sánh 2 giá trị theo nhiều cách khác nhau.
 * @param {*} a
 * @param {*} b
 * @returns {{loose: boolean, strict: boolean, objectIs: boolean}}
 */
export function compare(a,b) {
    return {
        loose: a == b,
        strict: a === b,
        objectIs: Object.is(a, b),
    }
}

/**
 * Thuật toán SameValueZero:
 * - NaN được coi là bằng chính nó.
 * - +0 và -0 được coi là bằng nhau.
 * - Các trường hợp khác giống ===.
 */
export function isSameValueZero(x, y) {
    if (x === y) return true;
    return Number.isNaN(x) && Number.isNaN(y);
}

/**
 * (Optional) SameValue:
 * - NaN bằng NaN
 * - +0 KHÁC -0
 * - Các trường hợp khác giống ===
 */
export function sameValue(x, y) {
   if (x === y) {
       return x !== 0 || 1/x === 1/y
   }
   return Number.isNaN(x) && Number.isNaN(y);
}
