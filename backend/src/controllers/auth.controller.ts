import { Request, Response } from "express";
import {
    register as registerService,
    login as loginService,
    refresh as refreshService,
    logout as logoutService,
    forgotPassword as forgotPasswordService,
    resetPassword as resetPasswordService

} from "../services/auth.service";
import { AppError } from "../utils/AppError";
import { RegisterDto } from "../dtos/auth/register.dto";
import { LoginDto } from "../dtos/auth/login.dto";
import { RefreshTokenDto } from "../dtos/auth/refreshToken.dto";
import { ForgotPasswordDto } from "../dtos/auth/forgot-password.dto";
import { ResetPasswordDto } from "../dtos/auth/reset-password.dto";

export const register = async (req: Request<{}, {}, RegisterDto>, res: Response) => {
    const user = await registerService(req.body)
    return res.status(201).json(user)
}

export const login = async (req: Request<{}, {}, LoginDto>, res: Response) => {
    const data = await loginService(req.body)
    return res.status(200).json(data)
}

export const refreshToken = async (req: Request<{}, {}, RefreshTokenDto>, res: Response) => {

    const { refreshToken } = req.body

    const data = await refreshService(refreshToken)
    return res.status(200).json(data)
}

export const logout = async (req: Request, res: Response) => {
    const user = req.user

    if (!user) throw new AppError('Unauthorized', 401)

    const response = await logoutService(user.id)
    return res.status(200).json(response)
}

export const forgotPassword = async (req: Request<{}, {}, ForgotPasswordDto>, res: Response) => {
    const { email } = req.body

    await forgotPasswordService(email)

    return res.status(200).json({
        message: 'If the mail exists, a reset link was sent'
    })

}

export const resetPassword = async (req: Request<{}, {}, ResetPasswordDto>, res: Response) => {
    await resetPasswordService(req.body)
    return res.status(200).json({
        message: "Password updated successfully"
    })
}