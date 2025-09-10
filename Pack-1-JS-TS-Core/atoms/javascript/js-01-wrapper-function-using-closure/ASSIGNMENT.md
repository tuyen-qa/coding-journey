# Assignments – Wrapper Functions

## Mục tiêu
Luyện tập viết các wrapper function khác nhau dựa trên công thức:
1. Xác định hành vi đặc biệt cần thêm.
2. Xác định state cần giữ (closure).
3. Outer function khởi tạo state.
4. Inner function dùng state và gọi hàm gốc.
5. Trả kết quả.

---

## Bài tập

### 1. onceAsync(fn)
Giống `once`, nhưng `fn` có thể trả Promise.
- Nếu gọi nhiều lần → lần đầu chạy thật, những lần sau chờ và trả cùng Promise.
- Hint: closure giữ `called` và `promise`.

---

### 2. debouncePromise(fn, delay)
Giống `debounce`, nhưng trả về Promise để bạn có thể `await`.
- Behavior: chỉ resolve/reject khi hàm gốc thực sự được gọi sau delay.
- Hint: closure giữ `timer`, và resolve/reject function cho Promise.

---

### 3. throttleLeadingTrailing(fn, interval)
Bản nâng cao của `throttle`:
- Cho phép config: gọi ở đầu khoảng (leading), cuối khoảng (trailing), hoặc cả hai.
- Hint: closure giữ `last` và `timer`.

---

### 4. retryWithBackoff(fn, times, delay)
Giống `retry`, nhưng mỗi lần fail sẽ chờ `delay * 2^attempt` ms trước khi thử lại.
- Hint: dùng `await new Promise(r => setTimeout(r, ...))` để sleep.

---

### 5. memoizeAsync(fn)
Memoize cho hàm async:
- Nếu cùng input đang pending → trả cùng Promise (không gọi thêm).
- Nếu đã có kết quả → trả cache.
- Hint: closure giữ `cache` có cả Promise và giá trị resolved.

---

### 6. logWrapperAdvanced(fn)
Nâng cấp `logWrapper`:
- Log cả thời gian chạy.
- Log cả lỗi nếu hàm gốc ném exception.
- Hint: bắt try/catch trong inner function.

---

### 7. combineWrappers(fn, ...wrappers)
Viết một hàm cho phép kết hợp nhiều wrapper cùng lúc.
```js
const wrapped = combineWrappers(add, once, logWrapper, timeWrapper);
