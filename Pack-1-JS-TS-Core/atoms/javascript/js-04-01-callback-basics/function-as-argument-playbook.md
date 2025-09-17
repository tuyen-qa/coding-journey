# Playbook: Function as Argument (Callback Basics)

## 1. Ý tưởng
- Trong JS, **function là giá trị** → bạn có thể gán, truyền vào hàm khác, hoặc trả về từ một hàm.
- Khi một hàm **nhận function làm tham số**, ta gọi nó là **function as argument** (hay callback).

## 2. Ví dụ cơ bản
```js
function runTwice(fn) {
  fn();
  fn();
}

runTwice(() => console.log("Hello"));
// In ra "Hello" 2 lần
```

## 3. Ứng dụng thực tế
- `setTimeout(fn, ms)` → fn được gọi sau ms mili-giây.
- `array.map(fn)` → fn được gọi trên từng phần tử array.
- `button.addEventListener("click", fn)` → fn được gọi khi user click.

## 4. Cách phân biệt
- Nếu API nói tham số là **function** → bạn truyền function (callback).
- Nếu API nói tham số là **value** → bạn truyền giá trị (string, number, object).

## 5. Luyện tập trong repo
Trong file `src/function-args.js`, bạn sẽ tự implement:
1. `callOnce(fn)` → gọi hàm fn đúng 1 lần.
2. `callNTimes(fn, n)` → gọi fn n lần.
3. `mapArray(arr, fn)` → tự viết lại `.map` cơ bản.
4. `filterArray(arr, fn)` → tự viết lại `.filter` cơ bản.
5. `withDelay(fn, ms)` → trả về 1 function mới, khi gọi sẽ `setTimeout(fn, ms)`.
