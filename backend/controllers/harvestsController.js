const Harvest = require('../models/harvest');

async function fetchHarvests(req, res) {
    try {
        const harvests = await Harvest.find();
        res.json({ success: true, data: harvests });
    } catch (error) {
        console.error('Error fetching harvests:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function createHarvest(req, res) {
    try {
        const harvestData = req.body;

        const newHarvest = new Harvest({
            Product: harvestData.Product,
            Quantity: harvestData.Quantity,
            Unit: harvestData.Unit,
            Season: harvestData.Season,
            HarvestMethods: harvestData.HarvestMethods,
            QualityTestResults: harvestData.QualityTestResults,
            Date: harvestData.Date,
            Apiary: harvestData.Apiary,
            Hive: harvestData.Hive
        });

        await newHarvest.save();
        console.log('Harvest entry created successfully.');
        return res.status(201).json({ message: 'Harvest entry created successfully', harvest: newHarvest });
    } catch (error) {
        console.error('Error creating harvest entry:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function getHarvestById(req, res) {
    try {
        const { id } = req.params;
        const harvest = await Harvest.findById(id);

        if (!harvest) {
            return res.status(404).json({ message: 'Harvest entry not found' });
        }

        res.json(harvest);
    } catch (error) {
        console.error('Error getting harvest entry:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function editHarvest(req, res) {
    try {
        const editedHarvestData = req.body;
        const { _id } = editedHarvestData;

        const harvest = await Harvest.findByIdAndUpdate(_id, editedHarvestData, { new: true });

        if (!harvest) {
            return res.status(404).json({ message: 'Harvest entry not found' });
        }

        res.send('Harvest entry updated successfully');
    } catch (error) {
        console.error('Error updating harvest entry:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function deleteHarvest(req, res) {
    try {
        const { harvestId } = req.params;
        const deletedHarvest = await Harvest.findByIdAndDelete(harvestId);
        
        if (!deletedHarvest) {
            return res.status(404).json({ message: 'Harvest entry not found' });
        }

        res.send('Harvest entry deleted successfully');
    } catch (error) {
        console.error('Error deleting harvest entry:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


async function getTotals(req,res) {
    try {
      const totals = await Harvest.calculateTotalUnits();
      res.json({ success: true, data: totals });
 
    } catch (error) {
        console.error('Error fetching harvest total:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
  }


  async function updateQuantity(req, res) {
    try {
        const { product, unit, quantity } = req.body;

        const harvest = await Harvest.findOne({ Product: product, Unit: unit });

        if (!harvest) {
            return res.status(404).json({ message: 'Harvest entry not found' });
        }

        const currentQuantity = harvest.Quantity;

        if (parseFloat(quantity) > currentQuantity) {
            return res.status(400).json({ message: 'La nouvelle quantité doit être inférieure à la quantité actuelle.' });
        }

        harvest.Quantity = parseFloat(quantity);
        await harvest.save();

        res.status(200).json({ message: 'Harvest quantity updated successfully', harvest });
    } catch (error) {
        console.error('Error updating harvest quantity:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    fetchHarvests: fetchHarvests,
    createHarvest: createHarvest,
    getHarvestById: getHarvestById,
    editHarvest: editHarvest,
    deleteHarvest: deleteHarvest,
    getTotals: getTotals,
    updateQuantity: updateQuantity

};
