# Playbook: Promise Basic Design (One Story – User Example)

Mục tiêu: Hiểu Promise qua một mạch ví dụ duy nhất: **Lấy dữ liệu User**.

---

## 1. Resolve / Reject

Nếu có trong cache → `resolve`, nếu không → `reject`.

```js
function getUserFromCache(id) {
  if (id === 1) return Promise.resolve({ id: 1, name: "Alice" });
  return Promise.reject("User not found in cache");
}

getUserFromCache(1).then(console.log).catch(console.error);
```

👉 Dù dữ liệu có sẵn, vẫn bọc bằng Promise để API đồng nhất.

---

## 2. Chain

Bước 1 lấy user → Bước 2 lấy profile → Bước 3 in ra.

```js
function getProfile(user) {
  return Promise.resolve({ ...user, age: 20 });
}

getUserFromCache(1)
  .then(user => {
    return getProfile(user); // nhớ return để chain chờ
  })
  .then(profile => {
    console.log("Profile:", profile);
  })
  .catch(err => console.error("Error:", err));
```

👉 Nếu quên `return` → bước sau không chờ kết quả, chain gãy.

---

## 3. All

Muốn lấy user **và** danh sách bài viết của user cùng lúc.

```js
function getPosts(userId) {
  return Promise.resolve([`Post1 of ${userId}`, `Post2 of ${userId}`]);
}

Promise.all([getUserFromCache(1), getPosts(1)])
  .then(([user, posts]) => {
    console.log("User:", user);
    console.log("Posts:", posts);
  })
  .catch(err => console.error("Error:", err));
```

👉 `all` = đợi cả hai xong. Nếu 1 promise fail → cả cụm fail.

---

## 4. Race (Control Flow)

Muốn lấy user từ API chậm nhưng có giới hạn thời gian.

```js
function getUserSlow(id) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ id, name: "SlowUser" }), 3000);
  });
}

function timeout(ms) {
  return new Promise((_, reject) => setTimeout(() => reject("Timeout!"), ms));
}

Promise.race([getUserSlow(1), timeout(1000)])
  .then(user => console.log("Got:", user))
  .catch(err => console.error("Error:", err));
```

👉 `race` = ai xong trước thì lấy, ở đây là timeout.

---

## 5. Shape the API

Thiết kế hàm `getUser(id)` → luôn trả Promise, dù cache hay API.

```js
function getUser(id) {
  if (id === 1) {
    return Promise.resolve({ id: 1, name: "Alice" }); // cache hit
  }
  return getUserSlow(id); // cache miss, gọi API chậm
}

getUser(1).then(console.log).catch(console.error);
getUser(2).then(console.log).catch(console.error);
```

👉 Người dùng API không cần biết bên trong sync hay async → chỉ cần `.then` hoặc `.catch`.

---

# Checklist (User Story)

1. **Resolve/Reject** → chuẩn hóa kết quả.
2. **Chain** → nối nhiều bước tuần tự.
3. **All** → chạy nhiều promise cùng lúc.
4. **Race** → kiểm soát dừng bằng timeout.
5. **Shape** → API luôn trả Promise, nhất quán.

---

## Reflection Questions
1. Khi nào cần `resolve` giá trị sync, khi nào cần `reject`?
2. Nếu quên `return` trong `.then`, chuyện gì xảy ra?
3. Sự khác biệt giữa `all` và `race` trong ví dụ trên là gì?
4. Vì sao nên luôn shape API để trả Promise thay vì giá trị thường?  
