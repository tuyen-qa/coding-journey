# Ghi chú định hướng học DevTools (Network, Console, Sources, Debug, Snippets)

> Đây là file định hướng — không đi vào chi tiết ngay. Mục tiêu là ghi nhớ rằng mình **cần học** và **sẽ quay lại nghiên cứu sâu** khi có dịp.  
> Song song, mình đang học về **methodize/unmethodize**; việc nghiên cứu DevTools sẽ hỗ trợ debug & automate tốt hơn trong tương lai.

---

## 1. Vì sao cần học DevTools?
- Hỗ trợ debug sâu khi làm web app: DOM, network, async, memory, performance.
- Tăng hiệu quả automation và quan sát hành vi app trong môi trường browser.
- Cho phép viết script/snippet nhỏ để tự động hóa thao tác thủ công.

---

## 2. Các mảng cần tìm hiểu trong DevTools

### 2.1 Network
- Quan sát request/response (headers, payload, status, timing).
- Thao tác: filter, replay, copy as fetch/cURL, block/throttle.
- Advanced: Local Overrides, Initiator chain, Performance waterfall.

### 2.2 Console
- Kỹ thuật log nâng cao (`console.table`, `%c` style).
- Biểu thức nhanh: `$0`, `$$()`, `copy()`, `dir()`.
- Monitor: `monitor(fn)`, `monitorEvents($0,'click')`.
- Sử dụng `unmethodize` để thao tác nhanh với array-like (NodeList, DOMTokenList).

### 2.3 Sources
- Breakpoints: conditional, DOM, XHR/Fetch, event listener.
- Logpoint (in ra thay vì dừng).
- Async stack trace, blackbox script, restart frame.
- Workspaces & Overrides để chỉnh code trực tiếp.

### 2.4 Snippets & Script
- Snippets: lưu các đoạn script hữu ích (ví dụ helpers `map/filter/forEach` unmethodized).
- Recorder: ghi lại chuỗi thao tác UI để tái hiện hoặc automate.
- Chạy thử function trong console, debug function bằng `debug(fn)`.

### 2.5 Debug workflow
- Pause on exception, step in/out/over.
- Watch expressions & Scope view.
- Live expressions (Console) để monitor giá trị realtime.
- Performance panel: record → flame chart.
- Coverage panel: JS/CSS unused code.

### 2.6 Automation nhỏ trong DevTools
- Click all button `.accept`, scrape text từ NodeList, lọc element theo attribute.
- Inspect & mutate DOM nhanh qua console.
- Extract logs, copy kết quả ra clipboard.

---

## 3. Liên hệ với methodize/unmethodize
- **unmethodize** giúp xử lý array-like của DOM dễ hơn trong console.
- **methodize** có thể dùng để thiết kế fluent API (ví dụ `.pipe()`) cho snippet trong DevTools.
- Khi học DevTools, hãy nghĩ: “ở đây mình có thể dùng methodize/unmethodize để gói helper cho tiện không?”

---

## 4. Kế hoạch học trong tương lai
- Khi đã quen methodize, quay lại:
  - Học **console tricks** để debug state nhanh.
  - Học **network tab** để phân tích request API.
  - Học **sources tab** để trace call stack & async bug.
  - Học **snippets** để viết automation mini (bổ sung methodize/unmethodize helper).
- Ghi log, viết tài liệu nhỏ (md) sau mỗi lần học DevTools.

---

> ⚠️ Nhắc: đây mới là **định hướng để quay lại học**, không cần triển khai ngay. Ưu tiên hiện tại: nắm vững methodize trước.
