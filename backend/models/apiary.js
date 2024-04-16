const mongoose = require('mongoose');

const apiarySchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Forages: { type: String, required: true },
  Type: { type: String, required: true },
  SunExposure: { type: String, required: true },
  Location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    city: { type: String, required: true },
    governorate: { type: String, required: true }
  },
  Owner: {
    ID: mongoose.Schema.Types.ObjectId,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    cin:{ type: String, require },
    email: { type: String, require },
  }
}, {
  timestamps: true,
});


  const Apiary= mongoose.model('Apiary', apiarySchema);
 
  module.exports = Apiary;
