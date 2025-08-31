# PB-19 — 2D DP: Edit Distance & Unique Paths with Obstacles

## Hình dung
- Edit Distance: biến `a` thành `b` với chèn/xoá/thay; bảng dp[i][j] = chi phí tốt nhất.
- Unique Paths with Obstacles: số đường đi từ (0,0) đến (m-1,n-1) tránh chướng ngại.

## Tư duy nền
Mỗi ô trong bảng có ý nghĩa rõ ràng (tối ưu hoá từ đầu đến i/j). Base case là hàng/cột đầu.
