# 🧩 Callback Design Playbook — From Concept to Pattern

## 1. Callback trong Solution Design

Callback là **cơ chế mở rộng (extension point)** giúp một hàm giữ quyền kiểm soát luồng chính,  
nhưng vẫn cho phép người khác chèn logic riêng.

Ví dụ:

```js
function runJob(task, onSuccess, onError) {
  try {
    const result = task();
    onSuccess(result);
  } catch (err) {
    onError(err);
  }
}
```

💡 Đây là một **mini framework**: `runJob` chỉ định nghĩa cấu trúc xử lý chung,  
và người dùng truyền callback để “plug in” hành vi cụ thể.

> **Tư duy:** Callback tách **flow điều khiển (control)** khỏi **logic nghiệp vụ (behavior)**.

---

## 2. Callback trong Design Patterns

### 🧠 (1) Template Method Pattern

Hàm cha giữ “xương sống” của quy trình,  
còn các bước cụ thể được mở dưới dạng callback:

```js
function processData(data, before, after) {
  before?.(data);
  console.log("Processing:", data);
  after?.(data);
}

processData("A", d => console.log("Before", d), d => console.log("After", d));
```

➡️ Callback ở đây chính là **template hook**.

---

### 🧠 (2) Strategy Pattern

Callback đóng vai trò **chiến lược (strategy)** giúp thay đổi hành vi mà không cần sửa code gốc.

```js
function calculate(a, b, strategy) {
  return strategy(a, b);
}

const add = (a, b) => a + b;
const multiply = (a, b) => a * b;

calculate(3, 4, add);      // 7
calculate(3, 4, multiply); // 12
```

> Callback giúp thực hiện nguyên tắc **Open/Closed Principle (OCP)**: mở rộng được, không sửa code cũ.

---

### 🧠 (3) Observer Pattern

Callback là **cách một object “quan sát” sự kiện của object khác.**

```js
class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(event, callback) {
    (this.events[event] ||= []).push(callback);
  }
  emit(event, data) {
    this.events[event]?.forEach(cb => cb(data));
  }
}
```

→ Đây là **pattern cốt lõi của Node.js**, React hooks, Redux middleware, RxJS...

---

### 🧠 (4) Middleware Pattern

Callback chain chuyển quyền điều khiển giữa các hàm nối tiếp nhau.

```js
function logger(req, next) {
  console.log("Start:", req.url);
  next();
  console.log("End:", req.url);
}

function handler(req) {
  console.log("Handling:", req.url);
}

logger({ url: "/home" }, () => handler({ url: "/home" }));
```

→ Callback `next()` chính là cơ chế chuyển quyền — nền tảng của Express.js.

---

## 3. Callback trong Functional Design

Callback giúp **tạo hàm có thể cấu hình** — sinh ra các higher-order function.

```js
const withLogging = (fn) => (...args) => {
  console.log("Calling", fn.name);
  const result = fn(...args);
  console.log("Done", fn.name);
  return result;
};

const add = (a, b) => a + b;
const loggedAdd = withLogging(add);
loggedAdd(2, 3);
```

> Callback ở đây chính là **behavior injected** vào logic gốc.

---

## 4. Best Practices

| ✅ Practice | Giải thích |
|--------------|-------------|
| Đặt tên rõ nghĩa | `onSuccess`, `onError`, `onComplete` thay vì `cb1`, `cb2` |
| Callback ngắn gọn | Mỗi callback chỉ nên làm **một nhiệm vụ rõ ràng** |
| Tránh lồng callback sâu | Dễ sinh callback hell — nên tách ra hoặc chuyển sang Promise |
| Xử lý lỗi cẩn thận | Dùng `try/catch` hoặc error-first callback |
| Không trộn callback và promise | Dễ rối luồng điều khiển |
| Luôn gọi callback hoặc báo lỗi | Tránh “quên gọi lại” trong các nhánh logic |

---

## 5. Callback vs Event vs Promise

| Pattern | Khi nào dùng | Cách hoạt động |
|----------|---------------|----------------|
| **Callback** | Chạy khi xong một việc cụ thể | Gọi hàm trực tiếp |
| **Event Listener** | Nhiều callback cùng theo dõi sự kiện | Danh sách callback |
| **Promise** | Chuỗi async có return value | Resolve/reject thay vì gọi hàm |

---

## 6. Callback trong System Design Thinking

Callback là **primitive** — mọi abstraction async đều xây từ nó.

| Pattern cao hơn | Callback đóng vai trò gì |
|------------------|--------------------------|
| **Promise** | `then()` chính là callback được gọi khi resolve |
| **async/await** | Biên dịch thành callback ngầm |
| **RxJS Observables** | `subscribe(callback)` |
| **EventEmitter** | `on(event, callback)` |
| **Webhooks** | callback gửi qua HTTP (reverse callback) |
| **UI Lifecycle Hooks** | React/Vue gọi lại callback khi mount/update/unmount |

> Callback = “hook” để bạn gắn hành vi vào dòng chảy của hệ thống.

---

## 7. Callback trong kiến trúc mở rộng (Extensible Architecture)

Callback giúp framework **cho phép người dùng mở rộng mà không chạm vào core**.

Ví dụ pattern “hook” trong plugin system:

```js
class Framework {
  constructor() {
    this.hooks = [];
  }
  registerHook(cb) {
    this.hooks.push(cb);
  }
  run() {
    console.log("Core logic running...");
    this.hooks.forEach(cb => cb());
  }
}
```

→ Đây chính là kiến trúc **Inversion of Control (IoC)** ở cấp độ framework.

---

## 8. Summary Mindset

> 🔹 Callback = “điểm móc (hook)” cho hành vi linh hoạt.  
> 🔹 Callback giúp code **mở rộng được mà không sửa đổi**.  
> 🔹 Callback là nền móng của **async + event-driven systems**.  
> 🔹 Callback dùng đúng = mềm dẻo; dùng sai = callback hell.

---

📘 *Callback không chỉ là syntax. Nó là cơ chế để code biết “khi nào nên gọi ai tiếp theo” —  
và là viên gạch đầu tiên xây nên Promise, async/await, event system, và cả plugin architecture.*
