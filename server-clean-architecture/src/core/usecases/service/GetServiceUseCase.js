class GetServiceUseCase {
  constructor(serviceRepository) {
    this.serviceRepository = serviceRepository;
  }

  async execute(serviceId) {
    // Logic để lấy thông tin dịch vụ
    return await this.serviceRepository.findById(serviceId);
  }
}

module.exports = GetServiceUseCase; 