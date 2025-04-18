class CreateKindRoomUseCase {
  constructor(kindRoomRepository) {
    this.kindRoomRepository = kindRoomRepository;
  }

  async execute(kindRoomData) {
    // Logic để tạo loại phòng mới
    return await this.kindRoomRepository.create(kindRoomData);
  }
}

module.exports = CreateKindRoomUseCase;
