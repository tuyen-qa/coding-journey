# 🧭 ASSIGNMENT — Methodize & Unmethodize (Thực tế nhưng đơn giản)

Mục tiêu của assignment này là giúp bạn **quen tay** với 2 pattern nhỏ nhưng rất hữu dụng:
- **Unmethodize**: biến *method phụ thuộc `this`* → *hàm thuần* `(obj, ...args)` để dễ **tái sử dụng** (đặc biệt với *array-like*: `arguments`, `NodeList`, `HTMLCollection`).
- **Methodize**: biến *hàm thuần* `(obj, ...args)` → *method dùng `this`* để tạo **API .chấm** thân thiện, dễ đọc và dễ xây **DSL/Fluent API**.

> Format: mỗi bài có *bối cảnh thực tế*, *yêu cầu*, *tiêu chí pass*, *gợi ý* (nếu cần).  
> Bạn nên tạo cặp file `src/index.js` và `test/index.test.js` cho từng bài nhỏ, hoặc gom toàn bộ trong một file nếu thích.

---

## ✅ Chuẩn bị
1. Tạo helpers cơ bản (*bạn sẽ dùng lại trong các bài dưới*):
   ```js
   export function unmethodize(method) {
     if (typeof method !== 'function') throw new TypeError('Need a function');
     return function(obj, ...args) { return method.call(obj, ...args); };
   }

   export function methodize(fn, ...preset) {
     if (typeof fn !== 'function') throw new TypeError('Need a function');
     return function(...args) { return fn(this, ...preset, ...args); };
   }
   ```
2. Dùng `node:test` + `assert/strict` để viết test.

---

## Bài 1 — **Slice cho array-like**
**Bối cảnh:** Bạn cần cắt `arguments`/`NodeList` giống như mảng thật.  
**Yêu cầu:** Tạo `slice = unmethodize(Array.prototype.slice)`; dùng để:
- `slice(arguments, 1)` → bỏ phần tử đầu.
- (Giả lập browser) Dùng `slice({0:'a',1:'b',length:2}, 0)` → `['a','b']`.

**Tiêu chí pass:**
- Trả về *mảng thật* (`Array.isArray(...) === true`).
- Không được dùng spread `[...]` trong lời giải chính (để buộc luyện unmethodize).

**Gợi ý test:**
```js
function demo() { return slice(arguments, 1); }
assert.deepEqual(demo('x','y','z'), ['y','z']);
assert.deepEqual(slice({0:'a',1:'b',length:2}, 0), ['a','b']);
```

---

## Bài 2 — **forEach/map cho array-like**
**Bối cảnh:** Bạn nhận `NodeList` (giả lập) và muốn map sang text.  
**Yêu cầu:** Tạo `forEach = unmethodize(Array.prototype.forEach)` và `map = unmethodize(Array.prototype.map)` rồi:
- Áp dụng lên `{0:'<li>a</li>',1:'<li>b</li>',length:2}` để tạo `['a','b']`.

**Tiêu chí pass:**
- Không chuyển sang array thật trước; làm trực tiếp bằng *unmethodized map*.

**Gợi ý test:**
```js
const list = {0:'<li>a</li>',1:'<li>b</li>',length:2};
const xs = map(list, s => s.replace(/<\/?li>/g, ''));
assert.deepEqual(xs, ['a','b']);
```

---

## Bài 3 — **hasOwn thuần**
**Bối cảnh:** Bạn làm việc với object không có prototype (tạo bằng `Object.create(null)`), nên **không có `hasOwnProperty`**.  
**Yêu cầu:** Tạo `hasOwn = unmethodize(Object.prototype.hasOwnProperty)` và dùng như `hasOwn(obj, 'key')`.

**Tiêu chí pass:**
- Làm việc với object từ `Object.create(null)`.
- Không crash khi property bị shadow.

**Test gợi ý:**
```js
const o = Object.create(null);
o.x = 1;
assert.equal(hasOwn(o, 'x'), true);
assert.equal(hasOwn(o, 'toString'), false);
```

---

## Bài 4 — **Methodize set**
**Bối cảnh:** Bạn muốn API .chấm thân thiện.  
**Yêu cầu:** Tạo `set(obj, key, val)` thuần và `obj.set = methodize(set)`:
- `obj.set('age', 20)` → gán và trả về `obj` (hỗ trợ chaining).

**Tiêu chí pass:**
- `obj.set('a',1).set('b',2)` hoạt động, cuối cùng `obj.b === 2`.

**Gợi ý test:**
```js
const o = { a: 0 };
o.set = methodize(set);
assert.equal(o.set('a',1), o);
o.set('b',2).set('c',3);
assert.deepEqual(o, { a:1, b:2, c:3, set:o.set });
```

---

## Bài 5 — **Fluent API nhỏ: .tap() & .map()**
**Bối cảnh:** Xây DSL mini để thao tác trên data trong object.  
**Yêu cầu:**
- Viết thuần `tap(obj, fn)` → chạy `fn(obj)` và **trả lại `obj`** (giúp chain).
- Viết thuần `mapInto(obj, key, fn)` → `obj[key] = fn(obj[key])` rồi trả `obj`.
- Methodize thành `obj.tap(fn)` và `obj.mapInto(key, fn)` để dùng:
  ```js
  box.tap(o => { o.count = 1; })
     .mapInto('count', x => x + 1)  // 2
     .mapInto('count', x => x * 10) // 20
  ```

**Tiêu chí pass:**
- Hỗ trợ chaining; không làm mất các field cũ.

---

