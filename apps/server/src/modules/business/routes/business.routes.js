import { Router } from "express";
import { BusinessController } from "../controllers/business.controller";
import { authMiddleware } from "../../../middleware/auth.middleware";
import { tenantMiddleware } from "../../../middleware/tenant.middleware";
const router = Router();
const controller = new BusinessController();
router.post("/create", authMiddleware, controller.create);
router.get("/me", authMiddleware, tenantMiddleware, (req, res) => {
    return res.json({
        tenant: req.tenant
    });
});
export default router;
//# sourceMappingURL=business.routes.js.map