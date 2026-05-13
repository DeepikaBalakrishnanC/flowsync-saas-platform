import { Response }
from "express";

import Task from "../models/Task";

import { AuthRequest }
from "../middleware/authMiddleware";

import { getIO }
from "../sockets/socket";

// CREATE TASK
export const createTask = async (

  req: AuthRequest,

  res: Response

) => {

  try {

    const task =
    await Task.create(req.body);

    const io = getIO();

    io.emit(
    "new-task",
    task
    );

    res.status(201).json({

      success: true,

      message:
        "Task created successfully",

      task,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: "Server Error",

    });

  }

};


// GET TASKS
export const getTasks = async (

  req: AuthRequest,

  res: Response

) => {

  try {

    const tasks =
      await Task.find()

      .populate(
        "assignedTo",
        "name email"
      )

      .populate(
        "project",
        "name"
      );


    res.status(200).json({

      success: true,

      tasks,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: "Server Error",

    });

  }

};


// UPDATE TASK
export const updateTask = async (

  req: AuthRequest,

  res: Response

) => {

  try {

    const task =
      await Task.findByIdAndUpdate(

        req.params.id,

        req.body,

        { new: true }

      );

    res.status(200).json({

      success: true,

      message:
        "Task updated",

      task,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: "Server Error",

    });

  }

};


// DELETE TASK
export const deleteTask = async (

  req: AuthRequest,

  res: Response

) => {

  try {

    await Task.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({

      success: true,

      message:
        "Task deleted",

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: "Server Error",

    });

  }

};