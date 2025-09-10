# Wrapper Functions

## Giới thiệu
Wrapper function = hàm “bọc” quanh hàm gốc để thêm hành vi mới mà không thay đổi logic gốc.  
Công thức chung:
1. Xác định hành vi muốn thêm.
2. Xác định state cần giữ (nếu có).
3. Outer function khởi tạo state.
4. Inner function xử lý state, gọi `fn`.
5. Trả kết quả.

## Closure và return function là gì
- Closure = function + lexical environment nó capture
- Khi outer function return một inner function -> biến cục bộ trong outer không bị mất, mà sống trong "hộp environment" cho inner
- Kết quả: bạn có thể tạo ra private state, gắn liền với 1 function

## Các ví dụ trong atom này
- once(fn): chỉ cho gọi 1 lần.
- debounce(fn, delay): dồn nhiều lần gọi, chỉ chạy sau khi ngừng gọi.
- throttle(fn, interval): giới hạn tần suất gọi.
- retry(fn, times): thử lại khi lỗi.
- logWrapper(fn): log input/output.
- timeWrapper(fn): đo thời gian chạy.
- memoize(fn): cache kết quả cho input giống nhau.

## Wrapper function là gì?

- Wrapper function = một hàm bao bọc quanh hàm gốc, để:
  - Giữ nguyn cách gọi như hàm gốc
  - Thêm một số hành vi "phụ" (theo dõi log, cache, validate,...)
- Ví dụ đời thường: bạn có một cái hộp quà (hàm gốc), bạn bọc nó thêm lớp giấy gói (wrapper). Người nhận vẫn mở hộp ra dùng bình thươờng, nhưng thêm trải nghiệm "mở quà"

## Các đặc điểm của wrapper function
- Nhận vào: một hàm gốc
- Trả v: một hàm mới, thương có cùng signature
- Có thể:
  - Gọi hàm gốc bên trong (fn(...args)).
  - Thêm logic trước/sau khi gọi hàm gốc
  - Lưu giữ state trong closure (như memoize với cache)

## Các ví dụ wrapper function ta đã thấy
- makeSpy(fn)
  - Trả về một haàm mới giống hện fn, nhưng có thêm log số lần gọi
  - Mục đích: hỗ trợ test
- memoize(fn)
  - trả về một hàm mới giống hệt fn, nhưng có thêm cache/
  - mục đích: tăng tốc, tránh tính lại.
- once(fn)
  - trả về hàm chỉ chạy fn đúng 1 lần, lần sau trả lại kết quả cũ.
  - mục đích: đảm bảo logic chỉ chạy duy nhất một lần (init, kết nối DB,...)

## Nguyên tắc thiết kế wrapper function
- Trung thành với API gốc: giữ nguyên cách truyền tham số và trả về kết quả như hàm gốc.
- Minh bạch: dễ hiểu, dễ đoán (khi gọi wrapper, bạn biết thêm hành vi gì)
- Private state: dùng closure để giữ dữ liệu phụ, không l ra ngoài
- Không phá logic gốc: chỉ thêm hành vi, không làm sai đi kết quả

## Nguyên tắc sử dụng
- Dùng wrapper khi:
  - Bạn muốn thm cross-cutting concern (theo dõi, cache, log, validate, ...) mà không sửa code gốc
  - Bạn muốn code rõ ràng: phân biệt business logic (hàm gốc) và concern phụ (wrapper).
- Ví dụ:
  - spy(fn) để test
  - memoize(fn) để cache
  - throttle(fn) / debounce(fn) trong frontend để kiểm soát tần suất gọi.
  - logWrapper(fn) để log input/output

