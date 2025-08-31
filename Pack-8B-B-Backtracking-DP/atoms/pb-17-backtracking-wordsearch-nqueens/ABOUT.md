# PB-17 — Backtracking: Word Search & N-Queens

## Hình dung
- Word Search: đi qua các ô kề nhau để ghép thành từ, mỗi ô dùng tối đa 1 lần.
- N-Queens: đặt N hậu trên bàn cờ N×N sao cho không ăn nhau.

## Tư duy nền
- Word Search: DFS với visited; khi rời ô thì bỏ đánh dấu (backtrack).
- N-Queens: dùng set cột & 2 đường chéo `r-c`, `r+c` để kiểm tra nhanh.
