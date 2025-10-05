# 🧠 onTaskDone Design Pattern for Asynchronous Callbacks — Playbook

> Triết lý và tư duy thiết kế flow bất đồng bộ dựa trên callback trung gian `onTaskDone`.

---

## 1️⃣ Giới thiệu triết lý

Trong thế giới bất đồng bộ, mọi bài toán “chờ nhiều việc xong rồi mới làm tiếp”  
đều quy về cùng một câu hỏi:

> “Khi một tác vụ (task) hoàn thành, tôi muốn điều gì xảy ra tiếp theo?”

Pattern `onTaskDone` chính là **câu trả lời thống nhất** cho câu hỏi đó.  
Thay vì viết mỗi flow một kiểu, ta luôn thiết kế quanh **một callback trung gian duy nhất** – `onTaskDone`.

`onTaskDone` là hàm được **mỗi task gọi lại** khi xong,  
và chính nó quyết định flow sẽ tiếp diễn ra sao (đếm, gọi task mới, kết thúc...).

---

## 2️⃣ Ba lớp logic trong tư duy onTaskDone

Khi bạn viết bất kỳ flow callback nào, luôn có 3 lớp:

| Lớp | Vai trò | Ví dụ |
|------|----------|--------|
| **Task Layer** | Thực hiện công việc thật (I/O, setTimeout, API call...) | `cb => setTimeout(cb, 100)` |
| **Control Layer** | Nơi điều phối và gọi các task | `forEach`, `runNext(index)` |
| **onTaskDone Layer** | Callback trung gian – định nghĩa “khi một task hoàn tất thì sao?” | Đếm, gọi task mới, gọi `done()` |

👉 Một flow async hoàn chỉnh =  
**Task layer** + **Control layer** + **onTaskDone logic**.

---

## 3️⃣ Khung tư duy 5 bước

Dưới đây là 5 câu hỏi giúp bạn tự thiết kế flow mới theo pattern này:

1️⃣ **Khi một task hoàn thành (`onTaskDone()` được gọi), tôi muốn làm gì?**  
 → Đếm, gọi task tiếp, dừng sớm, hay truyền dữ liệu?

2️⃣ **Làm sao để biết khi nào toàn bộ flow kết thúc?**  
 → Xác định điều kiện gọi `done()` (ví dụ: `finished === total`, `index === total`, v.v.)

3️⃣ **Ai là người khởi động task đầu tiên?**  
 → Gọi tất cả cùng lúc (parallel) hay từng task một (series)?

4️⃣ **Có cần truyền kết quả giữa các task không?**  
 → Nếu có → pattern `Waterfall`.

5️⃣ **Nếu một task lỗi, tôi muốn flow dừng hay tiếp tục?**  
 → Nếu cần bảo toàn flow → bọc trong `try/catch` trong `task(onTaskDone)`.

---

## 4️⃣ Pseudocode – Khung thiết kế chung

```js
function runFlow(tasks, done) {
  let state = {}; // giữ dữ liệu như index, finished, result...

  function onTaskDone(...args) {
    // 1️⃣ Cập nhật state
    // 2️⃣ Kiểm tra điều kiện kết thúc
    // 3️⃣ Nếu chưa xong: gọi task kế hoặc chờ task khác
    // 4️⃣ Nếu xong: done()
  }

  // Bắt đầu flow: gọi task đầu tiên hoặc tất cả
}
```

---

## 5️⃣ Bốn biến thể cốt lõi

### 🟢 Parallel Pattern – Đếm và hoàn tất

**Tình huống:** bạn có nhiều task độc lập, muốn tất cả chạy cùng lúc.  
**Tư duy:** khi mỗi task gọi `onTaskDone`, tôi chỉ cần đếm.  

```js
function runParallel(tasks, done) {
  let finished = 0;
  const total = tasks.length;

  const onTaskDone = () => {
    finished++;
    if (finished === total) done();
  };

  tasks.forEach(task => task(onTaskDone));
}
```

