import { Request, Response } from "express";
import {
    register as registerService,
    login as loginService,
    refresh as refreshService,
    logout as logoutService

} from "../services/auth.service";
import { AppError } from "../utils/AppError";
import { RegisterDto } from "../dtos/auth/register.dto";
import { LoginDto } from "../dtos/auth/login.dto";

export const register = async (req: Request<{}, {}, RegisterDto>, res: Response) => {
    const user = await registerService(req.body)
    return res.status(201).json(user)
}

export const login = async (req: Request<{}, {}, LoginDto>, res: Response) => {
    const data = await loginService(req.body)
    return res.status(200).json(data)
}

export const refreshToken = async (req: Request, res: Response) => {

    const { refreshToken } = req.body

    const data = await refreshService(refreshToken)
    return res.status(200).json(data)
}

export const logout = async (req: Request, res: Response) => {
    const user = req.user

    if (!user) throw new AppError('Unauthorized', 401)

    await logoutService(user.id)
    return res.status(200).json({ message: "Logged out successfully" })
}
