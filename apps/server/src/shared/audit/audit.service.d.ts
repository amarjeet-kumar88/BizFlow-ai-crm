export declare class AuditService {
    log(data: {
        userId?: string;
        action: string;
        entity?: string;
        entityId?: string;
        metadata?: any;
    }): Promise<{
        id: string;
        createdAt: Date;
        userId: string | null;
        action: string;
        entity: string | null;
        entityId: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
}
//# sourceMappingURL=audit.service.d.ts.map