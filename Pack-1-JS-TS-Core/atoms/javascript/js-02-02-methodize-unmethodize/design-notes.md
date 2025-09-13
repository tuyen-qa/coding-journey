# Design Notes — functional-first vs method-first

## Goal
So sánh hai phong cách tổ chức code:
- **Functional-first:** viết hàm thuần `(obj, ...args)`, sau đó methodize để có API `.chấm`.
- **Method-first:** viết method trực tiếp trong prototype/class.

---

## Functional-first

### Ví dụ
```js
// Hàm thuần
function set(obj, key, val) { obj[key] = val; return obj; }

// Adapter
function methodize(fn) {
  return function(...args) { return fn(this, ...args); };
}

const user = { name: "Alice" };
user.set = methodize(set);
user.set("age", 20);
```
## Pros
- Dễ test: chỉ cần gọi hàm thuần.
- Tái sử dụng: dùng cho nhiều loại object khác nhau.
- Ít rủi ro this vì logic chính không phụ thuộc.

## Cons
- Phải viết thêm bước adapter.
- Người mới đọc code thấy “lạ”.

## Method-first
### Ví dụ

```
function User(name) { this.name = name; }
User.prototype.set = function(key, val) {
  this[key] = val;
  return this;
};

const u = new User("Bob");
u.set("age", 30);
```

### Pros
- Cú pháp quen thuộc, dễ hiểu ngay.
- Không cần viết adapter.

### Cons
- Logic bị gắn chặt vào 1 class.
- Khó test độc lập (cần tạo instance).
- Nếu nhầm cách gọi, dễ rơi this.

### Observations
- Functional-first: test dễ hơn, tái sử dụng nhiều, thích hợp với tư duy functional programming.
- Method-first: dễ đọc với OOP, ít boilerplate.
- Memory: Functional-first + methodize → method trên prototype share chung. Method-first cũng share, nhưng khó tái sử dụng cho object khác.
- DX: Functional-first hữu ích khi build DSL/chain API. Method-first hợp với class rõ ràng.

### Khi nào dùng?
- Functional-first: khi muốn tách logic thuần + có thể dùng ở nhiều dạng object (array-like, plain object…)
- Method-first: khi method chỉ dành riêng cho 1 class/domain.


