# Methodize — Playbook tập trung (v1)

> Mục tiêu: hiểu **methodize**, tại sao cần, khi nào dùng, và cách áp dụng.  
> Nội dung gồm: đặc tả, mẫu tư duy trước khi code, ví dụ “vào tay ngay”, bài tập mini đúng thứ tự, và phần Reflection.

---

## 1) Methodize là gì — đặc tả ngắn
- **Định nghĩa:** chuyển **hàm thuần** `(obj, ...args)` thành **method** dùng `this` → `(...args)`.
- **Chữ ký input:** `(obj, ...args)`
- **Chữ ký output:** `(...args)` nhưng gọi nội bộ là `fn(this, ...args)`.
- **Công thức chuẩn:**  
  ```js
  function methodize(fn, ...preset) {
    if (typeof fn !== 'function') {
      throw new TypeError('methodize: fn must be a function');
    }
    return function (...args) {
      return fn(this, ...preset, ...args);
    };
  }
  ```
- **Lợi ích:** cho phép tái sử dụng hàm thuần ở dạng API `.chấm`, xây DSL/fluent API, dễ chain.

---

## 2) Mẫu tư duy trước khi code (Decision mini‑map)
1. **Hàm thuần của mình trông như thế nào?**  
   Ví dụ: `set(obj, key, val) { obj[key] = val; return obj; }`
2. **Mình muốn gọi nó bằng cú pháp gì?**  
   - `set(user, 'age', 20)` (thuần)  
   - hay `user.set('age', 20)` (methodized)?
3. **Có cần preset tham số mặc định không?**  
   - Ví dụ `setWithPrefix(obj, prefix, key, val)` → preset prefix = 'x_'.
4. **Có muốn hỗ trợ chain không?**  
   - Nếu có → dùng `methodizeChain` (luôn return `this`).  
   - Nếu không → để fn quyết định return gì.
5. **Gắn method này vào đâu?**  
   - Trực tiếp lên object instance.  
   - Hay lên prototype để share cho nhiều instance.

---

## 3) Bộ ví dụ “vào tay ngay”

### 3.1 Reuse hàm thuần `set`
```js
function set(obj, key, val) { obj[key] = val; return obj; }
const user = { name: 'Alice' };
user.set = methodize(set);
user.set('age', 20);
console.log(user); // { name: 'Alice', age: 20 }
```

### 3.2 Gắn lên prototype để share
```js
function sayHi(obj) { return 'Hi ' + obj.name; }

function User(name) { this.name = name; }
User.prototype.sayHi = methodize(sayHi);

const a = new User('Alice'), b = new User('Bob');
console.log(a.sayHi()); // "Hi Alice"
console.log(b.sayHi()); // "Hi Bob"
```

### 3.3 Với preset tham số
```js
function setWithPrefix(obj, prefix, key, val) {
  obj[prefix + key] = val;
  return obj;
}

const o = {};
o.setX = methodize(setWithPrefix, 'x_');
o.setX('age', 20);
console.log(o); // { x_age: 20 }
```

### 3.4 Chain mutator với `methodizeChain`
```js
function bump(obj) { obj.n = (obj.n||0)+1; }

const counter = { n: 0 };
counter.bump = methodizeChain(bump);
counter.bump().bump();
console.log(counter.n); // 2
```

### 3.5 Xây mini-DSL
```js
function add(obj, x) { obj.values.push(x); return obj; }
function join(obj, sep) { return obj.values.join(sep); }

function SB() { this.values = []; }
SB.prototype.add = methodize(add);
SB.prototype.join = methodize(join);

const sb = new SB();
console.log(sb.add('a').add('b').join('-')); // "a-b"
```

---

## 4) Bài tập mini (đúng thứ tự, không nhảy cóc)

### Bài 1 — Methodize `set`
- Hàm thuần: `(obj,k,v) => { obj[k]=v; return obj; }`
- Methodize vào object `{}` → test `o.set('x',1)`.

### Bài 2 — Methodize `sayHi`
- Hàm thuần: `(obj) => "Hi " + obj.name`
- Gắn vào prototype `User` → test trên 2 instance.

### Bài 3 — Methodize với preset
- Hàm thuần: `setWithPrefix(obj,prefix,k,v)`  
- Gắn method preset `'p_'` vào object → `o.setP('y',2)`.

### Bài 4 — MethodizeChain
- Hàm thuần: `(obj)=>{ obj.count=(obj.count||0)+1 }`  
- MethodizeChain vào object → chain nhiều lần.

### Bài 5 — Xây mini StringBuilder
- Hàm thuần `add(obj,x)` và `join(obj,sep)`  
- Gắn vào prototype `SB` → test chain `.add().add().join()`.

---

## 5) Reflection (tự tổng kết)
1. Trước khi methodize, hàm thuần mình trông ra sao? Input/Output rõ ràng chứ?  
2. Sau khi methodize, cú pháp `.chấm` có làm code dễ đọc hơn không?  
3. Mình đã chọn gắn method ở **instance** hay **prototype**? Vì sao?  
4. Có case nào cần preset tham số? Cách mình preset có dễ test không?  
5. Chain có hoạt động đúng ý? Có khi nào method trả sai kiểu giá trị?  
6. Khi nào **không cần** methodize (viết method trực tiếp đủ gọn)?  

---

> Ghi nhớ nhanh: **methodize(fn)** = đưa `this` làm `obj`.  
> Phù hợp khi muốn tái sử dụng hàm thuần và cung cấp API `.chấm` thân thiện.
