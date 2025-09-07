# Daily Log — Day 1

## Atom / Topic
- [Pack-1-JS-TS-Core] js-00-basics-values-equality

## ✅ Những việc đã làm
- Giải nén và đọc cấu trúc repo **Pack-1-JS-TS-Core**.
- Mở atom **js-00-basics-values-equality**:
    - Đọc lại `ASSIGNMENT.md` gốc (rất sơ sài).
    - Viết lại `ASSIGNMENT.md` chi tiết hơn (thêm mục tiêu học, test case, rubric C/D/H/T).
- Viết **skeleton code** trong `src/index.js` với các hàm:
    - `compare(a,b)`
    - `isSameValueZero(x,y)`
    - `sameValue(x,y)` (optional)
- Viết **skeleton test** trong `test/index.test.js` theo phong cách Node assert.
- Cấu hình ESM:
    - Tạo `package.json` với `"type": "module"`.
    - Sửa import path có `.js` đầy đủ để chạy được với Node.
- Chạy test và tất cả đều **pass OK**.

## 📚 Những kiến thức đã học
- **So sánh trong JavaScript**
    - `==` (loose equality): có ép kiểu.
    - `===` (strict equality): không ép kiểu, nhưng `NaN !== NaN`, `0 === -0`.
    - `Object.is`: giống `===` nhưng phân biệt `+0/-0`, và coi `NaN === NaN`.
    - `SameValueZero`: dùng trong `Set/Map`, coi `NaN === NaN`, `0 === -0`.
- **Edge cases quan trọng**
    - `NaN !== NaN` → phải dùng `Number.isNaN` hoặc `Object.is`.
    - `0 === -0` nhưng `Object.is(0, -0)` là `false`.
    - `[] == ""` → true, vì `[] → "" → 0`.
    - `null == undefined` → true.
- **Background logic**
    - IEEE-754 định nghĩa có cả `+0` và `-0` để giữ hướng của vô cùng (`1/0 = Infinity`, `1/-0 = -Infinity`).
    - `Infinity` và `-Infinity` là hai giá trị riêng biệt (`Infinity === -Infinity` → false).
- **Tư duy debug**
    - Edge cases equality thường gây bug khó hiểu nếu không nắm rõ spec.
    - Biết cách viết test cho các tình huống đặc biệt giúp phát hiện bug sớm.
- **Công cụ**
    - Dùng Node built-in `assert` thay vì Jest → gọn, không cần cài đặt.
    - Cách config ESM (`"type": "module"`, import path với `.js`).

## 💡 Reflection theo C/D/H/T
- **C (Coding):** Viết được hàm `compare`, `isSameValueZero`, `sameValue` pass test.
- **D (Debugging):** Biết viết test edge case (`NaN`, `0/-0`, object wrapper).
- **H (Hệ thống tư duy):** Hiểu sự khác nhau giữa `==`, `===`, `Object.is`, `SameValueZero` và background IEEE-754.
- **T (Trade-off):**
    - `==` ngắn gọn nhưng dễ bug.
    - `===` an toàn nhưng không cover NaN.
    - `Object.is` chính xác nhưng ít người biết → giảm readability.

## 🚀 Bước tiếp theo
- Viết thêm `VARIATIONS.md` chứa các edge case để luyện thêm:
    - `[] == false`
    - `new String("a") === "a"`
    - `Symbol("x") === Symbol("x")`
- Làm các bài mở rộng đã gợi ý:
    - `shallowEqual` vs `shallowEqualSameValueZero`
    - `arrayEqualAsSetSameValueZero`
    - `toPrimitiveThenStrictEqual`
- Ghi nhận thêm case thực tế khi gặp `NaN` trong dữ liệu người dùng / API.

