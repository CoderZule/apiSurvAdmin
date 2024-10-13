const mongoose = require('mongoose');

const foragesrequestsSchema = new mongoose.Schema({
  
  Status: { type: String, default: "En attente"},
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },


});

const Forages_Requests = mongoose.model('Forages_Requests', foragesrequestsSchema);

module.exports = Forages_Requests;
