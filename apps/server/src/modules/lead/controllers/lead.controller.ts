import type {
    Request,
    Response
}
    from "express";

import {
    LeadService
}
    from "../services/lead.service";

const service =
    new LeadService();

export class LeadController {

    async create(
        req: any,
        res: Response
    ) {

        try {

            const lead =
                await service.createLead(

                    req.body,

                    req.user.businessId

                )

            return res.json({

                success: true,

                data: lead

            })

        }
        catch (error: any) {

            return res.status(400)
                .json({

                    success: false,

                    message: error.message

                })

        }

    }

    async findAll(
        req: any,
        res: Response
    ) {

        const leads =
            await service.getLeads(
                req.user.businessId
            )

        return res.json({

            success: true,

            data: leads

        })

    }

}