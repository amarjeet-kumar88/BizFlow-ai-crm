import jwt from "jsonwebtoken";
import prisma from "../prisma/client";
export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.userId,
            },
        });
        if (!user) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
};
//# sourceMappingURL=auth.middleware.js.map