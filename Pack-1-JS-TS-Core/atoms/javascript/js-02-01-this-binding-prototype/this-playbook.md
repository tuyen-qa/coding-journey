# JavaScript `this` — Playbook Tổng Hợp (v2)

> Mục tiêu: nắm **nguyên tắc gán `this`**, cách **mất/giữ `this`**, các **mẫu áp dụng thực tế** (callback, prototype, event, timer, methodize/unmethodize), và **debug `this` trong DevTools**. Tài liệu cô đọng, có ví dụ copy‑paste.

---

## 0) `this` là gì? (định nghĩa ngắn)
- `this` **không** phải biến lexical; nó được **gán khi GỌI hàm**, tùy *cách gọi*.
- Không có “kế thừa `this`” tự động vào hàm con (trừ arrow giữ nguyên lexical `this`).

---

## 1) Luật gán `this` (theo cách gọi)

### 1.1 Gọi thường (plain call)
```js
"use strict";
function who() { return this; }
who(); // undefined (strict). Non‑strict: globalThis
```

### 1.2 Gọi qua object.method()
```js
function getName() { return this.name; }
const user = { name: "Alice", getName };
user.getName(); // "Alice" (this === user)
```

### 1.3 `call` / `apply` / `bind`
```js
function hi() { return "Hi " + this.name; }
const o = { name: "Bob" };
hi.call(o);      // "Hi Bob"  (ép this = o)
hi.apply(o);     // "Hi Bob"
const hiBob = hi.bind(o);
hiBob();         // "Hi Bob"  (this cố định o)
```

### 1.4 `new` (constructor)
```js
function Person(name) { this.name = name; }
const p = new Person("Alice"); // this = object mới
```

### 1.5 Arrow function (không có `this` riêng)
```js
const obj = {
  name: "Alice",
  regular() { return function() { return this?.name; }; },
  arrow()   { return () => this?.name; }
};
obj.regular()(); // undefined (mất this)
obj.arrow()();   // "Alice"  (arrow giữ lexical this)
```

---

## 2) Những cách **mất `this`** phổ biến và **cách giữ**

### 2.1 Mất `this` khi **tách method**
```js
const user = { name: "Alice", hi() { return this.name; } };
const loose = user.hi; // tách ra
loose(); // undefined (strict)
```
**Giữ lại:** arrow/wrapper/bind
```js
const bound = user.hi.bind(user);
bound(); // "Alice"
```

### 2.2 Callback trong API async (timer, event, Promise…)
```js
const timer = {
  label: "Clock",
  startLoose() {
    setTimeout(function(){ console.log(this?.label); }, 0);
  },
  startArrow() {
    setTimeout(() => { console.log(this?.label); }, 0);
  },
  startBind() {
    setTimeout(function(){ console.log(this?.label); }.bind(this), 0);
  }
};
timer.startLoose(); // undefined
timer.startArrow(); // "Clock"
timer.startBind();  // "Clock"
```

### 2.3 Hàm lồng nhau không “kế thừa `this`”
```js
const obj = {
  name: "Alice",
  outer() {
    function inner() { return this?.name; }
    return inner(); // undefined
  }
};
obj.outer();
```
**Fix:** dùng arrow hoặc `bind(this)`:
```js
outer() { const inner = () => this.name; return inner(); }
```

### 2.4 Destructure method → mất `this`
```js
const arr = [1,2,3];
const { push } = arr; // tách method
// push(4); // TypeError (this không phải array)
push.call(arr, 4); // OK
```

---

## 3) `this` với Prototype & Class

### 3.1 Function constructor + prototype
```js
function User(name) { this.name = name; }
User.prototype.sayHi = function() { return "Hi " + this.name; };

const a = new User("Alice");
const b = new User("Bob");
a.sayHi(); // "Hi Alice"
b.sayHi(); // "Hi Bob"
```

### 3.2 Class syntax
```js
class User {
  constructor(name){ this.name = name; }
  sayHi(){ return "Hi " + this.name; }
}
new User("Alice").sayHi(); // "Hi Alice"
```

### 3.3 Gắn method động & chia sẻ
```js
function greet(obj){ return "Hi " + obj.name; }
function methodize(fn){ return function(...args){ return fn(this, ...args); }; }

function Person(name){ this.name = name; }
Person.prototype.greet = methodize(greet);

new Person("Tuyen").greet(); // "Hi Tuyen"
```

---

## 4) `this` trong Event Listener (DOM)
```js
const btn = document.querySelector('#ok');
btn.addEventListener('click', function(){
  console.log(this === btn); // true (callback function thường → this là element)
});

btn.addEventListener('click', () => {
  console.log(this); // lexical this (thường là undefined trong module/strict)
});
```
> Trong handler dùng function thường nếu muốn `this` là element. Nếu dùng arrow, hãy lấy element qua `event.currentTarget`.

---

## 5) Method borrowing (mượn method giữa object)
```js
const car  = { speed: 60, show(){ return this.speed; } };
const bike = { speed: 20 };
car.show.call(bike); // 20
```
> Đây cũng là nền tảng của `unmethodize(Object.prototype.hasOwnProperty)` để xài trên object “trần”.

---

## 6) Liên hệ `methodize` & `unmethodize` (cầu nối `this`)

