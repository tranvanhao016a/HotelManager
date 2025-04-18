const express = require('express');
const router = express.Router();
const RoomVoucherController = require('../controllers/RoomVoucherController');

const roomVoucherController = new RoomVoucherController();

router.post('/', roomVoucherController.createRoomVoucher.bind(roomVoucherController));
router.get('/', roomVoucherController.getRoomVouchers.bind(roomVoucherController));
router.put('/:id', roomVoucherController.updateRoomVoucher.bind(roomVoucherController));
router.delete('/:id', roomVoucherController.deleteRoomVoucher.bind(roomVoucherController));

module.exports = router; 