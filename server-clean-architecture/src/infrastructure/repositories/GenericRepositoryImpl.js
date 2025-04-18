const GenericRepository = require('../../core/repositories/GenericRepository');

class GenericRepositoryImpl extends GenericRepository {
  constructor(model, modelName) {
    super();
    this.model = model;
    this.modelName = modelName;
  }

  async create(data) {
    try {
      const instance = new this.model(data);
      return await instance.save();
    } catch (error) {
      throw new Error(`Không thể tạo ${this.modelName}: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      return await this.model.findById(id);
    } catch (error) {
      throw new Error(`Không tìm thấy ${this.modelName}: ${error.message}`);
    }
  }

  async findOne(conditions) {
    try {
      return await this.model.findOne(conditions);
    } catch (error) {
      throw new Error(`Không tìm thấy ${this.modelName}: ${error.message}`);
    }
  }

  async findAll(options = {}) {
    try {
      const { conditions = {}, limit = 0, offset = 0, sort = { createdAt: -1 } } = options;
      
      // Đếm tổng số bản ghi
      const total = await this.model.countDocuments(conditions);
      
      // Thực hiện truy vấn với phân trang
      const data = await this.model.find(conditions)
        .sort(sort)
        .skip(Number(offset))
        .limit(Number(limit) || null);
      
      return {
        data,
        pagination: {
          total,
          offset: Number(offset),
          limit: Number(limit) || total,
          hasMore: Number(offset) + data.length < total
        }
      };
    } catch (error) {
      throw new Error(`Không thể lấy danh sách ${this.modelName}: ${error.message}`);
    }
  }

  async update(id, updateData) {
    try {
      return await this.model.findByIdAndUpdate(
        id,
        { ...updateData, updatedAt: Date.now() },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Không thể cập nhật ${this.modelName}: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Không thể xóa ${this.modelName}: ${error.message}`);
    }
  }
}

module.exports = GenericRepositoryImpl; 