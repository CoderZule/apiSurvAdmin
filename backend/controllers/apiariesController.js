const Apiary = require('../models/apiary');

const fetchApiaries = async (req, res) => {
    try {
        const Apiaries = await Apiary.find();
        res.json({ success: true, data: Apiaries });
    } catch (error) {
        console.error('Error fetching apiaries:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createApiary = async (req, res) => {
    try {
        const { Name, Forages, Type, Location, SunExposure, Owner } = req.body;

        // Validate required fields
        if (!Name || !Forages || !Type || !Location || !SunExposure || !Owner) {
            return res.status(400).json({ error: 'Please provide all required fields' });
        }

        // Create a new Apiary object
        const newApiary = new Apiary({
            Name,
            Forages,
            Type,
            Location,
            SunExposure,
            Owner
        });

        // Save the new Apiary to the database
        await newApiary.save();

        res.status(201).json({ success: true, message: 'Apiary added successfully', data: newApiary });
    } catch (error) {
        console.error('Error adding apiary:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    fetchApiaries: fetchApiaries,
    createApiary: createApiary
}