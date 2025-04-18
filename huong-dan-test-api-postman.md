# HƯỚNG DẪN TEST API ỨNG DỤNG QUẢN LÝ KHÁCH SẠN

## Giới thiệu

Tài liệu này hướng dẫn cách sử dụng Postman để kiểm thử tất cả các API có trong ứng dụng quản lý khách sạn theo kiến trúc Clean Architecture.

## Cài đặt và thiết lập

1. Tải và cài đặt [Postman](https://www.postman.com/downloads/)
2. Tạo một Collection mới trong Postman đặt tên là "Hotel Management API"
3. Tạo một Environment cho dự án và thiết lập biến:
   - `baseUrl`: http://localhost:3000/api
   - `token`: (sẽ được thiết lập sau khi đăng nhập)

## Xác thực và Phân quyền

Hệ thống sử dụng JWT (JSON Web Token) để xác thực người dùng. Hầu hết các API đều yêu cầu xác thực và phân quyền:

1. **Xác thực**:

   - Khi đăng nhập thành công, bạn sẽ nhận được JWT token
   - Token này cần được gửi kèm trong header Authorization của mỗi request: `Authorization: Bearer {token}`
   - Trong Postman, bạn nên lưu token này vào biến môi trường để sử dụng lại

2. **Phân quyền**:
   - Chỉ người dùng có role là `admin` hoặc `staff` mới có quyền truy cập vào hầu hết các API
   - Nếu không có quyền, bạn sẽ nhận được lỗi 403 Forbidden

### Thiết lập JWT trong Postman

1. Sau khi đăng nhập thành công, lấy token từ response
2. Trong Tests tab của request đăng nhập, thêm đoạn script sau để tự động lưu token:
   ```javascript
   var jsonData = JSON.parse(responseBody);
   if (jsonData.success && jsonData.data && jsonData.data.token) {
     pm.environment.set("token", jsonData.data.token);
   }
   ```
3. Với các request khác, vào tab Authorization:
   - Type: Bearer Token
   - Token: {{token}}

## Danh sách API

### 1. Xác thực (Authentication)

#### Đăng ký tài khoản

- **URL**: {{baseUrl}}/auth/register
- **Phương thức**: POST
- **Body** (JSON):

```json
{
  "username": "exampleuser",
  "password": "Password123",
  "email": "user@example.com",
  "name": "Nguyễn Văn A",
  "phone": "0123456789",
  "address": "123 ABC Street",
  "gender": "male",
  "role": "admin"
}
```

- **Kết quả mong đợi**: Status Code 201 với thông tin tài khoản đã tạo

#### Đăng nhập

- **URL**: {{baseUrl}}/auth/login
- **Phương thức**: POST
- **Body** (JSON):

```json
{
  "username": "exampleuser",
  "password": "Password123"
}
```

- **Kết quả mong đợi**: Status Code 200 với token và thông tin người dùng

#### Đặt lại mật khẩu

- **URL**: {{baseUrl}}/auth/reset-password
- **Phương thức**: POST
- **Body** (JSON):

```json
{
  "username": "exampleuser",
  "newPassword": "NewPassword123"
}
```

- **Kết quả mong đợi**: Status Code 200 với thông báo đặt lại mật khẩu thành công

#### Cập nhật role cho tài khoản

- **URL**: {{baseUrl}}/auth/update-role
- **Phương thức**: POST
- **Body** (JSON):

```json
{
  "username": "exampleuser",
  "role": "admin" // hoặc "staff"
}
```

- **Kết quả mong đợi**: Status Code 200 với thông báo cập nhật thành công

### 2. Quản lý Person (Person - thay thế User và Staff)

#### Tạo Person mới (User hoặc Staff)

- **URL**: {{baseUrl}}/persons
- **Phương thức**: POST
- **Body cho User** (JSON):

```json
{
  "accountId": "ID_tài_khoản_đã_tạo",
  "name": "Nguyễn Văn A",
  "email": "user@example.com",
  "phone": "0123456789",
  "address": "123 ABC Street",
  "gender": "male",
  "birthDate": "1990-01-01T00:00:00Z",
  "type": "user"
}
```

- **Body cho Staff** (JSON):

```json
{
  "accountId": "ID_tài_khoản_đã_tạo",
  "name": "Nguyễn Văn B",
  "email": "staff@example.com",
  "phone": "0987654321",
  "address": "456 XYZ Street",
  "gender": "male",
  "birthDate": "1990-01-01T00:00:00Z",
  "type": "staff",
  "position": "Lễ tân",
  "salary": 10000000,
  "status": "active"
}
```

- **Kết quả mong đợi**: Status Code 201 với thông tin person đã tạo

#### Lấy thông tin Person theo ID

- **URL**: {{baseUrl}}/persons/:id
- **Phương thức**: GET
- **Kết quả mong đợi**: Status Code 200 với thông tin chi tiết của person

#### Lấy danh sách User

- **URL**: {{baseUrl}}/persons/type/users
- **Phương thức**: GET
- **Kết quả mong đợi**: Status Code 200 với danh sách user

#### Lấy danh sách Staff

- **URL**: {{baseUrl}}/persons/type/staffs
- **Phương thức**: GET
- **Kết quả mong đợi**: Status Code 200 với danh sách staff

#### Cập nhật thông tin Person

- **URL**: {{baseUrl}}/persons/:id
- **Phương thức**: PUT
- **Body cho User** (JSON):

```json
{
  "name": "Nguyễn Văn A (Cập nhật)",
  "email": "updated_user@example.com",
  "phone": "0123456789",
  "address": "321 CBA Street",
  "gender": "male"
}
```

- **Body cho Staff** (JSON):

```json
{
  "name": "Nguyễn Văn B (Cập nhật)",
  "position": "Quản lý",
  "phone": "0987654321",
  "email": "updated_staff@example.com",
  "address": "654 ZYX Street",
  "salary": 15000000
}
```

- **Kết quả mong đợi**: Status Code 200 với thông tin đã cập nhật

#### Cập nhật trạng thái Staff

- **URL**: {{baseUrl}}/persons/:id/status
- **Phương thức**: PATCH
- **Body** (JSON):

```json
{
  "status": "on_leave"
}
```

- **Kết quả mong đợi**: Status Code 200 với thông tin staff và trạng thái mới

#### Xóa Person

- **URL**: {{baseUrl}}/persons/:id
- **Phương thức**: DELETE
- **Kết quả mong đợi**: Status Code 200 với thông báo xóa thành công

### 3. Quản lý loại phòng (Kind Room)

#### Tạo loại phòng mới

- **URL**: {{baseUrl}}/kind-rooms
- **Phương thức**: POST
- **Body** (JSON):

```json
{
  "name": "Phòng Deluxe",
  "price": 2000000,
  "capacity": 2,
  "amenities": ["TV", "Tủ lạnh", "Máy điều hòa", "Két sắt"],
  "description": "Phòng sang trọng với view đẹp"
}
```

- **Kết quả mong đợi**: Status Code 201 với thông tin loại phòng đã tạo

#### Lấy danh sách loại phòng

- **URL**: {{baseUrl}}/kind-rooms
- **Phương thức**: GET
- **Kết quả mong đợi**: Status Code 200 với danh sách loại phòng

#### Cập nhật thông tin loại phòng

- **URL**: {{baseUrl}}/kind-rooms/:id
- **Phương thức**: PUT
- **Body** (JSON):

```json
{
  "name": "Phòng Super Deluxe",
  "price": 2500000,
  "capacity": 3,
  "amenities": ["TV", "Tủ lạnh", "Máy điều hòa", "Két sắt", "Bồn tắm"],
  "description": "Phòng VIP với nhiều tiện nghi"
}
```

- **Kết quả mong đợi**: Status Code 200 với thông tin loại phòng đã cập nhật

#### Xóa loại phòng

- **URL**: {{baseUrl}}/kind-rooms/:id
- **Phương thức**: DELETE
- **Kết quả mong đợi**: Status Code 200 với thông báo xóa thành công

### 4. Quản lý phòng (Room)

#### Tạo phòng mới

- **URL**: {{baseUrl}}/rooms
- **Phương thức**: POST
- **Body** (JSON):

```json
{
  "roomNumber": "101",
  "kindRoomId": "ID_loại_phòng_đã_tạo",
  "floor": 1,
  "status": "available",
  "description": "Phòng hướng ra biển"
}
```

- **Kết quả mong đợi**: Status Code 201 với thông tin phòng đã tạo

#### Lấy danh sách phòng

- **URL**: {{baseUrl}}/rooms
- **Phương thức**: GET
- **Kết quả mong đợi**: Status Code 200 với danh sách phòng

#### Cập nhật thông tin phòng

- **URL**: {{baseUrl}}/rooms/:id
- **Phương thức**: PUT
- **Body** (JSON):

```json
{
  "roomNumber": "101",
  "kindRoomId": "ID_loại_phòng",
  "floor": 1,
  "status": "maintenance",
  "description": "Phòng đang sửa chữa"
}
```

- **Kết quả mong đợi**: Status Code 200 với thông tin phòng đã cập nhật

#### Xóa phòng

- **URL**: {{baseUrl}}/rooms/:id
- **Phương thức**: DELETE
- **Kết quả mong đợi**: Status Code 200 với thông báo xóa thành công

### 5. Quản lý khách hàng (Customer)

#### Tạo khách hàng mới

- **URL**: {{baseUrl}}/customers
- **Phương thức**: POST
- **Body** (JSON):

```json
{
  "name": "Trần Thị C",
  "identityCard": "123456789012",
  "phone": "0369852147",
  "email": "customer@example.com",
  "address": "789 LMN Street",
  "nationality": "Việt Nam"
}
```

- **Kết quả mong đợi**: Status Code 201 với thông tin khách hàng đã tạo

#### Lấy danh sách khách hàng

- **URL**: {{baseUrl}}/customers
- **Phương thức**: GET
- **Kết quả mong đợi**: Status Code 200 với danh sách khách hàng

#### Cập nhật thông tin khách hàng

- **URL**: {{baseUrl}}/customers/:id
- **Phương thức**: PUT
- **Body** (JSON):

```json
{
  "name": "Trần Thị C",
  "idCard": "123456789012",
  "phone": "0987654321",
  "email": "updated_customer@example.com",
  "address": "321 NPO Street",
  "nationality": "Việt Nam"
}
```

- **Kết quả mong đợi**: Status Code 200 với thông tin khách hàng đã cập nhật

#### Xóa khách hàng

- **URL**: {{baseUrl}}/customers/:id
- **Phương thức**: DELETE
- **Kết quả mong đợi**: Status Code 200 với thông báo xóa thành công

### 6. Quản lý phiếu phòng (Room Voucher)

#### Tạo phiếu phòng mới

- **URL**: {{baseUrl}}/room-vouchers
- **Phương thức**: POST
- **Body** (JSON):

```json
{
  "roomId": "ID_phòng_đã_tạo",
  "customerId": "ID_khách_hàng_đã_tạo",
  "staffId": "ID_nhân_viên_đã_tạo",
  "checkInDate": "2023-06-15T14:00:00Z",
  "checkOutDate": "2023-06-17T12:00:00Z",
  "totalPrice": 5000000,
  "status": "confirmed",
  "notes": "Khách hàng yêu cầu thêm gối"
}
```

- **Kết quả mong đợi**: Status Code 201 với thông tin phiếu phòng đã tạo

#### Lấy danh sách phiếu phòng

- **URL**: {{baseUrl}}/room-vouchers
- **Phương thức**: GET
- **Kết quả mong đợi**: Status Code 200 với danh sách phiếu phòng

#### Cập nhật thông tin phiếu phòng

- **URL**: {{baseUrl}}/room-vouchers/:id
- **Phương thức**: PUT
- **Body** (JSON):

```json
{
  "roomId": "ID_phòng",
  "customerId": "ID_khách_hàng",
  "staffId": "ID_nhân_viên",
  "checkInDate": "2023-06-15T14:00:00Z",
  "checkOutDate": "2023-06-18T12:00:00Z",
  "totalPrice": 7500000,
  "status": "checked_in",
  "notes": "Khách hàng đã check-in"
}
```

- **Kết quả mong đợi**: Status Code 200 với thông tin phiếu phòng đã cập nhật

#### Xóa phiếu phòng

- **URL**: {{baseUrl}}/room-vouchers/:id
- **Phương thức**: DELETE
- **Kết quả mong đợi**: Status Code 200 với thông báo xóa thành công

### 7. Quản lý dịch vụ (Service)

#### Tạo dịch vụ mới

- **URL**: {{baseUrl}}/services
- **Phương thức**: POST
- **Body** (JSON):

```json
{
  "name": "Dịch vụ giặt ủi",
  "price": 150000,
  "description": "Giặt ủi trong ngày",
  "category": "laundry"
}
```

- **Kết quả mong đợi**: Status Code 201 với thông tin dịch vụ đã tạo

#### Lấy danh sách dịch vụ

- **URL**: {{baseUrl}}/services
- **Phương thức**: GET
- **Kết quả mong đợi**: Status Code 200 với danh sách dịch vụ

#### Cập nhật thông tin dịch vụ

- **URL**: {{baseUrl}}/services/:id
- **Phương thức**: PUT
- **Body** (JSON):

```json
{
  "name": "Dịch vụ giặt ủi cao cấp",
  "price": 200000,
  "description": "Giặt ủi và giao trong 6 giờ",
  "category": "laundry"
}
```

- **Kết quả mong đợi**: Status Code 200 với thông tin dịch vụ đã cập nhật

#### Xóa dịch vụ

- **URL**: {{baseUrl}}/services/:id
- **Phương thức**: DELETE
- **Kết quả mong đợi**: Status Code 200 với thông báo xóa thành công

## Luồng làm việc đề xuất

1. Đăng ký tài khoản mới
2. Đăng nhập để lấy token
3. Thêm token vào header Authorization của các request khác
4. Tạo loại phòng
5. Tạo phòng
6. Tạo nhân viên
7. Tạo khách hàng
8. Tạo phiếu phòng
9. Tạo dịch vụ

## Lưu ý khi test API

1. **Xác thực là bắt buộc** cho hầu hết các API (trừ đăng ký và đăng nhập):

   - Sau khi đăng nhập, tất cả các API khác đều yêu cầu token JWT
   - Thêm header `Authorization: Bearer {token}` vào mọi request
   - Chỉ tài khoản có role là `admin` hoặc `staff` mới có quyền truy cập các API

2. **ID tham chiếu**:

   - Thay thế các giá trị ID_xxx bằng ID thực tế được trả về từ API tạo mới
   - Ví dụ: Khi tạo phòng, bạn cần ID của loại phòng đã tạo trước đó

3. **Định dạng dữ liệu**:

   - Kiểm tra cẩn thận định dạng JSON và kiểu dữ liệu
   - Các trường như ngày tháng phải đúng định dạng ISO (YYYY-MM-DDTHH:MM:SSZ)
   - Các trường bắt buộc không được bỏ trống

4. **Xử lý lỗi xác thực**:
   - Lỗi 401: Token không hợp lệ hoặc đã hết hạn, cần đăng nhập lại
   - Lỗi 403: Không đủ quyền truy cập (role không phải admin hoặc staff)
   - Nếu gặp lỗi đăng nhập, có thể dùng API reset-password để đặt lại mật khẩu

## Xử lý sự cố thường gặp

1. **Lỗi 401 Unauthorized**: Kiểm tra lại token hoặc thông tin đăng nhập
2. **Lỗi 404 Not Found**: Kiểm tra lại URL hoặc ID tài nguyên
3. **Lỗi 400 Bad Request**: Kiểm tra định dạng dữ liệu trong body request
4. **Lỗi 500 Internal Server Error**: Kiểm tra logs server để biết chi tiết lỗi

---

© 2023 - Hotel Management System - Clean Architecture API Documentation
