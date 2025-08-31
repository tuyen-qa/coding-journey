# PB-13 — Graph Topological Sort (Kahn + DFS)

## Hình dung
Môn học có tiên quyết: phải học A trước B. Ta muốn xếp thứ tự hợp lệ.

## Tư duy nền
- Kahn: đếm `in-degree` (số mũi tên vào). Môn nào 0 thì học trước → giảm in-degree các môn phụ thuộc.
- DFS: dùng "màu" (trắng/xám/đen). Gặp cạnh từ xám → xám là chu kỳ.
