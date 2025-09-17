# Day 06 — Learning Log
_Date:_ (fill with your date)  
_Focus:_ this → unmethodize → methodize → small design patterns → tests

---

## 1) Today’s Themes
- **this fundamentals (recap):** binding rules, why `this` is lost, fixes with arrow/bind, and how `.method()` sets `this`.  
- **unmethodize:** chuyển method phụ thuộc `this` → hàm thuần `(obj, ...args)` để tái dùng built‑in trên array‑like/object “trần”.  
- **methodize & methodizeChain:** chuyển hàm thuần `(obj, ...args)` → method dùng `this`, và bản chain cho mutators.  
- **Design style:** functional‑first vs method‑first; build mini fluent APIs.  
- **Practice with tests:** cover helpers + mini‑projects (Counter, Settings, Pipe, QueryBuilder, HTTP client mock, EventEmitter, Validator), và array‑like ops.

---

## 2) What I implemented / read
- **Playbooks & design notes**
  - _this-playbook_: quy tắc gán `this`, mất/giữ `this`, DevTools debugging.  
  - _unmethodize-playbook_: định nghĩa, decision map, ví dụ array‑like/“trần”, mini‑exercises.  
  - _methodize-playbook_: đặc tả, decision map, examples, mini‑exercises & reflection.  
  - _design-notes_: functional-first vs method-first.

- **Code skeletons & examples**
  - _methodize/unmethodize v2_: `unmethodize`, `unmethodizeSafe(adapt)`, `methodize`, `methodizeChain`.  
  - _methodize examples_: Counter, Settings (preset), Pipe → `.pipe(...)`, QueryBuilder (fluent), HTTP client (preset baseURL/headers), EventEmitter, Validator.  
  - _arraylike-ops_: unmethodize `reduce`/`filter` để áp dụng cho array‑like; helper `sumArrayLike`.

- **Tests**
  - `methodize-examples.test.js`: verify helpers & each mini‑project.  
  - `methodize-unmethodize-v2.test.js`: verify v2 helpers (slice/hasOwnProperty/map/reduce on array‑like, safe adapter, preset, chain).  
  - `arraylike-ops.test.js`: verify `reduce`, `filter`, `sumArrayLike` trên array‑like.

---

## 3) Key takeaways
- **Why unmethodize?**
  - Dùng built‑in cho **array‑like/DOM collections/object “trần”** mà không rơi `this`.
  - Một chữ ký chuẩn `(obj, ...args)` giúp code testable, reuse tốt, tránh `.call` lặp lại.

- **Why methodize?**
  - API `.chấm` **dễ đọc** & **chain** cho mutators (dùng `methodizeChain`).  
  - Tách **logic thuần** (dễ test) và **adapter cú pháp** (dễ dùng).  
  - Có thể gắn **trên prototype** để chia sẻ method cho nhiều instance.

- **Design choices**
  - Mutator → trả `this` (chain). Accessor → trả value.  
  - `...preset` để cài tham số mặc định (vd: prefix, baseURL).  
  - Functional‑first (dễ test, tái sử dụng) vs Method‑first (quen mắt, ít adapter).

- **Testing mindset**
  - Happy path + edge cases (mất `this`, array‑like “trần”, preset, chain returns `this`).  
  - Test nhỏ, tăng dần độ khó, song hành với refactor.

---

## 4) Mini‑projects done
- **Counter:** `add/reset/get` (chain + accessor).  
- **Settings:** `set/toggle/has` + `setPrefixed` (preset).  
- **Pipe:** `pipe(obj, ...fns)` (thuần) → `.pipe(...)` (methodized).  
- **QueryBuilder:** `where/orderBy/limit/build` (fluent, rõ mutator vs accessor).  
- **HTTP Client (mock):** preset `baseURL`, `headers`, accessor `url(path)`.  
- **EventEmitter:** `.on/.emit` (chain on subscribe).  
- **Validator:** `.rule(name, fn)` + `.check(value)` (report fail).

---

## 5) Debug & DevTools (recap)
- Khi tách method ra dùng rời → rơi `this`. Fix bằng `.call/.bind` hoặc **unmethodize** một lần để dùng nhiều nơi.
- Với DOM/NodeList/HTMLCollection/DOMTokenList → **unmethodize map/filter/reduce** giúp thao tác cực nhanh.
- DevTools: Logpoint/conditional breakpoint/`debug(fn)`/Scope panel/Async stacks giúp soi `this` đúng ngữ cảnh.

---

## 6) Reflection
- Mình đã nhận diện đúng **mutator vs accessor** trước khi methodize chưa?  
- Ở đâu cần **preset** để code gọn hơn?  
- Trường hợp nào chỉ cần `.call` 1 lần (khỏi unmethodize)?  
- Bài test nào làm mình hiểu rõ “rơi `this`”? Có thể viết test tái hiện lỗi đó lại không?  
- Nếu refactor sang functional‑first, test có **đơn giản** hơn không?

---

## 7) TODO (tomorrow / next)
- Viết thêm biến thể `methodize/unmethodize` (nâng cấp guard, hỗ trợ async giữ nguyên Promise).  
- Hoàn thiện `arraylike-ops`: `reduce`, `filter`, thêm `map/find/some`.  
- Tạo `pipe(obj, ...fns)` thuần + methodize `.pipe(...)` cho object utilities khác.  
- Viết nhiều test edge: object “trần”, typed arrays, string primitive (adapter), preset phức tạp.  
- So sánh sâu hơn **functional‑first vs method‑first** trên 1 module nhỏ.

---

_Notes:_ cố gắng giữ thói quen: **trước khi methodize**, viết và test **hàm thuần** thật gọn; sau đó mới methodize để có API `.chấm`. Điều này giúp tránh dính lỗi `this` và đơn giản hoá unit tests.
