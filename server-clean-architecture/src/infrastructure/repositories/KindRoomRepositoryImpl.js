const KindRoomModel = require('../../models/KindRoomModel');
const KindRoomRepository = require('../../core/repositories/KindRoomRepository');

class KindRoomRepositoryImpl extends KindRoomRepository {
  constructor() {
    super();
  }

  async create(kindRoomData) {
    try {
      const kindRoom = new KindRoomModel(kindRoomData);
      return await kindRoom.save();
    } catch (error) {
      throw new Error(`Không thể tạo loại phòng: ${error.message}`);
    }
  }

  async findById(kindRoomId) {
    try {
      return await KindRoomModel.findById(kindRoomId);
    } catch (error) {
      throw new Error(`Không tìm thấy loại phòng: ${error.message}`);
    }
  }

  async update(kindRoomId, updateData) {
    try {
      return await KindRoomModel.findByIdAndUpdate(
        kindRoomId,
        { ...updateData, updatedAt: Date.now() },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Không thể cập nhật loại phòng: ${error.message}`);
    }
  }

  async delete(kindRoomId) {
    try {
      return await KindRoomModel.findByIdAndDelete(kindRoomId);
    } catch (error) {
      throw new Error(`Không thể xóa loại phòng: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await KindRoomModel.find({});
    } catch (error) {
      throw new Error(`Không thể lấy danh sách loại phòng: ${error.message}`);
    }
  }
}

module.exports = KindRoomRepositoryImpl;