## Bài 6 — **Logger DSL**
**Bối cảnh:** Bạn muốn một logger thân thiện: `logger.info('msg').debug('x')`.  
**Yêu cầu:**
- Viết thuần `logAs(obj, level, msg)` → push `[level] msg` vào `obj.logs`.
- Tạo class `Logger(name)` có `logs = []`.
- Gắn:
  ```js
  Logger.prototype.as = function(level) { return methodize((o, m) => logAs(o, level, m)); };
  Logger.prototype.info  = Logger.prototype.as('info');
  Logger.prototype.debug = Logger.prototype.as('debug');
  ```
- Dùng:
  ```js
  const lg = new Logger('App');
  lg.info('start').debug('ready');
  ```

**Tiêu chí pass:**
- `lg.logs` chứa `['[info] start','[debug] ready']`.
- `info/debug` chain được.

---

## Bài 7 — **Pipe DSL (functional → method)**
**Bối cảnh:** Bạn có util thuần `pipe(obj, ...fns)` để apply tuần tự.  
**Yêu cầu:**
- Viết thuần `pipe(obj, ...fns)` sao cho mỗi `fn(obj)` có thể sửa obj; cuối cùng trả `obj`.
- Methodize thành `obj.pipe(...fns)` để có cú pháp `.chấm`:
  ```js
  o.pipe(
    o => { o.a = 1; },
    o => { o.b = 2; }
  )
  ```

**Tiêu chí pass:**
- Thứ tự hàm được giữ; hỗ trợ nhiều bước.

---

## Bài 8 — **Bộ sưu tập đơn giản**
**Bối cảnh:** Bạn cần một *Collection* nhẹ cho mảng items.  
**Yêu cầu:**
- Thuần:
    - `pushItem(col, x)` → `col.items.push(x)`; trả `col`.
    - `mapItems(col, fn)` → `col.items = col.items.map(fn)`; trả `col`.
- Methodize lên prototype:
  ```js
  function Collection(items=[]) { this.items = items; }
  Collection.prototype.pushItem = methodize(pushItem);
  Collection.prototype.mapItems = methodize(mapItems);
  ```
- Dùng:
  ```js
  const c = new Collection().pushItem(1).pushItem(2).mapItems(x => x*10);
  // items = [10, 20]
  ```

**Tiêu chí pass:**
- Method chain hoạt động; items cập nhật đúng.

---

## Bài 9 — **Unmethodize “an toàn” cho JSON**
**Bối cảnh:** Bạn muốn API thuần, không phụ thuộc this.  
**Yêu cầu:** Viết wrapper thuần:
- `jsonStringify(obj)` → `JSON.stringify(obj)`
- `jsonParse(str)` → `JSON.parse(str)`
> (Mục tiêu: củng cố tư duy *API thuần* có thể thay thế method sẵn có khi cần.)

**Tiêu chí pass:**
- Hoạt động đúng; không throw với input hợp lệ.

---

## Bài 10 — **Bộ convert array-like (tổng hợp)**
**Bối cảnh:** Gom các util unmethodize vào một module tiện dụng.  
**Yêu cầu:** Export:
- `slice`, `map`, `forEach` (đều là bản unmethodize).
- Viết test dùng trên `arguments` và object `{0:..., length:N}`.

---

## 🎯 Tiêu chí chung (C/D/H/T)
- **C**oding: đúng hành vi, code rõ ràng, tái sử dụng helpers methodize/unmethodize.
- **D**ebugging: test được các case “khó” (array-like, tách method rời rạc).
- **H**ệ thống tư duy: hiểu tại sao cần bỏ `this` (ở chỗ nào), khi nào cần thêm `this` để có API .chấm.
- **T**rade-off: biết so sánh *function thuần* vs *method* (testability, DX, bộ nhớ).

---

## 📦 Gợi ý cấu trúc thư mục
```
src/
  lib.js               # methodize/unmethodize helpers
  a1_slice.js          # bài 1
  a2_map_foreach.js    # bài 2
  a3_hasown.js         # bài 3
  a4_set_method.js     # bài 4
  a5_fluent_basic.js   # bài 5
  a6_logger.js         # bài 6
  a7_pipe.js           # bài 7
  a8_collection.js     # bài 8
  a9_json.js           # bài 9
  a10_arraylike.js     # bài 10
test/
  *.test.js
```

---

## 🧪 Mẫu test stub (copy để bắt đầu nhanh)
```js
'use strict';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

// Ví dụ cho Bài 1:
import { unmethodize } from '../src/lib.js';

describe('Bài 1 — slice cho array-like', () => {
  const slice = unmethodize(Array.prototype.slice);

  it('slice(arguments, 1) → mảng thật', () => {
    function demo() { return slice(arguments, 1); }
    const arr = demo('x','y','z');
    assert.equal(Array.isArray(arr), true);
    assert.deepEqual(arr, ['y','z']);
  });

  it('slice({0:"a",1:"b",length:2}, 0)', () => {
    const res = slice({0:'a',1:'b',length:2}, 0);
    assert.deepEqual(res, ['a','b']);
  });
});
```

---

## 📌 Gợi ý tự đánh giá (Reflection)
- Ở đâu bạn **bỏ `this`** để tránh bug và dễ test?
- Ở đâu bạn **thêm `this`** để API `.chấm` tự nhiên hơn?
- Pattern này giúp bạn **đọc code framework** tốt hơn ở điểm nào (polyfill, lodash, core-js)?
- Bài nào khiến bạn nhớ “method tách ra là mất this”? Bạn đã “chuyển hoá” nó ra sao?

Chúc bạn luyện tập vui vẻ! 🚀
