import { Response } from "express";

import Invoice from "../models/Invoice";
import Subscription from "../models/Subscription";
import User from "../models/User";
import { AuthRequest } from "../middleware/authMiddleware";

const planPrices = {
  free: 0,
  pro: 29,
  enterprise: 99,
};

const nextPeriodEnd = () => {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  return date;
};

const createInvoiceNumber = () => `INV-${Date.now().toString().slice(-8)}`;

export const getSubscription = async (req: AuthRequest, res: Response) => {
  try {
    const subscription = await Subscription.findOne({ user: req.user?.id });
    const invoices = await Invoice.find({ user: req.user?.id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      subscription,
      invoices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to load subscription",
    });
  }
};

export const changeSubscription = async (req: AuthRequest, res: Response) => {
  try {
    const plan = req.body.plan as keyof typeof planPrices;

    if (!plan || !(plan in planPrices)) {
      return res.status(400).json({
        success: false,
        message: "Invalid subscription plan",
      });
    }

    const subscription = await Subscription.findOneAndUpdate(
      { user: req.user?.id },
      {
        user: req.user?.id,
        plan,
        status: "active",
        currentPeriodStart: new Date(),
        currentPeriodEnd: nextPeriodEnd(),
        price: planPrices[plan],
      },
      { new: true, upsert: true },
    );

    await User.findByIdAndUpdate(req.user?.id, { subscriptionPlan: plan });

    const invoice = await Invoice.create({
      user: req.user?.id,
      subscription: subscription._id,
      amount: planPrices[plan],
      status: "paid",
      invoiceNumber: createInvoiceNumber(),
      paidAt: new Date(),
    });

    res.status(200).json({
      success: true,
      message: "Payment simulated and subscription updated",
      subscription,
      invoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to update subscription",
    });
  }
};

export const cancelSubscription = async (req: AuthRequest, res: Response) => {
  try {
    const subscription = await Subscription.findOneAndUpdate(
      { user: req.user?.id },
      { status: "canceled" },
      { new: true },
    );

    res.status(200).json({
      success: true,
      message: "Subscription canceled",
      subscription,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to cancel subscription",
    });
  }
};
