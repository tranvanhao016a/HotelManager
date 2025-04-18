class RoomVoucherRepository {
  constructor() {
    if (this.constructor === RoomVoucherRepository) {
      throw new Error('Abstract class cannot be instantiated');
    }
  }

  async create(roomVoucherData) {
    throw new Error('Method not implemented');
  }

  async findById(roomVoucherId) {
    throw new Error('Method not implemented');
  }

  async findAll() {
    throw new Error('Method not implemented');
  }

  async update(roomVoucherId, updateData) {
    throw new Error('Method not implemented');
  }

  async delete(roomVoucherId) {
    throw new Error('Method not implemented');
  }
}

module.exports = RoomVoucherRepository; 