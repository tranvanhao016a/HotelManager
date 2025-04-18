class CreatePersonUseCase {
  constructor(personRepository) {
    this.personRepository = personRepository;
  }

  async execute(personData) {
    // Kiểm tra loại (type) của person
    if (!personData.type || !['user', 'staff'].includes(personData.type)) {
      throw new Error('Loại người dùng không hợp lệ');
    }

    // Kiểm tra email đã tồn tại chưa
    const existingPerson = await this.personRepository.findByEmail(personData.email);
    if (existingPerson) {
      throw new Error('Email đã được sử dụng');
    }

    // Kiểm tra các trường bắt buộc cho staff
    if (personData.type === 'staff') {
      if (!personData.position) {
        throw new Error('Vị trí công việc là bắt buộc cho nhân viên');
      }
      if (!personData.salary) {
        throw new Error('Lương là bắt buộc cho nhân viên');
      }
    }

    // Tạo person mới
    return await this.personRepository.create(personData);
  }
}

module.exports = CreatePersonUseCase; 