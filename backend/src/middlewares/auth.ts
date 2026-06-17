import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/jwt";
import { extractTokenFromHeader } from "../utils/auth";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = extractTokenFromHeader(req)

    if (!token) return res.status(401).json({ message: "Token required" })

    try {
        const decoded = verifyAccessToken(token)
        req.user = decoded;
        next()
    } catch {
        return res.status(401).json({ message: "Invalid Token" })
    }
}