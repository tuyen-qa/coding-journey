# 📘 ABOUT Methodize / Unmethodize

## 1. Hàm thuần (function thuần)
- Hàm thuần trong ngữ cảnh này là hàm **không dùng `this`**.
- Object cần thao tác được truyền rõ ràng qua tham số đầu.
- Ví dụ:
  ```js
  function sayHi(obj) {
    return "Hi " + obj.name;
  }
  sayHi({ name: "Alice" }); // "Hi Alice"
  ```

## 2. Method (hàm gắn với object)
- Method là function bên trong object, **phụ thuộc vào `this`** để lấy dữ liệu.
- Ví dụ:
  ```js
  const user = {
    name: "Alice",
    sayHi() { return "Hi " + this.name; }
  };
  user.sayHi(); // "Hi Alice"
  ```

- Khi **tách method ra khỏi object**, lời gọi sẽ mất `this`:
  ```js
  const f = user.sayHi;
  f(); // "Hi undefined" (strict mode: this = undefined)
  ```

## 3. Built-in methods và vấn đề mất `this`
- Nhiều built-in methods (có sẵn trong JS như `Array.prototype.slice`, `Object.prototype.hasOwnProperty`) **dùng `this` để biết object nào đang gọi**.
- Nếu tách ra rồi gọi trực tiếp thì sẽ lỗi:
  ```js
  const slice = Array.prototype.slice;
  slice([1,2,3], 1); // ❌ this = undefined
  ```

- Giải pháp là dùng `.call`:
  ```js
  Array.prototype.slice.call([1,2,3], 1); // ✅ [2,3]
  ```

## 4. Pattern **unmethodize**
- **Unmethodize** biến method phụ thuộc `this` thành **hàm thuần**:
  ```js
  function unmethodize(method) {
    return function(obj, ...args) {
      return method.call(obj, ...args);
    };
  }

  const slice = unmethodize(Array.prototype.slice);
  function demo() {
    return slice(arguments, 1);
  }
  demo("a","b","c"); // ["b","c"]
  ```
- Giúp:
    - Tái sử dụng method built-in cho object “giống array” (`arguments`, `NodeList`...).
    - Tránh mất `this` khi tách hàm.
    - Viết test dễ hơn (không phụ thuộc context).

## 5. Pattern **methodize**
- **Methodize** biến hàm thuần `(obj, ...args)` thành **method dùng `this`**:
  ```js
  function methodize(fn) {
    return function(...args) {
      return fn(this, ...args);
    };
  }

  function set(obj, key, val) {
    obj[key] = val;
    return obj;
  }

  const user = { name: "Alice" };
  user.set = methodize(set);

  user.set("age", 20);
  console.log(user.age); // 20
  ```
- Giúp:
    - Tạo API dạng method `.chấm` thân thiện.
    - Xây DSL hoặc fluent API (kiểu `obj.add().remove().print()`).

## 6. So sánh nhanh

|                | Method (gốc)                   | Unmethodized (hàm thuần)            | Methodized (hàm mới)         |
|----------------|--------------------------------|-------------------------------------|------------------------------|
| Cách nhận obj  | qua `this`                     | qua tham số đầu                     | qua `this`                   |
| Khi tách rời   | dễ mất `this`                  | không mất (truyền obj rõ ràng)      | không mất, vì luôn gắn với obj|
| Ứng dụng       | API tự nhiên (`arr.map(...)`) | Dùng cho array-like, test dễ hơn     | Xây DSL, fluent API          |

## 7. Kết luận
- `this` là “context khi gọi”, không phải lexical scope → dễ mất khi tách hàm.
- Built-in methods thường phụ thuộc `this`, nên khi muốn tách hoặc áp dụng cho object khác cần **unmethodize**.
- Khi có sẵn hàm thuần và muốn API thân thiện dạng method, dùng **methodize**.
- Đây là pattern nhỏ nhưng xuất hiện nhiều trong polyfill, core-js, lodash, hoặc khi xử lý array-like/DSL.  
