# PB-14 — Shortest Path (Dijkstra với Priority Queue)

## Hình dung
Đi đường ngắn nhất khi mọi đoạn đường đều có độ dài dương.

## Tư duy nền
- Giữ "khoảng cách tạm thời" tốt nhất đã biết. Luôn nới lỏng (relax) cạnh từ đỉnh có distance nhỏ nhất hiện tại.
- Priority Queue (heap) để lấy đỉnh "ưu tiên nhất".
