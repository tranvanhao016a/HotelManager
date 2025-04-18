class GetRoomVoucherUseCase {
  constructor(roomVoucherRepository) {
    this.roomVoucherRepository = roomVoucherRepository;
  }

  async execute(roomVoucherId) {
    // Logic để lấy thông tin phiếu phòng
    return await this.roomVoucherRepository.findById(roomVoucherId);
  }
}

module.exports = GetRoomVoucherUseCase; 