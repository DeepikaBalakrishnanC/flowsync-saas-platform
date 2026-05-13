import { Response } from "express";

import Invoice from "../models/Invoice";
import Project from "../models/Project";
import Subscription from "../models/Subscription";
import Task from "../models/Task";
import User from "../models/User";
import { AuthRequest } from "../middleware/authMiddleware";

export const getAdminDashboard = async (_req: AuthRequest, res: Response) => {
  try {
    const [users, projects, tasks, subscriptions, invoices] = await Promise.all([
      User.find().select("-password").sort({ createdAt: -1 }).limit(25),
      Project.find().populate("owner", "name email").sort({ updatedAt: -1 }).limit(20),
      Task.find().populate("project", "name").sort({ updatedAt: -1 }).limit(20),
      Subscription.find().sort({ updatedAt: -1 }).limit(25),
      Invoice.find().sort({ createdAt: -1 }).limit(25),
    ]);

    const monthlyRecurringRevenue = subscriptions
      .filter((subscription) => subscription.status === "active")
      .reduce((total, subscription) => total + subscription.price, 0);

    res.status(200).json({
      success: true,
      metrics: {
        users: users.length,
        projects: projects.length,
        tasks: tasks.length,
        monthlyRecurringRevenue,
      },
      users,
      projects,
      tasks,
      subscriptions,
      invoices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to load admin dashboard",
    });
  }
};

export const updateUserRole = async (req: AuthRequest, res: Response) => {
  try {
    const { role, accountStatus } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role, accountStatus },
      { new: true, runValidators: true },
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "User updated",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to update user",
    });
  }
};
