const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name is required
  },
  email: {
    type: String,
    required: true, // Email is required
    unique: true, // Email must be unique
    lowercase: true, // Store email in lowercase
    trim: true, // Remove unnecessary spaces
  },
  password: {
    type: String,
    required: true, // Password is required
  },
  isEmailConfirmed: { type: Boolean, default: false },
});

module.exports = mongoose.model("user", UserSchema);
