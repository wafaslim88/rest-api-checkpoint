const express = require("express")
const app = express()
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
    console.log('Connected to the database');
    })
    .catch((error) => {
    console.error('Error connecting to the database:', error);
    });

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//routes

// GET: Return all users
app.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.send(users);
    } catch (error) {
      res.status(500).send('Failed to get users');
    }
  });
  

// POST: Add a new user to the database
app.post('/users', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const newUser = new User({ name, email, phone });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add user' });
  }
});

// PUT: Edit a user by ID
app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, phone },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// DELETE: Remove a user by ID
app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});
