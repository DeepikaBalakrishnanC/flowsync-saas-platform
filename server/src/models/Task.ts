import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },

  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  priority: {

    type: String,

    enum: [
      "low",
      "medium",
      "high"
    ],

    default: "medium",

  },

  status: {

    type: String,

    enum: [
      "todo",
      "in-progress",
      "review",
      "completed"
    ],

    default: "todo",

  },

  dueDate: {
    type: Date,
  },

}, {
  timestamps: true,
});

export default mongoose.model(
  "Task",
  taskSchema
);