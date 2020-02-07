const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let User = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true
    },
    register_date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('User', User);