# Atom: js-01-hoisting-scope

## Giới thiệu
Trong JavaScript, **hoisting** và **scope** là hai khái niệm cốt lõi nhưng dễ gây nhầm lẫn:

- **Hoisting**: Trước khi thực thi, JavaScript sẽ "kéo" các khai báo biến và hàm lên đầu scope.
    - `var` được hoisting và gán mặc định là `undefined`.
    - `let` và `const` cũng được hoisting nhưng rơi vào "temporal dead zone" → không thể truy cập trước khi khai báo.
    - Function declaration được hoisting đầy đủ, còn function expression / arrow function thì không.

- **Scope**: Phạm vi mà một biến hoặc hàm có thể được truy cập.
    - Global scope: tồn tại mọi nơi.
    - Function scope: chỉ trong hàm.
    - Block scope (`{ }`): từ ES6 với `let` và `const`.

Hiểu rõ hoisting và scope giúp tránh bug khó chịu, nhất là khi code JavaScript cũ dùng nhiều `var`.

---

## Mục tiêu học tập
1. Thấy sự khác biệt giữa `var`, `let`, và `const` khi hoisting.
2. Phân biệt function declaration và function expression.
3. Thực hành nhận diện global scope, function scope và block scope.
4. Biết được khi nào tránh dùng `var` và ưu tiên `let`/`const`.

---

## Ví dụ minh họa

### Hoisting với `var`
```js
console.log(x); // undefined
var x = 10;
```
> JS hoisting khai báo `var x`, gán mặc định `undefined`, nên không lỗi nhưng không có giá trị mong muốn.

### Hoisting với `let`
```js
console.log(y); // ReferenceError
let y = 20;
```
> `y` được hoisting nhưng nằm trong "temporal dead zone" → chưa thể truy cập.

### Function declaration vs expression
```js
sayHello(); // chạy được
function sayHello() {
  console.log("Hello");
}

sayHi(); // ReferenceError
const sayHi = function() {
  console.log("Hi");
};
```

### Scope
```js
if (true) {
  var a = 1; // function scope
  let b = 2; // block scope
}
console.log(a); // 1
console.log(b); // ReferenceError
```

---

## Ứng dụng thực tế
- Khi viết vòng lặp với `var`, giá trị cuối cùng thường "lọt" ra ngoài vòng lặp → gây bug trong async code.
- Khi khai báo biến global bằng `var`, biến đó sẽ gắn vào `window`/`globalThis` → có thể ghi đè biến khác ngoài ý muốn.
- Best practice: luôn dùng `let` hoặc `const` thay vì `var`.

---

## Kết luận
- `var` dễ gây lỗi vì hoisting + function scope.
- `let` và `const` an toàn hơn nhờ block scope và tránh được truy cập sớm.
- Function declaration hoisting giúp code dễ đọc, nhưng function expression / arrow function thì không.
- Luôn rõ ràng về **scope** để tránh biến “lọt” ra ngoài ngoài ý muốn.

### closure
#### Closure là gì?
- **Closure = function object + lexical environment (scope) mà nó capture.**
- Khi outer function return một inner function, inner function vẫn giữ reference tới biến cục bộ của outer.
- Những biến đó trở thành **private state**: chỉ có thể truy cập thông qua closure, không lộ ra ngoài.

#### Ví dụ nguyên thủy
```js
function outer() {
  let secret = 42;
  function inner() {
    return secret + 1;
  }
  return inner;
}

const fn = outer();
console.log(fn()); // 43
```
- `inner` là function object.
- `secret` nằm trong lexical environment của `outer`.
- Closure chính là cặp đôi: `inner` + environment chứa `secret`.

#### Vì sao makeCounter phải trả về function?
- Nếu chỉ `return ++count` → bạn chỉ nhận 1 giá trị rồi hết, không thể gọi tiếp.
- Nếu `return function() { ... }` → bạn có một **closure** nhớ được biến `count`.
- Closure giúp:
  - Gọi nhiều lần liên tục mà state vẫn giữ nguyên.
  - Tạo nhiều counter độc lập (c1, c2 không ảnh hưởng nhau).
  - Biến `count` thành **private state**, không ai bên ngoài truy cập trực tiếp được.

#### Sơ đồ bộ nhớ
```
Heap giữ lại vì có closure tham chiếu:
  EnvironmentBox (outer scope)
    secret = 42

Function object: inner
  [[Environment]] → EnvironmentBox
```
👉 Dù `outer` đã kết thúc, box chứa `secret` vẫn còn sống vì `fn` còn reference.
...

### Vì sao makeCounter phải trả về function (closure)?
- Nếu chỉ `return ++count` → bạn chỉ nhận 1 giá trị rồi hết, không thể gọi tiếp.
- Nếu `return function() { ... }` → bạn có một **closure** nhớ được biến `count`.
- Closure giúp:
  - Gọi nhiều lần liên tục mà state vẫn giữ nguyên.
  - Tạo nhiều counter độc lập (c1, c2 không ảnh hưởng nhau).
  - Biến `count` thành **private state**, không ai bên ngoài truy cập trực tiếp được.

### vi sao makeSquareCache() phải trả về function ?
- Khi bạn gọi một hàm JS:
  - Nó tạo ra môi trường thực thi (execution context) riêng, chứa các biến local. 
  - Khi hàm kết thúc → môi trường này bị thu hồi (GC dọn rác). 
  - Nên nếu bạn không return function (không tạo closure giữ tham chiếu), thì biến local sẽ biến mất. 
- Nếu return function (closure)
  - Khi bạn return 1 function có dùng biến local, thì:
  - JS  giữ lại lexical environment (scope box) để function đó còn truy cập được.
  - Nên biến local không bị reset, mà "sống dai" cùng function trả về.
- Ví dụ: 
  - ❌ Trường hợp bạn viết như sau:
  ```
  export function makeSquareCached(n) {
    const cache = {};
    return cache[n] ??= n * n;
  }
  ```
  Chuỵện gì xảy ra?
  + Mỗi lần gọi makeSquareCached, bạn lại tạo một cache = {} mới → cache trống rỗng.
  + Sau đó cache[n] ??= n * n sẽ luôn tính lại giá trị, rồi trả về.
  + Kết quả: cache reset mỗi lần gọi, chẳng khác gì không có cache.
  - 
  - ✅ Cách đúng với closure
    ```
    export function makeSquareCached(n) {
      const cache = {};
      return (n) => cache[n] ??= n * n;
    }
    ```
    Chuỵện gì xảy ra?
  + cache chỉ được tạo một lần khi bạn gọi makeSquareCache().
  + Hàm square trả về từ makeSquareCache giữ tham chiếu tới cache → closure làm cache sống dai.
  + Lợi ích: gọi nhiều lần với cùng input sẽ dùng lại kết quả từ cache.
