# 🗓️ Day-09 Log

## Chủ đề: Promise Design Patterns — Feed / Orders / Upload

---

### 🎯 Mục tiêu
- Hiểu và áp dụng thành thạo các pattern Promise:  
  - `resolve` / `reject`  
  - `then` chain (sequential flow)  
  - `Promise.all` (parallel)  
  - `Promise.race` (competition / timeout)  
  - “shape API” (luôn trả Promise)

---

## 1️⃣ feed-basic.js — *Cache → Network → Race*

| Phần | Bài học |
|------|----------|
| **getUserFromCache** | Dùng `Promise.resolve` / `Promise.reject` để chuẩn hoá output. |
| **getFeedForUser** | Chain Promise: lấy `user` rồi map sang `feed` strings. |
| **getNotifications** | Promise đơn giản trả array. |
| **getUserFromNetworkSlow** | `new Promise` + `setTimeout(resolve, ms)` → mô phỏng API chậm. |
| **timeout(ms)** | `new Promise` + `setTimeout(reject, ms)` → mô phỏng lỗi timeout. |
| **getUserFromCacheOrNetwork** | Dùng `.catch()` để fallback: nếu cache fail → `Promise.race` giữa network & timeout. |

🧩 **Key take-away:**  
- `.catch()` có thể dùng để “đổi đường đi” (fallback).  
- `Promise.race([slow, timeout])` mô phỏng logic “chờ nhanh nhất thắng”.

---

## 2️⃣ orders-basic.js — *Sequential → Parallel → Race → Shape*

| Phần | Bài học |
|------|----------|
| **getPriceFromCache** | Dùng `Promise.resolve / reject` để tạo Promise đồng bộ. |
| **calcOrderSubtotal** | `Promise.all` + `.map()` + `.reduce()` → gom nhiều Promise, tính tổng `qty * price`. |
| **getShippingFee** | Trả Promise<number> để đồng bộ với chain. |
| **calcOrderTotal** | Chain nối tiếp: subtotal → shipping → total. |
| **getProductDetailsSlow** | `new Promise` mô phỏng API 50ms. |
| **getProductFastOrTimeout** | `Promise.race([ slow, timeout ])` để giới hạn thời gian. |
| **getProduct** | “Shape API” – luôn trả Promise, dù sync hay async. |

🧠 **Bài học rút ra:**
- Khi chain Promise, **nhớ return Promise ở mỗi bước**.  
- `Promise.all` chạy song song, `Promise.race` chọn kết quả đầu tiên.  
- API tốt luôn thống nhất: luôn trả Promise (`resolve` nếu sync).

---

## 3️⃣ upload-basic.js — *Decorator + Parallel + Race*

| Phần | Bài học |
|------|----------|
| **uploadFile** | `new Promise` + `setTimeout` → mô phỏng upload. |
| **compressFile** | `Promise.resolve().then(...)` → chain sang upload (pattern “compress → upload”). |
| **compressThenUpload** | Chain 2 bước Promise rõ ràng, return Promise cuối. |
| **uploadMany** | `Promise.all` để upload nhiều file song song. |
| **uploadWithTimeout** | `Promise.race([ uploadSlow, timeout ])` → giới hạn thời gian upload. |

⚙️ **Key concept:**  
> `Promise.all` = *song song an toàn*,  
> `Promise.race` = *đua nhanh nhất thắng*,  
> và cả hai đều **không cần từ khoá `new`** vì là *static methods* của `Promise`.

---

## 4️⃣ Tổng kết kiến thức mới trong ngày

| Chủ đề | Ý chính |
|--------|----------|
| **Chaining** | `.then` luôn return Promise mới → chain được nhiều bước. |
| **Parallel** | `Promise.all([...])` đợi toàn bộ resolve, trả mảng kết quả. |
| **Race / Timeout** | `Promise.race([...])` cho kết quả Promise đầu tiên settle. |
| **Shape API** | API tốt luôn trả Promise, không lẫn sync/async. |
| **Design mindset** | Nghĩ theo *data flow*: “cache → network → timeout”, “subtotal → shipping → total”, “compress → upload → done”. |

---

## ✨ Reflection
- So với Day-08 (chaining cơ bản), hôm nay đã luyện được toàn bộ “vòng đời Promise”:  
  **create → chain → combine → compete → shape**.  
- Code sử dụng hoàn toàn `.then/.catch`, không cần `async/await`.  
- Hiểu rõ cơ chế `Promise.all`, `Promise.race` và tầm quan trọng của việc return Promise trong chain.

---
