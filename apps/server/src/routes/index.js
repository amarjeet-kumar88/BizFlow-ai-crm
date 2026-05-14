import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import authRoutes from "../modules/auth/routes/auth.routes";
import { roleMiddleware } from "../middleware/role.middleware";
import businessRoutes from "../modules/business/routes/business.routes";
const router = Router();
router.use("/auth", authRoutes);
router.get("/profile", authMiddleware, (req, res) => {
    return res.json({
        success: true,
        user: req.user,
    });
});
router.use("/business", businessRoutes);
router.get("/admin", authMiddleware, roleMiddleware([
    "SUPER_ADMIN",
    "BUSINESS_OWNER",
]), (req, res) => {
    return res.json({
        success: true,
        message: "Admin Route",
    });
});
export default router;
//# sourceMappingURL=index.js.map