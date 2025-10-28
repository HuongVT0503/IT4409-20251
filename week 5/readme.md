# Mô tả trang web tra cứu thông tin sinh viên

## Cấu trúc mã nguồn

Ứng dụng được tổ chức với các thành phần chính sau:

* **HTML**: Tệp `tracuu.html` tạo khung giao diện cho trang web. Trong đó có ô nhập mã sinh viên, nút tìm kiếm, và một bảng để hiển thị kết quả tra cứu.
* **CSS**: Tệp `tracuu.css` đảm nhận tạo giao diện cho trang,giúp trang web trông trực quan và rõ ràng hơn.
* **JavaScript**: Tệp JavaScript `tracuu.js` chứa logic của trang web, lắng nghe sự kiện nhấn nút "Tra cứu", lấy dữ liệu từ server/ các tệp JSON, xử lý kết quả và cập nhật nội dung HTML tương ứng.
* **Dữ liệu (JSON)**: Các tệp JSON (`sinhvien,json`,`hocphan.json`,`ketqua.json`) lưu trữ thông tin sinh viên, thông tin học phần và điểm số. Khi người dùng nhập mã sinh viên, ứng dụng sẽ đọc các tệp JSON này để tìm thông tin phù hợp.

## Xử lý bất đồng bộ với `fetch` và `async/await`

Trong ứng dụng, em sử dụng hàm `fetch()` của JavaScript để lấy dữ liệu từ tệp JSON. Đây là một thao tác **bất đồng bộ** (asynchronous), có nghĩa là chương trình không bị “đứng” lại trong lúc chờ dữ liệu. Em đã chọn sử dụng `async/await` để đơn giản hơn promise.

Trong quá trình chờ dữ liệu (await), em **hiển thị thông báo "Đang tải..."** trên giao diện để người dùng biết hệ thống đang truy vấn. Khi dữ liệu sẵn sàng, em xóa thông báo và hiển thị bảng kết quả.

Do thời gian fetch dữ liệu vẫn quá nhanh, không kịp quan sát dòng `Đang tải...` nên em đã định nghĩa thêm 1 hàm `wait(ms)` để cho trang web chờ thêm 3000ms sau khi fetch xong dữ liệu rồi mới chạy tiếp.



## Lỗi hiển thị điểm chữ và cách khắc phục

Ban đầu em dùng `ketqua.grade ?? grading(ketqua.score)` để hiển thị điểm chữ. Tuy nhiên, vì trường `grade` trong JSON là chuỗi rỗng (`""`), mà `??` chỉ hoạt động khi giá trị là `null` hoặc `undefined`, nên kết quả trả về vẫn hiển thị rỗng chứ không fallback về grading(ketqua.score).

Em đã sửa lại dùng cách kiểm tra rõ ràng thay cho `??`:

```js
const scorelettter=grading(ketqua.score);

                    const graded = ketqua.grade && ketqua.grade.trim() !== "";
                    ketqua.grade = graded ? ketqua.grade : scorelettter;
```

## Ghi chú thêm về điểm chữ / grade

Em nhận ra đề không cung cấp sẵn trường `grade`, mà chỉ có điểm số trong file ketqua.json. Trên sishusst, điểm chữ tính từ điểm tổng kết (gồm điểm quá trình + thi) nhưng lại không lưu điểm tổng mà chỉ lưu tách điểm quá trình và điểm thi. Trong bài này, để đơn giản, em chỉ dùng điểm thi làm đại diện, nên điểm chữ quy đổi sẽ có chênh lệch nhỏ so với điểm chữ trong bảng điểm SIS thật. Em đã tự viết hàm grading() để quy đổi thang điểm 10 sang A/B/C/D/F tương ứng.
