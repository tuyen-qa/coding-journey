# PB-12 — Tree Problems: Diameter & Level Order

## Hình dung
- **Diameter**: đường đi dài nhất giữa hai lá, như kéo thước dây qua cây thật.
- **Level Order**: duyệt theo tầng bằng queue, như truyền tin qua từng lớp.

## Tư duy nền
- Diameter cập nhật bằng "chiều cao trái + phải" tại mỗi nút.
- Level order dùng hàng đợi: đẩy con vào sau, rút nút hiện tại ra trước.
