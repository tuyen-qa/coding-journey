# Reflection: ECMAScript Modules (ESM)

## 1. Điều đã học được
- Hiểu rõ khái niệm **module** trong ESM: mỗi file JS là một module độc lập, chỉ chia sẻ qua `export` / `import`.
- Nắm toàn bộ cú pháp `export` và `import`, gồm:
    - Named export
    - Default export
    - Export alias
    - Re-export (một phần, toàn bộ, với namespace)
    - Import cụ thể, alias, default, kết hợp, side-effect, dynamic
- Biết sự khác biệt giữa **CommonJS** (`require`, `module.exports`) và **ESM** (`import`, `export`).

## 2. Khó khăn gặp phải
- Dễ nhầm giữa `export default` và `export { ... }`.
- Khi dùng `import`, quên dấu `{}` cho named import.
- Dynamic import cần `await import(...)`, đôi khi quên thêm `await`.

## 3. Bài học kinh nghiệm
- Khi quên cú pháp → đọc lại error message của Node.js rất hữu ích, giúp nhớ cách viết chuẩn.
- Tạo file `ASSIGNMENT.md` có chỗ trống để luyện đi luyện lại là cách hiệu quả để thuộc cú pháp.
- Default export nên dùng khi module có 1 thực thể chính (ví dụ 1 class), còn lại nên dùng named export để dễ tree-shaking và dễ đọc code.

## 4. Ý tưởng cải thiện
- Làm thêm mini project nhỏ chỉ dùng ESM để rèn phản xạ.
- Thử tree-shaking với bundler (Vite/Webpack) để thấy tác dụng của named export.
- Thử mix ESM và CommonJS trong 1 project để hiểu vấn đề compatibility.

## 5. Variations cho lần học tiếp theo
- Viết lại thư viện `string-utils` chỉ dùng **default export**.
- Viết lại `math.js` chỉ dùng **named export**.
- Thử import module từ **URL trực tiếp** (trên browser `<script type="module">`).
