import type {
    Request,
    Response
}
    from "express";

import {
    BusinessService
}
    from "../services/business.service";

const service =
    new BusinessService();

export class BusinessController {

    async create(
        req: any,
        res: Response
    ) {

        try {

            const business =
                await service.createBusiness(

                    req.body,

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