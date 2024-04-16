const User = require('../models/user');
const mongoose = require('mongoose');


// Define admin user data
const adminUserData = {
    Firstname: 'Mariem',
    Lastname: 'Derbali',
    Cin: '09999999',
    Email: 'admin@apisurv.com',
    Password: 'admin',
    RoleAdmin: true
  };

  
// Seeder function
async function AdminUser() {
    try {
      // Check if admin user already exists
      const existingAdminUser = await User.findOne({ Email: adminUserData.Email });
      if (existingAdminUser) {
        console.log('Admin user already exists.');
      } else {
        // Create admin user
        const newAdminUser = new User(adminUserData);
        await newAdminUser.save();
        console.log('Admin user seeded successfully.');
      }
    } catch (error) {
      console.error('Error seeding admin user:', error);
    } 
  }


  const loginUser = async (req, res) => {
    try {
        const { Email, Password } = req.body;

        // Find the user by email and password
        const user = await User.findOne({ Email, Password });

        // If user not found, return error
        if (!user) {
            return res.status(401).json({ message: 'La connexion a échoué' });
        }

        // If user found, return user data
        const currentUser = {
            Firstname: user.Firstname,
            Lastname: user.Lastname,
            Cin: user.Cin,
            Email: user.Email,
            RoleAdmin: user.RoleAdmin,
            _id: user._id
        };

        res.json(currentUser);
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = {
    AdminUser: AdminUser,
    loginUser: loginUser
}