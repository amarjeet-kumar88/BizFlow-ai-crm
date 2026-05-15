import {
    LeadRepository
}
    from "../repositories/lead.repository";

const repository =
    new LeadRepository();

export class LeadService {

    async createLead(
        data: any,
        businessId?: string
    ) {

        if (!businessId) {
            throw new Error(
                "Business ID is required to create a lead. Please create or join a business first."
            );
        }

        return repository.create({

            ...data,

            businessId

        })

    }

    async getLeads(
        businessId: string
    ) {

        return repository.findAll(
            businessId
        )

    }

}