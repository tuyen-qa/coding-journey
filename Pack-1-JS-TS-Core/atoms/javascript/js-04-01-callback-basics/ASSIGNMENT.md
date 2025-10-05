# 📘 ASSIGNMENT — callback-basic

## 🎯 Goal
Hiểu và luyện tập cách sử dụng **callback** trong JavaScript, bao gồm:
- Synchronous callback (gọi ngay)
- Asynchronous callback (gọi sau khi hoàn tất)
- Error-first callback pattern (Node.js style)
- Chaining callback (callback lồng nhau)

---

## 1️⃣ Bài 1 — Synchronous callback
**Hàm:** `greetUser(name, callback)`

> Gọi callback(name) và trả về kết quả.

**Ví dụ:**
```js
greetUser('Tuyen', n => `Hello ${n}`) // 'Hello Tuyen'
```

---

## 2️⃣ Bài 2 — Transform array
**Hàm:** `mapArray(arr, callback)`

> Trả về mảng mới với giá trị được biến đổi qua callback(value, index).

**Ví dụ:**
```js
mapArray([1,2,3], x => x*2) // [2,4,6]
```

---

## 3️⃣ Bài 3 — Asynchronous callback
**Hàm:** `delayedMessage(msg, delayMs, callback)`

> Sau `delayMs` mili-giây, gọi `callback(msg)`.

**Gợi ý:** dùng `setTimeout`.

---

## 4️⃣ Bài 4 — Error-first callback
**Hàm:** `readConfig(path, callback)`

> Mô phỏng đọc file cấu hình:

- Nếu `path === 'valid.json'` → callback(null, { env:'dev' })
- Ngược lại → callback('File not found', null)

---

## 5️⃣ Bài 5 — Chained callbacks
**Hàm:** `loadUserAndPosts(id, callback)`

> Gọi tuần tự:
1. `loadUser(id, (err, user) => {...})`
2. `loadPosts(user, callback)`

Nếu bất kỳ lỗi nào, phải callback(err).  
Tuân theo style `callback(err, result)`.

---

## 🧩 Test file
Chạy test bằng Node (v20+):
```bash
node --test test/callback-basic.test.js
```

---

## 🧠 Reflection gợi ý
- Khi nào callback được gọi ngay? Khi nào được gọi muộn?
- Vì sao gọi `callback(err)` giúp dễ debug?
- Làm sao để tránh “callback hell”?
