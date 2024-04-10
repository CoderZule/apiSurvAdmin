const Rucher = require('../models/rucher');

const fetchRuchers = async (req, res) => {
    try {
        const ruchers = await Rucher.find();
        res.json({ success: true, data: ruchers });
    } catch (error) {
        console.error('Error fetching ruchers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createRucher = async (req, res) => {
    try {
        const { name, type, location, sunExposure, owner } = req.body;

        // Validate required fields
        if (!name || !type || !location || !sunExposure || !owner) {
            return res.status(400).json({ error: 'Please provide all required fields' });
        }

        // Create a new Rucher object
        const newRucher = new Rucher({
            name,
            type,
            location,
            sunExposure,
            owner
        });

        // Save the new Rucher to the database
        await newRucher.save();

        res.status(201).json({ success: true, message: 'Rucher added successfully', data: newRucher });
    } catch (error) {
        console.error('Error adding rucher:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    fetchRuchers: fetchRuchers,
    createRucher: createRucher
}