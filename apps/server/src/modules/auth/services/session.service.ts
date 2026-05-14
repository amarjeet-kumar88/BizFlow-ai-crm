import prisma from "../../../prisma/client";

export class SessionService {
  async createSession(data: {
    userId: string;
    refreshToken: string;
    userAgent?: string | null | undefined;
    ipAddress?: string | null | undefined;
  }) {
    const sessionData: {
      userId: string;
      refreshToken: string;
      userAgent?: string | null;
      ipAddress?: string | null;
    } = {
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

  async invalidateSession(
    refreshToken: string
  ) {
    return prisma.session.updateMany({
      where: {
        refreshToken,
      },
      data: {
        isValid: false,
      },
    });
  }

  async findValidSession(
    refreshToken: string
  ) {
    return prisma.session.findFirst({
      where: {
        refreshToken,
        isValid: true,
      },
    });
  }
}