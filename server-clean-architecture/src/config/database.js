const mongoose = require('mongoose');
const config = require('./index');

class Database {
  constructor() {
    this.connection = null;
  }

  async connect() {
    try {
      this.connection = await mongoose.connect(config.database.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('Kết nối cơ sở dữ liệu MongoDB thành công!');
      return this.connection;
    } catch (error) {
      console.error('Lỗi kết nối cơ sở dữ liệu:', error.message);
      process.exit(1);
    }
  }

  async disconnect() {
    try {
      await mongoose.disconnect();
      console.log('Đã ngắt kết nối cơ sở dữ liệu MongoDB!');
      return true;
    } catch (error) {
      console.error('Lỗi ngắt kết nối cơ sở dữ liệu:', error.message);
      return false;
    }
  }
}

module.exports = new Database(); 