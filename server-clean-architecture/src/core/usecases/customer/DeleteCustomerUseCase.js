class DeleteCustomerUseCase {
  constructor(customerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute(customerId) {
    // Logic để xóa khách hàng
    return await this.customerRepository.delete(customerId);
  }
}

module.exports = DeleteCustomerUseCase; 