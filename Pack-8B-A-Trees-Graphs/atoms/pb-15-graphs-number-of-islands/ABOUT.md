# PB-15 — Number of Islands (BFS/DFS + Union-Find phụ)

## Hình dung
Lưới 0/1: 1 là đất, 0 là nước. Mỗi đảo là một vùng 1 nối nhau 4 hướng.

## Tư duy nền
- Duyệt & đánh dấu đã thăm. Bất cứ khi nào gặp ô đất chưa thăm, tăng đếm đảo, rồi BFS/DFS để "tô màu".
- Union-Find là cách khác: gom các ô đất kề nhau vào cùng nhóm.
