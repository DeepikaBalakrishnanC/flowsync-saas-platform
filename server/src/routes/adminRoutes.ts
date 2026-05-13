import express from "express";

import { getAdminDashboard, updateUserRole } from "../controllers/adminController";
import { authMiddleware, authorizeRoles } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/dashboard", authMiddleware, authorizeRoles("admin"), getAdminDashboard);
router.put("/users/:id", authMiddleware, authorizeRoles("admin"), updateUserRole);

export default router;
