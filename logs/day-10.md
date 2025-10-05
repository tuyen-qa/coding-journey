# 🗓️ Day-10 Log

## Chủ đề: Callback Design Patterns — Sequential, Parallel, Retry, Middleware, Queue, Waterfall

---

### 🎯 Mục tiêu
- Hiểu rõ cơ chế **callback function**: ai gọi ai, tham số truyền qua lại.  
- Viết và điều phối flow bất đồng bộ bằng callback, không cần Promise.  
- Làm chủ các pattern nền tảng: `queue`, `retry`, `waterfall`, `middleware`, `once`, `compose`, v.v.  
- Tư duy callback qua **controller callback** (`onTaskDone`) làm trung tâm.

---

## 1️⃣ Callback Basics — *Cấu trúc và tư duy nền*

| Phần | Bài học |
|------|----------|
| **Cấu trúc hàm callback** | Callback có dạng `(err, result)` hoặc `(value)`; task truyền data ngược lên callback. |
| **Callback truyền thống vs. Node-style** | Node-style luôn `(err, result)` để thống nhất kiểm lỗi. |
| **Callback là “giao kèo”** | Ai định nghĩa hàm → quy định callback nhận gì. |
| **Callback flow** | Task gọi `cb()` → controller callback (`onTaskDone`) tiếp nhận và quyết định bước tiếp. |

🧩 **Key idea:**  
> Callback = “đường dây báo cáo” giữa task và controller.  
> Bạn điều khiển flow bằng cách định nghĩa `onTaskDone()` và truyền nó xuống dưới.

---

## 2️⃣ Sequential Flow — *Queue, Waterfall, Middleware*

| Pattern | Đặc điểm | Bài học chính |
|----------|-----------|---------------|
| **Queue** | Chạy tuần tự từng task(cb) | Dùng `onTaskDone()` để gọi task kế tiếp. |
| **Waterfall** | Truyền `result` từ task trước sang task sau | Callback dạng `(prevResult, cb)`. |
| **Middleware Chain** | Giống Express: `(req, res, next)` | `next()` chính là alias của `onTaskDone`. |

⚙️ **Tư duy chung:**  
- `onTaskDone` = điều phối toàn flow.  
- `cb()` hoặc `next()` = callback local, thực tế chính là `onTaskDone`.

---

## 3️⃣ Parallel Flow — *Multiple async tasks*

| Pattern | Đặc điểm | Ghi chú |
|----------|-----------|----------|
| **runParallel** | Gọi tất cả task(cb) cùng lúc, đếm số hoàn tất | `finished++` → khi đủ thì `done()`. |
| **runParallelStopOnError** | Giống trên nhưng dừng khi có lỗi | Gọi `done(err)` sớm, bỏ qua task còn lại. |
| **race** | Ai hoàn tất trước sẽ gọi `done()` | Mô phỏng `Promise.race`. |

💡 **Key mindset:**  
> Parallel flow không tuần tự, mà dựa vào callback để “đếm hoặc chọn” kết quả.

---

## 4️⃣ Retry Flow — *Resilience pattern*

| Pattern | Đặc điểm | Bài học |
|----------|-----------|----------|
| **retry(apiFn, attempts, done)** | Gọi lại `apiFn(cb)` đến khi thành công hoặc hết lượt | `onTaskDone(err,res)` tái gọi `apiFn` nếu lỗi. |
| **retryWithDelay** | Thêm `setTimeout` giữa các lần thử | Mô phỏng backoff logic. |
| **retryBackoff** | Mỗi lần delay gấp đôi | Pattern dùng trong retry API thực tế. |

🧠 **Tư duy:**  
- `onTaskDone` vừa là callback xử lý, vừa là “scheduler” lặp lại chính nó.  
- Đây là pattern “recursive callback”.

---

## 5️⃣ Control Patterns — *once, compose, withTimeout*

| Pattern | Ý nghĩa | Bài học |
|----------|----------|----------|
| **once(fn)** | Tạo hàm chỉ chạy một lần duy nhất | Dùng closure để nhớ `called` state. |
| **compose(f,g)** | `compose(f,g)(x)` = `f(g(x))` | Kết hợp hàm từ phải → trái. |
| **withTimeout(fn, ms)** | Nếu `fn(cb)` không callback trong `ms` → gọi `cb('Timeout')` | Giúp kiểm soát thời gian chờ. |

🧩 **Tư duy:**  
> “Callback là điểm kiểm soát” — bạn có thể bao bọc, giới hạn, hoặc kết hợp logic xung quanh nó.

---

## 6️⃣ Tree & Recursive Callbacks

| Function | Pattern | Ý nghĩa |
|-----------|----------|----------|
| **traverseTree** | Recursion | Duyệt cây, gọi callback ở mỗi node. |
| **findInTree** | Conditional recursion | Dừng khi predicate đúng. |
| **countNodes** | Aggregation recursion | Đếm node thoả điều kiện. |

📘 **Key concept:**  
Recursion = callback tự gọi lại chính hàm cha (`traverseTree(child, cb)`),  
giúp duyệt cấu trúc lặp nhiều tầng mà không cần vòng lặp lồng nhau.

---

## 7️⃣ Advanced Async Flow — *Simulate, Queue, Delay*

| Function | Pattern | Vai trò |
|-----------|----------|----------|
| **simulateAPI(successRate, cb)** | Mock bất đồng bộ | Gọi `cb()` sau `setTimeout`. |
| **queue(tasks, done)** | Sequential chain | Duyệt tasks tuần tự qua `onTaskDone()`. |
| **delayedQueue** | Sequential + Delay | Giống queue nhưng có `delay` giữa các bước. |

---

## 8️⃣ Tổng hợp — *Callback as a Design Mindset*

| Chủ đề | Tư duy nền |
|---------|-------------|
| **Controller callback (`onTaskDone`)** | Callback trung tâm điều phối flow. |
| **Local callback (`cb`, `next`)** | Task-side báo “tôi xong rồi”. |
| **Data flow** | Data có thể truyền ngược qua callback (như waterfall). |
| **Error-first style** | Dễ kiểm soát luồng dừng / retry. |
| **Design unification** | Tất cả queue / retry / middleware đều chỉ khác nhau ở “khi nào gọi lại callback”. |

---

## ✨ Reflection

- Callback không chỉ là “gọi hàm sau khi xong”, mà là **một pattern điều phối hoàn chỉnh**.  
- `onTaskDone` là tư duy chung giúp bạn viết code callback rõ ràng, không rối.  
- Các pattern như **queue**, **retry**, **waterfall**, **middleware** đều là “anh em họ hàng” cùng khung tư duy này.  
- Nhờ callback, bạn học được cách:
  - **chạy tuần tự** (queue, series),
  - **chạy song song** (parallel, race),
  - **chạy có điều kiện / lỗi** (retry, stop-on-error),
  - **bao bọc logic nâng cao** (once, withTimeout, compose).

---

🧭 **Tổng kết tư duy ngày 10:**
> Callback = “Communication protocol” giữa task và controller.  
> Khi bạn nắm vững giao kèo đó (ai gọi ai, truyền gì, dừng khi nào),  
> bạn đã sẵn sàng bước vào lập trình bất đồng bộ thực chiến — từ callback → promise → async/await.
