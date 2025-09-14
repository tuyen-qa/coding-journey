# ABOUT: ECMAScript Modules (ESM)

## 1. Module trong ESM là gì?
- **Module** trong ESM chính là **một file JavaScript** có scope riêng.
- Các biến/hàm/class trong file đó **không rơi vào global scope**.
- Chỉ những gì được **`export`** ra thì module khác mới **`import`** được.
- Mỗi module được load **chỉ một lần** (có caching), các import sau sẽ dùng lại cùng instance.

👉 Nói ngắn gọn: **Module = một file JS độc lập, có thể chia sẻ dữ liệu qua `export` và `import`.**

---

## 2. Vì sao cần ESM?
- Trước ES6, JavaScript thiếu hệ thống module chuẩn → khó tái sử dụng code.
- CommonJS (`require`, `module.exports`) giải quyết trong Node.js nhưng không chuẩn chung.
- ESM (`import`, `export`) được thiết kế làm chuẩn chính thức, hỗ trợ:
    - Scope riêng
    - Tree-shaking (loại bỏ code thừa khi build)
    - Tải async trong browser

---

## 3. Cheatsheet ESM

### Export

| Cú pháp | Ví dụ | Ghi chú |
|---------|-------|---------|
| **Named export trực tiếp** | `export const PI = 3.14;`<br>`export function add(a,b){}` | Xuất ngay khi định nghĩa |
| **Named export sau khai báo** | <pre>const radius = 10;<br>function area(r) { return PI * r * r; }<br>export { radius, area };</pre> | Gom nhiều biến/hàm xuất cùng lúc |
| **Named export với alias** | `export { area as calcArea };` | Đổi tên khi export |
| **Re-export cụ thể** | `export { PI, add } from './math.js';` | Xuất lại từ module khác |
| **Re-export tất cả** | `export * from './math.js';` | Xuất toàn bộ, không có default |
| **Re-export tất cả với namespace** | `export * as MathUtils from './math.js';` | Gom toàn bộ thành 1 object |
| **Default export trực tiếp** | `export default function(){}`<br>`export default class {}`<br>`export default 42;` | Mỗi module chỉ có 1 default |
| **Default export sau khai báo** | <pre>function divide(a,b){ return a/b; }<br>export default divide;</pre> | Export sau khi định nghĩa |

---

### Import

| Cú pháp | Ví dụ | Ghi chú |
|---------|-------|---------|
| **Named import** | `import { PI, add } from './math.js';` | Lấy đúng tên export |
| **Named import với alias** | `import { add as plus } from './math.js';` | Đổi tên khi import |
| **Import tất cả thành object** | `import * as MathUtils from './math.js';` | Truy cập qua `MathUtils.add()` |
| **Default import** | `import subtract from './math.js';` | Tên tùy ý |
| **Kết hợp default + named** | `import multiply, { PI } from './math.js';` | Cả default và named trong 1 dòng |
| **Import chỉ để side-effect** | `import './setup.js';` | Không lấy gì, chỉ chạy code |
| **Dynamic import (async)** | <pre>const mod = await import('./math.js');<br>mod.add(2,3);</pre> | Trả về `Promise` |

---

## 4. Lưu ý thực hành
- `import` / `export` phải ở **top-level** (không đặt trong `if`/`function`).
- ESM mặc định chạy ở **strict mode**.
- Node.js: cần `"type": "module"` trong `package.json` hoặc file `.mjs`.
- Browser: dùng `<script type="module" src="main.js"></script>`.

---

## 5. Mini project gợi ý
Tạo thư viện nhỏ `string-utils` với các hàm:
- `capitalize(str)`
- `reverse(str)`
- `slugify(str)`

→ Xuất ra bằng **named export**, sau đó import vào `main.js` để test.

---

## 6. Reflection & Variations
- So sánh cách viết ESM vs CommonJS (`require`, `module.exports`).
- Thử tree-shaking: export 5 hàm, chỉ import 1 → build còn dư code không?
- Thử `dynamic import()` để load module theo điều kiện runtime.

---
