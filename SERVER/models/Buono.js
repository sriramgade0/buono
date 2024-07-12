const mongoose = require('mongoose');

const buonoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String
    },
    done:{
        type: Boolean
    }
});

module.exports = mongoose.model("Buono", buonoSchema);