# REFLECTION — JS-00: Values & Equality

## Brute force
Ban đầu tôi nghĩ chỉ cần `==` và `===` là đủ. Tôi test nhanh vài case như `5 == "5"` hay `0 === 0` và thấy kết quả hợp lý, nên mặc định tin rằng có 2 cách so sánh là đủ.

## Pain
Khi gặp `NaN === NaN` trả về `false` tôi rất bất ngờ.  
Tương tự, `0 === -0` là `true` nhưng `Object.is(0, -0)` lại `false`.  
Những edge case này làm tôi thấy rằng so sánh trong JS không hề đơn giản.

## Pattern
- `==`: cho phép ép kiểu, có thể gây bug ngầm → hạn chế dùng.
- `===`: an toàn hơn, mặc định nên dùng trong hầu hết tình huống.
- `Object.is`: giống `===` nhưng giải quyết được quirks `NaN`, phân biệt `+0` và `-0`.
- `SameValueZero`: dùng trong `Set` và `Map`, xử lý `NaN` bằng nhau, `0` và `-0` cũng coi như bằng.

## Trade-off
- `==` ngắn gọn nhưng rủi ro (ví dụ `[1] == "1"` lại là true).
- `===` dễ đọc, an toàn hơn nhưng không xử lý hết mọi edge case.
- `Object.is` chuẩn xác nhưng ít người biết → có thể làm team khó đọc code.
- Tùy context mà chọn: test automation cần chính xác tuyệt đối → `Object.is` hoặc custom compare; còn check điều kiện thường thì `===` là đủ.

## Variations
- So sánh `null` và `undefined`.
- So sánh `[]` và `""`.
- So sánh `new String("a")` và `"a"`.
- So sánh `Symbol("x")` và `Symbol("x")`.
- Benchmark thử tốc độ `==` vs `===` vs `Object.is` trên nhiều loại dữ liệu.
