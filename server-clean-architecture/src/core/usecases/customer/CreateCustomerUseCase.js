class CreateCustomerUseCase {
  constructor(customerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute(customerData) {
    // Logic để tạo khách hàng mới
    return await this.customerRepository.create(customerData);
  }
}

module.exports = CreateCustomerUseCase; 