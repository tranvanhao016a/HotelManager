const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const config = require('../config');

const AccountSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'staff'],
    default: 'staff'
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
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

// Hash mật khẩu trước khi lưu
AccountSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(config.bcrypt.saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    return next(error);
  }
});

// Phương thức so sánh mật khẩu
AccountSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model('Account', AccountSchema); 