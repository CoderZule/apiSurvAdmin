const Inspection = require('../models/inspection');


const fetchInspections = async (req, res) => {
    try {
        const inspections = await Inspection.find().populate('Hive');
        res.json({ success: true, data: inspections });
    } catch (error) {
        console.error('Error fetching inspections:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createInspection = async (req, res) => {
    try {
        // Destructure required fields from req.body
        const { InspectorName, InspectionDate, Brood, BroodChamberMales, Drones, BeeFeed, Feeding, ActivityAdd, ActivityRemove, HoneyStores, PollenStores, BeeHealth, SpottedProblems, Weather, Note, Hive } = req.body;

        // Validate required fields
        if (!InspectorName || !InspectionDate || !Brood || !BroodChamberMales || !Drones || !BeeFeed || !Feeding  || !HoneyStores || !PollenStores || !BeeHealth || !SpottedProblems || !Weather || !Hive) {
            return res.status(400).json({ error: 'Please provide all required fields' });
        }

        const newInspection = new Inspection({
            InspectorName,
            InspectionDate,
            Brood,
            BroodChamberMales,
            Drones,
            BeeFeed,
            Feeding,
            ActivityAdd,
            ActivityRemove,
            HoneyStores,
            PollenStores,
            BeeHealth,
            SpottedProblems,
            Weather,
            Note,
            Hive
        });

        await newInspection.save();

        res.status(201).json({ success: true, message: 'Inspection added successfully', data: newInspection });
    } catch (error) {
        console.error('Error adding inspection:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

async function getInspectionById(req, res) {
    try {
        const { id } = req.params;
        const inspection = await Inspection.findById(id);

        if (!inspection) {
            return res.status(404).json({ message: 'Inspection not found' });
        }

        res.json(inspection);
    } catch (error) {
        console.error('Error getting inspection:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function editInspection(req, res) {
    try {
        const editedInspectionData = req.body;
        const { _id } = editedInspectionData;

        const inspection = await Inspection.findByIdAndUpdate(_id, editedInspectionData, { new: true });

        if (!inspection) {
            return res.status(404).json({ message: 'Inspection not found' });
        }

        res.send("Inspection updated successfully");
    } catch (error) {
        console.error('Error updating inspection:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function deleteInspection(req, res) {
    try {
        const { inspectionId } = req.body;
        const deletedInspection = await Inspection.findByIdAndDelete(inspectionId);

        if (!deletedInspection) {
            return res.status(404).json({ message: 'Inspection not found' });
        }

        res.send('Inspection deleted successfully');
    } catch (error) {
        console.error('Error deleting inspection:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    fetchInspections: fetchInspections,
    createInspection: createInspection,
    getInspectionById: getInspectionById,
    editInspection: editInspection,
    deleteInspection: deleteInspection
}
