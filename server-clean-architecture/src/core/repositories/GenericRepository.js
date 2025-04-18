class GenericRepository {
  constructor() {
    if (this.constructor === GenericRepository) {
      throw new Error('Abstract class cannot be instantiated');
    }
  }

  async create(data) {
    throw new Error('Method not implemented');
  }

  async findById(id) {
    throw new Error('Method not implemented');
  }

  async findOne(conditions) {
    throw new Error('Method not implemented');
  }

  async findAll(query = {}) {
    throw new Error('Method not implemented');
  }

  async update(id, updateData) {
    throw new Error('Method not implemented');
  }

  async delete(id) {
    throw new Error('Method not implemented');
  }
}

module.exports = GenericRepository; 