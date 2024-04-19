const User = require('../models/user');
const mongoose = require('mongoose');


// Define admin user data
const adminUserData = {
    Firstname: 'Mariem',
    Lastname: 'Derbali',
    Cin: '09999999',
    Email: 'admin@apisurv.com',
    Password: 'admin',
    Role: 'Admin'
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
            Role: user.Role,
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
       const userData = req.body;

       const existingUser = await User.findOne({ Email: userData.Email });
      if (existingUser) {
          console.log('User already exists.');
          return res.status(400).json({ message: 'User already exists' }); 
      } else {
           const newUser = new User(userData);
          await newUser.save();
          console.log('User created successfully.');
          return res.status(201).json({ message: 'User created successfully', user: newUser }); 
      }
  } catch (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({ message: 'Internal server error' }); 
  }
}

async function getUserById(req, res) {
  try {
    const { id } = req.params; // Access the user ID from the route parameters
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error getting user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}



async function editUser(req, res) {
  try {
    const editedUserData = req.body; 
    const { _id } = editedUserData;

    const user = await User.findByIdAndUpdate(_id, editedUserData, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.send("User updated successfully");
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}


async function deleteUser(req, res) {
  try {
    const { userid } = req.body; 
    const deletedUser = await User.findByIdAndDelete(userid);
    
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.send('User deleted successfully');
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}



module.exports = {
    AdminUser: AdminUser,
    loginUser: loginUser,
    fetchUsers: fetchUsers,
    createUser: createUser,
    getUserById: getUserById,
    editUser:editUser,
    deleteUser:deleteUser
}