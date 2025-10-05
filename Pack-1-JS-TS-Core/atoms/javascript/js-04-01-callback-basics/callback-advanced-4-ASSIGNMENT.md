# 📘 ASSIGNMENT — callback-advanced-4 (Middleware Pattern)

## 🎯 Goal
Hiểu **middleware chain pattern** — callback truyền "quyền điều khiển" giữa các bước trong pipeline.

---

## 1️⃣ Class App
Tạo một mini framework với 2 phương thức:

### `use(fn)`  
Đăng ký middleware vào danh sách.

### `run(req, res)`  
Chạy qua từng middleware với `next()` để chuyển sang bước kế tiếp.

---

## 💡 Ví dụ
```js
const app = new App();
app.use((req,res,next)=>{ console.log('1'); next(); });
app.use((req,res,next)=>{ console.log('2'); next(); });
app.run({}, {});
// -> In ra 1 rồi 2
```

---

## 🧪 Run test
```bash
node --test test/callback-advanced-4.test.js
```
