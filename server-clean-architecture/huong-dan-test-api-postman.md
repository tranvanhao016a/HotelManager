# Hướng dẫn test API bằng Postman cho Hotel Manager

Tài liệu này cung cấp hướng dẫn chi tiết để test các API của ứng dụng Hotel Manager bằng Postman. Các API đã được cập nhật để hỗ trợ phân trang với các tham số `limit` và `offset`.

## Mục lục

- [Mối quan hệ giữa các thực thể](#entity-relationships)
- [Luồng xử lý nghiệp vụ chính](#business-flows)
- [Authentication](#authentication)
- [Person (Staff và Admin)](#person)
- [Customer](#customer)
- [Room](#room)
- [Kind Room](#kind-room)
- [Service](#service)
- [Room Voucher](#room-voucher)

## Cấu hình chung

### Base URL

```
http://localhost:3000/api
```

### Authentication

Sau khi đăng nhập, sử dụng token nhận được để xác thực các request bằng cách thêm header:

```
Authorization: Bearer YOUR_TOKEN_HERE
```

<a name="entity-relationships"></a>

## Mối quan hệ giữa các thực thể

### Sơ đồ quan hệ

1. **Account - Person**

   - Một Account có một Person (one-to-one)
   - Person.accountId tham chiếu đến Account.\_id
   - Person.type có thể là "staff" hoặc "admin"

2. **Room - KindRoom**

   - Một KindRoom có nhiều Room (one-to-many)
   - Room.kindRoomId tham chiếu đến KindRoom.\_id

3. **RoomVoucher - Room**

   - Một Room có nhiều RoomVoucher (one-to-many)
   - RoomVoucher.roomId tham chiếu đến Room.\_id

4. **RoomVoucher - Customer**

   - Một Customer có nhiều RoomVoucher (one-to-many)
   - RoomVoucher.customerId tham chiếu đến Customer.\_id

5. **RoomVoucher - Service**
   - Một RoomVoucher có nhiều Service (many-to-many)
   - RoomVoucher.services là mảng các { serviceId, quantity }

### Mô hình dữ liệu

```
Account {
  _id, username, password, role, email, isActive
}

Person {
  _id, accountId, name, email, phone, address, gender, birthDate, type,
  position*, salary*, status*, hireDate*  (* áp dụng khi type="staff")
}

Customer {
  _id, name, email, phone, address, idCard, gender, birthDate
}

KindRoom {
  _id, name, description, capacity, amenities[], priceRange{min, max}
}

Room {
  _id, roomNumber, floor, status, kindRoomId, description, price
}

Service {
  _id, name, description, price, category, available
}

RoomVoucher {
  _id, roomId, customerId, checkInDate, checkOutDate,
  status, totalPrice, services[], paymentStatus, notes
}
```

<a name="business-flows"></a>

## Luồng xử lý nghiệp vụ chính

### 1. Đăng ký và xác thực người dùng

1. Tạo tài khoản mới với `/auth/register`
2. Đăng nhập để lấy token với `/auth/login`
3. Sử dụng token cho các API yêu cầu xác thực

### 2. Quản lý nhân viên

1. Tạo tài khoản nhân viên (vai trò staff) với `/auth/register`
2. Quản lý thông tin nhân viên với API `/persons`
3. Cập nhật trạng thái nhân viên (nghỉ phép, không hoạt động) với `/persons/:id/status`

### 3. Quản lý phòng và loại phòng

1. Tạo các loại phòng với `/kind-rooms`
2. Tạo các phòng thuộc loại phòng đã tạo với `/rooms`
3. Cập nhật trạng thái phòng (available, occupied, maintenance) với `/rooms/:id`

### 4. Quy trình đặt phòng

1. Tạo và quản lý thông tin khách hàng với `/customers`
2. Kiểm tra phòng trống với `/rooms?status=available`
3. Tạo voucher phòng mới với `/room-vouchers`
4. Cập nhật trạng thái phòng thành "occupied" với `/rooms/:id`
5. Khi khách check-out, cập nhật trạng thái voucher và phòng tương ứng

### 5. Quản lý dịch vụ

1. Tạo và quản lý các dịch vụ với `/services`
2. Đính kèm dịch vụ với voucher phòng khi tạo hoặc cập nhật voucher

<a name="authentication"></a>

## Authentication API

### Đăng ký tài khoản

**POST** `/auth/register`

**Body (JSON)**:

```json
{
  "username": "nhanvien1",
  "password": "password123",
  "email": "nhanvien1@example.com",
  "name": "Nguyễn Văn A",
  "phone": "0901234567",
  "address": "123 Đường ABC, TP. HCM",
  "gender": "male",
  "birthDate": "1990-01-01",
  "role": "staff",
  "position": "Lễ tân",
  "salary": 10000000
}
```

**Luồng xử lý**:

1. Kiểm tra email và username đã tồn tại chưa
2. Mã hóa mật khẩu
3. Tạo mới account
4. Tạo mới person profile liên kết với account
5. Trả về thông tin đã tạo

**Đăng ký tài khoản admin**:

```json
{
  "username": "admin1",
  "password": "admin123",
  "email": "admin1@example.com",
  "name": "Trần Văn B",
  "phone": "0909876543",
  "address": "456 Đường XYZ, Hà Nội",
  "gender": "male",
  "birthDate": "1985-05-15",
  "role": "admin"
}
```

### Đăng nhập

**POST** `/auth/login`

**Body (JSON)**:

```json
{
  "username": "nhanvien1",
  "password": "password123"
}
```

**Luồng xử lý**:

1. Tìm account theo username
2. Kiểm tra mật khẩu
3. Tìm thông tin person tương ứng
4. Tạo JWT token
5. Trả về token và thông tin người dùng

### Reset mật khẩu

**POST** `/auth/reset-password`

**Body (JSON)**:

```json
{
  "username": "nhanvien1",
  "newPassword": "newpassword123"
}
```

**Luồng xử lý**:

1. Tìm account theo username
2. Mã hóa mật khẩu mới
3. Cập nhật mật khẩu mới
4. Trả về thông báo thành công

### Cập nhật quyền người dùng

**PUT** `/auth/update-role`

**Body (JSON)**:

```json
{
  "username": "nhanvien1",
  "role": "admin"
}
```

**Luồng xử lý**:

1. Tìm account theo username
2. Cập nhật quyền trong account
3. Cập nhật type trong person tương ứng
4. Trả về thông báo thành công

<a name="person"></a>

## Person API (Staff và Admin)

### Lấy danh sách nhân viên (phân trang)

**GET** `/persons/type/staffs?limit=10&offset=0`

**Tham số**:

- `limit`: Số lượng bản ghi mỗi trang (mặc định: tất cả)
- `offset`: Vị trí bắt đầu lấy dữ liệu (mặc định: 0)
- `status`: Lọc theo trạng thái (`active`, `inactive`, `on_leave`)

**Luồng xử lý**:

1. Kiểm tra xác thực người dùng
2. Lấy danh sách nhân viên theo type="staff"
3. Áp dụng phân trang và bộ lọc
4. Trả về danh sách với thông tin phân trang

**Ví dụ**:

```
/persons/type/staffs?limit=5&offset=0&status=active
```

### Lấy thông tin nhân viên theo ID

**GET** `/persons/:id`

**Luồng xử lý**:

1. Kiểm tra xác thực người dùng
2. Tìm person theo ID
3. Trả về thông tin chi tiết

**Ví dụ**:

```
/persons/60d5ec9af682f32b4c9a2aa1
```

### Cập nhật thông tin nhân viên

**PUT** `/persons/:id`

**Body (JSON)**:

```json
{
  "name": "Nguyễn Văn A (đã cập nhật)",
  "phone": "0901234567",
  "address": "Địa chỉ mới",
  "gender": "male"
}
```

**Luồng xử lý**:

1. Kiểm tra xác thực người dùng
2. Xác thực dữ liệu đầu vào
3. Cập nhật thông tin person
4. Trả về thông tin đã cập nhật

### Cập nhật trạng thái nhân viên

**PATCH** `/persons/:id/status`

**Body (JSON)**:

```json
{
  "status": "on_leave"
}
```

**Luồng xử lý**:

1. Kiểm tra xác thực người dùng
2. Kiểm tra trạng thái hợp lệ
3. Cập nhật trạng thái
4. Trả về thông tin người dùng đã cập nhật

### Xóa nhân viên

**DELETE** `/persons/:id`

**Luồng xử lý**:

1. Kiểm tra xác thực người dùng và quyền admin
2. Tìm và xóa person
3. Xóa account liên kết
4. Trả về thông báo thành công

<a name="customer"></a>

## Customer API

### Tạo khách hàng mới

**POST** `/customers`

**Body (JSON)**:

```json
{
  "name": "Lê Thị C",
  "email": "customer1@example.com",
  "phone": "0912345678",
  "address": "789 Đường DEF, TP. HCM",
  "idCard": "012345678901",
  "gender": "female",
  "birthDate": "1995-05-15"
}
```

**Luồng xử lý**:

1. Kiểm tra xác thực người dùng
2. Xác thực dữ liệu đầu vào
3. Kiểm tra email hoặc số CMND/CCCD đã tồn tại chưa
4. Tạo khách hàng mới
5. Trả về thông tin đã tạo

### Lấy danh sách khách hàng (phân trang)

**GET** `/customers?limit=10&offset=0`

**Tham số**:

- `limit`: Số lượng bản ghi mỗi trang (mặc định: tất cả)
- `offset`: Vị trí bắt đầu lấy dữ liệu (mặc định: 0)
- `name`: Lọc theo tên (tùy chọn)
- `email`: Lọc theo email (tùy chọn)
- `phone`: Lọc theo số điện thoại (tùy chọn)

**Luồng xử lý**:

1. Kiểm tra xác thực người dùng
2. Lấy danh sách khách hàng với bộ lọc
3. Áp dụng phân trang
4. Trả về kết quả với thông tin phân trang

**Ví dụ**:

```
/customers?limit=5&offset=0&name=Lê
```

### Lấy thông tin khách hàng theo ID

**GET** `/customers/:id`

**Luồng xử lý**:

1. Kiểm tra xác thực người dùng
2. Tìm khách hàng theo ID
3. Trả về thông tin chi tiết

### Cập nhật thông tin khách hàng

**PUT** `/customers/:id`

**Body (JSON)**:

```json
{
  "name": "Lê Thị C (đã cập nhật)",
  "phone": "0912345678",
  "address": "Địa chỉ mới"
}
```

**Luồng xử lý**:

1. Kiểm tra xác thực người dùng
2. Xác thực dữ liệu đầu vào
3. Cập nhật thông tin khách hàng
4. Trả về thông tin đã cập nhật

### Xóa khách hàng

**DELETE** `/customers/:id`

**Luồng xử lý**:

1. Kiểm tra xác thực người dùng
2. Kiểm tra xem khách hàng có liên kết với đơn đặt phòng nào không
3. Xóa khách hàng
4. Trả về thông báo thành công

<a name="room"></a>

## Room API

### Tạo phòng mới

**POST** `/rooms`

**Body (JSON)**:

```json
{
  "roomNumber": "101",
  "floor": 1,
  "status": "available",
  "kindRoomId": "60d5ec9af682f32b4c9a2aa2",
  "description": "Phòng đơn tiêu chuẩn",
  "price": 500000
}
```

**Luồng xử lý**:

1. Kiểm tra xác thực người dùng
2. Xác thực dữ liệu đầu vào
3. Kiểm tra loại phòng (kindRoomId) tồn tại
4. Kiểm tra trùng số phòng
5. Tạo phòng mới
6. Trả về thông tin đã tạo

### Lấy danh sách phòng (phân trang)

**GET** `/rooms?limit=10&offset=0`

**Tham số**:

- `limit`: Số lượng bản ghi mỗi trang (mặc định: tất cả)
- `offset`: Vị trí bắt đầu lấy dữ liệu (mặc định: 0)
- `status`: Lọc theo trạng thái phòng (`available`, `occupied`, `maintenance`)
- `floor`: Lọc theo tầng

**Luồng xử lý**:

1. Kiểm tra xác thực người dùng
2. Lấy danh sách phòng với bộ lọc
3. Áp dụng phân trang
4. Trả về kết quả với thông tin phân trang

**Ví dụ**:

```
/rooms?limit=5&offset=0&status=available&floor=1
```

### Lấy thông tin phòng theo ID

**GET** `/rooms/:id`

**Luồng xử lý**:

1. Kiểm tra xác thực người dùng
2. Tìm phòng theo ID
3. Trả về thông tin chi tiết

### Cập nhật thông tin phòng

**PUT** `/rooms/:id`

**Body (JSON)**:

```json
{
  "status": "maintenance",
  "description": "Phòng đang sửa chữa",
  "price": 550000
}
```

**Luồng xử lý**:

1. Kiểm tra xác thực người dùng
2. Xác thực dữ liệu đầu vào
3. Cập nhật thông tin phòng
4. Trả về thông tin đã cập nhật

### Xóa phòng

**DELETE** `/rooms/:id`

**Luồng xử lý**:

1. Kiểm tra xác thực người dùng
2. Kiểm tra xem phòng có liên kết với đơn đặt phòng nào không
3. Xóa phòng
4. Trả về thông báo thành công

<a name="kind-room"></a>

## Kind Room API

### Tạo loại phòng mới

**POST** `/kind-rooms`

**Body (JSON)**:

```json
{
  "name": "Phòng đơn",
  "description": "Phòng có 1 giường đơn",
  "capacity": 1,
  "amenities": ["TV", "Điều hòa", "Tủ lạnh"],
  "priceRange": {
    "min": 500000,
    "max": 700000
  }
}
```

**Luồng xử lý**:

1. Kiểm tra xác thực người dùng
2. Xác thực dữ liệu đầu vào
3. Kiểm tra trùng tên loại phòng
4. Tạo loại phòng mới
5. Trả về thông tin đã tạo

### Lấy danh sách loại phòng (phân trang)

**GET** `/kind-rooms?limit=10&offset=0`

**Tham số**:

- `limit`: Số lượng bản ghi mỗi trang (mặc định: tất cả)
- `offset`: Vị trí bắt đầu lấy dữ liệu (mặc định: 0)
- `name`: Lọc theo tên (tùy chọn)
- `capacity`: Lọc theo số lượng người (tùy chọn)

**Luồng xử lý**:

1. Kiểm tra xác thực người dùng
2. Lấy danh sách loại phòng với bộ lọc
3. Áp dụng phân trang
4. Trả về kết quả với thông tin phân trang

**Ví dụ**:

```
/kind-rooms?limit=5&offset=0&capacity=2
```

### Lấy thông tin loại phòng theo ID

**GET** `/kind-rooms/:id`

**Luồng xử lý**:

1. Kiểm tra xác thực người dùng
2. Tìm loại phòng theo ID
3. Trả về thông tin chi tiết

### Cập nhật thông tin loại phòng

**PUT** `/kind-rooms/:id`

**Body (JSON)**:

```json
{
  "name": "Phòng đơn cao cấp",
  "amenities": ["TV", "Điều hòa", "Tủ lạnh", "Minibar"],
  "priceRange": {
    "min": 600000,
    "max": 800000
  }
}
```

**Luồng xử lý**:

1. Kiểm tra xác thực người dùng
2. Xác thực dữ liệu đầu vào
3. Cập nhật thông tin loại phòng
4. Trả về thông tin đã cập nhật

### Xóa loại phòng

**DELETE** `/kind-rooms/:id`

**Luồng xử lý**:

1. Kiểm tra xác thực người dùng
2. Kiểm tra xem loại phòng có liên kết với phòng nào không
3. Xóa loại phòng
4. Trả về thông báo thành công

<a name="service"></a>

## Service API

### Tạo dịch vụ mới

**POST** `/services`

**Body (JSON)**:

```json
{
  "name": "Dịch vụ spa",
  "description": "Dịch vụ massage và chăm sóc da",
  "price": 300000,
  "category": "spa",
  "available": true
}
```

**Luồng xử lý**:

1. Kiểm tra xác thực người dùng
2. Xác thực dữ liệu đầu vào
3. Tạo dịch vụ mới
4. Trả về thông tin đã tạo

### Lấy danh sách dịch vụ (phân trang)

**GET** `/services?limit=10&offset=0`

**Tham số**:

- `limit`: Số lượng bản ghi mỗi trang (mặc định: tất cả)
- `offset`: Vị trí bắt đầu lấy dữ liệu (mặc định: 0)
- `category`: Lọc theo danh mục
- `available`: Lọc theo trạng thái (true/false)

**Luồng xử lý**:

1. Kiểm tra xác thực người dùng
2. Lấy danh sách dịch vụ với bộ lọc
3. Áp dụng phân trang
4. Trả về kết quả với thông tin phân trang

**Ví dụ**:

```
/services?limit=5&offset=0&category=spa&available=true
```

### Lấy thông tin dịch vụ theo ID

**GET** `/services/:id`

**Luồng xử lý**:

1. Kiểm tra xác thực người dùng
2. Tìm dịch vụ theo ID
3. Trả về thông tin chi tiết

### Cập nhật thông tin dịch vụ

**PUT** `/services/:id`

**Body (JSON)**:

```json
{
  "price": 350000,
  "description": "Dịch vụ massage cao cấp và chăm sóc da",
  "available": true
}
```

**Luồng xử lý**:

1. Kiểm tra xác thực người dùng
2. Xác thực dữ liệu đầu vào
3. Cập nhật thông tin dịch vụ
4. Trả về thông tin đã cập nhật

### Xóa dịch vụ

**DELETE** `/services/:id`

**Luồng xử lý**:

1. Kiểm tra xác thực người dùng
2. Kiểm tra xem dịch vụ có liên kết với đơn đặt phòng nào không
3. Xóa dịch vụ
4. Trả về thông báo thành công

<a name="room-voucher"></a>

## Room Voucher API

### Tạo voucher phòng mới

**POST** `/room-vouchers`

**Body (JSON)**:

```json
{
  "roomId": "60d5ec9af682f32b4c9a2aa3",
  "customerId": "60d5ec9af682f32b4c9a2aa4",
  "checkInDate": "2023-12-01T14:00:00Z",
  "checkOutDate": "2023-12-03T12:00:00Z",
  "status": "booked",
  "totalPrice": 1000000,
  "services": [
    {
      "serviceId": "60d5ec9af682f32b4c9a2aa5",
      "quantity": 2
    }
  ],
  "paymentStatus": "pending",
  "notes": "Khách yêu cầu phòng yên tĩnh"
}
```

**Luồng xử lý**:

1. Kiểm tra xác thực người dùng
2. Xác thực dữ liệu đầu vào
3. Kiểm tra phòng và khách hàng tồn tại
4. Kiểm tra phòng có sẵn trong khoảng thời gian đặt
5. Kiểm tra dịch vụ tồn tại và tính giá
6. Tạo voucher phòng mới
7. Cập nhật trạng thái phòng nếu cần
8. Trả về thông tin đã tạo

### Lấy danh sách voucher phòng (phân trang)

**GET** `/room-vouchers?limit=10&offset=0`

**Tham số**:

- `limit`: Số lượng bản ghi mỗi trang (mặc định: tất cả)
- `offset`: Vị trí bắt đầu lấy dữ liệu (mặc định: 0)
- `status`: Lọc theo trạng thái (`booked`, `checked_in`, `checked_out`, `cancelled`)
- `customerId`: Lọc theo khách hàng
- `roomId`: Lọc theo phòng
- `startDate`: Lọc theo ngày bắt đầu (YYYY-MM-DD)
- `endDate`: Lọc theo ngày kết thúc (YYYY-MM-DD)

**Luồng xử lý**:

1. Kiểm tra xác thực người dùng
2. Lấy danh sách voucher phòng với bộ lọc
3. Áp dụng phân trang
4. Trả về kết quả với thông tin phân trang

**Ví dụ**:

```
/room-vouchers?limit=5&offset=0&status=booked&startDate=2023-12-01&endDate=2023-12-31
```

### Lấy thông tin voucher phòng theo ID

**GET** `/room-vouchers/:id`

**Luồng xử lý**:

1. Kiểm tra xác thực người dùng
2. Tìm voucher phòng theo ID
3. Trả về thông tin chi tiết kèm thông tin phòng và khách hàng

### Cập nhật thông tin voucher phòng

**PUT** `/room-vouchers/:id`

**Body (JSON)**:

```json
{
  "status": "checked_in",
  "notes": "Khách đã check-in lúc 15:00",
  "paymentStatus": "paid"
}
```

**Luồng xử lý**:

1. Kiểm tra xác thực người dùng
2. Xác thực dữ liệu đầu vào
3. Kiểm tra nếu thay đổi trạng thái thì cập nhật trạng thái phòng
4. Cập nhật thông tin voucher phòng
5. Trả về thông tin đã cập nhật

### Xóa voucher phòng

**DELETE** `/room-vouchers/:id`

**Luồng xử lý**:

1. Kiểm tra xác thực người dùng
2. Tìm và xóa voucher phòng
3. Cập nhật trạng thái phòng nếu cần
4. Trả về thông báo thành công

## Mẫu phản hồi API

Tất cả các API GET hỗ trợ phân trang sẽ trả về phản hồi có cấu trúc:

```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "total": 25,
    "offset": 0,
    "limit": 10,
    "hasMore": true
  }
}
```

Các API lấy theo ID hoặc API tạo/cập nhật/xóa trả về cấu trúc:

```json
{
  "success": true,
  "data": {}
}
```

hoặc

```json
{
  "success": true,
  "message": "Thông báo thành công"
}
```

Trường hợp lỗi:

```json
{
  "success": false,
  "message": "Thông báo lỗi"
}
```
