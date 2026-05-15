import {
    Router
}
    from "express";

import {
    LeadController
}
    from "../controllers/lead.controller";

import {
    authMiddleware
}
    from "../../../middleware/auth.middleware";

import {
    tenantMiddleware
}
    from "../../../middleware/tenant.middleware";

const router = Router();

const controller =
    new LeadController();

router.post(
    "/",
    authMiddleware,
    tenantMiddleware,
    controller.create
)

router.get(
    "/",
    authMiddleware,
    tenantMiddleware,
    controller.findAll
)

export default router;