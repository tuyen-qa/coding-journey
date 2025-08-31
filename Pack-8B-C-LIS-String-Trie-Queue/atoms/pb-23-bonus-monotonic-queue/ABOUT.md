# PB-23 — Bonus: Monotonic Queue (Sliding Window Maximum)

## Hình dung
Duy trì một hàng đợi **giảm dần** giá trị. Phần tử mới sẽ loại bỏ (pop back) những phần tử nhỏ hơn nó vì chúng không thể là max cho tương lai.

## Tư duy nền
- Mỗi phần tử vào/ra deque tối đa 1 lần → O(n).
- Lưu **chỉ số** để loại phần tử đã trượt khỏi cửa sổ.
