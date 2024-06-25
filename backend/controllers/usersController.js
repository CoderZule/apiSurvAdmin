const User = require('../models/user');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

function generateRandomString(length) {
return crypto.randomBytes(length).toString('hex');
}


async function AdminUser() {


  const adminEmail = process.env.ADMIN_EMAIL;

  try {
    const existingAdminUser = await User.findOne({ Email: adminEmail });

    if (existingAdminUser) {
      console.log('Admin user already exists.');
    } else {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

      const newAdminUser = new User({
        Firstname: 'Mariem',
        Lastname: 'Derbali',
        Phone: '4433233',
        Cin: '09999999',
        Email: adminEmail,
        Password: hashedPassword,
        Role: 'Admin'
      });

      await newAdminUser.save();
      console.log('Admin user seeded successfully.');
    }
  } catch (error) {
    console.error('Error seeding admin user:', error);
  }
}

async function loginUser(req, res) {
  const { Email, Password } = req.body;
  const jwtSecret = generateRandomString(32);

  if (!jwtSecret) {
    console.error('JWT secret key is missing.');
    return res.status(500).json({ message: 'Internal server error' });
  }

  try {
    const user = await User.findOne({ Email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(Password, user.Password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });

    const currentUser = {
      Firstname: user.Firstname,
      Lastname: user.Lastname,
      Cin: user.Cin,
      Phone:user.Phone,
      Email: user.Email,
      Role: user.Role,
      FirstTimeLogin: user.FirstTimeLogin,
      _id: user._id

    };


    res.json({ token, currentUser });


  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

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
    }

     const hashedPassword = await bcrypt.hash(userData.Password, 10);
 
    const newUser = new User({
      Firstname: userData.Firstname,
      Lastname: userData.Lastname,
      Phone: userData.Phone,
      Cin: userData.Cin,
      Email: userData.Email,
      Password: hashedPassword,  
      Role: userData.Role
    });

    await newUser.save();
    console.log('User created successfully.');
    return res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}


async function getUserById(req, res) {
  try {
    const { id } = req.params;
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
    const { _id, Password } = editedUserData;

    if (Password) {
      // Hash the new password if provided in the update
      const hashedPassword = await bcrypt.hash(Password, 10);
      editedUserData.Password = hashedPassword;
    }

    const user = await User.findByIdAndUpdate(_id, editedUserData, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.send('User updated successfully');
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


async function changePassword(req, res) {
  const { userId, newPassword } = req.body;

  try {
    // Fetch the current user from the database
    const user = await User.findById(userId);

    // Check if the new password is the same as the current password
    if (user) {
      const isCurrentPassword = await bcrypt.compare(newPassword, user.Password);
      if (isCurrentPassword) {
        return res.status(400).json({ success: false, message: "Le nouveau mot de passe ne peut pas être le même que l'ancien." });
      }
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password and set FirstTimeLogin to false
    await User.findByIdAndUpdate(userId, { Password: hashedPassword, FirstTimeLogin: false });

    res.json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ success: false, message: 'Error changing password' });
  }
}


module.exports = {
  AdminUser: AdminUser,
  loginUser: loginUser,
  fetchUsers: fetchUsers,
  createUser: createUser,
  getUserById: getUserById,
  editUser: editUser,
  deleteUser: deleteUser,
  changePassword: changePassword
}