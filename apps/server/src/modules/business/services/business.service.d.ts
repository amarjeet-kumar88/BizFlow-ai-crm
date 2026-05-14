export declare class BusinessService {
    createBusiness(data: any, userId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        ownerId: string;
        logo: string | null;
        industryType: import("@prisma/client").$Enums.BusinessType;
        timezone: string | null;
        settings: import("@prisma/client/runtime/library").JsonValue | null;
        subscriptionId: string | null;
    }>;
}
//# sourceMappingURL=business.service.d.ts.map