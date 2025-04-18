class DeleteKindRoomUseCase {
  constructor(kindRoomRepository) {
    this.kindRoomRepository = kindRoomRepository;
  }

  async execute(kindRoomId) {
    // Logic để xóa loại phòng
    return await this.kindRoomRepository.delete(kindRoomId);
  }
}

module.exports = DeleteKindRoomUseCase;
