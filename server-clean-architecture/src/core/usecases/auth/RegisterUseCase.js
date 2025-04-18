const bcrypt = require('bcrypt');
const config = require('../../../config');

class RegisterUseCase {
  constructor(accountRepository, personRepository) {
    this.accountRepository = accountRepository;
    this.personRepository = personRepository;
  }

  async execute(userData) {
    // Kiểm tra xem email đã tồn tại chưa
    const existingEmail = await this.accountRepository.findByEmail(userData.email);
    if (existingEmail) {
      throw new Error('Email đã được sử dụng');
    }

    // Kiểm tra xem username đã tồn tại chưa
    const existingUsername = await this.accountRepository.findByUsername(userData.username);
    if (existingUsername) {
      throw new Error('Tên đăng nhập đã được sử dụng');
    }

    // Xác định role (mặc định là 'staff' nếu không có)
    const role = userData.role || 'staff';

    // Tạo mới account - KHÔNG băm mật khẩu ở đây, model sẽ tự động băm
    const accountData = {
      username: userData.username,
      password: userData.password, // Dùng mật khẩu gốc, model sẽ tự băm
      email: userData.email,
      role: role,
      isActive: true
    };

    const newAccount = await this.accountRepository.create(accountData);

    // Tạo mới person profile với type tương ứng với role
    const personData = {
      accountId: newAccount._id,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
      gender: userData.gender,
      birthDate: userData.birthDate,
      type: role, // Đảm bảo type trong Person giống với role trong Account
      // Thêm thông tin cho staff nếu cần
      ...(role === 'staff' && {
        position: userData.position,
        salary: userData.salary,
        status: 'active',
        hireDate: new Date()
      })
    };

    const newPerson = await this.personRepository.create(personData);

    // Trả về thông tin người dùng (không bao gồm password)
    return {
      account: {
        id: newAccount._id,
        username: newAccount.username,
        email: newAccount.email,
        role: newAccount.role,
        isActive: newAccount.isActive
      },
      person: newPerson
    };
  }
}

module.exports = RegisterUseCase; 