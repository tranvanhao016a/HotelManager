class AccountRepository {
  constructor() {
    if (this.constructor === AccountRepository) {
      throw new Error('Abstract class cannot be instantiated');
    }
  }

  async create(accountData) {
    throw new Error('Method not implemented');
  }

  async findById(accountId) {
    throw new Error('Method not implemented');
  }

  async findByUsername(username) {
    throw new Error('Method not implemented');
  }

  async findByEmail(email) {
    throw new Error('Method not implemented');
  }

  async findAll() {
    throw new Error('Method not implemented');
  }

  async update(accountId, updateData) {
    throw new Error('Method not implemented');
  }

  async delete(accountId) {
    throw new Error('Method not implemented');
  }
}

module.exports = AccountRepository; 