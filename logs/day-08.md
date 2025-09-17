# Day-08 Log

## Chủ đề: Promise Chaining và Phân biệt `new Promise` vs `Promise.*`

---

## 1. Bài toán luyện tập: chain2
Viết hàm:
```js
export function chain2(fn1, fn2, input) {
  return fn1(input).then(fn2);
}
```
- `fn1`, `fn2`: đều trả về Promise.
- Yêu cầu: chạy `fn1(input)`, lấy kết quả, đưa vào `fn2`, rồi trả về Promise cuối.

### Sai lầm thường gặp
- Quên `return` → hàm trả về `undefined`.
- Viết `.catch(err => err)` → nuốt mất lỗi, không propagate ra ngoài.
- Không biết `.then(fn2)` = shorthand của `.then(res => fn2(res))`.

### Vì sao cách viết trên đúng?
1. `return fn1(input)` → trả về một Promise.
2. `.then(fn2)` → chain kết quả từ fn1 sang fn2.
3. Lỗi từ fn1/fn2 sẽ tự propagate ra ngoài.

### Ví dụ
```js
function plus1Async(x) { return new Promise(res => setTimeout(() => res(x+1), 50)); }
function times2Async(x) { return new Promise(res => setTimeout(() => res(x*2), 50)); }

chain2(plus1Async, times2Async, 10)
  .then(console.log)   // 22
  .catch(console.error);
```

### Bài học rút ra
- **Luôn return** Promise để chain tiếp.
- `.then(fn2)` là shorthand tiện lợi.
- Không cần `.catch` giữa chừng, lỗi sẽ tự propagate.

---

## 2. Bổ sung kiến thức: `new Promise` vs `Promise.resolve/all/race`

### `new Promise(executor)`
- Đây là **constructor** → cần dùng từ khóa `new`.
- Bạn phải truyền vào một **executor function** `(resolve, reject) => { ... }`.

### `Promise.resolve(x)`, `Promise.reject(e)`
- Đây là **static methods** của class Promise.
- Không dùng `new`. Chỉ cần gọi trực tiếp.
- Trả về Promise đã được settled ngay.

### `Promise.all([...])`, `Promise.race([...])`
- Cũng là static methods.
- Bạn đưa vào mảng Promises, engine sẽ tự tạo Promise mới để quản lý.
- Không dùng `new`.

### Tổng kết
- **Có `new`** → bạn tự xây Promise thủ công (từ executor).
- **Không có `new`** → bạn dùng factory method tiện lợi đã có sẵn.

---

## 3. Reflection
- Học được cách chain Promise qua ví dụ `chain2`.
- Hiểu rõ sự khác biệt giữa constructor `new Promise` và static methods (`resolve`, `reject`, `all`, `race`).
- Nhận ra tầm quan trọng của `return` trong `.then` để giữ chain không bị gãy.
- Lưu ý: `.catch(err => err)` sẽ làm mất reject, biến thành resolve.

---
