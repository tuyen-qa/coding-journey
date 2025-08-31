# PB-11 — Tree Basics (Traversal + BST ops)

## Hình dung
Cây như "mục lục" có nhánh con. Duyệt:
- Preorder: gốc → trái → phải
- Inorder (BST): trái → gốc → phải (ra dãy tăng)
- Postorder: trái → phải → gốc

## Tư duy nền
- Cây = cấu trúc phân cấp. Inorder trong BST cho thứ tự tăng vì "mọi giá trị trái < gốc < phải".
- Đệ quy như "giao việc cho trợ lý": nhiệm vụ ở cây con giống hệt ở cây lớn.

## Bạn sẽ cài
- `inorder(root)`
- `insertBST(root, val)`
- `searchBST(root, val)`
- (mở rộng) `height(root)`, `isBalanced(root)`
