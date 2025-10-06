const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isPremium: { type: Boolean, default: false },
  // ADD THESE TWO FIELDS
  passwordResetToken: String,
  passwordResetExpires: Date,
});


// CRITICAL: The name here must be 'user'
module.exports = mongoose.model('user', UserSchema);