export declare class AuthService {
    register(data: {
        name: string;
        email: string;
        password: string;
    }): Promise<{
        id: string;
        email: string;
        password: string;
        name: string;
        role: import("@prisma/client").$Enums.Role;
        refreshToken: string | null;
        isActive: boolean;
        isEmailVerified: boolean;
        businessId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(data: {
        email: string;
        password: string;
    }): Promise<{
        user: {
            id: string;
            email: string;
            password: string;
            name: string;
            role: import("@prisma/client").$Enums.Role;
            refreshToken: string | null;
            isActive: boolean;
            isEmailVerified: boolean;
            businessId: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        accessToken: string;
        refreshToken: string;
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map