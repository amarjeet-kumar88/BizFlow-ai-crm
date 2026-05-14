import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";
import authRoutes from "../modules/auth/routes/auth.routes";

const router = Router();

router.use("/auth", authRoutes);
router.get(
  "/profile",
  authMiddleware,
  (req, res) => {
    return res.json({
      success: true,
      user: (req as any).user,
    });
  }
);

export default router;