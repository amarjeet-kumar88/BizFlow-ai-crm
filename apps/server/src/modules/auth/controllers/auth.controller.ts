import type { Request, Response } from "express";

import { AuthService } from "../../../services/auth.service";

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const user = await authService.register(req.body);

      return res.status(201).json({
        success: true,
        data: user,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const result = await authService.login(req.body);

      res.cookie(
        "accessToken",
        result.accessToken,
        {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
        }
      );

      res.cookie(
        "refreshToken",
        result.refreshToken,
        {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
        }
      );

      return res.json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}