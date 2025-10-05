# 📘 ASSIGNMENT — callback-advanced-2 (Async Flow Control)

## 🎯 Goal
Rèn luyện cách kiểm soát luồng callback bất đồng bộ:
- Chạy song song (parallel)
- Chạy tuần tự (series)
- Truyền kết quả giữa các bước (waterfall)

---

## 1️⃣ Parallel
`runParallel(tasks, done)`  
Gọi tất cả các hàm trong `tasks` song song. Khi tất cả xong, gọi `done()`.

---

## 2️⃣ Series
`runSeries(tasks, done)`  
Chạy từng hàm lần lượt, chỉ khi task trước gọi callback mới chuyển sang task kế tiếp.

---

## 3️⃣ Waterfall
`waterfall(tasks, done)`  
Truyền dữ liệu từ task này sang task khác theo chuỗi callback.

---

## 🧪 Run test
```bash
node --test test/callback-advanced-2.test.js
```
