const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KindRoomSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  amenities: [{
    type: String
  }],
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

module.exports = mongoose.model('KindRoom', KindRoomSchema); 