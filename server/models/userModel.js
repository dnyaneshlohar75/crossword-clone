const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  
  email: {
    type: String,
    required: true,
    unique: true, 
    trim: true,
    lowercase: true, // Convert email to lowercase
  },
  mobileNumber: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['User', 'Admin'], 
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;