const mongoose = require('mongoose');

const inspectionSchema = new mongoose.Schema({

  Inspector: { 
    firstName: {type: String, required: true },
    lastName: {type: String, required: true },
    cin: {type: String, required: true },
  }, //المتفقد		

  InspectionDateTime: { 
    date: {type: Date, required: true, default: Date.now },
    time: {type: Date, required: true, default: Date.now },
  }, //التاريخ								
  
  Brood: {
    state:   { type: String, required: true }, //حضنة		
    maleBrood: { type: String, required: true },//حضنة الذكور	
    totalBrood: { type: Number, required: true, default: 0 },//جملي الحضنة
  },
 
  DronesSeen:{ type: Boolean}, //ذكور	

  Supplies: { //التغذية 
    product: { type: String, required: true },
   // totalbeefeed: { type: Number, required: true, default: 0 }, //جملي المؤونة
    ingredients: {
      name: { type: String, required: true },
      quantity: { type: Number, required: true, default: 0 },
      unit: { type: String, required: true }
    },
    note: { type: String }
  },

  BeeHealth: {
    disease: { type: String, required: true },
    treatment: { type: String, required: true },
    duration: {
      from: { type: Date, required: true, default: Date.now },
      to: { type: Date, required: true, default: Date.now }
    },
    quantity: { type: Number, required: true, default: 0 },
    doses: { type: String, required: true },
    note: { type: String }
  },

  HoneyStores: { type: String, required: true },
  PollenStores: { type: String, required: true },

  ActivityAdd: { type: String }, //إضافة 
  ActivityRemove: { type: String }, //حدف		

  Weather: {
    conditions: { type: String},
    temperature: { type: Number, default: 0 },
    humidity: { type: Number, default: 0 },
    pressure: { type: Number, default: 0 },
    windspeed: { type: Number, default: 0 },
    winddirection: { type: Number, default: 0 }
  },

  Note: { type: String },

  Hive: { type: mongoose.Schema.Types.ObjectId, ref: 'Hive', required: true },

}, {
  timestamps: true,
});

const Inspection = mongoose.model('Inspection', inspectionSchema);

module.exports = Inspection;
