const RoomRepositoryImpl = require('../../infrastructure/repositories/RoomRepositoryImpl');

class RoomController {
  constructor() {
    this.roomRepository = new RoomRepositoryImpl();
  }

  async createRoom(req, res) {
    try {
      const roomData = req.body;
      const room = await this.roomRepository.create(roomData);
      res.status(201).json({
        success: true,
        data: room
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async getRooms(req, res) {
    try {
      const { status, floor, limit, offset, ...filters } = req.query;
      let result;
      
      // Tạo đối tượng options cho phân trang
      const options = {
        limit,
        offset,
        conditions: { ...filters }
      };
      
      // Thêm điều kiện lọc nếu có
      if (status) {
        options.conditions.status = status;
      }
      
      if (floor) {
        options.conditions.floor = parseInt(floor);
      }
      
      result = await this.roomRepository.findAll(options);
      
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

  async updateRoom(req, res) {
    try {
      const roomId = req.params.id;
      const updateData = req.body;
      const updatedRoom = await this.roomRepository.update(roomId, updateData);
      res.json({
        success: true,
        data: updatedRoom
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async deleteRoom(req, res) {
    try {
      const roomId = req.params.id;
      await this.roomRepository.delete(roomId);
      res.json({
        success: true,
        message: 'Room deleted successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = RoomController; 