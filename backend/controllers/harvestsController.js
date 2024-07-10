const Harvest = require('../models/harvest');
const Storage = require('../models/storage');

const HarvestProducts = ["Miel", "Pollen", "Cire d'abeille", "Propolis", "Gelée royale", "Pain d'abeille", "Venin d'abeille"];


async function createHarvest(req, res) {
    try {
        const harvestData = req.body;

        const newHarvest = new Harvest({
            Product: harvestData.Product,
            Quantity: Number(harvestData.Quantity), // Explicitly convert to number
            Unit: harvestData.Unit,
            Season: harvestData.Season,
            HarvestMethods: harvestData.HarvestMethods,
            QualityTestResults: harvestData.QualityTestResults,
            Date: harvestData.Date,
            Apiary: harvestData.Apiary,
            Hive: harvestData.Hive
        });

        await newHarvest.save();

        let storageEntry = await Storage.findOne({ Product: harvestData.Product });

        if (!storageEntry) {
            storageEntry = new Storage({
                Product: harvestData.Product,
                Quantities: [{
                    Total: Number(harvestData.Quantity), // Explicitly convert to number
                    Unit: harvestData.Unit
                }]
            });
        } else {
            const quantityEntry = storageEntry.Quantities.find(q => q.Unit === harvestData.Unit);
            if (quantityEntry) {
                quantityEntry.Total += Number(harvestData.Quantity); // Explicitly convert to number
            } else {
                storageEntry.Quantities.push({
                    Total: Number(harvestData.Quantity), // Explicitly convert to number
                    Unit: harvestData.Unit
                });
            }
        }

        await storageEntry.save();

        return res.status(201).json({ message: 'Harvest entry created successfully', harvest: newHarvest });
    } catch (error) {
        console.error('Error creating harvest entry:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function seedStorage() {
    for (const product of HarvestProducts) {
        const existingProduct = await Storage.findOne({ Product: product });
        if (!existingProduct) {
            const newProduct = new Storage({
                Product: product,
                Quantities: []
            });
            await newProduct.save();
        }
    }
}

async function fetchHarvests(req, res) {
    try {
        const harvests = await Harvest.find();
        res.json({ success: true, data: harvests });
    } catch (error) {
        console.error('Error fetching harvests:', error);
        res.status(500).json({ error: 'Internal server error' });
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

        const oldHarvest = await Harvest.findById(_id);
        if (!oldHarvest) {
            return res.status(404).json({ message: 'Harvest entry not found' });
        }

        const harvest = await Harvest.findByIdAndUpdate(_id, editedHarvestData, { new: true });
        if (!harvest) {
            return res.status(404).json({ message: 'Harvest entry not found' });
        }

        let storageEntry = await Storage.findOne({ Product: oldHarvest.Product });

        if (storageEntry) {
            const oldQuantity = Number(oldHarvest.Quantity); // Explicitly convert to number
            const newQuantity = Number(editedHarvestData.Quantity); // Explicitly convert to number

            const oldQuantityEntryIndex = storageEntry.Quantities.findIndex(q => q.Unit === oldHarvest.Unit);
            const newQuantityEntryIndex = storageEntry.Quantities.findIndex(q => q.Unit === editedHarvestData.Unit);

            if (oldQuantityEntryIndex !== -1) {
                storageEntry.Quantities[oldQuantityEntryIndex].Total -= oldQuantity;
                if (storageEntry.Quantities[oldQuantityEntryIndex].Total <= 0) {
                    storageEntry.Quantities.splice(oldQuantityEntryIndex, 1);
                }
            }

            if (newQuantityEntryIndex !== -1) {
                storageEntry.Quantities[newQuantityEntryIndex].Total += newQuantity;
            } else {
                storageEntry.Quantities.push({
                    Total: newQuantity,
                    Unit: editedHarvestData.Unit
                });
            }

            await storageEntry.save();
        }

        return res.status(200).json({ message: 'Harvest entry updated successfully', harvest });
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

        let storageEntry = await Storage.findOne({ Product: deletedHarvest.Product });
        if (storageEntry) {
            const deletedQuantity = Number(deletedHarvest.Quantity); // Explicitly convert to number

            const unitIndex = storageEntry.Quantities.findIndex(q => q.Unit === deletedHarvest.Unit);
            if (unitIndex !== -1) {
                storageEntry.Quantities[unitIndex].Total -= deletedQuantity;
                if (storageEntry.Quantities[unitIndex].Total <= 0) {
                    storageEntry.Quantities.splice(unitIndex, 1);
                }
            }

            await storageEntry.save();
        }

        return res.json({ message: 'Harvest entry deleted successfully' });
    } catch (error) {
        console.error('Error deleting harvest entry:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    fetchHarvests: fetchHarvests,
    createHarvest: createHarvest,
    getHarvestById: getHarvestById,
    editHarvest: editHarvest,
    deleteHarvest: deleteHarvest,
    seedStorage: seedStorage
};
