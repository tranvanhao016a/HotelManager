class UpdateRoomVoucherUseCase {
  constructor(roomVoucherRepository) {
    this.roomVoucherRepository = roomVoucherRepository;
  }

  async execute(roomVoucherId, updateData) {
    // Logic để cập nhật phiếu phòng
    return await this.roomVoucherRepository.update(roomVoucherId, updateData);
  }
}

module.exports = UpdateRoomVoucherUseCase; 