class UpdatePersonStatusUseCase {
  constructor(personRepository) {
    this.personRepository = personRepository;
  }

  async execute(id, status) {
    // Kiểm tra trạng thái hợp lệ
    if (!['active', 'inactive', 'on_leave'].includes(status)) {
      throw new Error('Trạng thái không hợp lệ');
    }

    // Kiểm tra staff tồn tại
    const person = await this.personRepository.findById(id);
    if (!person) {
      throw new Error('Không tìm thấy nhân viên');
    }

    // Kiểm tra loại là staff
    if (person.type !== 'staff') {
      throw new Error('Chỉ có thể cập nhật trạng thái cho nhân viên');
    }

    // Cập nhật trạng thái
    return await this.personRepository.updateStatus(id, status);
  }
}

module.exports = UpdatePersonStatusUseCase; 