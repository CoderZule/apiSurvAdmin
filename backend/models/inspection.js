const mongoose = require('mongoose');

const inspectionSchema = new mongoose.Schema({

  InspectorName: { type: String, required: true },
  InspectionDate: { type: Date, required: true, default: Date.now },
  Brood: { type: String, required: true }, //حضنة						
  BroodChamberMales: { type: Number, required: true, default: 0 },//حضنة الذكور	
  Drones: { type: Number, required: true, default: 0 }, //ذكور	
  BeeFeed: {
    food: { type: String, required: true },//مؤونة	
    totalbeefeed: { type: Number, required: true, default: 0 }, //جملي المؤونة
  }, 	
  Feeding: {
    food: { type: String, required: true },
    ingredients: {
      name: { type: String, required: true },
      quantity: { type: Number, required: true, default: 0 },
      unit: { type: String, required: true }
    },
    note: { type: String}
  },
  ActivityAdd: { type: String },
  ActivityRemove: { type: String },
  HoneyStores: { type: String, required: true },
  PollenStores: { type: String, required: true },

  BeeHealth: {
    disease: { type: String, required: true },
    treatment: { type: String, required: true },
    duration: {
      from: { type: Date, required: true, default: Date.now },
      to: { type: Date, required: true, default: Date.now }
    },
    quantity: { type: Number, required: true, default: 0 },
    doses: { type: String, required: true },
    note:{ type: String }

  },
  SpottedProblems: {
    pests: { type: String},
    predation: { type: String},
    equipment: { type: String },
    actiontaken: { type: String },
    note: { type: String}
  },
  Weather: {
    conditions: { type: String, required: true },
    temperature: { type: Number, required: true, default: 0 },
    humidity: { type: Number, required: true, default: 0 },
    pressure: { type: Number, required: true, default: 0 },
    windspeed: { type: Number, required: true, default: 0 },
    winddirection: { type: Number, required: true, default: 0 }
  },
  Note: { type: String },

  Hive: { type: mongoose.Schema.Types.ObjectId, ref: 'Hive', required: true },

}, {
  timestamps: true,
});

const Inspection = mongoose.model('Inspection', inspectionSchema);

module.exports = Inspection;
