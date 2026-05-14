import bcrypt from "bcrypt";
import prisma from "../prisma/client";
import { generateAccessToken, generateRefreshToken, } from "../modules/auth/utils/jwt";
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
        return user;
    }
    async login(data) {
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
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                refreshToken,
            },
        });
        return {
            user,
            accessToken,
            refreshToken,
        };
    }
}
//# sourceMappingURL=auth.service.js.map