### 6.1 `methodize`
```js
function methodize(fn, ...preset){
  if (typeof fn !== 'function') throw new TypeError();
  return function(...args){ return fn(this, ...preset, ...args); };
}
```
> Biến **hàm thuần** `(obj, ...args)` → **method** `.callAsMethod(...args)` (JS tự gán `this = obj` khi gọi `obj.method()`).

### 6.2 `unmethodize`
```js
function unmethodize(method){
  if (typeof method !== 'function') throw new TypeError();
  return function(obj, ...args){ return method.call(obj, ...args); };
}
```
> Biến **method phụ thuộc `this`** → **hàm thuần** `(obj, ...args)` để dùng trên array‑like/objects “đặc sản”.

---

## 7) Bảng “khi nào `this` là gì” (cheatsheet)

| Cách gọi                         | `this` là gì                               |
|----------------------------------|--------------------------------------------|
| `f()` (strict)                   | `undefined`                                 |
| `obj.f()`                        | `obj`                                      |
| `f.call(ctx, ...)` / `.apply`   | `ctx`                                      |
| `f.bind(ctx)` rồi gọi            | luôn là `ctx`                               |
| `new F()`                        | object mới được tạo                          |
| Arrow function                   | **không có** `this` riêng (lấy lexical)     |
| Event listener dùng `function`   | element (trong DOM)                         |
| Event listener dùng arrow        | lexical `this`                              |

---

## 8) Pitfalls phổ biến
- Tách method rồi gọi rời → rơi `this`.
- Dùng arrow cho method cần `this` là element (DOM).
- Nhầm lẫn giữa closure và `this` (arrow giữ lexical, function thường không).
- Quên `use strict` → `this` rơi về `globalThis` (khó debug).
- Gọi hàm lồng nhau mà mong `this` “đi theo” (không có chuyện đó).

---

## 9) Debug `this` trong DevTools (Network, Sources, Console)

### 9.1 Log nhanh & kiểm chứng ngữ cảnh
- **Logpoint**: Sources → click số dòng → “Logpoint” → nội dung như `this, arguments`. Phù hợp khi không muốn dừng code.
- **Conditional breakpoint**: chỉ dừng khi `this?.id === 'submit'`.
- **`debug(fn)`**: gõ `debug(myFn)` trong Console để tự động đặt breakpoint đầu hàm.

### 9.2 Quan sát `this` khi pause
- **Scope panel**: xem `Local`, `Closure`, `Script` và **`this`** hiện tại.
- **Restart frame**: chạy lại frame để xem `this` ngay từ đầu hàm.
- **Async stack trace**: bật trong Settings để theo dõi `this` xuyên qua `await`/Promise.

### 9.3 Săn lỗi “rơi `this`”
- **Destructure check**: nếu thấy `const { map } = Array.prototype`, khi gọi `map()` sẽ rơi `this`. Thay bằng `map.call(obj, ...)` hoặc dùng `unmethodize` trong Console:
  ```js
  const unmethodize = m => (obj, ...args) => m.call(obj, ...args);
  const map = unmethodize(Array.prototype.map);
  map(document.querySelectorAll('li'), x => x.textContent);
  ```
- **Method bị tách rời**: tìm nơi gán `const fn = obj.method;` → xem chỗ gọi `fn()` (plain call). Fix: `fn.call(obj, ...)` hoặc `bind` trước.

### 9.4 Event listener & `this`
- Với handler là **function thường**, `this === element`:
  ```js
  btn.addEventListener('click', function(){ console.log(this); });
  ```
- Với **arrow**, `this` là lexical → dùng `event.currentTarget` để lấy element:
  ```js
  btn.addEventListener('click', (e) => console.log(e.currentTarget));
  ```
- **getEventListeners($0)**: trong Console để liệt kê listeners đang gắn lên element được chọn.

### 9.5 Inspect nhanh từ Console
- **$0**: element đang chọn trong Elements → test `this` trong handler tạm thời:
  ```js
  $0.onclick = function(){ console.log(this === $0); };
  $0.click();
  ```
- **monitor(fn)**: log mỗi lần hàm chạy (kèm `this`):
  ```js
  function foo(){ console.log('this:', this); }
  monitor(foo); foo.call({ tag: 'X' }); unmonitor(foo);
  ```

### 9.6 Network/Overrides để tái hiện ngữ cảnh
- Dùng **Local Overrides** để sửa tạm code gắn event/`this` và reload trang, không cần build lại.
- **Preserve log** + **Disable cache** trong Network giúp theo dõi tương tác nhiều bước.

---

## 10) Bài tập mini (tăng dần)

1) **Loose vs arrow vs bind** với `setTimeout` (giống phần 2.2) → giải thích output.
2) **Borrow method**: viết `showSpeed` cho `car`, gọi cho `bike` bằng `.call`.
3) **Nested function**: viết `outer/inner` và sửa bằng arrow/bind để in đúng tên.
4) **Methodize**: methodize `greet(obj)` và gắn vào `User.prototype`.
5) **Unmethodize**: unmethodize `Array.prototype.map` và chạy trên `NodeList`/array‑like.
6) **DevTools**: đặt Logpoint hiển thị `this` và `arguments` tại một dòng bất kỳ, so sánh kết quả khi gọi `obj.fn()` vs `fn()`.

---

**Nhớ lõi:** `this` không “thần kỳ” — nó chỉ tuân theo **cách bạn gọi hàm**. Tận dụng `.method()`/`call/apply/bind`/`new` và arrow đúng chỗ + biết debug trong DevTools là bạn kiểm soát được mọi thứ.
