const { upperCase } = require('lodash');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  due_date: {
    type: Date
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium',
  },
  status: {
    type: String,
    enum: ['incomplete', 'complete'],
    default: 'incomplete'
  },
  user_id: {
    type: String, // You might want to use ObjectId if referencing users
    required: true
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
