# JS-02 — this & Prototype

## 1. `this` là gì?
- `this` = **người đang thực hiện hành động** (object đứng trước dấu chấm khi gọi hàm).
- `this` **không cố định** khi định nghĩa hàm, mà được quyết định **lúc gọi hàm**.

---

## 2. Các trường hợp thường gặp

### Object method
```js
const obj = { 
  name: "Alice", 
  say() { return this.name; } 
};
obj.say(); // "Alice"
```

### Gọi rời rạc → mất `this`
```js
const f = obj.say;
f(); // undefined (strict mode)
```

### Arrow function
- Arrow function **không có `this` riêng**.
- Nó “mượn” `this` từ scope bên ngoài nơi nó được định nghĩa.

### Constructor function / class
- Khi gọi bằng `new`, `this` = object mới được tạo.

```js
function Person(name) { this.name = name; }
const p = new Person("Alice");
console.log(p.name); // Alice
```

### Global
- Non-strict: `this = globalThis` (trình duyệt = `window`, Node = `global`).
- Strict: `this = undefined`.

### Callback / Timer / Event handler
- Gọi rời rạc → dễ mất `this`.
- Fix: dùng **arrow function**, **`.bind(this)`**, hoặc **`.call(this)`**.

```js
setTimeout(function() { console.log(this); }, 0);   // undefined
setTimeout(() => console.log(this), 0);             // giữ được this từ outer
```

---

## 3. Kim chỉ nam nhớ nhanh
1. Ai gọi → `this` là người đó.
2. Gọi rời rạc → mất `this`.
3. Arrow → không có `this` riêng, mượn từ scope ngoài.
4. `new` → `this` = object mới.
5. Có thể ép `this` bằng `.call`, `.apply`, `.bind`.

---

## 4. Ví dụ điển hình

```js
function greet(msg) { return msg + " " + this.name; }
const bob = { name: "Bob" };

greet.call(bob, "Hi");      // "Hi Bob"
greet.apply(bob, ["Yo"]);   // "Yo Bob"
const bound = greet.bind(bob);
bound("Hello");             // "Hello Bob"
```

---

## 5. Những vấn đề cần tìm hiểu thêm
*(placeholder để bổ sung sau)*

- [ ] Prototype
- [ ] Prototype chain
- [ ] Constructor (chi tiết và biến thể)
- [ ] `bind`, `call`, `apply` (so sánh chi tiết)
- [ ] Kế thừa (inheritance)
- [ ] Class vs Function constructor
- [ ] Shadowing, method override trong prototype  
