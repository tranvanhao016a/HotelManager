const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config');
const database = require('./config/database');

// Import các routes
const personRoutes = require('./interfaces/routes/personRoutes');
const roomRoutes = require('./interfaces/routes/roomRoutes');
const serviceRoutes = require('./interfaces/routes/serviceRoutes');
const customerRoutes = require('./interfaces/routes/customerRoutes');
const kindRoomRoutes = require('./interfaces/routes/kindRoomRoutes');
const roomVoucherRoutes = require('./interfaces/routes/roomVoucherRoutes');
const authRoutes = require('./interfaces/routes/authRoutes');

// Các routes cần xác thực
const { verifyToken, verifyStaffOrAdmin } = require('./middlewares/authMiddleware');

const app = express();

// Middleware
app.use(cors({
  origin: config.cors.origin
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
if (config.app.environment !== 'production') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/auth', authRoutes);

// Áp dụng middleware xác thực cho các routes cần bảo vệ
app.use('/api/persons',verifyToken, verifyStaffOrAdmin, personRoutes);
app.use('/api/rooms', verifyToken, verifyStaffOrAdmin, roomRoutes);
app.use('/api/services', verifyToken, verifyStaffOrAdmin, serviceRoutes);
app.use('/api/customers', verifyToken, verifyStaffOrAdmin, customerRoutes);
app.use('/api/kind-rooms', verifyToken, verifyStaffOrAdmin, kindRoomRoutes);
app.use('/api/room-vouchers', verifyToken, verifyStaffOrAdmin, roomVoucherRoutes);

// Xử lý lỗi 404
app.use((req, res, next) => {
  const error = new Error('Không tìm thấy');
  error.status = 404;
  next(error);
});

// Xử lý lỗi chung
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    success: false,
    message: error.message
  });
});

// Kết nối cơ sở dữ liệu
database.connect();

module.exports = app; 