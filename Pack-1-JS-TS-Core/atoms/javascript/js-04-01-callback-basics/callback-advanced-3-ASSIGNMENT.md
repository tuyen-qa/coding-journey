# 📘 ASSIGNMENT — callback-advanced-3 (Event & Observer)

## 🎯 Goal
Hiểu callback trong mô hình **Observer pattern** — khi một object phát sự kiện, nhiều object khác có thể "quan sát" và phản ứng.

---

## 1️⃣ Class EventEmitter
Cài đặt 3 phương thức:
- `on(event, callback)` — đăng ký lắng nghe
- `emit(event, data)` — phát sự kiện, gọi mọi callback
- `off(event, callback)` — hủy đăng ký

---

## 💡 Ví dụ
```js
const e = new EventEmitter();
e.on('save', data => console.log('Saved', data));
e.emit('save', { id:1 });
```

---

## 🧪 Run test
```bash
node --test test/callback-advanced-3.test.js
```
