const mongoose = require("mongoose");

const aganceschema = new mongoose.Schema({
  adress: {
    type: String,
    required: [true, "Veuillez fournir une adresse"],
    trim: true,
  },
  ville: {
    type: String,
    required: [true, "Veuillez indiquer une ville"],
    trim: true,
  },
  fixe:{
    type:String,
    required:[true,"Veuillez indiquer un numéro de fixe."],
    trim: true
  },
  tele:{
    type:String,
    trim: true
  }
});

const agances = mongoose.model('agences', aganceschema);

module.exports = agances;
