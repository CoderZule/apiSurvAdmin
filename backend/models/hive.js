const mongoose = require('mongoose');

const hiveSchema = new mongoose.Schema({

  Color: { type: String, required: true },
  Type: { type: String,  required: true },
  Source: { type: String, required: true },
  Purpose: { type: String, required: true },
  Note: { type: String },

  Colony: {
    strength: { type: String,  required: true },
    temperament: { type: String, required: true },
    supers: { type: Number, required: true },
    frames: { type: Number, required: true }
  },

  Queen: {
    seen: { type: Boolean, required: true },
    marked: { type: Boolean, required: true  },
    color: { type: String,  required: true },
    hatched: { type: Number, required: true  },
    status: { type: String, required: true },
    installed: { type: Date, default: Date.now },
    queen_state: { type: String, required: true },
    race: { type: String, required: true   },
    clipped: { type: Boolean, default: false },
    origin: { type: String, required: true  },
    temperament: { type: String, required: true  },
    note: { type: String, required: true },

  }
  ,
  Apiary: { type: mongoose.Schema.Types.ObjectId, ref: 'Apiary', required: true },

}, {
  timestamps: true,
});

const Hive = mongoose.model('Hive', hiveSchema);

module.exports = Hive;
