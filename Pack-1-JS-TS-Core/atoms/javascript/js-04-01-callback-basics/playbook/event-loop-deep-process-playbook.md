# 🧠 Event Loop Deep Process Playbook
Giải thích chi tiết cách JavaScript xử lý bất đồng bộ, callback, Timer API, Queue và Event Loop.

---

## 1️⃣ Bước 0 – Khi chạy một file `.js`, điều gì được tạo ra?

Khi bạn chạy một file JavaScript, ví dụ:
```bash
node app.js
```
hoặc:
```html
<script src="app.js"></script>
```

Trình chạy (runtime environment) sẽ khởi tạo **môi trường thực thi JavaScript (JavaScript Runtime Environment)**.

### Thành phần được tạo ra

| Thành phần | Vai trò | Ví dụ trong môi trường |
|-------------|----------|------------------------|
| **JavaScript Engine** | Chịu trách nhiệm đọc, biên dịch và thực thi mã JavaScript | V8 (Chrome, Node.js), SpiderMonkey (Firefox) |
| **Call Stack** | Nơi chứa và xử lý các hàm đang được gọi (theo cơ chế LIFO) | Nội bộ của Engine |
| **Heap** | Bộ nhớ để lưu trữ dữ liệu (object, array, closure...) | Nội bộ của Engine |
| **Execution Context** | Không gian thực thi của từng đoạn mã | Global, Function, Eval |
| **Environment APIs** | Các API được cung cấp bởi môi trường ngoài Engine | setTimeout, fetch, fs, DOM |
| **Event Loop** | Cơ chế giám sát và điều phối luồng công việc giữa Stack, Queue, và Environment | Nội bộ runtime |
| **Queues (hàng đợi)** | Nơi chứa các callback sẵn sàng thực thi | Microtask Queue, Macrotask Queue |

### Quá trình khởi tạo

1. **Tạo Global Execution Context (GEC)** – nơi chứa tất cả biến và hàm global.  
2. **Tạo Call Stack và Heap** trong Engine.  
3. **Nạp các API của môi trường** (Browser hoặc Node.js).  
4. **Khởi tạo Event Loop và các Queue** (Microtask, Macrotask).  

Sơ đồ khởi tạo:
```
┌─────────────────────────────┐
│ JavaScript Engine           │
│ ├── Call Stack              │
│ ├── Heap                    │
│ └── Execution Context (GEC) │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ Environment APIs             │ ← Web APIs (Browser) / libuv (Node.js)
│ ├── Timer API                │
│ ├── Network API              │
│ └── File / DOM API           │
└──────────────┬──────────────┘
               ▼
┌─────────────────────────────┐
│ Queues                      │
│ ├── Microtask Queue          │ (Promise, queueMicrotask)
│ └── Macrotask Queue          │ (setTimeout, I/O)
└──────────────┬──────────────┘
               ▼
        🔁 Event Loop
```

---

## 2️⃣ Bước 1 – Quá trình thực thi qua ví dụ

Ví dụ:
```js
console.log("A");

setTimeout(() => {
  console.log("B");
}, 1000);

console.log("C");
```

### Bước 1.1 – `console.log("A")`

- Hàm `console.log` được đưa lên **Call Stack**.  
- Engine thực thi → in “A”.  
- Sau khi xong → hàm được gỡ khỏi Stack.

📊 Trạng thái:

| Thành phần | Trạng thái |
|-------------|------------|
| Call Stack | trống |
| Timer API | chưa hoạt động |
| Queue | rỗng |
| Output | A |

---

### Bước 1.2 – `setTimeout(() => console.log("B"), 1000)`

1. Engine gọi hàm `setTimeout`, đưa vào **Call Stack**.  
2. Vì `setTimeout` là **API của môi trường**, nên Engine **ủy thác (delegate)** nhiệm vụ này cho **Timer API** của Environment.  
3. Timer API bắt đầu đếm 1000ms.  
4. Khi giao việc xong, `setTimeout` rời khỏi Stack → Stack lại trống.

📊 Trạng thái:

| Thành phần | Trạng thái |
|-------------|------------|
| Call Stack | trống |
| Timer API | đang đếm thời gian |
| Queue | rỗng |
| Output | A |

---

### Bước 1.3 – `console.log("C")`

Engine tiếp tục chạy lệnh `console.log("C")` → in ra `C`.

📊 Trạng thái:

| Thành phần | Trạng thái |
|-------------|------------|
| Call Stack | trống |
| Timer API | vẫn đang đếm |
| Queue | rỗng |
| Output | A, C |

---

### Bước 1.4 – Timer API hoàn tất

Sau 1000ms, Timer API báo:
> “Đã hết thời gian, đây là callback của bạn.”

Callback `( ) => console.log("B")` được **đưa vào Macrotask Queue**.  
**Event Loop** kiểm tra:
- Nếu **Call Stack trống**, nó **lấy callback từ Queue** và **đưa vào Stack** để chạy.

