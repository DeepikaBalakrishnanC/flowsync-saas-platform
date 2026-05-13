import express from "express";

import {

  createTask,

  getTasks,

  updateTask,

  deleteTask

} from "../controllers/taskController";

import {
  authMiddleware
} from "../middleware/authMiddleware";

const router = express.Router();


// Create Task
router.post(

  "/",

  authMiddleware,

  createTask

);


// Get Tasks
router.get(

  "/",

  authMiddleware,

  getTasks

);


// Update Task
router.put(

  "/:id",

  authMiddleware,

  updateTask

);


// Delete Task
router.delete(

  "/:id",

  authMiddleware,

  deleteTask

);

export default router;