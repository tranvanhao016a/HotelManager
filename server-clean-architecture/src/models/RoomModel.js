const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  roomNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  kindRoomId: {
    type: Schema.Types.ObjectId,
    ref: 'KindRoom',
    required: true
  },
  floor: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'occupied', 'maintenance'],
    default: 'available'
  },
  description: {
    type: String,
    trim: true
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

module.exports = mongoose.model('Room', RoomSchema);