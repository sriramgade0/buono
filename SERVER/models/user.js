const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Your email is required!']
    },
    username: {
        type: String,
        required: [true, 'Your username is required!']
    },
    password: {
        type: String,
        required: [true, 'Your password is required!']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("User", userSchema);