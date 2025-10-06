const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user', // This must match the name from User.js
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('note', NoteSchema);