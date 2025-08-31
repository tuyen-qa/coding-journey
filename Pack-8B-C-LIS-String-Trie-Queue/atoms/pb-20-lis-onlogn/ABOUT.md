# PB-20 — Longest Increasing Subsequence (O(n log n))

## Hình dung "xếp bài"
Giữ nhiều "chồng bài". Mỗi số đặt lên chồng có đỉnh >= số đó nhưng là chồng **nhỏ nhất có thể**.
Mảng `tails[len]` = giá trị **kết thúc nhỏ nhất** của một dãy tăng độ dài `len+1`.

## Tư duy nền
- Binary search để tìm vị trí đặt số hiện tại vào `tails`.
- `tails` **không** là dãy kết quả, nhưng độ dài của nó là độ dài LIS.
