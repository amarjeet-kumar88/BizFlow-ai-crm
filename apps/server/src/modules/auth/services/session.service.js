import prisma from "../../../prisma/client";
export class SessionService {
    async createSession(data) {
        const sessionData = {
            userId: data.userId,
            refreshToken: data.refreshToken,
        };
        if (data.userAgent !== undefined) {
            sessionData.userAgent = data.userAgent;
        }
        if (data.ipAddress !== undefined) {
            sessionData.ipAddress = data.ipAddress;
        }
        return prisma.session.create({
            data: sessionData,
        });
    }
    async invalidateSession(refreshToken) {
        return prisma.session.updateMany({
            where: {
                refreshToken,
            },
            data: {
                isValid: false,
            },
        });
    }
    async findValidSession(refreshToken) {
        return prisma.session.findFirst({
            where: {
                refreshToken,
                isValid: true,
            },
        });
    }
}
//# sourceMappingURL=session.service.js.map