## Cách tạo wrapper function
- Công thức chung
```
function wrapper(fn, options = {}) {
  // 1. Tạo state riêng cho wrapper
  let state; // ví dụ: called, timer, cache, last, ...

  // 2. Trả về inner function
  return (...args) => {
    // 3. Logic trước khi gọi
    //    (check state, validate, clear timer, ...)

    const result = fn(...args); // 4. Gọi hàm gốc khi cần

    // 5. Logic sau khi gọi
    //    (log, update cache, update state, ...)

    return result; // 6. Trả về kết quả
  };
}

```
- Tư duy:
  - Muốn hành vi gì -> cần state gì -> đặt state ở closure -> inner function thao tác state đó
  - Nếu không cần state (ví dụ chỉ log), wrapper vẫn trả function mới nhưng không có biến closure phức tạp
  - Ví dụ: lấy once(fn)
    - Yêu cầu hành ví:
      - fn chỉ được chaạy 1 lần duy nhất
      - Những lần sau -> không chạy lại, chỉ trả lại kết quả cũ
    - Áp dụng công thức và tư duy:
      - Xác định hành vi đặc biệt muốn thêm:
        - hạn chế gọi hàm gốc chỉ 1 lần
      - Xác định state cần giữ
        - called -> cờ boolean, cho biết đã gọi lần nào chưa
        - value -> lưu kết quả lần ầu để trả lại về lần sau
      - Outer function khởi tạo state
        ```
        export function once(fn) {
            let called = false;
            let value;
        }
        ```
      - return inner function
        - inner function sẽ:
          - check called.
          - nếu false -> gọi fn(...args), lưu kết quả vào value, đặt called=true.
          - nếu true -> bỏ qua, chỉ trả value.
          ```
          return (...args) => {
            if(!called) {
                called = true;
                value = fn(...args);
            }
            return value;
          }
          ```
- Tóm lại:
  - wrapper function = hàm bọc quanh hàm khác
  - sau này, khi gặp các bài toán "thêm hành vi nhưng muốn sửa code gốc", bạn hãy nghĩ tới wrapper

## Danh sách Wrapper function thường gặp
1. once(fn)
   1. Ý tưởng: đảm bảo hàm gốc ch chạy 1 lần duy nhất
   2. ứng dụng: init database, thiết lập kết nối websocket, attach event listener...
   3. behavior:
      1. gọi lần 1 -> chạy thật
      2. gọi lần 2, 3 -> trả lại kết quả cũ, không chạy lại
   7. Đặc điểm: Trả về function, có giữ closure giữ timer
2. throttle(fn, delay)
   1. ý tưởng: giới hạn số lần gọi hàm trong một khoảng thời gian.
   2. Ứng dụng: cuộn trang, resize window -> chỉ chạy log/handler mỗi 200ms
   3. Behavior: nếu gọi liên tục, chỉ được gọi tối đa 1 lần trong mỗi lần delay
   4. Đặc điểm: trả về function, có closure giữ last
3. debounce(fn, delay)
   1. Ý tưởng: hoãn chạy hàm gốc cho đến khi người dùng ngừng gọi trong một khoảng delay.
   2. Ứng dụng: search box(ngừng gõ 500ms mới query API)
   3. Đặc điểm: trả về function, có closure giữ timer
4. retry(fn, times)
   1. Ý tưởng: nếu hàm gốc ném lỗi, thử lại vài lần trước khi bỏ cuộc
   2. Ứng dụng: gọi API không ổn định, kết nối mạng chập chờn
   3. Behavior:
      1. Nếu fail -> thử lại times lần
      2. Nếu thành công -> dừng và trả kết quả
   4. Đặc điểm: trả về function, có closure giữ times
5. logWrapper(fn)
   1. Ý tưởng: log input và output của hàm
   2. Ứng dụng: debug, audit
   3. behavior:
      1. Trước khi gọi hàm gốc -> log tham số
      2. Sau khi gọi -> log kết quả
   4. Đặc điểm: trả về function, không giữ state phức tạp, chỉ thêm log
6. timeWrapper(fn)
   1. Ý tưởng: đo thời gian chạy của hàm
   2. Ứng dụng: benchmark performance
   3. Behavior:
      1. Trước khi gọi -> ghi lại Date.now().
      2. Sau khi gọi -> log thời gian thực thi.
   4. Đặc điểm: trả về function, cũng không cần state lâu dài, chỉ thêm thời gian
7. memoize(fn)
   1. Ý tưởng: cache kết quả cho dùng input
   2. Ứng dụng: tăng tốc tính toán kém, đệ quy, API call giống nhau
   3. Đặc điểm: trả về function, có closure giữ cache
