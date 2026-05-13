import express from "express";

import {

  createProject,

  getProjects,

  updateProject,

  deleteProject

} from "../controllers/projectController";

import {
  authMiddleware
} from "../middleware/authMiddleware";

const router = express.Router();


// Create Project
router.post(

  "/",

  authMiddleware,

  createProject

);


// Get All Projects
router.get(

  "/",

  authMiddleware,

  getProjects

);


// Update Project
router.put(

  "/:id",

  authMiddleware,

  updateProject

);


// Delete Project
router.delete(

  "/:id",

  authMiddleware,

  deleteProject

);

export default router;