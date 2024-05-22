const mongoose = require("mongoose");


const transactionSchema = mongoose.Schema({
  Description: { type: String, required: true },
  Date: { type: Date, required: true, default: Date.now },
  Category: { type: String, required: true },
  Amount: { type: Number, required: true, default: 0 },
  Note: { type: String},
 

}, {
    timestamps: true,
})

const Transaction= mongoose.model('Transaction', transactionSchema)

module.exports = Transaction