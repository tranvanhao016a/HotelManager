class GetKindRoomUseCase {
  constructor(kindRoomRepository) {
    this.kindRoomRepository = kindRoomRepository;
  }

  async execute(kindRoomId) {
    // Logic để lấy thông tin loại phòng
    return await this.kindRoomRepository.findById(kindRoomId);
  }
}

module.exports = GetKindRoomUseCase;
