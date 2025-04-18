const RoomVoucherRepositoryImpl = require('../../infrastructure/repositories/RoomVoucherRepositoryImpl');

class RoomVoucherController {
  constructor() {
    this.roomVoucherRepository = new RoomVoucherRepositoryImpl();
  }

  async createRoomVoucher(req, res) {
    try {
      const roomVoucherData = req.body;
      const roomVoucher = await this.roomVoucherRepository.create(roomVoucherData);
      res.status(201).json({
        success: true,
        data: roomVoucher
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async getRoomVouchers(req, res) {
    try {
      const { status, customerId, roomId, startDate, endDate, limit, offset, ...filters } = req.query;
      
      // Tạo đối tượng options cho phân trang
      const options = {
        limit,
        offset,
        conditions: { ...filters }
      };
      
      // Thêm các điều kiện lọc
      if (status) {
        options.conditions.status = status;
      }
      
      if (customerId) {
        options.conditions.customerId = customerId;
      }
      
      if (roomId) {
        options.conditions.roomId = roomId;
      }
      
      // Xử lý lọc theo khoảng thời gian
      if (startDate && endDate) {
        options.conditions.checkInDate = { $gte: new Date(startDate) };
        options.conditions.checkOutDate = { $lte: new Date(endDate) };
      }
      
      const result = await this.roomVoucherRepository.findAll(options);
      
      res.json({
        success: true,
        data: result.data,
        pagination: result.pagination
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async updateRoomVoucher(req, res) {
    try {
      const roomVoucherId = req.params.id;
      const updateData = req.body;
      const updatedRoomVoucher = await this.roomVoucherRepository.update(roomVoucherId, updateData);
      
      if (!updatedRoomVoucher) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy voucher phòng'
        });
      }
      
      res.json({
        success: true,
        data: updatedRoomVoucher
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async deleteRoomVoucher(req, res) {
    try {
      const roomVoucherId = req.params.id;
      const deletedRoomVoucher = await this.roomVoucherRepository.delete(roomVoucherId);
      
      if (!deletedRoomVoucher) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy voucher phòng'
        });
      }
      
      res.json({
        success: true,
        message: 'Xóa voucher phòng thành công'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = RoomVoucherController; 