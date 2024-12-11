const User = require("../models/User");
const jwt = require('jsonwebtoken');

// Create a new user
const createUser = async (req, res) => {
  try {
    const { name, email, phone, role = 'user' } = req.body;

    // Check if all required fields are present
    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Name, email, and phone are required" });
    }

    console.log('Creating user with data:', { name, email, phone, role });

    // Ensure the user doesn't already exist
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { name, phone, role }
    });

    if (!created) {
      return res.status(409).json({ message: "User with this email already exists" });
    }

    // Generate JWT token for the user using jsonwebtoken (jwt)
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } 
    );
     

    // Send the user data and token in the response
    res.status(201).json({
      user,
      token  
    });
  } catch (error) {
    console.error('Error creating user:', error.message);

    // Handle validation errors
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: "Invalid input data", error: error.errors });
    }

    // General server error
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};



//get Users
const getUsers = async (req, res) => {
  try {
    console.log("Fetching users...");
    const users = await User.findAll();  
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    console.error('Detailed error:', error.original);  // Additional error logging
    res.status(500).json({ message: 'Error fetching users from the database', error: error.message });
  }
};


// Get a single user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error('Error fetching user by ID:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// Update user by ID
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, role } = req.body;
  try {
    const user = await User.findByPk(id);
    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.phone = phone || user.phone;
      user.role = role || user.role; 
      await user.save();
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error('Error updating user:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// Delete user by ID
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error('Error deleting user:', error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};