**Sơ đồ ASCII:**
```
T1: [======cb()]
T2: [===cb()]
T3: [=========cb()]
                ↓
             done()
```

---

### 🔵 Series Pattern – Chạy lần lượt

**Tình huống:** task sau chỉ chạy khi task trước hoàn tất.  
**Tư duy:** mỗi lần `onTaskDone` được gọi → gọi task kế tiếp.

```js
function runSeries(tasks, done) {
  let index = 0;
  const total = tasks.length;

  const onTaskDone = () => {
    index++;
    if (index === total) return done();
    tasks[index](onTaskDone);
  };

  tasks[0](onTaskDone);
}
```

**Sơ đồ ASCII:**
```
T1: [=====cb()]→
T2:       [====cb()]→
T3:            [===cb()]→ done()
```

---

### 🟠 Race Pattern – Dừng sớm khi có kết quả

**Tình huống:** chỉ cần task đầu tiên hoàn tất.  
**Tư duy:** lần đầu `onTaskDone` được gọi → done() ngay; các task khác bỏ qua.

```js
function runRace(tasks, done) {
  let finished = false;

  const onTaskDone = () => {
    if (!finished) {
      finished = true;
      done();
    }
  };

  tasks.forEach(task => task(onTaskDone));
}
```

**Sơ đồ ASCII:**
```
T1: [======cb()]
T2: [==cb()] → done() 🚩
T3: [===========cb()] (bị bỏ qua)
```

---

### 🟣 Waterfall Pattern – Truyền dữ liệu qua từng task

**Tình huống:** kết quả của task trước là input của task sau.  
**Tư duy:** `onTaskDone(result)` sẽ gọi task kế tiếp kèm output đó.

```js
function runWaterfall(tasks, done) {
  let index = 0;
  const total = tasks.length;

  const onTaskDone = (result) => {
    index++;
    if (index === total) return done(result);
    tasks[index](onTaskDone, result);
  };

  tasks[0](onTaskDone);
}
```

**Sơ đồ ASCII:**
```
result0 → T1(cb,result1) → T2(cb,result2) → T3(cb,result3) → done(result3)
```

---

## 6️⃣ Checklist tư duy thực hành

Trước khi viết code, hãy trả lời:

✅ Khi một task hoàn tất, tôi muốn điều gì xảy ra?  
✅ Tôi biết lúc nào toàn bộ flow kết thúc không?  
✅ Tôi gọi task đầu tiên hay tất cả cùng lúc?  
✅ Tôi cần lưu state (index, result, finished) ở đâu?  
✅ Tôi có cần bảo vệ callback khỏi lỗi không?  

> Nếu bạn trả lời được 5 câu hỏi này → bạn có thể tự viết bất kỳ flow callback nào.

---

## 7️⃣ Sơ đồ tổng quát luồng callback

```
┌──────────────────────────────┐
│  Control Layer               │
│  (forEach / recursion)       │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│  Task Layer                  │
│  (cb => {... cb();})         │
└──────────────┬───────────────┘
               │ cb() gọi xong
               ▼
┌──────────────────────────────┐
│  onTaskDone Layer            │
│  (đếm / gọi tiếp / done)    │
└──────────────┬───────────────┘
               ▼
             done()
```

---

## 8️⃣ Kết luận triết lý

> Callback không phải thứ đáng sợ —  
> nó chỉ là một vòng điều phối,  
> nơi bạn định nghĩa **“khi một công việc xong, điều gì xảy ra tiếp theo.”**

`onTaskDone` là trái tim của vòng điều phối đó.  
Khi bạn biết cách thiết kế `onTaskDone`,  
bạn **làm chủ hoàn toàn mọi flow bất đồng bộ bằng tư duy của chính mình.**

---

**Tổng kết một dòng:**
> “Đừng chạy theo callback – hãy để callback chạy theo thiết kế của bạn.”
