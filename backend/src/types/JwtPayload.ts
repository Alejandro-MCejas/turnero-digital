import { UserRole } from "../enums/UserRole";

export interface JwtPayload {
    id: string,
    role: UserRole,
    iat?: number,
    exp?: number
}

