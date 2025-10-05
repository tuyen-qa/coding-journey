# 📘 ASSIGNMENT — callback-advanced-1 (Higher-Order Callbacks)

## 🎯 Goal
Hiểu callback như một công cụ **mở rộng hành vi** của hàm:
- Dạng **Template Method**: trước / sau quy trình chính.
- Dạng **Strategy**: chọn chiến lược xử lý khác nhau.
- Dạng **Composition**: ghép nhiều callback thành pipeline.

---

## 1️⃣ Template Method
`processData(data, before, after)`  
Gọi các hàm `before()` và `after()` nếu có.

---

## 2️⃣ Strategy Pattern
`applyStrategy(a, b, strategy)`  
Truyền callback vào như một chiến lược xử lý, ví dụ: cộng, nhân, chia.

---

## 3️⃣ Compose Callbacks
`composeCallbacks(...callbacks)`  
Trả về một hàm mới, khi gọi sẽ chạy tất cả callback nối tiếp nhau.

---

## 🧪 Run test
```bash
node --test test/callback-advanced-1.test.js
```