📊 Trạng thái:

| Thành phần | Trạng thái |
|-------------|------------|
| Call Stack | đang chạy callback |
| Queue | trống |
| Output | A, C, B |

✅ Kết quả:
```
A
C
B
```

---

## 3️⃣ Bước 2 – Microtask vs Macrotask

Ví dụ:
```js
console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => console.log('3'));

console.log('4');
```

### Dòng chảy:
1. `console.log('1')` → in `1`
2. `setTimeout` → callback vào **Macrotask Queue**
3. `Promise.then` → callback vào **Microtask Queue**
4. `console.log('4')` → in `4`
5. Call Stack trống → Event Loop chạy Microtask Queue trước → in `3`
6. Sau đó mới chạy Macrotask Queue → in `2`

✅ Output:
```
1
4
3
2
```

💡 **Microtask Queue** luôn được ưu tiên hơn **Macrotask Queue**.

---

## 4️⃣ Bước 3 – Tóm tắt khái niệm

| Khái niệm | Vai trò | Nguồn gốc |
|------------|----------|-----------|
| **JavaScript Engine** | Thực thi code JavaScript | Nội bộ runtime |
| **Call Stack** | Nơi các hàm được gọi và xử lý | Engine |
| **Heap** | Bộ nhớ động lưu dữ liệu | Engine |
| **Execution Context** | Không gian thực thi mã (Global, Function) | Engine |
| **Environment APIs** | Xử lý tác vụ bất đồng bộ | Môi trường ngoài Engine |
| **Timer API** | Đếm thời gian và gửi callback vào Queue | Environment |
| **Queue** | Hàng đợi callback sẵn sàng thực thi | Runtime |
| **Event Loop** | Di chuyển callback từ Queue sang Stack khi rảnh | Runtime |
| **Microtask Queue** | Promise, queueMicrotask, process.nextTick | Ưu tiên cao |
| **Macrotask Queue** | setTimeout, setInterval, I/O | Ưu tiên thấp hơn |

---

## 5️⃣ Bước 4 – Critical Thinking Questions

| Câu hỏi | Ý nghĩa cần suy luận |
|----------|----------------------|
| Tại sao JavaScript chỉ có một Call Stack? | Để tránh xung đột bộ nhớ, dễ kiểm soát. |
| Nếu chỉ có một Stack, sao vẫn xử lý nhiều việc? | Bằng cách ủy thác sang Environment (Timers, I/O). |
| Nếu không có Event Loop, chuyện gì xảy ra? | Callbacks sẽ không bao giờ được thực thi. |
| Vì sao callback không chạy ngay khi setTimeout hết thời gian? | Vì Stack còn bận, Event Loop chỉ đẩy vào khi Stack trống. |
| Vì sao Promise chạy trước setTimeout? | Vì Promise nằm trong Microtask Queue có ưu tiên cao hơn. |
| Async/Await thực ra hoạt động dựa trên cơ chế nào? | Dựa trên Promise → Microtask Queue → Event Loop. |

---

## 6️⃣ Bước 5 – Lý do cần hiểu quy trình này

| Lý do | Ứng dụng thực tế |
|--------|------------------|
| Hiểu cơ chế bất đồng bộ | Viết code async chính xác và hiệu quả |
| Debug chính xác lỗi timing | Tránh hiểu sai thứ tự thực thi |
| Hiểu async/await | async chỉ là syntax sugar của Promise |
| Tối ưu hiệu năng | Biết khi nào nên tách tác vụ ra microtask |
| Tránh blocking UI / process | Viết ứng dụng mượt mà, không đơ |
| Kiểm soát flow phức tạp | Làm chủ luồng chạy của ứng dụng Node hoặc front-end |

---

## 🔚 Sơ đồ tổng kết toàn bộ luồng hoạt động

```
┌─────────────────────────────┐
│       JavaScript Engine     │
│ ├── Call Stack              │ ← nơi chạy code đồng bộ
│ ├── Heap                    │ ← lưu biến, object
│ └── Execution Context        │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│      Environment APIs       │ ← setTimeout, I/O, Network...
│ ├── Timer API               │
│ ├── Network API             │
│ └── File / DOM API          │
└──────────────┬──────────────┘
               ▼
┌─────────────────────────────┐
│         Queues              │
│ ├── Microtask Queue         │ ← Promise
│ └── Macrotask Queue         │ ← setTimeout, IO
└──────────────┬──────────────┘
               ▼
          🔁 Event Loop
(kiểm tra Stack, di chuyển callback khi Stack trống)
```

---

> ✅ **Tóm tắt một dòng:**  
> JavaScript chỉ có một Call Stack,  
> nhưng nhờ môi trường (Environment) và Event Loop,  
> nó có thể xử lý hàng nghìn tác vụ bất đồng bộ mà không bị “nghẽn”.
