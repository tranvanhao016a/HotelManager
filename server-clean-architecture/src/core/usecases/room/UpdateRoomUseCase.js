class UpdateRoomUseCase {
  constructor(roomRepository) {
    this.roomRepository = roomRepository;
  }

  async execute(roomId, updateData) {
    // Logic để cập nhật phòng
    return await this.roomRepository.update(roomId, updateData);
  }
}

module.exports = UpdateRoomUseCase; 