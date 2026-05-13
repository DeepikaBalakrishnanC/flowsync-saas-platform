import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ],

  status: {
    type: String,

    enum: [
      "active",
      "completed",
      "archived"
    ],

    default: "active",
  },

}, {
  timestamps: true,
});

export default mongoose.model(
  "Project",
  projectSchema
);