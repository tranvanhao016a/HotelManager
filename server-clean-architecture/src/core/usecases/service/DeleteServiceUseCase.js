class DeleteServiceUseCase {
  constructor(serviceRepository) {
    this.serviceRepository = serviceRepository;
  }

  async execute(serviceId) {
    // Logic để xóa dịch vụ
    return await this.serviceRepository.delete(serviceId);
  }
}

module.exports = DeleteServiceUseCase; 