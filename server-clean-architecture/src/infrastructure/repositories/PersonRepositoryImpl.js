const PersonModel = require('../../models/PersonModel');
const PersonRepository = require('../../core/repositories/PersonRepository');
const GenericRepositoryImpl = require('./GenericRepositoryImpl');

class PersonRepositoryImpl extends PersonRepository {
  constructor() {
    super();
    this.genericRepo = new GenericRepositoryImpl(PersonModel, 'Person');
  }

  async create(personData) {
    return this.genericRepo.create(personData);
  }

  async findById(id) {
    return this.genericRepo.findById(id);
  }

  async findOne(conditions) {
    return this.genericRepo.findOne(conditions);
  }

  async findAll(options = {}) {
    return this.genericRepo.findAll(options);
  }

  async update(id, updateData) {
    return this.genericRepo.update(id, updateData);
  }

  async delete(id) {
    return this.genericRepo.delete(id);
  }

  async findByEmail(email) {
    try {
      return await PersonModel.findOne({ email });
    } catch (error) {
      throw new Error(`Không tìm thấy người dùng theo email: ${error.message}`);
    }
  }

  async findByType(type, options = {}) {
    try {
      const { limit = 0, offset = 0, sort = { createdAt: -1 }, ...filters } = options;
      const conditions = { type, ...filters };
      
      // Sử dụng genericRepo.findAll để tận dụng phân trang
      return await this.genericRepo.findAll({
        conditions,
        limit,
        offset,
        sort
      });
    } catch (error) {
      throw new Error(`Không thể lấy danh sách ${type}: ${error.message}`);
    }
  }

  async findStaffByStatus(status, options = {}) {
    try {
      const { limit = 0, offset = 0, sort = { createdAt: -1 } } = options;
      const conditions = { type: 'staff', status };
      
      // Sử dụng genericRepo.findAll để tận dụng phân trang
      return await this.genericRepo.findAll({
        conditions,
        limit,
        offset,
        sort
      });
    } catch (error) {
      throw new Error(`Không thể lấy danh sách nhân viên theo trạng thái: ${error.message}`);
    }
  }

  async updateStatus(id, status) {
    try {
      return await PersonModel.findByIdAndUpdate(
        id,
        { status, updatedAt: Date.now() },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Không thể cập nhật trạng thái: ${error.message}`);
    }
  }
}

module.exports = PersonRepositoryImpl; 