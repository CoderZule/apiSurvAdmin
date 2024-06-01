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
        const {
            Inspector, InspectionDateTime, ApiaryAndHive, Queen, Colony, Brood,
            DronesSeen,
            Supplies,
            BeeHealth,
            HoneyStores,
            PollenStores,
            Adding,
            Removing,
            Weather,
            Note,
            Hive
        } = req.body;

        // Construct the initial data object
        const data = {
            Inspector,
            InspectionDateTime,
            ApiaryAndHive,
            Queen,
            Colony,
            Brood,
            DronesSeen,
            Supplies,
            BeeHealth,
            HoneyStores,
            PollenStores,
            Adding,
            Removing,
            Weather,
            Note,
            Hive
        };

        // Remove empty fields from the main object and its nested objects
        const filteredData = removeEmptyFields(data);

        const newInspection = new Inspection(filteredData);

        await newInspection.save();

        res.status(201).json({ success: true, message: 'Inspection ajoutée avec succès', data: newInspection });
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'inspection :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
};

const removeEmptyFields = (obj) => {
    const newObj = {};
    Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            const nestedObj = removeEmptyFields(obj[key]);
            if (Object.keys(nestedObj).length > 0) {
                newObj[key] = nestedObj;
            }
        } else if (obj[key] !== '' && obj[key] !== null && obj[key] !== undefined && obj[key] !== 0) {
            newObj[key] = obj[key];
        }
    });
    return newObj;
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
