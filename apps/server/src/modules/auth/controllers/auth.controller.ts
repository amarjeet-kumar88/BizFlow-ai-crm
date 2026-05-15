import type { Request, Response } from "express";

import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export class AuthController {

  async register(
    req: Request,
    res: Response
  ) {
    try {

      const user =
        await authService.register(req.body);

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

  async login(
    req: Request,
    res: Response
  ) {
    try {

      const result =
        await authService.login(
          req.body,
          req.headers["user-agent"],
          req.ip
        );

      const cookieOptions = {
        httpOnly: true,
        secure:
          process.env.NODE_ENV === "production" ||
          req.hostname === "localhost" ||
          req.hostname === "127.0.0.1",
        sameSite: "none" as const,
      };

      res.cookie("accessToken", result.accessToken, cookieOptions);
      res.cookie("refreshToken", result.refreshToken, cookieOptions);

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

  async refresh(
    req: Request,
    res: Response
  ) {
    try {

      const refreshToken =
        req.cookies.refreshToken;

      const result =
        await authService.refreshToken(
          refreshToken
        );

      const cookieOptions = {
        httpOnly: true,
        secure:
          process.env.NODE_ENV === "production" ||
          req.hostname === "localhost" ||
          req.hostname === "127.0.0.1",
        sameSite: "none" as const,
      };

      res.cookie("accessToken", result.accessToken, cookieOptions);
      res.cookie("refreshToken", result.refreshToken, cookieOptions);

      return res.json({
        success: true,
      });

    } catch (error: any) {

      return res.status(401).json({
        success: false,
        message: error.message,
      });

    }
  }

  async logout(
    req: Request,
    res: Response
  ) {

    const refreshToken =
      req.cookies.refreshToken;

    await authService.logout(
      refreshToken
    );

    res.clearCookie("accessToken");

    res.clearCookie("refreshToken");

    return res.json({
      success: true,
    });
  }
}