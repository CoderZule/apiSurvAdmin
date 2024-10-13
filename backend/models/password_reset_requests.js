const mongoose = require('mongoose');

const passwordresetrequestsSchema = new mongoose.Schema({
  
  Status: { type: String, default: "En attente"},
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },


});

const Password_Reset_Requests = mongoose.model('Password_Reset_Requests', passwordresetrequestsSchema);

module.exports = Password_Reset_Requests;
