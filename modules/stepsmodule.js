const mongoose = require('mongoose');


const stepsschema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
});


const steps = mongoose.model('steps', stepsschema);

module.exports = steps;