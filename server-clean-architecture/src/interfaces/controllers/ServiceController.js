const ServiceRepositoryImpl = require('../../infrastructure/repositories/ServiceRepositoryImpl');

class ServiceController {
  constructor() {
    this.serviceRepository = new ServiceRepositoryImpl();
  }

  async createService(req, res) {
    try {
      const serviceData = req.body;
      const service = await this.serviceRepository.create(serviceData);
      res.status(201).json({
        success: true,
        data: service
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async getServices(req, res) {
    try {
      const { category, limit, offset, ...filters } = req.query;
      
      // Tạo đối tượng options cho phân trang
      const options = {
        limit,
        offset,
        conditions: { ...filters }
      };
      
      // Thêm điều kiện lọc nếu có
      if (category) {
        options.conditions.category = category;
      }
      
      const result = await this.serviceRepository.findAll(options);
      
      res.json({
        success: true,
        data: result.data,
        pagination: result.pagination
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async updateService(req, res) {
    try {
      const serviceId = req.params.id;
      const updateData = req.body;
      const updatedService = await this.serviceRepository.update(serviceId, updateData);
      res.json({
        success: true,
        data: updatedService
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async deleteService(req, res) {
    try {
      const serviceId = req.params.id;
      await this.serviceRepository.delete(serviceId);
      res.json({
        success: true,
        message: 'Service deleted successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = ServiceController; 