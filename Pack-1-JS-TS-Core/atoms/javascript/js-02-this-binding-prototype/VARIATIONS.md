# 🔀 VARIATIONS — Luyện tập với `this` trong JavaScript

Mục tiêu: Thực hành các tình huống dễ nhầm lẫn để nắm chắc `this`.

---

## 1. Gọi rời rạc
### Bài tập
```js
function whoAmI() { return this?.name; }

const alice = { name: "Alice", whoAmI };
const bob   = { name: "Bob", whoAmI };

console.log(alice.whoAmI()); // ?
console.log(bob.whoAmI());   // ?
const f = alice.whoAmI;
console.log(f());            // ?
```
### Yêu cầu
- Giải thích tại sao `f()` không ra tên của Alice.

---

## 2. Arrow vs Function thường
### Bài tập
```js
const obj = {
  name: "Alice",
  sayArrow: () => this.name,
  sayFunc: function() { return this.name; }
};

console.log(obj.sayArrow()); // ?
console.log(obj.sayFunc());  // ?
```
### Yêu cầu
- So sánh kết quả, giải thích vì sao arrow không hoạt động như function thường.

---

## 3. Callback mất `this`
### Bài tập
```js
const timer = {
  name: "Clock",
  start() {
    setTimeout(function() {
      console.log(this.name);
    }, 0);
  }
};

timer.start(); // ?
```
### Yêu cầu
- Sửa code để in ra `"Clock"` bằng 3 cách: dùng arrow, dùng `.bind`, dùng biến `self`.

---

## 4. Constructor và `new`
### Bài tập
```js
function Person(name) {
  this.name = name;
}

const p1 = new Person("Alice");
const p2 = Person("Bob"); // gọi thiếu new

console.log(p1.name); // ?
console.log(p2);      // ?
```
### Yêu cầu
- Giải thích sự khác biệt khi gọi có `new` và không có `new`.

---

## 5. Dùng `.call` / `.apply` / `.bind`
### Bài tập
```js
function greet(msg) { return msg + " " + this.name; }

const bob = { name: "Bob" };

console.log(greet.call(bob, "Hi"));    // ?
console.log(greet.apply(bob, ["Yo"])); // ?

const bound = greet.bind(bob);
console.log(bound("Hello"));           // ?
```
### Yêu cầu
- So sánh `.call`, `.apply`, `.bind`.
- Khi nào nên dùng mỗi cái?

---

## 6. Class và mất `this`
### Bài tập
```js
class Counter {
  constructor() { this.count = 0; }
  inc() { this.count++; }
}

const c = new Counter();
const f = c.inc;

f();        // ?
c.inc();    // ?
console.log(c.count); // ?
```
### Yêu cầu
- Giải thích vì sao `f()` lỗi hoặc không tăng count.
- Đề xuất cách sửa (arrow property, `.bind`, v.v.).

---
