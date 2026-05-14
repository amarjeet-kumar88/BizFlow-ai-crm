import prisma from "../../prisma/client";

export class AuditService {
  async log(data: {
    userId?: string;
    action: string;
    entity?: string;
    entityId?: string;
    metadata?: any;
  }) {
    return prisma.auditLog.create({
      data,
    });
  }
}