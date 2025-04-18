const express = require('express');
const router = express.Router();
const KindRoomController = require('../controllers/KindRoomController');

const kindRoomController = new KindRoomController();

router.post('/', kindRoomController.createKindRoom.bind(kindRoomController));
router.get('/', kindRoomController.getKindRooms.bind(kindRoomController));
router.put('/:id', kindRoomController.updateKindRoom.bind(kindRoomController));
router.delete('/:id', kindRoomController.deleteKindRoom.bind(kindRoomController));

module.exports = router; 