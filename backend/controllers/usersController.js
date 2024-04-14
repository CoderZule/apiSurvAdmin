const User = require('../models/user');
const mongoose = require('mongoose');


// Define admin user data
const adminUserData = {
    username: 'admin',
    email: 'admin@apisurv.com',
    password: 'admin',
    RoleAdmin: true
  };

  
// Seeder function
async function AdminUser() {
    try {
      // Check if admin user already exists
      const existingAdminUser = await User.findOne({ email: adminUserData.email });
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
        const { email, password } = req.body;

        // Find the user by email and password
        const user = await User.findOne({ email, password });

        // If user not found, return error
        if (!user) {
            return res.status(401).json({ message: 'La connexion a échoué' });
        }

        // If user found, return user data
        const currentUser = {
            username: user.username,
            email: user.email,
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