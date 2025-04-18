const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  accountId: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    default: 'other'
  },
  birthDate: {
    type: Date
  },
  // Trường để phân biệt loại
  type: {
    type: String,
    enum: ['staff','admin'],
    required: true
  },
  // Các trường chỉ dành cho staff
  position: {
    type: String,
    trim: true,
    required: function() {
      return this.type === 'staff';
    }
  },
  salary: {
    type: Number,
    required: function() {
      return this.type === 'staff';
    }
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'on_leave'],
    default: 'active',
    required: function() {
      return this.type === 'staff';
    }
  },
  hireDate: {
    type: Date,
    default: Date.now,
    required: function() {
      return this.type === 'staff';
    }
  },
  // Trường chung
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index để tìm kiếm hiệu quả
PersonSchema.index({ type: 1 });
PersonSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('Person', PersonSchema); 