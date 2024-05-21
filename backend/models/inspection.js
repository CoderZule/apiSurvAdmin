const mongoose = require('mongoose');

const inspectionSchema = new mongoose.Schema({

    InspectorName: { type: String, required: true },
    InspectionDate: { type: Date, required: true, default: Date.now },
    Brood: { type: String, required: true },
    BroodChamberMales: { type: Number, required: true, default: 0 },
    Drones: { type: Number, required: true, default: 0 },
    BeeFeed: { type: String, required: true },
    Added: { type: String },
    Removed: { type: String },
    SpottedProblems: {
      
      },
    Weather: {

    },
    Note: { type: String },
    
    Hive: { type: mongoose.Schema.Types.ObjectId, ref: 'Hive', required: true },

}, {
    timestamps: true,
});

const Inspection = mongoose.model('Inspection', inspectionSchema);

module.exports = Inspection;
