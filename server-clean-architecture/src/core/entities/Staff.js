const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    position: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'on_leave'],
        default: 'active'
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

module.exports = mongoose.model('Staff', staffSchema); 