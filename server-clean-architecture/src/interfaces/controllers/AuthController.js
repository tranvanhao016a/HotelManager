const AccountRepositoryImpl = require('../../infrastructure/repositories/AccountRepositoryImpl');
const PersonRepositoryImpl = require('../../infrastructure/repositories/PersonRepositoryImpl');
const RegisterUseCase = require('../../core/usecases/auth/RegisterUseCase');
const LoginUseCase = require('../../core/usecases/auth/LoginUseCase');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config');

class AuthController {
  constructor() {
    this.accountRepository = new AccountRepositoryImpl();
    this.personRepository = new PersonRepositoryImpl();
    
    this.registerUseCase = new RegisterUseCase(this.accountRepository, this.personRepository);
    this.loginUseCase = new LoginUseCase(this.accountRepository, this.personRepository);
  }

  async register(req, res) {
    try {
      const userData = req.body;
      console.log('Register attempt with data:', userData);
      
      try {
        const result = await this.registerUseCase.execute(userData);
        
        res.status(201).json({
          success: true,
          data: result
        });
      } catch (error) {
        console.error('Register use case error:', error);
        res.status(400).json({
          success: false,
          message: error.message || 'Lỗi đăng ký tài khoản'
        });
      }
    } catch (error) {
      console.error('Register controller error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi hệ thống, vui lòng thử lại sau'
      });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      console.log('Login attempt for user:', username);
      
      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: 'Tên đăng nhập và mật khẩu là bắt buộc'
        });
      }
      
      try {
        // Sử dụng LoginUseCase đã cập nhật
        const result = await this.loginUseCase.execute(username, password);
        
        res.json({
          success: true,
          data: result
        });
      } catch (error) {
        console.error('Login error:', error);
        res.status(401).json({
          success: false,
          message: error.message || 'Đăng nhập thất bại'
        });
      }
    } catch (error) {
      console.error('Login controller error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi hệ thống, vui lòng thử lại sau'
      });
    }
  }

  async resetPassword(req, res) {
    try {
      const { username, newPassword } = req.body;
      
      if (!username || !newPassword) {
        return res.status(400).json({
          success: false,
          message: 'Tên đăng nhập và mật khẩu mới là bắt buộc'
        });
      }
      
      // Tìm tài khoản
      const account = await this.accountRepository.findByUsername(username);
      if (!account) {
        return res.status(404).json({
          success: false,
          message: 'Tài khoản không tồn tại'
        });
      }
      
      // Mã hóa mật khẩu mới
      const salt = await bcrypt.genSalt(config.bcrypt.saltRounds);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      
      // Cập nhật mật khẩu
      await this.accountRepository.update(account._id, { password: hashedPassword });
      
      res.json({
        success: true,
        message: 'Đặt lại mật khẩu thành công'
      });
    } catch (error) {
      console.error('Reset password error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi hệ thống, vui lòng thử lại sau'
      });
    }
  }

  async updateRole(req, res) {
    try {
      const { username, role } = req.body;
      
      if (!username || !role) {
        return res.status(400).json({
          success: false,
          message: 'Tên đăng nhập và quyền mới là bắt buộc'
        });
      }
      
      if (!['admin', 'staff'].includes(role)) {
        return res.status(400).json({
          success: false,
          message: 'Quyền không hợp lệ'
        });
      }
      
      // Tìm tài khoản
      const account = await this.accountRepository.findByUsername(username);
      if (!account) {
        return res.status(404).json({
          success: false,
          message: 'Tài khoản không tồn tại'
        });
      }
      
      // Cập nhật quyền
      await this.accountRepository.update(account._id, { role: role });
      
      // Cập nhật person
      const person = await this.personRepository.findOne({ accountId: account._id });
      if (person) {
        await this.personRepository.update(person._id, { type: role });
      }
      
      res.json({
        success: true,
        message: 'Cập nhật quyền thành công'
      });
    } catch (error) {
      console.error('Update role error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi hệ thống, vui lòng thử lại sau'
      });
    }
  }
}

module.exports = AuthController; 