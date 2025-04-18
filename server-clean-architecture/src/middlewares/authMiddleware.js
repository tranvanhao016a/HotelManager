const jwt = require('jsonwebtoken');
const config = require('../config');
const AccountModel = require('../models/AccountModel');

/**
 * Middleware kiểm tra xác thực JWT token
 */
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Không tìm thấy token xác thực'
      });
    }
    
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Không tìm thấy token xác thực'
      });
    }
    
    const decoded = jwt.verify(token, config.jwt.secret);
    
    // Kiểm tra xem tài khoản có tồn tại không
    const account = await AccountModel.findById(decoded.id);
    if (!account) {
      return res.status(401).json({
        success: false,
        message: 'Token không hợp lệ hoặc tài khoản không tồn tại'
      });
    }
    
    // Kiểm tra xem tài khoản có đang hoạt động không
    if (!account.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Tài khoản đã bị khóa'
      });
    }
    
    // Lưu thông tin user vào request để sử dụng ở các middleware/controller tiếp theo
    req.user = {
      id: decoded.id,
      username: decoded.username,
      role: decoded.role
    };
    
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token đã hết hạn'
      });
    }
    
    return res.status(401).json({
      success: false,
      message: 'Token không hợp lệ'
    });
  }
};

/**
 * Middleware kiểm tra quyền admin
 */
const verifyAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Bạn không có quyền truy cập chức năng này'
    });
  }
  next();
};

/**
 * Middleware kiểm tra quyền admin hoặc staff
 */
const verifyStaffOrAdmin = (req, res, next) => {
  if (req.user.role !== 'admin' && req.user.role !== 'staff') {
    return res.status(403).json({
      success: false,
      message: 'Bạn không có quyền truy cập chức năng này'
    });
  }
  next();
};

module.exports = {
  verifyToken,
  verifyAdmin,
  verifyStaffOrAdmin
}; 