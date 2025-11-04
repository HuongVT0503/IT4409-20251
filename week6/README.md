Component quản lý state chính: App(rows, loading, error, sidQuery).
Component SearchForm quản lý state cục bộ cho ô nhập sid và phát sự kiện onSearch.
Component ResultTable là component trình bày, chỉ nhận dữ liệu qua props, không quản lý state.

useEffect đặt trong App với dependency [sidQuery], chạy sau lần render đầu tiên (sidQuery = ""), rồi chạy lại mỗi khi sidQuery thay đổi.
