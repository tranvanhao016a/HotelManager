# Hotel Manager API

API quản lý khách sạn được xây dựng theo kiến trúc Clean Architecture.

## Cấu trúc thư mục

```
src/
├── config/             # Cấu hình ứng dụng
├── core/               # Logic nghiệp vụ cốt lõi
│   ├── entities/       # Các thực thể trong hệ thống
│   ├── repositories/   # Interface cho các repository
│   └── usecases/       # Các use case của ứng dụng
├── infrastructure/     # Triển khai infrastructure
│   └── repositories/   # Triển khai cụ thể các repository
├── interfaces/         # Interface của ứng dụng
│   ├── controllers/    # Các controller
│   └── routes/         # Các route
├── models/             # Các model MongoDB
├── app.js              # Cấu hình Express
└── server.js           # Entry point
```

## Cài đặt

1. Clone repository

```
git clone <repository-url>
```

2. Cài đặt các dependencies

```
npm install
```

3. Cấu hình môi trường

```
cp .env.example .env
```

Chỉnh sửa file `.env` theo cấu hình của bạn.

## Chạy ứng dụng

### Phát triển

```
npm run dev
```

### Production

```
npm start
```

## API Endpoints

### Staff

- `POST /api/staff` - Tạo nhân viên mới
- `GET /api/staff` - Lấy danh sách nhân viên
- `PUT /api/staff/:id` - Cập nhật thông tin nhân viên
- `DELETE /api/staff/:id` - Xóa nhân viên

### Room

- `POST /api/rooms` - Tạo phòng mới
- `GET /api/rooms` - Lấy danh sách phòng
- `PUT /api/rooms/:id` - Cập nhật thông tin phòng
- `DELETE /api/rooms/:id` - Xóa phòng

### Service

- `POST /api/services` - Tạo dịch vụ mới
- `GET /api/services` - Lấy danh sách dịch vụ
- `PUT /api/services/:id` - Cập nhật thông tin dịch vụ
- `DELETE /api/services/:id` - Xóa dịch vụ

### Customer

- `POST /api/customers` - Tạo khách hàng mới
- `GET /api/customers` - Lấy danh sách khách hàng
- `PUT /api/customers/:id` - Cập nhật thông tin khách hàng
- `DELETE /api/customers/:id` - Xóa khách hàng

### Kind Room

- `POST /api/kind-rooms` - Tạo loại phòng mới
- `GET /api/kind-rooms` - Lấy danh sách loại phòng
- `PUT /api/kind-rooms/:id` - Cập nhật thông tin loại phòng
- `DELETE /api/kind-rooms/:id` - Xóa loại phòng

### Room Voucher

- `POST /api/room-vouchers` - Tạo phiếu phòng mới
- `GET /api/room-vouchers` - Lấy danh sách phiếu phòng
- `PUT /api/room-vouchers/:id` - Cập nhật thông tin phiếu phòng
- `DELETE /api/room-vouchers/:id` - Xóa phiếu phòng

## Clean Architecture Principles

This project follows Clean Architecture principles:

1. **Independent of Frameworks**
2. **Testable**
3. **Independent of UI**
4. **Independent of Database**
5. **Independent of any external agency**

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
