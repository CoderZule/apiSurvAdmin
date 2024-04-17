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

const fetchUsers = async (req, res) => {
  try {
      const Users = await User.find();
      res.json({ success: true, data: Users });
  } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

async function createUser(req, res) {
  try {
      // Extract user data from the request body
      const userData = req.body;

      // Check if the user already exists by email
      const existingUser = await User.findOne({ Email: userData.Email });
      if (existingUser) {
          console.log('User already exists.');
          return res.status(400).json({ message: 'User already exists' }); // Return a 400 status code and error message
      } else {
          // Create a new user with the provided data
          const newUser = new User(userData);
          await newUser.save();
          console.log('User created successfully.');
          return res.status(201).json({ message: 'User created successfully', user: newUser }); // Return a 201 status code and the newly created user object
      }
  } catch (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({ message: 'Internal server error' }); // Return a 500 status code and error message
  }
}

module.exports = {
    AdminUser: AdminUser,
    loginUser: loginUser,
    fetchUsers: fetchUsers,
    createUser: createUser
}