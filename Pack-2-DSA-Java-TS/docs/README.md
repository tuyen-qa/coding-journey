# Pack 2 — DSA (Java + TypeScript)
## TypeScript
- Cài Node + TypeScript: `npm i -g typescript` (hoặc dùng `npx tsc`).
- Vào từng atom TS: `npx tsc -p tsconfig.json` -> chạy test đã biên dịch bằng Node: `node dist/.../test/index.test.js`.
## Java
- Mở từng atom trong IDE (IntelliJ/Eclipse). Thêm JUnit 5 (Jupiter) để chạy tests trong `src/test/java`.
- Hoặc tự viết `main` để kiểm tra nhanh theo chữ ký hàm trong `src/main/java`.
## Đo lường
- **Pass toàn bộ tests** ở mỗi atom (TS có test runnable; Java có JUnit skeleton).
- Ghi chú độ phức tạp Big-O trong `ABOUT.md` sau khi hoàn thành.
