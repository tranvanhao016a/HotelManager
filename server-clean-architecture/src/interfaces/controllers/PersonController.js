const PersonRepositoryImpl = require('../../infrastructure/repositories/PersonRepositoryImpl');
const CreatePersonUseCase = require('../../core/usecases/person/CreatePersonUseCase');
const GetPersonUseCase = require('../../core/usecases/person/GetPersonUseCase');
const UpdatePersonUseCase = require('../../core/usecases/person/UpdatePersonUseCase');
const DeletePersonUseCase = require('../../core/usecases/person/DeletePersonUseCase');
const UpdatePersonStatusUseCase = require('../../core/usecases/person/UpdatePersonStatusUseCase');

class PersonController {
  constructor() {
    this.personRepository = new PersonRepositoryImpl();
    this.createPersonUseCase = new CreatePersonUseCase(this.personRepository);
    this.getPersonUseCase = new GetPersonUseCase(this.personRepository);
    this.updatePersonUseCase = new UpdatePersonUseCase(this.personRepository);
    this.deletePersonUseCase = new DeletePersonUseCase(this.personRepository);
    this.updatePersonStatusUseCase = new UpdatePersonStatusUseCase(this.personRepository);
  }

  // Chung cho cả User và Staff
  async createPerson(req, res) {
    try {
      const personData = req.body;
      const result = await this.createPersonUseCase.execute(personData);
      res.status(201).json({
        success: true,
        data: result
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async getPersonById(req, res) {
    try {
      const { id } = req.params;
      const result = await this.getPersonUseCase.executeById(id);
      if (!result) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy'
        });
      }
      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async updatePerson(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const result = await this.updatePersonUseCase.execute(id, updateData);
      if (!result) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy'
        });
      }
      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async deletePerson(req, res) {
    try {
      const { id } = req.params;
      const result = await this.deletePersonUseCase.execute(id);
      if (!result) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy'
        });
      }
      res.json({
        success: true,
        message: 'Xóa thành công'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // Riêng cho User
  async getUsers(req, res) {
    try {
      // Lấy các tham số phân trang từ query params
      const { limit, offset, ...filters } = req.query;
      
      const result = await this.getPersonUseCase.executeByType('user', {
        limit,
        offset,
        ...filters
      });
      
      res.json({
        success: true,
        data: result.data,
        pagination: result.pagination
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // Riêng cho Staff
  async getStaffs(req, res) {
    try {
      // Lấy các tham số phân trang từ query params
      const { limit, offset, status, ...filters } = req.query;
      
      let result;
      if (status) {
        // Nếu có lọc theo trạng thái
        result = await this.getPersonUseCase.executeByStatus(status, {
          limit,
          offset,
          ...filters
        });
      } else {
        // Lấy tất cả nhân viên
        result = await this.getPersonUseCase.executeByType('staff', {
          limit,
          offset,
          ...filters
        });
      }
      
      res.json({
        success: true,
        data: result.data,
        pagination: result.pagination
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async updatePersonStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      if (!status) {
        return res.status(400).json({
          success: false,
          message: 'Trạng thái là bắt buộc'
        });
      }
      
      const result = await this.updatePersonStatusUseCase.execute(id, status);
      
      if (!result) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy'
        });
      }
      
      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = PersonController; 