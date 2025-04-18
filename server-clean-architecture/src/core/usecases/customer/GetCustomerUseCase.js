class GetCustomerUseCase {
  constructor(customerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute(customerId) {
    // Logic để lấy thông tin khách hàng
    return await this.customerRepository.findById(customerId);
  }
}

module.exports = GetCustomerUseCase; 