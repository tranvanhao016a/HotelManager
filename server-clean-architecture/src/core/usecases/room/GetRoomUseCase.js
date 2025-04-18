class GetRoomUseCase {
  constructor(roomRepository) {
    this.roomRepository = roomRepository;
  }

  async execute(roomId) {
    // Logic để lấy thông tin phòng
    return await this.roomRepository.findById(roomId);
  }
}

module.exports = GetRoomUseCase; 