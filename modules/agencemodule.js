const mongoose = require('mongoose');


const aganceschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    adress: {
        type: String,
        required: true,
        trim: true
    },
    ville: {
        type: String,
        trim: true
    }
})

const agances = mongoose.model('agances', aganceschema);

module.exports = agances;