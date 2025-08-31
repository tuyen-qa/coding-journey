# PB-22 — Trie (Prefix Tree)

## Hình dung
Cây theo **ký tự**: đi xuống từng chữ cái. Tìm theo **tiền tố** rất nhanh.

## Tư duy nền
- Mỗi node có bảng con `char -> node` và cờ `end`.
- `startsWith` chỉ cần kiểm tra đi hết prefix có tồn tại hay không.
