const CustomerRepositoryImpl = require('../../infrastructure/repositories/CustomerRepositoryImpl');

class CustomerController {
  constructor() {
    this.customerRepository = new CustomerRepositoryImpl();
  }

  async createCustomer(req, res) {
    try {
      const customerData = req.body;
      const customer = await this.customerRepository.create(customerData);
      res.status(201).json({
        success: true,
        data: customer
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async getCustomers(req, res) {
    try {
      const { limit, offset, ...filters } = req.query;
      
      // Tạo đối tượng options cho phân trang
      const options = {
        limit,
        offset,
        conditions: { ...filters }
      };
      
      const result = await this.customerRepository.findAll(options);
      
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

  //get customer by id
  async getCustomerById(req, res) {
    try {
      const customerId = req.params.id;
      const customer = await this.customerRepository.findById(customerId);
      
      if (!customer) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy khách hàng'
        });
      }
      
      res.json({
        success: true,
        data: customer
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }


  async updateCustomer(req, res) {
    try {
      const customerId = req.params.id;
      const updateData = req.body;
      const updatedCustomer = await this.customerRepository.update(customerId, updateData);
      
      if (!updatedCustomer) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy khách hàng'
        });
      }
      
      res.json({
        success: true,
        data: updatedCustomer
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async deleteCustomer(req, res) {
    try {
      const customerId = req.params.id;
      const deletedCustomer = await this.customerRepository.delete(customerId);
      
      if (!deletedCustomer) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy khách hàng'
        });
      }
      
      res.json({
        success: true,
        message: 'Xóa khách hàng thành công'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = CustomerController; 