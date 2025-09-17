# Playbook: Promise Drills — new Promise, resolve/reject, all, race, chaining

Mục tiêu: Luyện “tay nghề” Promise **không dùng async/await**. Tập trung 5 năng lực:
1) Tự viết `new Promise(...)`
2) Dùng `Promise.resolve / Promise.reject`
3) Chaining với `.then(...).then(...).catch(...)`
4) Chạy song song `Promise.all(...)`
5) Đua thời gian `Promise.race(...)` (ví dụ timeout)

---

## A. new Promise — công thức tối thiểu
```js
function delay(ms, value) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}
```
- Chỉ reject khi thật sự là lỗi (ví dụ timeout):
```js
function timeout(ms, reason = "Timeout!") {
  return new Promise((_, reject) => {
    setTimeout(() => reject(reason), ms);
  });
}
```

## B. resolve / reject — chuẩn hóa đầu ra
- `Promise.resolve(x)` → tạo promise thành công ngay với giá trị `x` (kể cả khi `x` là Promise khác, nó sẽ “theo” luôn).
- `Promise.reject(e)` → tạo promise thất bại ngay.

**Khi dùng**: API có đường đi “nhanh” (sẵn data) vẫn nên trả về Promise để người gọi `.then/.catch` đồng nhất.

## C. Chaining — quy tắc “nhớ return”
```js
getA()
  .then(a => { return getB(a); })  // nhớ return
  .then(b => { return getC(b); })
  .then(c => console.log(c))
  .catch(err => console.error(err));
```
- Nếu quên `return` trong một `.then`, bước sau **không chờ** kết quả trước.

## D. Promise.all — chạy song song và gom kết quả
```js
Promise.all([p1, p2, p3])
  .then(([r1, r2, r3]) => { /* ... */ })
  .catch(err => { /* bất kỳ p nào reject → vào đây */ });
```
- Dùng khi **cần tất cả** thành công. Nếu muốn “ai fail cũng báo cáo”, dùng `allSettled` (ngoài phạm vi drills này).

## E. Promise.race — ai về trước quyết định kết quả
```js
Promise.race([slowTask(), timeout(500)])
  .then(value => { /* slowTask thắng */ })
  .catch(err => { /* timeout thắng */ });
```
- Phổ biến nhất: áp timeout cho một tác vụ chậm.

---

## Mẹo debug khi KHÔNG dùng async/await
- Gắn nhãn log mỗi bước:
```js
getA()
  .then(a => { console.log("A", a); return getB(a); })
  .then(b => { console.log("B", b); return getC(b); })
  .catch(e => console.error("Chain error:", e));
```
- Viết test cho cả **success path** và **failure path** (reject).
- Nhớ `return` Promise trong từng `it(...)` của test runner (`node:test`).

---

## Bài tập bạn sẽ làm trong file `src/promises-drills.js`
1) `makeResolved(x)`, `makeRejected(msg)`
2) `delay(ms, value)`, `timeout(ms, reason)`
3) `chain2(fn1, fn2, input)` – nối 2 bước bất đồng bộ (dùng `.then`)
4) `inParallel(p1, p2)` – dùng `Promise.all`
5) `withTimeout(promise, ms)` – dùng `Promise.race([promise, timeout(ms)])`
6) `firstWinner(p1, p2)` – race giữa 2 promise bất kỳ

Tất cả **không dùng async/await**.
