const CustomerModel = require('../../models/CustomerModel');
const CustomerRepository = require('../../core/repositories/CustomerRepository');

class CustomerRepositoryImpl extends CustomerRepository {
  constructor() {
    super();
  }

  async create(customerData) {
    try {
      const customer = new CustomerModel(customerData);
      return await customer.save();
    } catch (error) {
      throw new Error(`Không thể tạo khách hàng: ${error.message}`);
    }
  }

  async findById(customerId) {
    try {
      return await CustomerModel.findById(customerId);
    } catch (error) {
      throw new Error(`Không tìm thấy khách hàng: ${error.message}`);
    }
  }

  async update(customerId, updateData) {
    try {
      return await CustomerModel.findByIdAndUpdate(
        customerId,
        { ...updateData, updatedAt: Date.now() },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Không thể cập nhật khách hàng: ${error.message}`);
    }
  }

  async delete(customerId) {
    try {
      return await CustomerModel.findByIdAndDelete(customerId);
    } catch (error) {
      throw new Error(`Không thể xóa khách hàng: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await CustomerModel.find({});
    } catch (error) {
      throw new Error(`Không thể lấy danh sách khách hàng: ${error.message}`);
    }
  }
}

module.exports = CustomerRepositoryImpl; 