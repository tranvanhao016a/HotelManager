class UpdatePersonUseCase {
  constructor(personRepository) {
    this.personRepository = personRepository;
  }

  async execute(id, updateData) {
    // Kiểm tra person tồn tại
    const person = await this.personRepository.findById(id);
    if (!person) {
      throw new Error('Không tìm thấy người dùng');
    }

    // Kiểm tra email nếu được cập nhật
    if (updateData.email && updateData.email !== person.email) {
      const existingPerson = await this.personRepository.findByEmail(updateData.email);
      if (existingPerson && existingPerson._id.toString() !== id) {
        throw new Error('Email đã được sử dụng');
      }
    }

    // Kiểm tra loại nếu được cập nhật
    if (updateData.type && !['user', 'staff'].includes(updateData.type)) {
      throw new Error('Loại người dùng không hợp lệ');
    }

    // Kiểm tra các trường bắt buộc nếu cập nhật thành staff
    if (updateData.type === 'staff') {
      if (!updateData.position && !person.position) {
        throw new Error('Vị trí công việc là bắt buộc cho nhân viên');
      }
      if (!updateData.salary && !person.salary) {
        throw new Error('Lương là bắt buộc cho nhân viên');
      }
    }

    // Cập nhật person
    return await this.personRepository.update(id, updateData);
  }
}

module.exports = UpdatePersonUseCase; 