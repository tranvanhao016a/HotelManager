const ServiceModel = require('../../models/ServiceModel');
const ServiceRepository = require('../../core/repositories/ServiceRepository');

class ServiceRepositoryImpl extends ServiceRepository {
  constructor() {
    super();
  }

  async create(serviceData) {
    try {
      const service = new ServiceModel(serviceData);
      return await service.save();
    } catch (error) {
      throw new Error(`Không thể tạo dịch vụ: ${error.message}`);
    }
  }

  async findById(serviceId) {
    try {
      return await ServiceModel.findById(serviceId);
    } catch (error) {
      throw new Error(`Không tìm thấy dịch vụ: ${error.message}`);
    }
  }

  async update(serviceId, updateData) {
    try {
      return await ServiceModel.findByIdAndUpdate(
        serviceId,
        { ...updateData, updatedAt: Date.now() },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Không thể cập nhật dịch vụ: ${error.message}`);
    }
  }

  async delete(serviceId) {
    try {
      return await ServiceModel.findByIdAndDelete(serviceId);
    } catch (error) {
      throw new Error(`Không thể xóa dịch vụ: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await ServiceModel.find({});
    } catch (error) {
      throw new Error(`Không thể lấy danh sách dịch vụ: ${error.message}`);
    }
  }

  async findByCategory(category) {
    try {
      return await ServiceModel.find({ category });
    } catch (error) {
      throw new Error(`Không thể lấy dịch vụ theo danh mục: ${error.message}`);
    }
  }
}

module.exports = ServiceRepositoryImpl; 