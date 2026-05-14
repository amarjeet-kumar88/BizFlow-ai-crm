import bcrypt from "bcrypt";
import prisma from "../../../prisma/client";
import { generateAccessToken, generateRefreshToken, verifyToken, } from "../utils/jwt";
import { SessionService } from "./session.service";
import { AuditService } from "../../../shared/audit/audit.service";
const sessionService = new SessionService();
const auditService = new AuditService();
export class AuthService {
    async register(data) {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });
        if (existingUser) {
            throw new Error("User already exists");
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
            },
        });
        await auditService.log({
            userId: user.id,
            action: "USER_REGISTERED",
        });
        return user;
    }
    async login(data, userAgent, ipAddress) {
        const user = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });
        if (!user) {
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }
        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);
        await sessionService.createSession({
            userId: user.id,
            refreshToken,
            userAgent,
            ipAddress,
        });
        await auditService.log({
            userId: user.id,
            action: "USER_LOGIN",
        });
        return {
            user,
            accessToken,
            refreshToken,
        };
    }
    async refreshToken(oldRefreshToken) {
        const session = await sessionService.findValidSession(oldRefreshToken);
        if (!session) {
            throw new Error("Invalid session");
        }
        const decoded = verifyToken(oldRefreshToken);
        const newAccessToken = generateAccessToken(decoded.userId);
        const newRefreshToken = generateRefreshToken(decoded.userId);
        await sessionService.invalidateSession(oldRefreshToken);
        await sessionService.createSession({
            userId: decoded.userId,
            refreshToken: newRefreshToken,
        });
        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        };
    }
    async logout(refreshToken) {
        await sessionService.invalidateSession(refreshToken);
        return {
            success: true,
        };
    }
}
//# sourceMappingURL=auth.service.js.map