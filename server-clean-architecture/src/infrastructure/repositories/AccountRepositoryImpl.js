const AccountModel = require('../../models/AccountModel');
const AccountRepository = require('../../core/repositories/AccountRepository');

class AccountRepositoryImpl extends AccountRepository {
  constructor() {
    super();
  }

  async create(accountData) {
    try {
      const account = new AccountModel(accountData);
      return await account.save();
    } catch (error) {
      throw new Error(`Không thể tạo tài khoản: ${error.message}`);
    }
  }

  async findById(accountId) {
    try {
      return await AccountModel.findById(accountId);
    } catch (error) {
      throw new Error(`Không tìm thấy tài khoản: ${error.message}`);
    }
  }

  async findByUsername(username) {
    try {
      console.log('Finding account by username:', username);
      const account = await AccountModel.findOne({ username });
      console.log('Account found:', account ? 'Yes' : 'No');
      return account;
    } catch (error) {
      console.error('Error finding account by username:', error);
      throw new Error(`Không tìm thấy tài khoản: ${error.message}`);
    }
  }

  async findByEmail(email) {
    try {
      return await AccountModel.findOne({ email });
    } catch (error) {
      throw new Error(`Không tìm thấy tài khoản theo email: ${error.message}`);
    }
  }

  async update(accountId, updateData) {
    try {
      return await AccountModel.findByIdAndUpdate(
        accountId,
        { ...updateData, updatedAt: Date.now() },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Không thể cập nhật tài khoản: ${error.message}`);
    }
  }

  async delete(accountId) {
    try {
      return await AccountModel.findByIdAndDelete(accountId);
    } catch (error) {
      throw new Error(`Không thể xóa tài khoản: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await AccountModel.find({});
    } catch (error) {
      throw new Error(`Không thể lấy danh sách tài khoản: ${error.message}`);
    }
  }
}

module.exports = AccountRepositoryImpl; 