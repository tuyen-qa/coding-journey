# 🧠 ABOUT — Callback Function in JavaScript

## 1. Callback là gì?

**Callback** là một **hàm được truyền làm đối số cho hàm khác**, và được **gọi lại (called back)** vào một thời điểm nào đó — có thể **ngay lập tức** hoặc **sau khi tác vụ hoàn tất**.

Ví dụ cơ bản:
```js
function greet(name) {
  console.log("Hello " + name);
}

function processUserInput(callback) {
  const name = "Tuyen";
  callback(name); // Gọi lại hàm callback
}

processUserInput(greet);
```

> 💡 Nói ngắn gọn: *Callback là cách để “nói với hàm khác rằng: khi xong việc, hãy gọi tôi.”*

---

## 2. Hai loại callback

| Loại | Thời điểm gọi lại | Ví dụ |
|------|--------------------|-------|
| **Synchronous callback** | Gọi ngay trong luồng hiện tại | `arr.map`, `arr.forEach` |
| **Asynchronous callback** | Gọi sau khi tác vụ hoàn tất (đưa vào event loop) | `setTimeout`, `fetch`, `fs.readFile` |

Ví dụ:
```js
console.log("Start");
setTimeout(() => console.log("Async callback"), 0);
console.log("End");
```
Kết quả:
```
Start
End
Async callback
```
→ Callback trong `setTimeout` được đưa vào **callback queue**, chờ **call stack rỗng** mới được gọi.

---

## 3. Tư duy nền (Background Logic)

Callback cho phép **hàm trở nên linh hoạt**:
- Hàm chính không cần biết “làm gì tiếp theo”.
- Người gọi quyết định hành vi bằng cách **truyền callback** vào.

```js
function download(url, callback) {
  console.log("Downloading from", url);
  setTimeout(() => {
    console.log("Download complete");
    callback(); // Gọi lại khi xong
  }, 1000);
}

download("https://example.com", () => console.log("Processing file..."));
```

---

## 4. Callback Hell 😈

Khi ta cần nhiều tác vụ bất đồng bộ liên tiếp:
```js
getUser(1, (user) => {
  getOrders(user.id, (orders) => {
    getOrderDetails(orders[0], (details) => {
      console.log(details);
    });
  });
});
```
→ Dễ **khó đọc**, **khó debug**, **khó maintain**.

Đây là lý do ra đời của:
- **Promise** → Làm phẳng callback chain.
- **async/await** → Viết bất đồng bộ như đồng bộ.

---

## 5. Error-first callback (chuẩn Node.js)

Trong môi trường Node.js, convention là:
```js
fs.readFile("data.txt", (err, data) => {
  if (err) return console.error(err);
  console.log(data.toString());
});
```

> Nguyên tắc: callback luôn nhận `err` là tham số đầu tiên.  
> Nếu `err` tồn tại → xử lý lỗi, ngược lại → tiếp tục logic.

---

## 6. Tại sao cần học callback?

| Vì sao | Ý nghĩa |
|--------|----------|
| 🧩 Callback là nền tảng của mọi cơ chế bất đồng bộ | Mọi thứ như `Promise`, `async/await` đều bắt nguồn từ callback |
| 🧠 Giúp hiểu rõ event loop & call stack | Khi nào callback được thực thi |
| 🧱 Là bước đầu để hiểu luồng dữ liệu bất đồng bộ | Rất quan trọng khi test async logic |
| 🧰 Hầu hết API JS/Node đều dùng callback | `addEventListener`, `setTimeout`, `fs.readFile`... |

---

## 7. Keywords quan trọng
`callback`, `higher-order function`, `event loop`, `call stack`, `callback queue`, `error-first callback`, `callback hell`, `asynchronous execution`.

---

## 8. Visual Mindset
```
Caller -----> Function A -----> Callback()
                |
                |--- làm việc
                     |
                     ---> Gọi lại callback khi xong
```

---

## 9. Gợi ý đọc thêm
- [MDN: Callback function](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)
- [Node.js Docs: Error-first Callback](https://nodejs.org/en/knowledge/getting-started/control-flow/what-are-callbacks/)
- [Jake Archibald: In The Loop (YouTube)](https://www.youtube.com/watch?v=cCOL7MC4Pl0)

---

## 💬 Tự hỏi bản thân
- Callback được gọi **ngay lập tức** hay **sau khi event loop xử lý**?
- Nếu callback bị lỗi thì điều gì xảy ra?
- Callback có thể trả về giá trị không?
- Làm sao để biến callback hell thành Promise chain?
