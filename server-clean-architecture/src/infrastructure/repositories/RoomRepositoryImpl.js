const RoomModel = require('../../models/RoomModel');
const RoomRepository = require('../../core/repositories/RoomRepository');

class RoomRepositoryImpl extends RoomRepository {
  constructor() {
    super();
  }

  async create(roomData) {
    try {
      const room = new RoomModel(roomData);
      return await room.save();
    } catch (error) {
      throw new Error(`Không thể tạo phòng: ${error.message}`);
    }
  }

  async findById(roomId) {
    try {
      return await RoomModel.findById(roomId).populate('kindRoomId');
    } catch (error) {
      throw new Error(`Không tìm thấy phòng: ${error.message}`);
    }
  }

  async update(roomId, updateData) {
    try {
      return await RoomModel.findByIdAndUpdate(
        roomId,
        { ...updateData, updatedAt: Date.now() },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Không thể cập nhật phòng: ${error.message}`);
    }
  }

  async delete(roomId) {
    try {
      return await RoomModel.findByIdAndDelete(roomId);
    } catch (error) {
      throw new Error(`Không thể xóa phòng: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await RoomModel.find({}).populate('kindRoomId');
    } catch (error) {
      throw new Error(`Không thể lấy danh sách phòng: ${error.message}`);
    }
  }

  async findByStatus(status) {
    try {
      return await RoomModel.find({ status }).populate('kindRoomId');
    } catch (error) {
      throw new Error(`Không thể lấy danh sách phòng theo trạng thái: ${error.message}`);
    }
  }

  async findByFloor(floor) {
    try {
      return await RoomModel.find({ floor }).populate('kindRoomId');
    } catch (error) {
      throw new Error(`Không thể lấy danh sách phòng theo tầng: ${error.message}`);
    }
  }
}

module.exports = RoomRepositoryImpl; 