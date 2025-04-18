class RoomRepository {
  constructor() {
    if (this.constructor === RoomRepository) {
      throw new Error('Abstract class cannot be instantiated');
    }
  }

  async create(roomData) {
    throw new Error('Method not implemented');
  }

  async findById(roomId) {
    throw new Error('Method not implemented');
  }

  async findAll() {
    throw new Error('Method not implemented');
  }

  async update(roomId, updateData) {
    throw new Error('Method not implemented');
  }

  async delete(roomId) {
    throw new Error('Method not implemented');
  }
}

module.exports = RoomRepository; 