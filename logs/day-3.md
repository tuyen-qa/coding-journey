# Day 3 Log

## Chủ đề
Wrapper Functions using Closure

---

## Tôi đã học được gì?

1. **Wrapper function = outer + inner + closure**
    - **Outer function**: chạy 1 lần khi tạo wrapper, khởi tạo state (closure).
    - **Inner function**: chạy mỗi lần gọi wrapper, dùng state trong closure để quyết định hành vi.
    - Vì function object trong JS cũng là object → có thể gắn thêm property/method (`.cancel`, `.flush`, `.clear`).

2. **Công thức chung để thiết kế wrapper**
    1. Xác định hành vi đặc biệt muốn thêm.
    2. Xác định state cần giữ.
    3. Outer khởi tạo state.
    4. Inner dùng state + gọi hàm gốc.
    5. (Tùy) Trả API quản trị (`cancel`, `clear`, …).

3. **State đặc trưng của từng wrapper**
    - once → `called`, `value`
    - debounce → `timer`, `lastArgs`
    - throttle → `last`, `trailingTimer`, `lastArgs`
    - memoize → `cache`
    - retry → `times` (+ có thể dùng `AbortController` để hủy)
    - logWrapper/timeWrapper → không cần state lâu dài

4. **Vì sao return function?**
    - Nếu chỉ return giá trị → state biến mất.
    - Nếu return function → state sống trong closure, có thể tái sử dụng nhiều lần.

5. **Method quản trị (`cancel`, `flush`, `clear`)**
    - Được gắn vào **inner function object**.
    - Dùng cùng closure → có thể truy cập & thao tác state giống inner.
    - Ví dụ:
        - `debounce.cancel()` → clear timer, giải phóng state.
        - `debounce.flush()` → chạy ngay lần pending rồi reset.
        - `memoize.clear()` → dọn cache.
        - `throttle.cancel()` → hủy trailing timeout.

---

## Khó khăn gặp phải
- Lúc đầu khó hình dung `.cancel` / `.flush` thuộc outer hay inner.
- Dễ nhầm giữa “return value” và “return function”.
- Chưa quen việc function cũng là object nên có thể gắn thêm method.

---

## Reflection
- Closure giúp biến cục bộ sống dai → tạo **private state** cho wrapper.
- Wrapper function = một pattern mạnh: Behavior + State + Cleanup + Trade-off.
- Muốn hành vi A → cần state B → đặt state trong closure → return function để dùng state B.
- Cleanup rất quan trọng: nếu không có `.cancel`, `.clear`, … dễ gây memory leak.

---

## Kế hoạch tiếp theo
- Viết test đầy đủ cho cleanup APIs (`cancel`, `flush`, `clear`).
- Thử kết hợp wrapper (`composeWrappers`, `withConfig`) và quan sát state + cleanup.
- Ghi chú trade-off: đặt `memo` trước `log/time` khác gì đặt sau?
