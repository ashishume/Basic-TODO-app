const mongoose = require("mongoose");
// Define the Todo schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  taskStatus: {
    type: String,
    // enum: ["To Do", "In Progress", "Done"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
});

// Create the Task model
const Task = mongoose.model("tasks", taskSchema);

module.exports = Task;
