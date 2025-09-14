// TODO: điền từ khóa để xuất trực tiếp
export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

// TODO: export sau khai báo
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}
// Xuất cả 2 hàm trên
export {multiply, divide};

// TODO: default export
export default function square(x) {
    return x * x;
}
