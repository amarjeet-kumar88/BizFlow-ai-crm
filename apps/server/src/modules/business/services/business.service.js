import prisma from "../../../prisma/client";
export class BusinessService {
    async createBusiness(data, userId) {
        const existingBusiness = await prisma.business.findUnique({
            where: {
                slug: data.slug
            }
        });
        if (existingBusiness) {
            throw new Error("Business already exists");
        }
        const business = await prisma.business.create({
            data: {
                name: data.name,
                slug: data.slug,
                industryType: data.industryType,
                ownerId: userId
            }
        });
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                businessId: business.id
            }
        });
        return business;
    }
}
//# sourceMappingURL=business.service.js.map