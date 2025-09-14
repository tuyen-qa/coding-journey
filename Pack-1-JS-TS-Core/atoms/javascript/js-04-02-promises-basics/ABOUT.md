# JS-04 — JavaScript Promises (Basic)

## 1. Background Logic
Trước khi có **Promises**, JavaScript xử lý bất đồng bộ chủ yếu bằng **callback**. Điều này dẫn đến vấn đề gọi lồng nhau (“callback hell”), code khó đọc và khó bảo trì.  
**Promise** ra đời để:
- Đại diện cho **một giá trị trong tương lai** (future value).
- Cho phép viết bất đồng bộ gần giống như đồng bộ.
- Hỗ trợ **chaining** và **error handling** rõ ràng hơn.

## 2. Promise Lifecycle
Một Promise có 3 trạng thái (states):
1. **pending** – trạng thái ban đầu, chưa có kết quả.
2. **fulfilled** – đã thành công, có `value`.
3. **rejected** – thất bại, có `reason` (thường là Error).

> Lưu ý: Promise chỉ chuyển đổi **một lần** từ `pending` sang `fulfilled` hoặc `rejected`.

## 3. Basic Syntax

### Tạo Promise
```js
const promise = new Promise((resolve, reject) => {
  // async operation
  const success = Math.random() > 0.5;
  if (success) {
    resolve("Data received!");
  } else {
    reject(new Error("Something went wrong"));
  }
});
```

### Consume Promise
```js
promise
  .then(result => {
    console.log("Fulfilled:", result);
  })
  .catch(error => {
    console.error("Rejected:", error);
  })
  .finally(() => {
    console.log("Always executed");
  });
```

## 4. Key Methods
- **Promise.resolve(value)** → tạo Promise đã được fulfill ngay.
- **Promise.reject(error)** → tạo Promise đã bị reject ngay.
- **Promise.all([p1, p2, ...])** → chạy song song, fail nếu có 1 promise fail.
- **Promise.race([p1, p2, ...])** → trả về promise settle đầu tiên (fulfilled hoặc rejected).
- **Promise.allSettled([p1, p2, ...])** → trả về kết quả của tất cả, bất kể thành công hay thất bại.
- **Promise.any([p1, p2, ...])** → trả về promise đầu tiên *fulfilled* (nếu tất cả đều reject → AggregateError).

## 5. Chaining
`.then()` có thể return một giá trị mới hoặc một promise mới.  
Nếu có `throw` trong `.then()`, error sẽ được chuyển sang `.catch()` kế tiếp.

```js
fetchData()
  .then(parseJSON)        // return data hoặc Promise
  .then(processData)      // có thể throw error
  .catch(handleError);    // bắt tất cả lỗi ở chuỗi trên
```

## 6. Common Pitfalls
- **Quên return trong `.then()`** → mất khả năng chaining.
- **Không catch error** → *UnhandledPromiseRejection*.
- **Mix callback + promise** → code rối và khó maintain.
- **Hiểu sai microtask queue**: `.then()` chạy sau code sync nhưng trước `setTimeout`.
- **Nuốt lỗi (swallow errors)** khi `catch` mà không rethrow hoặc return giá trị hợp lệ.

## 7. Trade-offs
- **Pros**:
    - Flow rõ ràng, dễ đọc hơn callback.
    - Có built-in error handling.
    - Dễ kết hợp và compose nhiều promise.
- **Cons**:
    - Verbose hơn so với `async/await`.
    - Debug stacktrace khó hơn.
    - Nếu chain không đúng vẫn dẫn đến nesting.

## 8. Reflection Questions
1. Promise khác gì với callback?
2. Khi nào dùng `.then()`, `.catch()`, `.finally()`?
3. Tại sao cần `Promise.all` thay vì chạy tuần tự?
4. Nếu `.then()` throw error thì chuyện gì xảy ra?
5. Microtask queue hoạt động thế nào so với `setTimeout`?
6. Khi nào chọn `allSettled` thay vì `all`? Khi nào chọn `any` thay vì `race`?

## 9. Liên hệ với ESM
- **Dynamic `import()`** trong ESM trả về một Promise:
```js
import('./math.js')
  .then(module => console.log(module.add(2, 3)))
  .catch(console.error);
```
- **Top-level await** (chỉ có trong ESM):
```js
const module = await import('./math.js');
console.log(module.add(2, 3));
```
👉 Đây là điểm giao giữa **Promises** và **ECMAScript Modules (ESM)**.



