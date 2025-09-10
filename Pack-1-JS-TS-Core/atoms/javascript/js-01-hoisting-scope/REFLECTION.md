# Reflection – Day 2

## Tôi đã hiểu gì?
- Closure không chỉ là function, mà là function + lexical environment mà nó capture.
- `makeCounter` minh họa closure: biến `count` sống sót ngoài phạm vi `makeCounter`.
- Điểm mấu chốt: **trả về function** để tiếp tục gọi nhiều lần, thay vì trả về giá trị một lần rồi mất.
- Tôi cũng ôn lại **hoisting**:
    - `var` được hoist với giá trị `undefined`.
    - `let/const` được hoist nhưng trong TDZ (temporal dead zone) → ReferenceError nếu gọi trước khai báo.
- Tôi hiểu rõ **function scope**: biến `var` thuộc toàn bộ function, không chỉ block.

## Tôi đã tư duy như thế nào?
- Tôi bắt đầu từ câu hỏi: *makeCounter nhận tham số gì? trả về gì? dùng để làm gì?*
- Ban đầu tôi không biết liên quan đến “state”.
- Sau đó, tôi so sánh 2 cách:
    1. `return ++count` → chỉ trả về giá trị ngay.
    2. `return function() { return ++count; }` → tạo closure giữ state.
- Từ đó tôi tự rút ra: closure hữu ích khi muốn giữ **private state**.

## Tôi sẽ cải thiện như thế nào?
- Khi gặp một API mới, tôi sẽ tự đặt câu hỏi như:
    - *Khi tôi gọi nó lần đầu, tôi muốn kết quả gì?*
    - *Khi gọi lần hai, ba thì sao?*
    - *Nếu có 2 instance thì có độc lập không?*
- Tôi sẽ tiếp tục luyện TDD: viết test cho hành vi trước khi code.
