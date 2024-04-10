const mongoose = require('mongoose');


const rucherSchema = new mongoose.Schema({
    name: String,
    type: String,
    location: {
        lat: Number,
        long: Number
      },
    sunExposure: String,
    owner: String,
  });

  const Rucher= mongoose.model('Rucher', rucherSchema);
 
  module.exports = Rucher;
