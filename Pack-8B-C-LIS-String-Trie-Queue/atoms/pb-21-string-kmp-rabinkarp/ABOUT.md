# PB-21 — String Algorithms: KMP & Rabin–Karp

## Hình dung
- **KMP**: khi mismatch, nhảy dựa vào phần trùng đã biết của **pattern** (bảng `lps`).
- **Rabin–Karp**: băm trượt để so sánh cửa sổ nhanh, khi hash trùng thì kiểm tra lại để tránh va chạm.

## Tư duy nền
- KMP: tránh lùi con trỏ text về sau; dùng `lps[j-1]` để cập nhật `j`.
- Rolling hash: cập nhật hash bằng cách bỏ ký tự cũ + thêm ký tự mới, không tính lại từ đầu.
