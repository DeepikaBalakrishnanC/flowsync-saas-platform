import { Response } from "express";

import Project from "../models/Project";

import { AuthRequest }
from "../middleware/authMiddleware";


// CREATE PROJECT
export const createProject = async (

  req: AuthRequest,

  res: Response

) => {

  try {

    const {
      name,
      description
    } = req.body;


    const project =
      await Project.create({

        name,

        description,

        owner: req.user!.id,

        members: [req.user!.id],

      });


    res.status(201).json({

      success: true,

      message:
        "Project created successfully",

      project,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: "Server Error",

    });

  }

};


// GET ALL PROJECTS
export const getProjects = async (

  req: AuthRequest,

  res: Response

) => {

  try {

    const projects =
      await Project.find({

        members: req.user!.id

      }).populate(
        "owner",
        "name email"
      );


    res.status(200).json({

      success: true,

      projects,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: "Server Error",

    });

  }

};


// UPDATE PROJECT
export const updateProject = async (

  req: AuthRequest,

  res: Response

) => {

  try {

    const project =
      await Project.findByIdAndUpdate(

        req.params.id,

        req.body,

        { new: true }

      );


    res.status(200).json({

      success: true,

      message:
        "Project updated",

      project,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: "Server Error",

    });

  }

};


// DELETE PROJECT
export const deleteProject = async (

  req: AuthRequest,

  res: Response

) => {

  try {

    await Project.findByIdAndDelete(
      req.params.id
    );


    res.status(200).json({

      success: true,

      message:
        "Project deleted",

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: "Server Error",

    });

  }

};
