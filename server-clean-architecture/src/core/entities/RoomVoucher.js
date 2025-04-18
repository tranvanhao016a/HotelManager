const mongoose = require('mongoose');

const roomVoucherSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['booked', 'checked_in', 'checked_out'],
        default: 'booked'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('RoomVoucher', roomVoucherSchema); 