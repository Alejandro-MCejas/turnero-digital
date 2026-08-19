import { Request, Response } from "express";
import {
    register as registerService,
    login as loginService,
    refresh as refreshService,
    logout as logoutService,
    forgotPassword as forgotPasswordService,
    resetPassword as resetPasswordService,
    changePassword as changePasswordService

} from "../services/auth.service";
import { AppError } from "../utils/AppError";
import { RegisterDto } from "../dtos/auth/register.dto";
import { LoginDto } from "../dtos/auth/login.dto";
import { ForgotPasswordDto } from "../dtos/auth/forgot-password.dto";
import { ResetPasswordDto } from "../dtos/auth/reset-password.dto";
import { ENV } from "../config/env";
import { ChangePasswordDto } from "../dtos/auth/change-password.dto";

export const register = async (req: Request<{}, {}, RegisterDto>, res: Response) => {
    const user = await registerService(req.body)
    return res.status(201).json(user)
}

export const login = async (req: Request<{}, {}, LoginDto>, res: Response) => {
    const data = await loginService(req.body)

    const isProduction = ENV.NODE_ENV === 'production'

    res.cookie("accessToken", data.accessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
        path: "/",
        maxAge: 1000 * 60 * 15
    })

    res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
        path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 7
    })

    return res.status(200).json({ message: "Login successful" })
}

export const refreshToken = async (req: Request, res: Response) => {

    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) throw new AppError("Refresh token required", 401)

    const data = await refreshService(refreshToken)

    const isProduction = ENV.NODE_ENV === 'production'

    res.cookie("accessToken", data.accessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
        path: "/",
        maxAge: 1000 * 60 * 15
    })

    res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
        path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 7
    })

    return res.status(200).json({ message: "Refresh token successful" })
}

export const logout = async (req: Request, res: Response) => {
    const user = req.user

    if (!user) throw new AppError('Unauthorized', 401)

    const response = await logoutService(user.id)

    const isProduction = ENV.NODE_ENV === 'production'

    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: isProduction,
        path: "/",
        sameSite: "lax"
    })

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: isProduction,
        path: "/",
        sameSite: "lax"
    })

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

export const session = async (req: Request, res: Response) => {
    return res.status(200).json({
        authenticated: true,
        user: {
            id: req.user!.id,
            role: req.user!.role
        }
    })
}

export const changePassword = async (req: Request<{}, {}, ChangePasswordDto>, res: Response) => {
    await changePasswordService(req.user!.id, req.body)

    return res.status(200).json({ message: "Password updated successfully" })
}