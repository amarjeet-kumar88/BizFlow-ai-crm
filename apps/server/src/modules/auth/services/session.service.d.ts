export declare class SessionService {
    createSession(data: {
        userId: string;
        refreshToken: string;
        userAgent?: string | null | undefined;
        ipAddress?: string | null | undefined;
    }): Promise<{
        id: string;
        refreshToken: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        userAgent: string | null;
        ipAddress: string | null;
        isValid: boolean;
    }>;
    invalidateSession(refreshToken: string): Promise<import("@prisma/client").Prisma.BatchPayload>;
    findValidSession(refreshToken: string): Promise<{
        id: string;
        refreshToken: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        userAgent: string | null;
        ipAddress: string | null;
        isValid: boolean;
    } | null>;
}
//# sourceMappingURL=session.service.d.ts.map