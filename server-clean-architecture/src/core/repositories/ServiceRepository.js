class ServiceRepository {
  constructor() {
    if (this.constructor === ServiceRepository) {
      throw new Error('Abstract class cannot be instantiated');
    }
  }

  async create(serviceData) {
    throw new Error('Method not implemented');
  }

  async findById(serviceId) {
    throw new Error('Method not implemented');
  }

  async findAll() {
    throw new Error('Method not implemented');
  }

  async update(serviceId, updateData) {
    throw new Error('Method not implemented');
  }

  async delete(serviceId) {
    throw new Error('Method not implemented');
  }
}

module.exports = ServiceRepository; 