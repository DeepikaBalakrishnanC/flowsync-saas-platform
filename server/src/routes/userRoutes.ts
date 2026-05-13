import express from "express";

import {
  authMiddleware,
  AuthRequest
} from "../middleware/authMiddleware";

const router = express.Router();


// Protected Route
router.get(

  "/profile",

  authMiddleware,

  (req: AuthRequest, res) => {

    res.json({

      success: true,

      message:
        "Protected Route Accessed 🚀",

      user: req.user,

    });

  }

);

export default router;