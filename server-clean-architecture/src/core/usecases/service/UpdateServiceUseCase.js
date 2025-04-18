class UpdateServiceUseCase {
  constructor(serviceRepository) {
    this.serviceRepository = serviceRepository;
  }

  async execute(serviceId, updateData) {
    // Logic để cập nhật dịch vụ
    return await this.serviceRepository.update(serviceId, updateData);
  }
}

module.exports = UpdateServiceUseCase; 