# Variations – Wrapper Functions

Mục tiêu:
- Vừa **luyện tập lại** những wrapper function cơ bản đã học.
- Vừa **đào sâu hơn** vào kiến thức closure, state, memory-safety, và trade-off.

---

## 1. Luyện tập lại

### 1.1 once
- Viết lại `once(fn)` theo công thức Outer/Inner/Closure.
- Thêm test: gọi 3 lần liên tục, chỉ lần đầu chạy `fn`.

### 1.2 debounce
- Viết lại `debounce(fn, delay)`.
- Thêm test: gọi nhiều lần liên tiếp → chỉ chạy 1 lần sau `delay`.
- Thử dùng `.cancel()` để hủy, `.flush()` để chạy ngay.

### 1.3 throttle
- Viết lại `throttle(fn, interval)`.
- Test: gọi liên tục → chỉ chạy 1 lần mỗi `interval`.
- Dùng `.cancel()` để hủy trailing call.

### 1.4 memoize
- Viết lại `memoize(fn)`.
- Test: gọi cùng input → chỉ chạy `fn` lần đầu.
- Dùng `.clear()` để xóa cache, gọi lại phải tính toán lại.

### 1.5 retry
- Viết lại `retry(fn, times)`.
- Test: hàm gốc fail 2 lần, lần 3 thành công → wrapper trả về kết quả đúng.
- Thử hủy bằng `AbortController`.

---

## 2. Đào sâu hơn

### 2.1 onceAsync
- Mở rộng `once` để hỗ trợ async: lần đầu trả Promise, những lần sau trả cùng Promise.
- Test: gọi `await onceAsync(fetchUser)` nhiều lần → chỉ fetch 1 lần.

### 2.2 debounceLeading
- Viết `debounceLeading(fn, delay)`: chạy ngay lần đầu (leading), nhưng chặn các lần sau trong khoảng `delay`.
- Test: gọi 3 lần liên tiếp → chỉ chạy ngay lần đầu, không chạy lần 2 và 3.

### 2.3 throttleLeadingTrailing
- Viết `throttleLeadingTrailing(fn, interval, { leading, trailing })`.
- Cho phép config chạy ở đầu khoảng, cuối khoảng, hoặc cả hai.
- Test: kiểm tra hành vi khi `leading=false`, `trailing=true`.

### 2.4 memoizeTTL
- Viết `memoizeTTL(fn, ttl)` → cache hết hạn sau `ttl` ms.
- Test: gọi 2 lần gần nhau → hit cache; chờ >ttl → phải tính lại.

### 2.5 retryWithBackoff
- Viết `retryWithBackoff(fn, times, delay)` → mỗi lần fail, delay gấp đôi (`delay * 2^attempt`).
- Test: mock API fail nhiều lần → log thời gian chờ tăng dần.

### 2.6 logWrapperAdvanced
- Viết `logWrapperAdvanced(fn)` → log input, output, thời gian chạy, và exception nếu có.
- Test: cho hàm ném lỗi → wrapper log lỗi và ném tiếp ra ngoài.

---

## 3. Reflection – câu hỏi gợi ý

1. **Closure & State**
    - Khi nào state nên sống lâu? Khi nào nên dọn ngay?
    - Vì sao return function mới giữ được state?

2. **Memory-Safety**
    - Wrapper nào dễ gây memory leak nhất?
    - Cleanup API (`cancel`, `clear`, `abort`) có vai trò gì?

3. **Trade-off**
    - Khi nào chọn debounce vs throttle?
    - Đặt `memoize` trước `log` thì khác gì đặt sau?
    - `retryWithBackoff` tăng độ bền hay làm user chờ lâu?

4. **Ứng dụng thực tế**
    - Bạn sẽ dùng `once` ở đâu trong app thật?
    - `memoizeTTL` hợp với loại dữ liệu nào (API, tính toán nặng…)?
    - Trong frontend, debounce thường gặp ở đâu? throttle thường gặp ở đâu?

---

## 4. Thực hành nâng cao
- Viết benchmark so sánh `memoize` thường vs `memoizeTTL` với dataset lớn.
- Kết hợp `retryWithBackoff` với `fetch` thật và test với mạng chập chờn.
- Compose nhiều wrapper: `composeWrappers(fetchData, memoizeTTL, logWrapperAdvanced, retryWithBackoff)`.
- Dùng `withConfig` để bật/tắt các wrapper trong runtime, test thứ tự wrapper ảnh hưởng log/time thế nào.

---
