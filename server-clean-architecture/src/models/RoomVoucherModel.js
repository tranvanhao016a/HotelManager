const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomVoucherSchema = new Schema({
  roomId: {
    type: Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  customerId: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  checkInDate: {
    type: Date,
    required: true
  },
  checkOutDate: {
    type: Date,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['booked', 'checked-in', 'checked-out', 'cancelled'],
    default: 'booked'
  },
  services: [{
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: 'Service'
    },
    quantity: {
      type: Number,
      default: 1
    },
    price: {
      type: Number,
      required: true
    }
  }],
  notes: {
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

module.exports = mongoose.model('RoomVoucher', RoomVoucherSchema); 