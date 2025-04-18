class UpdateCustomerUseCase {
  constructor(customerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute(customerId, updateData) {
    // Logic để cập nhật khách hàng
    return await this.customerRepository.update(customerId, updateData);
  }
}

module.exports = UpdateCustomerUseCase; 