const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  message: {
    type: String,
    required: [true, "Must provide a message"],
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now  
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true  
  }
});


module.exports = mongoose.model('Task', TaskSchema)