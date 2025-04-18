class CreateRoomVoucherUseCase {
  constructor(roomVoucherRepository) {
    this.roomVoucherRepository = roomVoucherRepository;
  }

  async execute(roomVoucherData) {
    // Logic để tạo phiếu phòng mới
    return await this.roomVoucherRepository.create(roomVoucherData);
  }
}

module.exports = CreateRoomVoucherUseCase; 
