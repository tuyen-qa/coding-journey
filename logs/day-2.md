# Day 2 Log

## Nội dung đã học
- Hoàn thiện bài tập `makeCounter` sử dụng closure.
- Hiểu rõ sự khác biệt giữa:
    - `return ++count` (trả giá trị ngay, không giữ state).
    - `return function() { ... }` (closure, giữ state qua nhiều lần gọi).
- Closure = function + scope nó capture → dùng để tạo private state.
- Ôn tập thêm **hoisting** và **function scope**:
    - Hoisting: var hoist = undefined; let/const hoist nhưng trong TDZ.
    - Function scope: var có phạm vi toàn hàm, không giới hạn block.

## Tư duy và cách tiếp cận
- Bắt đầu bằng việc đặt các câu hỏi cơ bản:
    - *makeCounter nhận tham số gì?*
    - *makeCounter trả về gì?*
    - *makeCounter dùng để làm gì? có giống gì ngoài đời thật không?*
- Dần dần, từ câu hỏi đó, tôi mới phát hiện khái niệm “state” và thấy cần closure để giữ state.
- Viết test đầu tiên: `makeCounter returns function, not a value`.
- TDD giúp tôi thấy rõ behavior → từ đó code closure đúng.

## Bài học rút ra
- Closure hữu ích khi muốn giữ private state.
- Hoisting ảnh hưởng đến cách biến được truy cập trước khi khai báo.
- Function scope giải thích vì sao var “leak” ra ngoài block.
- Đặt câu hỏi hành vi trước (API perspective), không cần biết trước “closure” là gì.
- Viết test nhỏ, đơn giản để dẫn dắt cách implement.

## Kế hoạch tiếp theo
- Viết thêm test cho `makeCounter`: gọi nhiều lần, nhiều instance, state độc lập.
- Áp dụng cách đặt câu hỏi tương tự cho `memoize` và `once`.
- Tiếp tục luyện các khái niệm hoisting và function scope bằng ví dụ thực hành.
