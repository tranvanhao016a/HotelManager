class DeleteRoomUseCase {
  constructor(roomRepository) {
    this.roomRepository = roomRepository;
  }

  async execute(roomId) {
    // Logic để xóa phòng
    return await this.roomRepository.delete(roomId);
  }
}

module.exports = DeleteRoomUseCase; 