const RoomVoucherModel = require('../../models/RoomVoucherModel');
const RoomVoucherRepository = require('../../core/repositories/RoomVoucherRepository');

class RoomVoucherRepositoryImpl extends RoomVoucherRepository {
  constructor() {
    super();
  }

  async create(roomVoucherData) {
    try {
      const roomVoucher = new RoomVoucherModel(roomVoucherData);
      return await roomVoucher.save();
    } catch (error) {
      throw new Error(`Không thể tạo phiếu phòng: ${error.message}`);
    }
  }

  async findById(roomVoucherId) {
    try {
      return await RoomVoucherModel.findById(roomVoucherId)
        .populate('roomId')
        .populate('customerId')
        .populate('services.serviceId');
    } catch (error) {
      throw new Error(`Không tìm thấy phiếu phòng: ${error.message}`);
    }
  }

  async update(roomVoucherId, updateData) {
    try {
      return await RoomVoucherModel.findByIdAndUpdate(
        roomVoucherId,
        { ...updateData, updatedAt: Date.now() },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Không thể cập nhật phiếu phòng: ${error.message}`);
    }
  }

  async delete(roomVoucherId) {
    try {
      return await RoomVoucherModel.findByIdAndDelete(roomVoucherId);
    } catch (error) {
      throw new Error(`Không thể xóa phiếu phòng: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await RoomVoucherModel.find({})
        .populate('roomId')
        .populate('customerId')
        .populate('services.serviceId');
    } catch (error) {
      throw new Error(`Không thể lấy danh sách phiếu phòng: ${error.message}`);
    }
  }

  async findByStatus(status) {
    try {
      return await RoomVoucherModel.find({ status })
        .populate('roomId')
        .populate('customerId')
        .populate('services.serviceId');
    } catch (error) {
      throw new Error(`Không thể lấy danh sách phiếu phòng theo trạng thái: ${error.message}`);
    }
  }

  async findByCustomerId(customerId) {
    try {
      return await RoomVoucherModel.find({ customerId })
        .populate('roomId')
        .populate('customerId')
        .populate('services.serviceId');
    } catch (error) {
      throw new Error(`Không thể lấy danh sách phiếu phòng theo khách hàng: ${error.message}`);
    }
  }

  async findByRoomId(roomId) {
    try {
      return await RoomVoucherModel.find({ roomId })
        .populate('roomId')
        .populate('customerId')
        .populate('services.serviceId');
    } catch (error) {
      throw new Error(`Không thể lấy danh sách phiếu phòng theo phòng: ${error.message}`);
    }
  }

  async findByDateRange(startDate, endDate) {
    try {
      return await RoomVoucherModel.find({
        $or: [
          { checkInDate: { $gte: startDate, $lte: endDate } },
          { checkOutDate: { $gte: startDate, $lte: endDate } },
          {
            $and: [
              { checkInDate: { $lte: startDate } },
              { checkOutDate: { $gte: endDate } }
            ]
          }
        ]
      })
        .populate('roomId')
        .populate('customerId')
        .populate('services.serviceId');
    } catch (error) {
      throw new Error(`Không thể lấy danh sách phiếu phòng theo khoảng thời gian: ${error.message}`);
    }
  }
}

module.exports = RoomVoucherRepositoryImpl; 