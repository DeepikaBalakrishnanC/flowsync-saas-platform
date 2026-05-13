import { Request, Response } from "express";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import User from "../models/User";
import Subscription from "../models/Subscription";


// REGISTER
export const register = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      name,
      email,
      password
    } = req.body;


    // Check existing user
    const existingUser =
      await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        success: false,
        message: "User already exists",
      });

    }


    // Hash password
    const hashedPassword =
      await bcrypt.hash(password, 10);


    // Create user
    const user = await User.create({

      name,

      email,

      password: hashedPassword,

    });

    const periodEnd = new Date();
    periodEnd.setMonth(periodEnd.getMonth() + 1);

    await Subscription.create({
      user: user._id,
      plan: "free",
      status: "active",
      currentPeriodEnd: periodEnd,
      price: 0,
    });


    // JWT Token
    const token = jwt.sign(

      {
        id: user._id,
        role: user.role,
      },

      process.env.JWT_SECRET!,

      { expiresIn: "7d" }

    );


    // Response
    res.status(201).json({

      success: true,

      message:
        "User registered successfully",

      token,

      user,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: "Server Error",

    });

  }

};


// LOGIN
export const login = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      email,
      password
    } = req.body;


    // Find user
    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(400).json({

        success: false,

        message: "Invalid credentials",

      });

    }


    // Compare password
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({

        success: false,

        message: "Invalid credentials",

      });

    }


    // Generate token
    const token = jwt.sign(

      {
        id: user._id,
        role: user.role
    },

      process.env.JWT_SECRET!,

      { expiresIn: "7d" }

    );


    // Response
    res.status(200).json({

      success: true,

      message: "Login successful",

      token,

      user,

    });

  } catch (error) {

  console.log(error);

  res.status(500).json({

    success: false,

    message: error,

  });

}

};
