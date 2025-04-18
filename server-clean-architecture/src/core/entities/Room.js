const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    kindRoomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'KindRoom',
        required: true
    },
    number: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'occupied', 'maintenance'],
        default: 'available'
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

module.exports = mongoose.model('Room', roomSchema); 