# Playbook: Kết hợp Scope / Closure / This / Wrapper / Methodize với Promise

Mục tiêu: Hiểu và áp dụng các khái niệm cốt lõi (scope, closure, this, wrapper, methodize) để thiết kế và kiểm soát hành vi bất đồng bộ (Promise).

---

## 1. Closure + Promise

**Ý tưởng:** Dùng closure để giữ trạng thái hoặc cấu hình cho hàm bất đồng bộ.

```js
function withBaseUrl(baseUrl) {
  return function get(path) {
    return fetch(baseUrl + path).then(r => r.json());
  };
}

const api = withBaseUrl("https://api.example.com");
api("/users").then(console.log);
```

👉 Closure giữ `baseUrl`, mọi lần gọi `api` đều mang theo giá trị này.

---

## 2. This + Promise

**Ý tưởng:** Khi viết method trong object/class, nhớ rằng `this` tham chiếu đến object chứa nó.

```js
const service = {
  token: "abc123",
  fetchMe() {
    return fetch(`/me?token=${this.token}`).then(r => r.json());
  }
};

service.fetchMe().then(console.log);
```

👉 Nếu tách method ra và gọi riêng (`const f = service.fetchMe; f();`) thì `this` sẽ mất. Cần bind hoặc viết bằng arrow function.

---

## 3. Wrapper Function + Promise

**Ý tưởng:** Bao bọc hàm Promise để thêm hành vi (retry, timeout, debounce).

### 3.1 Timeout Wrapper
```js
function withTimeout(ms, fn) {
  return (...args) => Promise.race([
    fn(...args),
    new Promise((_, rej) => setTimeout(() => rej(new Error("Timeout")), ms))
  ]);
}

const fetchWithTimeout = withTimeout(2000, url => fetch(url));

fetchWithTimeout("https://jsonplaceholder.typicode.com/todos/1")
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);
```

### 3.2 Retry Wrapper
```js
function withRetry(times, fn) {
  return async (...args) => {
    let error;
    for (let i = 0; i < times; i++) {
      try {
        return await fn(...args);
      } catch (e) {
        error = e;
      }
    }
    throw error;
  };
}

const unstable = () => fetch("/sometimes-fails");
const reliable = withRetry(3, unstable);
```

👉 Wrapper pattern biến Promise function thành “có thêm sức mạnh”.

---

## 4. Methodize / Unmethodize với Promise

**Methodize:** Chuyển từ hàm thuần → method của object.  
**Unmethodize:** Chuyển method → hàm thuần.

### 4.1 Methodize Promise Function
```js
function methodize(fn) {
  return function (...args) {
    return fn(this, ...args);
  };
}

// Ví dụ: utility bất đồng bộ
function delay(obj, ms) {
  return new Promise(res => setTimeout(() => res(obj), ms));
}

Object.prototype.delay = methodize(delay);

"Hello".delay(1000).then(console.log); // => "Hello" sau 1s
```

### 4.2 Unmethodize Promise Function
```js
function unmethodize(fn) {
  return (obj, ...args) => fn.apply(obj, args);
}

const asyncMap = unmethodize(Array.prototype.map);

// Dù map() bản chất sync, bạn có thể wrap thêm Promise logic:
Promise.resolve([1,2,3])
  .then(arr => asyncMap(arr, x => x * 2))
  .then(console.log); // [2,4,6]
```

---

## 5. Kết hợp tất cả

Một ví dụ nhỏ: API client có token (this), baseUrl (closure), timeout (wrapper), và methodized.

```js
function withTimeout(ms, fn) {
  return (...args) => Promise.race([
    fn(...args),
    new Promise((_, rej) => setTimeout(() => rej(new Error("Timeout")), ms))
  ]);
}

function createApiClient(baseUrl, token) {
  return {
    baseUrl,
    token,
    fetch(path) {
      const fn = (p) => fetch(`${this.baseUrl}${p}?token=${this.token}`);
      const wrapped = withTimeout(2000, fn);
      return wrapped(path).then(r => r.json());
    }
  };
}

const client = createApiClient("https://api.example.com", "abc123");
client.fetch("/users").then(console.log).catch(console.error);
```

👉 Ở đây:
- **Closure**: `baseUrl`, `token` được giữ.
- **This**: method dùng `this.baseUrl` và `this.token`.
- **Wrapper**: thêm timeout để tránh treo.
- **Promise**: toàn bộ flow chạy bất đồng bộ.

---

## 6. Checklist Khi Thiết Kế
- Có cần closure giữ config không? (baseUrl, token, option)
- Có dùng `this` đúng context không? (bind, arrow function)
- Có cần wrapper để thêm behavior không? (retry, timeout, debounce)
- Có thể methodize/unmethodize để API tiện hơn không?
- Promise có được return đúng để chain không?

---

## 7. Reflection Questions
1. Khi nào closure giúp ích nhất khi wrap Promise?
2. Nếu wrapper thêm timeout thì lợi ích & rủi ro là gì?
3. Tại sao cần `methodize` để thêm Promise-based method vào prototype?
4. Làm sao debug khi wrapper Promise swallow lỗi?  
