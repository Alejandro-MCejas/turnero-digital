import jwt from "jsonwebtoken"
import { JwtPayload, RefreshTokenPayload } from "../types/JwtPayload"


const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!

export const generateAccessToken = (payload: Pick<JwtPayload, "id" | "role">) => {
    return jwt.sign(payload, ACCESS_SECRET, { expiresIn: "1h" })
}

export const generateRefreshToken = (payload: RefreshTokenPayload) => {
    return jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" })
}

export const verifyAccessToken = (token: string): JwtPayload => {
    return jwt.verify(token, ACCESS_SECRET) as JwtPayload
}

export const verifyRefreshToken = (token: string): RefreshTokenPayload => {
    return jwt.verify(token, REFRESH_SECRET) as RefreshTokenPayload
}

