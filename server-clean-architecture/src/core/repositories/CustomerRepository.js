class CustomerRepository {
  constructor() {
    if (this.constructor === CustomerRepository) {
      throw new Error('Abstract class cannot be instantiated');
    }
  }

  async create(customerData) {
    throw new Error('Method not implemented');
  }

  async findById(customerId) {
    throw new Error('Method not implemented');
  }

  async findAll() {
    throw new Error('Method not implemented');
  }

  async update(customerId, updateData) {
    throw new Error('Method not implemented');
  }

  async delete(customerId) {
    throw new Error('Method not implemented');
  }
}

module.exports = CustomerRepository; 