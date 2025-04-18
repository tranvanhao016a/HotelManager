const GenericRepository = require('./GenericRepository');

class PersonRepository extends GenericRepository {
  constructor() {
    super();
    if (this.constructor === PersonRepository) {
      throw new Error('Abstract class cannot be instantiated');
    }
  }

  async findByEmail(email) {
    throw new Error('Method not implemented');
  }

  async findByType(type, query = {}) {
    throw new Error('Method not implemented');
  }

  async findStaffByStatus(status) {
    throw new Error('Method not implemented');
  }

  async updateStatus(id, status) {
    throw new Error('Method not implemented');
  }
}

module.exports = PersonRepository; 