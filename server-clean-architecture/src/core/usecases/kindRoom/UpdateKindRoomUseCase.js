class UpdateKindRoomUseCase {
  constructor(kindRoomRepository) {
    this.kindRoomRepository = kindRoomRepository;
  }

  async execute(kindRoomId, updateData) {
    // Logic để cập nhật loại phòng
    return await this.kindRoomRepository.update(kindRoomId, updateData);
  }
}

module.exports = UpdateKindRoomUseCase;
