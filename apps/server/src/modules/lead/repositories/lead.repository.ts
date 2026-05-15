import prisma
    from "../../../prisma/client";

export class LeadRepository {

    async create(data: any) {

        return prisma.lead.create({
            data
        })

    }

    async findAll(
        businessId: string
    ) {

        return prisma.lead.findMany({

            where: {
                businessId
            },

            orderBy: {
                createdAt: 'desc'
            }

        })

    }

}