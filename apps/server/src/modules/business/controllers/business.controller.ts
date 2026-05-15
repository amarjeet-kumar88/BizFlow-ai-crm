import type {
    Request,
    Response
}
    from "express";

import {
    BusinessService
}
    from "../services/business.service";

import {
    createBusinessSchema
}
    from "../validators/business.validator";

const service =
    new BusinessService();

export class BusinessController {

    async create(
        req: any,
        res: Response
    ) {

        try {

            const parseResult =
                createBusinessSchema.safeParse(req.body);

            if (!parseResult.success) {
                return res.status(400).json({
                    success: false,
                    message: parseResult.error.issues
                        .map((issue) => issue.message)
                        .join(" | "),
                });
            }

            const business =
                await service.createBusiness(
                    parseResult.data,
                    req.user.id
                );

            return res.json({

                success: true,

                data: business

            });

        }

        catch (error: any) {

            return res.status(400)
                .json({

                    success: false,

                    message: error.message

                });

        }

    }

}