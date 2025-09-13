# Unmethodize — Playbook

> Mục tiêu: hiểu **tại sao**, **khi nào**, **làm sao** dùng unmethodize.  

---

## 1) Unmethodize là gì — đặc tả ngắn
- **Định nghĩa:** chuyển **method phụ thuộc `this`** thành **hàm thuần** `(obj, ...args)`.
- **Chữ ký trả về:** `(obj, ...args) => any`
- **Hành vi:** không rơi this, ép this = obj
- **Công thức chuẩn:**
  ```js
  function unmethodize(method) {
    if (typeof method !== 'function') {
      throw new TypeError('unmethodize: method must be a function');
    }
    return function (obj, ...args) {
      return method.call(obj, ...args);
    };
  }
  ```
- **Lợi ích:** không rơi `this`, tái dùng built‑in cho array‑like/object “trần”, code gọn, dễ test.

---

## 2) Mẫu tư duy trước khi code (Decision mini‑map)
1. **Mô tả hoàn cảnh cụ thể:**  
   _“Mình có **X** (array‑like/NodeList/object trần) và muốn gọi built‑in **Y** (slice/map/hasOwn…).”_.
2. **Liệt kê lựa chọn:**
    - `.call/.apply` trực tiếp (ngắn hạn)
    - `.bind` (cố định this, kém linh hoạt)
    - **unmethodize** (một lần viết, nhiều lần dùng)
3. **Chọn chữ ký mong muốn:** `(obj, ...args)` để gọi ở mọi nơi.
4. **Cơ chế bắt buộc:** ép `this = obj` → `method.call(obj, ...args)`.
5. **Giữ tổng quát:** luôn dùng `...args` (kể cả khi method hiện tại không nhận tham số).
6. **Guard tối thiểu:** chỉ kiểm tra `typeof method === 'function'` — các lỗi còn lại để JS báo đúng bản chất.

---

## 3) Bộ ví dụ “vào tay ngay”

### 3.1 `arguments` (array‑like) + `slice`
```js
const slice = unmethodize(Array.prototype.slice);
function rest() { return slice(arguments, 1); } // ['b','c'] nếu gọi rest('a','b','c')
```

### 3.2 `NodeList` (DOM) + `map` *(chạy trong môi trường trình duyệt)*
```js
const map = unmethodize(Array.prototype.map);
// const nodes = document.querySelectorAll('li');
// const ids = map(nodes, li => li.id);
```

### 3.3 Object “trần” (không prototype) + `hasOwnProperty`
```js
const hasOwn = unmethodize(Object.prototype.hasOwnProperty);
const o = Object.create(null); o.x = 1;
hasOwn(o, 'x'); // true
```

### 3.4 `reduce` & `filter` trên array‑like
```js
const reduce = unmethodize(Array.prototype.reduce);
const filter = unmethodize(Array.prototype.filter);

const like = {0:1,1:2,2:3,length:3};
reduce(like, (acc,x)=>acc+x, 0); // 6
filter(like, x => x % 2);       // [1,3]
```

### 3.5 String primitive + `toUpperCase`
```js
const toUpper = unmethodize(String.prototype.toUpperCase);
toUpper('hello'); // 'HELLO'
```

### 3.6 Tái sử dụng `push` cho nhiều mảng
```js
const push = unmethodize(Array.prototype.push);
const a = [], b = [];
push(a, 'A'); push(b, 'B'); // a=['A'], b=['B']
```

---

## 4) Bài tập mini (đúng thứ tự, không nhảy cóc)

> Mẹo: mỗi bài hãy thử viết **cách dài** bằng `.call` trước, sau đó viết lại bằng `unmethodize` để cảm nhận khác biệt.

### Bài 1 — `slice` cho `arguments`
- Tạo `slice = unmethodize(Array.prototype.slice)`
- Viết `function rest(){ return slice(arguments, 1); }`
- Tự test: `rest('a','b','c') // ['b','c']`

### Bài 2 — `hasOwnProperty` cho object “trần”
- `const hasOwn = unmethodize(Object.prototype.hasOwnProperty)`
- Tự test:
  ```js
  const o = Object.create(null); o.x=1;
  hasOwn(o,'x') // true
  hasOwn(o,'toString') // false
  ```

### Bài 3 — `map` trên array‑like
- Nguồn dữ liệu: `{0:'<li>a</li>',1:'<li>b</li>', length:2}`
- Unmethodize `map`, loại tag `<li>`: kết quả `['a','b']`

### Bài 4 — `reduce` cộng dồn array‑like
- Nguồn: `{0:1,1:2,2:3,length:3}` → kết quả `6`

### Bài 5 — `toUpperCase` cho string primitive
- `toUpper('hello')` → `'HELLO'`

### Bonus — `unmethodizeSafe(method, adapt)`
- Nếu `obj` không phải object, dùng `adapt(obj)` trước khi gọi.  
  Ví dụ: unmethodizeSafe cho `sayHi` đọc `this.name`, cho phép gọi `safeSayHi("Tuyen")` bằng cách `adapt(x) => ({name:String(x)})`.

---

## 5) Reflection (tự tổng kết)

1. **Trước khi unmethodize**, mình sẽ viết cùng thao tác đó bằng `.call` như thế nào? Có dài & nhiễu không?
2. Mình gặp **case “rơi this”** nào trước đây? Nếu dùng unmethodize, có tránh được không?
3. Với array‑like và object “trần”, unmethodize giúp mình **tái sử dụng built‑in** ra sao?
4. Mình đã **giữ tổng quát** đúng cách chưa (luôn dùng `...args`)? Có case không tham số nào phá vỡ thiết kế không?
5. Sau khi viết unmethodize, **test** của mình dễ viết hơn chỗ nào?
6. Khi nào **không cần** unmethodize (chỉ dùng 1 lần → `.call` trực tiếp)?

---

> Ghi nhớ nhanh: **param đầu luôn là `obj`**, phần còn lại là `...args`. Bên trong gọi `method.call(obj, ...args)`. Chỉ guard `method` là function — còn lại để JS báo lỗi đúng bản chất.
