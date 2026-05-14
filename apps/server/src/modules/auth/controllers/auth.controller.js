import { AuthService } from "../services/auth.service";
const authService = new AuthService();
export class AuthController {
    async register(req, res) {
        try {
            const user = await authService.register(req.body);
            return res.status(201).json({
                success: true,
                data: user,
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
    async login(req, res) {
        try {
            const result = await authService.login(req.body, req.headers["user-agent"], req.ip);
            res.cookie("accessToken", result.accessToken, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
            });
            res.cookie("refreshToken", result.refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
            });
            return res.json({
                success: true,
                data: result,
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
    async refresh(req, res) {
        try {
            const refreshToken = req.cookies.refreshToken;
            const result = await authService.refreshToken(refreshToken);
            res.cookie("accessToken", result.accessToken, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
            });
            res.cookie("refreshToken", result.refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
            });
            return res.json({
                success: true,
            });
        }
        catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message,
            });
        }
    }
    async logout(req, res) {
        const refreshToken = req.cookies.refreshToken;
        await authService.logout(refreshToken);
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        return res.json({
            success: true,
        });
    }
}
//# sourceMappingURL=auth.controller.js.map