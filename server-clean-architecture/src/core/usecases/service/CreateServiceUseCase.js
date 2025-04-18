class CreateServiceUseCase {
  constructor(serviceRepository) {
    this.serviceRepository = serviceRepository;
  }

  async execute(serviceData) {
    // Logic để tạo dịch vụ mới
    return await this.serviceRepository.create(serviceData);
  }
}

module.exports = CreateServiceUseCase; 