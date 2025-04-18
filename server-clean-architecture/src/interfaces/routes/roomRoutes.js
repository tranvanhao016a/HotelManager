const express = require('express');
const router = express.Router();
const RoomController = require('../controllers/RoomController');

const roomController = new RoomController();

router.post('/', roomController.createRoom.bind(roomController));
router.get('/', roomController.getRooms.bind(roomController));
router.put('/:id', roomController.updateRoom.bind(roomController));
router.delete('/:id', roomController.deleteRoom.bind(roomController));

module.exports = router; 