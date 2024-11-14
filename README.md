Đây là ứng dụng mobile đầu tiên của tôi, được thực hiện vào ngày 23/10/2024
Dưới đây là một mô tả chi tiết về dự án ứng dụng di động mà bạn đang phát triển:

---

## Mô Tả Dự Án: Ứng Dụng MEDICINE SAFE

### Giới Thiệu

Dự án này là một ứng dụng di động được thiết kế để cung cấp thông tin toàn diện về các loại thuốc, triệu chứng và tình trạng sức khỏe. Ứng dụng này giúp người dùng dễ dàng tra cứu thông tin thuốc, nhắc nhở về lịch uống thuốc và tìm kiếm các phương pháp điều trị cho các triệu chứng hoặc bệnh lý cụ thể.

### Tính Năng Chính

1. **Tra Cứu Thông Tin Thuốc**:
   - Người dùng có thể tìm kiếm thông tin về thuốc bằng cách nhập tên thuốc hoặc xem danh sách thuốc.
   - Mỗi thẻ thuốc (MedicationCard) hiển thị thông tin chi tiết như:
     - Tên thương mại và tên chung của thuốc
     - Mục đích sử dụng
     - Hướng dẫn sử dụng
     - Tác dụng phụ
     - Chống chỉ định

2. **Nhắc Nhở Uống Thuốc**:
   - Tính năng nhắc nhở giúp người dùng đặt lịch uống thuốc hàng ngày.
   - Cho phép người dùng chọn thời gian nhắc nhở và nhận thông báo thông qua hệ thống thông báo.

3. **Tìm Kiếm Theo Triệu Chứng**:
   - Người dùng có thể nhập triệu chứng và nhận gợi ý danh sách thuốc có thể sử dụng để điều trị triệu chứng đó.
   - Tính năng này sử dụng Infermedica API để cung cấp thông tin chính xác về triệu chứng và các phương pháp điều trị.

4. **Tra Cứu Tình Trạng Sức Khỏe**:
   - Người dùng có thể tra cứu bệnh lý hoặc triệu chứng và tìm hiểu các phương pháp điều trị cơ bản.
   - Cung cấp thông tin chi tiết về các tình trạng sức khỏe và cách điều trị.

5. **Hồ Sơ Cá Nhân**:
   - Mỗi người dùng có một hồ sơ cá nhân, nơi họ có thể lưu thông tin cá nhân như tên và email.
   - Hỗ trợ chỉnh sửa thông tin cá nhân và lưu trữ thông tin này vào MongoDB.

6. **Điều Hướng Dễ Dàng**:
   - Ứng dụng sử dụng điều hướng tab (bottom tab navigation) để chuyển đổi giữa các màn hình: Home, Medication, Profile, Symptom Search và Health Condition Lookup.
   - Giao diện người dùng thân thiện, dễ sử dụng.

### Công Nghệ Sử Dụng

- **Frontend**: React Native
- **Backend**: Node.js với Express
- **Cơ sở Dữ Liệu**: MongoDB
- **API**: Infermedica API cho chức năng tìm kiếm triệu chứng và tình trạng sức khỏe.


