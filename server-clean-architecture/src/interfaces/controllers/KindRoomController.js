const KindRoomRepositoryImpl = require('../../infrastructure/repositories/KindRoomRepositoryImpl');

class KindRoomController {
  constructor() {
    this.kindRoomRepository = new KindRoomRepositoryImpl();
  }

  async createKindRoom(req, res) {
    try {
      const kindRoomData = req.body;
      const kindRoom = await this.kindRoomRepository.create(kindRoomData);
      res.status(201).json({
        success: true,
        data: kindRoom
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async getKindRooms(req, res) {
    try {
      const { limit, offset, ...filters } = req.query;
      
      // Tạo đối tượng options cho phân trang
      const options = {
        limit,
        offset,
        conditions: { ...filters }
      };
      
      const result = await this.kindRoomRepository.findAll(options);
      
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

  async updateKindRoom(req, res) {
    try {
      const kindRoomId = req.params.id;
      const updateData = req.body;
      const updatedKindRoom = await this.kindRoomRepository.update(kindRoomId, updateData);
      res.json({
        success: true,
        data: updatedKindRoom
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async deleteKindRoom(req, res) {
    try {
      const kindRoomId = req.params.id;
      await this.kindRoomRepository.delete(kindRoomId);
      res.json({
        success: true,
        message: 'KindRoom deleted successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = KindRoomController; 