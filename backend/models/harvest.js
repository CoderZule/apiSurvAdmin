const mongoose = require('mongoose');


const harvestSchema = new mongoose.Schema({

  Product: { type: String, required: true},
  Quantity: {type: Number,required: true},
  Unit:{ type: String, required: true},
  Season: {type: String,required: true},
  HarvestMethods: {type: String,required: true},
  QualityTestResults: {type: String,required: true},
  Date: { type: Date, required: true, default: Date.now },

 
 } , {
    timestamps: true,
})
 const Harvest = mongoose.model('Harvest', harvestSchema);

module.exports = Harvest;
