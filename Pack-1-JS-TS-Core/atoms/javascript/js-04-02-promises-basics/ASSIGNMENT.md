# ASSIGNMENT: Promises Basic (User Story)

Mục tiêu: Luyện tập Promise cơ bản qua cùng một bối cảnh **User**.

---

## Bài 1: Resolve / Reject
Viết hàm `getUserFromCache(id)`:
- Nếu id === 1 → resolve `{ id: 1, name: "Alice" }`
- Ngược lại → reject `"User not found"`

👉 Test với `.then` và `.catch`.

---

## Bài 2: Chain tuần tự
Tạo hàm `getProfile(user)` trả về Promise chứa object `{ ...user, age: 20 }`.

- Dùng `.then` để gọi `getUserFromCache(1)` → rồi gọi `getProfile(user)` → cuối cùng in ra profile.
- **Hint:** Nhớ return trong `.then` để chain hoạt động đúng.

---

## Bài 3: All (song song)
Tạo hàm `getPosts(userId)` trả về Promise chứa array `[ "Post1", "Post2" ]`.

- Dùng `Promise.all` để lấy `user` từ cache và `posts` cùng lúc.
- In kết quả `[user, posts]`.
- Thử case user không có trong cache → quan sát kết quả.

---

## Bài 4: Race (timeout)
Tạo hàm `getUserSlow(id)` (3 giây mới resolve).  
Tạo hàm `timeout(ms)` trả về Promise reject sau ms mili-giây.

- Dùng `Promise.race([getUserSlow(1), timeout(1000)])`.
- Quan sát kết quả khi timeout thắng.

---

## Bài 5: Shape the API
Viết hàm `getUser(id)`:
- Nếu id === 1 → return `Promise.resolve({ id: 1, name: "Alice" })`
- Ngược lại → return `getUserSlow(id)`

👉 Test với `.then` và `.catch`.  
👉 Ghi chú: Người gọi không cần biết bên trong sync hay async, chỉ cần `.then` được.

---

# Reflection
- Khi nào cần dùng `resolve` cho giá trị có sẵn?
- Tại sao phải return trong `.then`?
- `Promise.all` khác gì `Promise.race`?
- Vì sao cần shape API để luôn trả Promise?  
