class DeleteRoomVoucherUseCase {
  constructor(roomVoucherRepository) {
    this.roomVoucherRepository = roomVoucherRepository;
  }

  async execute(roomVoucherId) {
    // Logic để xóa phiếu phòng
    return await this.roomVoucherRepository.delete(roomVoucherId);
  }
}

module.exports = DeleteRoomVoucherUseCase; 