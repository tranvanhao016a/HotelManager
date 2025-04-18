class KindRoomRepository {
  constructor() {
    if (this.constructor === KindRoomRepository) {
      throw new Error('Abstract class cannot be instantiated');
    }
  }

  async create(kindRoomData) {
    throw new Error('Method not implemented');
  }

  async findById(kindRoomId) {
    throw new Error('Method not implemented');
  }

  async findAll() {
    throw new Error('Method not implemented');
  }

  async update(kindRoomId, updateData) {
    throw new Error('Method not implemented');
  }

  async delete(kindRoomId) {
    throw new Error('Method not implemented');
  }
}

module.exports = KindRoomRepository; 