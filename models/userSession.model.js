const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let UserSession = new Schema({
    userId: {
        type: Number,
        default: -1
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Todo', Todo);