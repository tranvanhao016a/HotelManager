class GetPersonUseCase {
  constructor(personRepository) {
    this.personRepository = personRepository;
  }

  async executeById(id) {
    return await this.personRepository.findById(id);
  }

  async executeByType(type, options = {}) {
    if (!['user', 'staff', 'admin'].includes(type)) {
      throw new Error('Loại người dùng không hợp lệ');
    }
    return await this.personRepository.findByType(type, options);
  }

  async executeByStatus(status, options = {}) {
    if (!['active', 'inactive', 'on_leave'].includes(status)) {
      throw new Error('Trạng thái không hợp lệ');
    }
    return await this.personRepository.findStaffByStatus(status, options);
  }

  async executeAll(options = {}) {
    return await this.personRepository.findAll(options);
  }
}

module.exports = GetPersonUseCase; 