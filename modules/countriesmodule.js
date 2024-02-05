const mongoose = require('mongoose');

const countriesschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
})

const countries = mongoose.model('countries',countriesschema);

module.exports = countries;