import express from "express";

import {
  cancelSubscription,
  changeSubscription,
  getSubscription,
} from "../controllers/subscriptionController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware, getSubscription);
router.post("/checkout", authMiddleware, changeSubscription);
router.post("/cancel", authMiddleware, cancelSubscription);

export default router;
