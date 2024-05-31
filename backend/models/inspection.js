const mongoose = require('mongoose');

const inspectionSchema = new mongoose.Schema({

  Inspector: {
    firstName: { type: String },
    lastName: { type: String },
    cin: { type: String  },
  }, //المتفقد		

  InspectionDateTime: { type: Date, default: Date.now },
  //التاريخ		

  ApiaryAndHive: {
    apiaryName:{ type: String },
    hiveType: { type: String },
  },
  Queen: {
    seen: { type: Boolean },
    isMarked: { type: Boolean },
    color: { type: String },
    clipped: { type: Boolean },
    temperament: { type: String },
    note: { type: String },
    queenCells: { type: String },
    isSwarmed: { type: Boolean }
  },
  Colony: {
    strength: { type: String },
    temperament: { type: String },
    deadBees: { type: Boolean},
    supers: { type: Number },
    pollenFrames: { type: Number},
    TotalFrames: { type: Number },
    note: { type: String},

  },
  Brood: {
    state: { type: String }, //حضنة		
    maleBrood: { type: String },//حضنة الذكور	
    totalBrood: { type: Number, default: 0 },//جملي الحضنة
  },

  DronesSeen: { type: Boolean }, //ذكور	

  Supplies: { //التغذية 
    product: { type: String },
    ingredients: {
      name: { type: String },
      quantity: { type: Number, default: 0 },
      unit: { type: String }
    },
    note: { type: String }
  },

  BeeHealth: {
    disease: { type: String },
    treatment: { type: String },
    duration: {
      from: { type: Date, default: Date.now },
      to: { type: Date, default: Date.now }
    },
    quantity: { type: Number, default: 0 },
    doses: { type: String },
    note: { type: String }
  },

  HoneyStores: { type: String },
  PollenStores: { type: String },

  Adding: {
    ActivityAdd: { type: String },
    QuantityAdded: { type: Number, default: 0 }
  },
 Removing: {
  ActivityRemove: { type: String },
  QuantityRemoved:{ type: Number, default: 0 }
 },
  ActivityAdd: { type: String }, //إضافة 
  ActivityRemove: { type: String }, //حدف		

  Weather: {
    condition: { type: String },
    temperature: { type: Number, default: 0 },
    humidity: { type: Number, default: 0 },
    pressure: { type: Number, default: 0 },
    windSpeed: { type: Number, default: 0 },
    windDirection: { type: Number, default: 0 }
  },

  Note: { type: String },

  Hive: { type: mongoose.Schema.Types.ObjectId, ref: 'Hive', required: true },

}, {
  timestamps: true,
});

const Inspection = mongoose.model('Inspection', inspectionSchema);

module.exports = Inspection;
