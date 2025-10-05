# 🎯 Callback Playbook — Tư duy và Triết lý thiết kế

## 1. Cốt lõi của Callback

> “Tôi không biết bạn sẽ làm gì, nên tôi **truyền cho bạn một hàm**, để bạn **gọi lại tôi khi cần**.”

Đây là **tư tưởng khai sinh** của callback trong JavaScript.

Callback không phải là một “thủ thuật kỹ thuật”, mà là **một cách nghĩ về việc uỷ quyền hành động**:  
Tôi làm việc của tôi, nhưng tôi để bạn quyết định *chuyện gì xảy ra tiếp theo*.

---

## 2. Callback sinh ra từ “sự không biết”

Trong lập trình, có nhiều tình huống mà một hàm:

> “Biết làm thế nào để thực hiện công việc, nhưng **không biết bạn muốn làm gì sau khi xong**.”

Ví dụ:

```js
function processData(data, callback) {
  console.log("Processing data...");
  callback(data); // Tôi không biết bạn muốn làm gì, chỉ gọi lại thôi
}

processData("hello", (d) => {
  console.log("Uppercase:", d.toUpperCase());
});
```

Ở đây:
- `processData` chỉ biết *xử lý dữ liệu*.
- Nó không biết bạn muốn *in hoa*, *ghi file*, hay *gửi API*.
- Vì vậy, nó **mở rộng** bằng cách nhận vào một `callback` để *uỷ quyền hành động*.

---

## 3. Triết lý thiết kế: Inversion of Control (Đảo chiều điều khiển)

| Tư duy truyền thống | Tư duy callback |
|---------------------|-----------------|
| Hàm tự quyết định tất cả | Hàm “mở” để người khác cắm hành động vào |
| Cứng nhắc | Linh hoạt, tái sử dụng |
| Control Flow | Inversion of Control |

Callback **đảo ngược quyền điều khiển**:  
Thay vì bạn gọi hàm, bạn **trao hàm của mình cho hệ thống** để nó tự gọi khi đến lượt.

---

## 4. Ứng dụng thực tế của tư duy này

| Ngữ cảnh | Mô tả callback làm gì |
|-----------|-----------------------|
| **Array method** | `map`, `filter`, `reduce` không biết bạn muốn làm gì với từng phần tử, nên gọi callback để bạn định nghĩa. |
| **Event system** | `addEventListener` không biết bạn muốn làm gì khi click, nên nó gọi callback khi sự kiện xảy ra. |
| **Async tasks** | `setTimeout` không biết bạn muốn làm gì sau 1 giây, nên bạn truyền callback để nó gọi lại. |
| **Middleware (Express.js)** | Mỗi middleware chỉ biết khi nào cần gọi `next()` để trao quyền cho callback kế tiếp. |

---

## 5. Ví dụ đời thường

| Tình huống | Callback đại diện cho |
|-------------|----------------------|
| Ship đồ ăn | Số điện thoại bạn để người ta gọi lại khi giao xong |
| Chụp hình | Lời hẹn gửi mail ảnh sau khi rửa xong |
| Website | Hàm chạy khi user click nút |
| JS | Hàm bạn truyền vào để “nói” cho hàm khác biết khi nào cần làm gì |

---

## 6. Callback = “Hẹn khi nào gọi tôi lại”

```js
function cookPizza(callback) {
  console.log("Đang nướng pizza...");
  setTimeout(() => {
    console.log("Pizza xong!");
    callback(); // gọi lại khi hoàn tất
  }, 2000);
}

function eatPizza() {
  console.log("Bắt đầu ăn pizza 🍕");
}

cookPizza(eatPizza);
```

Nếu không có callback:
```js
cookPizza();
eatPizza(); // ăn khi chưa chín pizza 💀
```

Callback đảm bảo: **chỉ gọi “ăn” sau khi “nướng xong”**.

---

## 7. Callback trong một câu

> **Callback là một hàm được truyền vào hàm khác, để được gọi lại khi hàm kia hoàn tất công việc.**

---

## 8. Tư duy hình ảnh

```
Caller -----> Function A -----> Callback()
                |
                |--- làm việc
                     |
                     ---> Gọi lại callback khi xong
```

---

## 9. Callback vs Promise

| Callback | Promise |
|-----------|----------|
| “Gọi tôi lại khi xong việc” | “Hứa với tôi rằng sẽ có kết quả sau này” |
| Dễ rơi vào callback hell | Có thể chain dễ đọc hơn |
| `fs.readFile(file, cb)` | `fetch(url).then(...)` |

---

## 💬 Tổng kết triết lý

> “Tôi không biết bạn sẽ làm gì, nên tôi **truyền cho bạn một hàm**.  
> Khi đến thời điểm phù hợp, **hãy gọi lại tôi**.”

Đây chính là **linh hồn của callback**, và là nền móng để sinh ra:
- Promise
- async/await
- event emitter
- middleware
- observable pattern

---

📚 *Callback không chỉ là syntax — nó là cách để JavaScript nói rằng:  
‘Tôi không chờ bạn. Nhưng tôi vẫn sẽ gọi bạn lại khi đến lượt.’*
