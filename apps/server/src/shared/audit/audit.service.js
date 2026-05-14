import prisma from "../../prisma/client";
export class AuditService {
    async log(data) {
        return prisma.auditLog.create({
            data,
        });
    }
}
//# sourceMappingURL=audit.service.js.map