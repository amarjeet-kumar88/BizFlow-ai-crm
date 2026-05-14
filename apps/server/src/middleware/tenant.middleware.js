import prisma from "../prisma/client";
export const tenantMiddleware = async (req, res, next) => {
    try {
        const businessId = req.user.businessId;
        if (!businessId) {
            return res
                .status(403)
                .json({
                message: "No business assigned"
            });
        }
        const business = await prisma.business
            .findUnique({
            where: {
                id: businessId
            }
        });
        if (!business) {
            return res
                .status(404)
                .json({
                message: "Business not found"
            });
        }
        req.tenant = business;
        next();
    }
    catch {
        return res
            .status(500)
            .json({
            message: "Tenant error"
        });
    }
};
//# sourceMappingURL=tenant.middleware.js.map