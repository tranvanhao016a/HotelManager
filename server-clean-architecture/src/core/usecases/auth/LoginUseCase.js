const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../../config');

class LoginUseCase {
  constructor(accountRepository, personRepository) {
    this.accountRepository = accountRepository;
    this.personRepository = personRepository;
  }

  async execute(username, password) {
    try {
      // Tìm tài khoản theo username
      const account = await this.accountRepository.findByUsername(username);
      if (!account) {
        throw new Error('Tên đăng nhập không tồn tại');
      }

      // Kiểm tra tài khoản có đang hoạt động không
      if (!account.isActive) {
        throw new Error('Tài khoản đã bị khóa');
      }

      // Kiểm tra password bằng phương thức comparePassword của model
      const isPasswordValid = await account.comparePassword(password);
      console.log('Password validation result:', isPasswordValid);
      
      if (!isPasswordValid) {
        throw new Error('Mật khẩu không chính xác');
      }

      // Tìm thông tin người dùng dựa vào accountId và không giới hạn loại
      const person = await this.personRepository.findOne({ accountId: account._id });
      console.log('Person information:', person);

      // Tạo JWT token
      const token = jwt.sign(
        { 
          id: account._id,
          username: account.username,
          role: account.role 
        },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
      );

      // Trả về thông tin và token
      return {
        token,
        account: {
          id: account._id,
          username: account.username,
          email: account.email,
          role: account.role
        },
        person: person
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
}

module.exports = LoginUseCase; 