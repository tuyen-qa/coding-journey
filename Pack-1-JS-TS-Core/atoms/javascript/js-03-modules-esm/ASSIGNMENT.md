# ASSIGNMENT: Luyện tập ECMAScript Modules (ESM)

## Mục tiêu
- Thuộc lòng cú pháp `export` và `import` trong ESM.  
- Thực hành đủ **named export**, **default export**, **re-export**, **import alias**, **import tất cả**, **side-effect import**, và **dynamic import**.  

---

## Cấu trúc thư mục gợi ý
```
esm-practice/
│
├── src/
│   ├── math.js
│   ├── string.js
│   ├── constants.js
│   ├── index.js
│
└── test.js
```

---

## Bài 1. File `math.js`

```js
// TODO: điền từ khóa để xuất trực tiếp
____ function add(a, b) {
  return a + b;
}

____ function subtract(a, b) {
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
____ { multiply, divide };

// TODO: default export
____ ____ function square(x) {
  return x * x;
}
```

---

## Bài 2. File `string.js`

```js
// TODO: named export
____ const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// TODO: export alias
function reverse(str) {
  return str.split('').reverse().join('');
}
____ { reverse as reverseString };

// TODO: default export
____ ____ function slugify(str) {
  return str.toLowerCase().replace(/\s+/g, '-');
}
```

---

## Bài 3. File `constants.js`

```js
// TODO: export trực tiếp hằng số
____ const PI = 3.14;
____ const APP_NAME = "ESM Practice";

// Export sau khai báo
const VERSION = "1.0.0";
____ { VERSION };

// Default export
____ ____ "DEFAULT_CONSTANT";
```

---

## Bài 4. File `index.js`

```js
// TODO: re-export cụ thể
____ { add, subtract } from './math.js';

// TODO: re-export tất cả
____ * from './string.js';

// TODO: re-export tất cả với namespace
____ * as Constants from './constants.js';

// TODO: default export
____ ____ function hello() {
  console.log("Hello from index.js");
}
```

---

## Bài 5. File `test.js`

```js
// TODO: default import
____ square from './src/math.js';
console.log("Square(3):", square(3));

// TODO: named import
____ { add, subtract } from './src/math.js';
console.log("Add(2,3):", add(2,3));

// TODO: alias import
____ { reverseString as rev } from './src/string.js';
console.log("Reverse('hello'):", rev("hello"));

// TODO: default + named import
____ slugify, { capitalize } from './src/string.js';
console.log("Slugify('Hello World'):", slugify("Hello World"));

// TODO: import tất cả vào object
____ * as MathUtils from './src/math.js';
console.log("MathUtils.multiply(2,4):", MathUtils.multiply(2,4));

// TODO: import default + named
____ DEFAULT_CONSTANT, { PI, APP_NAME } from './src/constants.js';
console.log("Default constant:", DEFAULT_CONSTANT);

// TODO: import từ re-export
____ hello, { Constants } from './src/index.js';
hello();
console.log("Constants.APP_NAME:", Constants.APP_NAME);

// TODO: side-effect import
____ './src/constants.js';

// TODO: dynamic import
const runDynamic = async () => {
  const mod = await ____('./src/math.js');
  console.log("Dynamic import add(7,8):", mod.add(7,8));
};
runDynamic();
```

---

## Gợi ý điền
- `export`  
- `export default`  
- `import`  
- `import * as ...`  
- `import { ... }`  
- `await import()`  

---

## Nhiệm vụ
1. Tạo các file như trong cấu trúc, copy code skeleton vào.  
2. Điền đầy đủ từ khóa `export` / `import`.  
3. Chạy `node test.js` (đừng quên `"type": "module"` trong `package.json`).  
4. Nếu lỗi, đọc kỹ error message để nhớ chính xác cách viết.  
5. Sau khi hoàn thành → viết **Reflection.md**:  
   - Bạn nhớ nhất cú pháp nào?  
   - Cú pháp nào dễ nhầm lẫn?  
   - Khi nào nên dùng default export, khi nào nên dùng named export?  
```
