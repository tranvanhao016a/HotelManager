class CreateRoomUseCase {
  constructor(roomRepository) {
    this.roomRepository = roomRepository;
  }

  async execute(roomData) {
    // Logic để tạo phòng mới
    return await this.roomRepository.create(roomData);
  }
}

module.exports = CreateRoomUseCase; 