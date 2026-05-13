import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  plan: {
    type: String,
    enum: ["free", "pro", "enterprise"],
    default: "free",
  },
  status: {
    type: String,
    enum: ["active", "canceled", "past_due", "trialing"],
    default: "active",
  },
  currentPeriodStart: {
    type: Date,
    default: Date.now,
  },
  currentPeriodEnd: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  paymentMethod: {
    brand: {
      type: String,
      default: "Simulated Card",
    },
    last4: {
      type: String,
      default: "4242",
    },
  },
}, {
  timestamps: true,
});

subscriptionSchema.set("toJSON", {
  transform: (_doc, ret) => {
    const subscription = ret as Record<string, unknown>;
    subscription.id = subscription._id?.toString();
    subscription.userId = subscription.user?.toString();
    delete subscription._id;
    delete subscription.__v;
    delete subscription.user;
    return ret;
  },
});

export default mongoose.model("Subscription", subscriptionSchema);
