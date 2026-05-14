import type {
  Request,
  Response,
  NextFunction,
} from "express";

import jwt from "jsonwebtoken";

import prisma from "../prisma/client";

export interface AuthRequest
  extends Request {
  user?: any;
}

export const authMiddleware =
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {

    try {

      const token =
        req.cookies.accessToken;

      if (!token) {

        return res.status(401).json({
          message: "Unauthorized",
        });

      }

      const decoded: any =
        jwt.verify(
          token,
          process.env.JWT_SECRET as string
        );

      const user =
        await prisma.user.findUnique({
          where: {
            id: decoded.userId,
          },
        });

      if (!user) {

        return res.status(401).json({
          message: "Unauthorized",
        });

      }

      req.user = user;

      next();

    } catch (error) {

      return res.status(401).json({
        message: "Unauthorized",
      });

    }
  };