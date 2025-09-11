# 📅 Day 4 — this, bind, prototype chain, debounce

## ✅ Hôm nay tôi đã học / làm được
- Ôn lại **this**:
    - function thường → this phụ thuộc vào cách gọi.
    - arrow function → không có this riêng, luôn mượn từ scope định nghĩa.
    - case mất this khi gọi rời rạc.
- Hiểu & thực hành **call / apply / bind**:
    - `call(obj, ...args)`: ép this, gọi ngay.
    - `apply(obj, [args])`: giống call nhưng truyền mảng.
    - `bind(obj, ...args)`: không gọi ngay, trả về hàm mới giữ this cố định.
- Tự viết **bindOnce(fn, obj)** bằng closure và wrapper.
- Hiểu sự khác nhau giữa:
    - `safeMethod(obj, name)` → tạo ra 1 bản method an toàn, không thay object gốc.
    - `autoBind(instance)` → bind toàn bộ method trong class instance.
- Ôn lại **constructor + prototype**:
    - Constructor function với `new`.
    - Method dùng chung đặt ở `Ctor.prototype`.
    - Prototype chain: object → constructor.prototype → Object.prototype.
    - Kế thừa (Entity → User), override, fallback.
    - Shadowing: gắn method trùng tên ở instance che method trên prototype.
- **Method borrowing**: dùng `call/apply` để mượn method giữa object.
- **API Client bằng constructor/prototype**:
    - Thấy rõ method chia sẻ trên prototype.
    - Lỗi khi tách method (rơi this) → fix bằng `bind`.
- Viết và test **debounce(fn, ms)**:
    - Chỉ chạy fn một lần sau ms ms kể từ lần gọi cuối.
    - Giữ đúng this/args của lần gọi cuối cùng.
    - Ứng dụng thực tế: search box, resize, scroll handler.
- Case **nested function / timer**:
    - Gọi function lồng trong method → rơi this.
    - Fix bằng arrow hoặc `.bind(this)`.

## 🧠 Insight / Pattern rút ra
- **This không đi theo hàm**, mà phụ thuộc vào cách gọi → cần cẩn thận khi tách hàm ra.
- **Wrapper function + closure** là cách mạnh để “nhớ” context (this, obj, args).
- Prototype chain là nền tảng của OOP trong JS, giải thích được tại sao instance chia sẻ method.
- Nhiều bug `TypeError: Cannot read property ... of undefined` thực ra đến từ việc **mất this**.

## ⚡ Trade-off / Lựa chọn thiết kế
- Dùng **prototype** để tiết kiệm bộ nhớ, nhưng dễ gặp rắc rối khi shadow / override.
- Dùng **closure (factory function)** đơn giản hơn nhưng tốn bộ nhớ (mỗi instance copy method).
- **autoBind** tiện nhưng có thể tốn performance nếu bind nhiều method không dùng.
- **debounce** cần cân nhắc option leading/trailing cho phù hợp UX.

## ❓Câu hỏi còn bỏ ngỏ / TODO
- So sánh sâu hơn: **class (ES6)** vs **constructor function + prototype**.
- Có những trường hợp nào **nên tránh dùng this** hoàn toàn (functional style)?
- Viết thêm các biến thể debounce/throttle: có cancel, flush, leading edge.
- Tìm hiểu pattern **methodize / unmethodize** trong thực tế.

---
