class DeletePersonUseCase {
  constructor(personRepository) {
    this.personRepository = personRepository;
  }

  async execute(id) {
    // Kiểm tra person tồn tại
    const person = await this.personRepository.findById(id);
    if (!person) {
      throw new Error('Không tìm thấy người dùng');
    }

    // Xóa person
    return await this.personRepository.delete(id);
  }
}

module.exports = DeletePersonUseCase; 