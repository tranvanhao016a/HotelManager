const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
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
  description: {
    type: String,
    trim: true
  },
  available: {
    type: Boolean,
    default: true
  },
  category: {
    type: String,
    enum: ['food', 'cleaning', 'maintenance', 'other'],
    default: 'other'
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

module.exports = mongoose.model('Service', ServiceSchema); 