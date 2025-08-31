# PB-16 — Backtracking: Subsets & Permutations (unique)

## Hình dung
Backtracking như giải mê cung: thử đi tiếp, nếu bế tắc thì quay lại.
- Subsets: ở mỗi phần tử, chọn hoặc không chọn.
- Permutations (có trùng): sắp xếp sao cho không sinh trùng lặp.

## Tư duy nền
- Quyết định theo "cây": mỗi tầng là một lựa chọn.
- Tránh trùng lặp bằng sort + bỏ qua khi `nums[i] == nums[i-1]` và `i-1` chưa dùng.
