import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";


// Extend Express Request
export interface AuthUser {
  id: string;
  role: "admin" | "user" | "guest";
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}


export const authMiddleware = (

  req: AuthRequest,

  res: Response,

  next: NextFunction

) => {

  try {

    // Get token
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7)
      : authHeader;


    // Check token
    if (!token) {

      return res.status(401).json({

        success: false,

        message: "Unauthorized",

      });

    }


    // Verify token
    const decoded = jwt.verify(

      token,

      process.env.JWT_SECRET!

    ) as AuthUser;


    // Attach user
    req.user = decoded;

    next();

  } catch (error) {

    return res.status(401).json({

      success: false,

      message: "Invalid token",

    });

  }

};
// ROLE AUTHORIZATION

export const authorizeRoles = (

  ...roles: string[]

) => {

  return (

    req: AuthRequest,

    res: Response,

    next: NextFunction

  ) => {

    try {

      // Get user role
      const userRole = req.user?.role;


      // Check access
      if (!userRole || !roles.includes(userRole)) {

        return res.status(403).json({

          success: false,

          message:
            "Access Denied",

        });

      }


      next();

    } catch (error) {

      return res.status(500).json({

        success: false,

        message: "Server Error",

      });

    }

  };

};
