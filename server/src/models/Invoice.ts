import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  subscription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subscription",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["paid", "open", "void"],
    default: "paid",
  },
  invoiceNumber: {
    type: String,
    required: true,
    unique: true,
  },
  paidAt: {
    type: Date,
  },
}, {
  timestamps: true,
});

invoiceSchema.set("toJSON", {
  transform: (_doc, ret) => {
    const invoice = ret as Record<string, unknown>;
    invoice.id = invoice._id?.toString();
    invoice.userId = invoice.user?.toString();
    invoice.subscriptionId = invoice.subscription?.toString();
    delete invoice._id;
    delete invoice.__v;
    delete invoice.user;
    delete invoice.subscription;
    return ret;
  },
});

export default mongoose.model("Invoice", invoiceSchema);
