const mongoose = require("mongoose");


const harvestSchema = mongoose.Schema({
  Date: { type: Date, required: true, default: Date.now },
  Product: { type: String, required: true },
  Variety: { type: String, required: true },
  Note: { type: String},
  Quantity: { type: Number, required: true, default: 0 },
  Unit: { type: String, required: true }

}, {
    timestamps: true,
})

const Harvest= mongoose.model('Harvest', harvestSchema)

module.exports = Harvest