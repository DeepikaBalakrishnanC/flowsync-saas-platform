import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["admin", "user", "guest"],
    default: "user",
  },

  subscriptionPlan: {
    type: String,
    enum: ["free", "pro", "enterprise"],
    default: "free",
  },

  accountStatus: {
    type: String,
    enum: ["active", "invited", "suspended"],
    default: "active",
  },

}, {
  timestamps: true,
});

userSchema.set("toJSON", {
  transform: (_doc, ret) => {
    const user = ret as Record<string, unknown>;
    user.id = user._id?.toString();
    delete user._id;
    delete user.__v;
    delete user.password;
    return ret;
  },
});

export default mongoose.model(
  "User",
  userSchema
);
