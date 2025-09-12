# 🗓️ day-5.md
> Mục tiêu buổi học: hiểu thật chắc **methodize** và **unmethodize**, luyện bằng các bài tập cực nhỏ để quen tay và nâng tư duy từng dòng code.

---

## 1) Kiến thức cốt lõi

### Unmethodize (method ➜ hàm thuần)
- **Định nghĩa:** biến _method phụ thuộc `this`_ thành **hàm thuần** dạng `(obj, ...args)`.
- **Công thức chuẩn:**
  ```js
  function unmethodize(method) {
    if (typeof method !== 'function') throw new TypeError('need function');
    return function (obj, ...args) {
      return method.call(obj, ...args);
    };
  }
  ```
- **Tác dụng thực tế:**
    - Dùng lại built‑in method cho **array‑like** (`arguments`, `{0:..., length:n}`) mà **không sợ rơi `this`**.
    - Ví dụ:
      ```js
      const slice = unmethodize(Array.prototype.slice);
      function demo(){ return slice(arguments, 1); } // ['b','c']
      ```
    - `hasOwn` cho object **không có prototype**:
      ```js
      const hasOwn = unmethodize(Object.prototype.hasOwnProperty);
      const o = Object.create(null); o.x = 1; hasOwn(o,'x') // true
      ```

### Methodize (hàm thuần ➜ method `.chấm`)
- **Định nghĩa:** biến **hàm thuần** `(obj, ...args)` thành **method** `(...args)` nhận `obj` qua `this`.
- **Công thức chuẩn:**
  ```js
  function methodize(fn, ...preset) {
    if (typeof fn !== 'function') throw new TypeError('not function');
    return function (...args) {
      return fn(this, ...preset, ...args);
    };
  }
  ```
- **Tác dụng thực tế:**
    - Tạo **API `.chấm`** thân thiện:
      ```js
      function set(obj, k, v){ obj[k]=v; return obj; }
      const user = { name:'Alice' };
      user.set = methodize(set);
      user.set('age',20).set('role','admin');
      ```
    - Xây **DSL/Fluent API** nhỏ (StringBuilder, QueryBuilder, pipe).

---

## 2) Lỗi thường gặp & cách sửa

- **Tách method rời → rơi `this`:**
  ```js
  const user = { name:'Alice', sayHi(){ return 'Hi '+this.name; } };
  const f = user.sayHi;
  f(); // 'Hi undefined'
  // Sửa: bind/unmethodize/methodize cho đúng ngữ cảnh
  ```

- **Dùng `apply` sai chữ ký:** `apply(thisArg, arrayArgs)` phải truyền **một mảng duy nhất** cho args.  
  → Trong `methodize`, viết `fn(this, ...args)` hoặc `fn.call(null, this, ...args)`.

- **Nhầm lẫn khi unmethodize `sayHi` rồi truyền chuỗi `"Tuyen"`:**  
  `sayHi` đọc từ `this.name`, nên **obj phải có field `name`**.  
  → Gọi `unmethodizedSayHi({ name:'Tuyen' })` hoặc viết **adapter** bọc primitive thành object.

- **Gắn methodized trong constructor (per‑instance)** → sinh nhiều function, kém tối ưu.  
  → Gắn trên **prototype** nếu dùng chung cho mọi instance.

---

## 3) Bài tập đã luyện (mini)

1. **Unmethodize slice/forEach/map:** chạy trực tiếp trên array‑like.
2. **Unmethodize hasOwn:** làm việc với `Object.create(null)`.
3. **Methodize set/get/toggle:** luyện trả về `obj` cho chain vs trả về value.
4. **Partial methodize (appendWith):** preset tham số cố định.
5. **DSL nhỏ:** StringBuilder (`init/add/join`) & QueryBuilder (`init/where/limit/build`).
6. **Kiểm chứng lỗi:** `assert.throws(() => tuyen.sayHi(), TypeError)` khi method không tồn tại.

---

## 4) Mẫu so sánh nhanh

| Pattern | Nhận object | Ưu điểm | Khi dùng |
|---|---|---|---|
| Hàm thuần | Tham số đầu `obj` | Dễ test, không rơi `this` | Logic core/tiện ích |
| Method | `this` | API `.chấm` tự nhiên | Dùng trong domain model |
| **Unmethodize** | Từ `this` → `obj` | Tái dùng built‑in cho array‑like | `slice/map/forEach/hasOwn` |
| **Methodize** | Từ `obj` → `this` | Xây DSL/Fluent API | `set/toggle`, Builder |

---

## 5) Snippet “chuẩn hoá” (để tái dùng)

```js
export function unmethodize(method) {
  if (typeof method !== 'function') throw new TypeError('need function');
  return function(obj, ...args) {
    return method.call(obj, ...args);
  };
}

export function methodize(fn, ...preset) {
  if (typeof fn !== 'function') throw new TypeError('not function');
  return function(...args) {
    return fn(this, ...preset, ...args);
  };
}
```

---

## 6) Reflection (tự nhắc)

- Khi nào **bỏ `this`** (unmethodize) để tránh bug & tăng khả năng tái dùng?
- Khi nào **thêm `this`** (methodize) để DX tốt hơn và chain hợp lý?
- Với DSL: đảm bảo hàm thuần nào **trả `obj`** để chain, hàm nào **trả value** để kết thúc.
- Đừng “giấu lỗi” của built‑in; chỉ thêm **type guard tối thiểu**.

---

## 7) Next steps
- Viết thêm nhiều bản nâng cấp nữa của methodize và unmethodize
- Viết thêm `reduce`, `filter` bằng unmethodize và áp dụng lên array‑like.
- Tạo `pipe(obj, ...fns)` (thuần) rồi methodize thành `.pipe(...)`.
- So sánh hai cách tổ chức dự án: **functional‑first** (logic thuần + methodize) vs **method‑first** (viết method trực tiếp).

---

**Kết luận:** Hôm nay bạn đã “khoá tư duy” 2 transformer nhỏ nhưng mạnh: **unmethodize** và **methodize**. Chúng giúp bạn dùng được built‑in ở nơi “lạ” (array‑like, object trần) và xây API `.chấm` gọn gàng — không ngại rơi `this`, không lẫn với closure.
