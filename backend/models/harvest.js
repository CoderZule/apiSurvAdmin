const mongoose = require('mongoose');


const harvestSchema = new mongoose.Schema({

  Product: { type: String, required: true },
  Quantity: { type: Number, required: true },
  Unit: { type: String, required: true },
  Season: { type: String, required: true },
  HarvestMethods: { type: String, required: true },
  QualityTestResults: { type: String, required: true },
  Date: { type: Date, required: true, default: Date.now },

  Apiary: { type: String, required: true },
  Hive: { type: String, required: true },

}, {
  timestamps: true,
})

harvestSchema.statics.calculateTotalUnits = async function() {
  try {
    const pipeline = [
      {
        $group: {
          _id: { Product: '$Product', Unit: '$Unit' },
          totalUnits: { $sum: '$Quantity' }
        }
      }
    ];

    const totals = await this.aggregate(pipeline);

    // Restructure the totals into a more usable format
    const formattedTotals = {};
    totals.forEach(item => {
      const { Product, Unit } = item._id;
      if (!formattedTotals[Product]) {
        formattedTotals[Product] = {};
      }
      formattedTotals[Product][Unit] = item.totalUnits;
    });

    return formattedTotals;
  } catch (error) {
    throw new Error(`Error calculating total units: ${error.message}`);
  }
};

const Harvest = mongoose.model('Harvest', harvestSchema);

module.exports = Harvest;