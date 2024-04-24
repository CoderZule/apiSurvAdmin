const Hive = require('../models/hive');

const fetchHives = async (req, res) => {
    try {
         const Hives = await Hive.find().populate('Apiary');  

        res.json({ success: true, data: Hives });
    } catch (error) {
        console.error('Error fetching hives:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createHive = async (req, res) => {
    try {
        const { Color, Type, Source, Purpose, Added, Note, Colony, Queen, Apiary } = req.body;

         if (!Color || !Type || !Source || !Purpose || !Added || !Note || !Colony || !Queen || !Apiary) {
            return res.status(400).json({ error: 'Please provide all required fields' });
        }

         const newHive = new Hive({
            Color, Type, Source, Purpose, Added, Note, Colony, Queen, Apiary
        });

         await newHive.save();

        res.status(201).json({ success: true, message: 'Hive added successfully', data: newHive });
    } catch (error) {
        console.error('Error adding hive:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

async function getHiveById(req, res) {
    try {
      const { id } = req.params; 
      const hive = await Hive.findById(id);
      
      if (!hive) {
        return res.status(404).json({ message: 'Hive not found' });
      }
      
      res.json(hive);
    } catch (error) {
      console.error('Error getting hive:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  
  
  async function editHive(req, res) {
    try {
      const editedHiveData = req.body; 
      const { _id } = editedHiveData;
  
      const hive = await Hive.findByIdAndUpdate(_id, editedHiveData, { new: true });
  
      if (!hive) {
        return res.status(404).json({ message: 'Hive not found' });
      }
      
      res.send("Hive updated successfully");
    } catch (error) {
      console.error('Error updating hive:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  
  async function deleteHive(req, res) {
    try {
      const { hiveid } = req.body; 
      const deletedHive = await Hive.findByIdAndDelete(hiveid);
      
      if (!deletedHive) {
        return res.status(404).json({ message: 'Hive not found' });
      }
      
      res.send('Hive deleted successfully');
    } catch (error) {
      console.error('Error deleting hive:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

module.exports = {
    fetchHives: fetchHives,
    createHive: createHive,
    getHiveById: getHiveById,
    editHive: editHive,
    deleteHive: deleteHive

}