import prisma
    from "../prisma/client";

export const tenantMiddleware =

    async (
        req: any,
        res: any,
        next: any
    ) => {

        try {

            let businessId =
                req.user.businessId;

            if (!businessId) {
                const ownerBusiness = await prisma.business.findFirst({
                    where: {
                        ownerId: req.user.id,
                    },
                });

                if (ownerBusiness) {
                    businessId = ownerBusiness.id;
                }
            }

            if (!businessId) {
                const membership = await prisma.businessMember.findFirst({
                    where: {
                        userId: req.user.id,
                    },
                });

                if (membership) {
                    businessId = membership.businessId;
                }
            }

            if (!businessId) {
                return res
                    .status(403)
                    .json({
                        message:
                            "No business assigned. Please create a business first using /api/v1/business/create or assign a business to this user."
                    });

            }

            const business =

                await prisma.business
                    .findUnique({

                        where: {
                            id: businessId
                        }

                    });

            if (!business) {

                return res
                    .status(404)
                    .json({

                        message:
                            "Business not found"
                    });

            }

            req.tenant = business;

            next();

        }
        catch {

            return res
                .status(500)
                .json({

                    message:
                        "Tenant error"
                });

        }

    }