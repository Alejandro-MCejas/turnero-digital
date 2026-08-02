import { Router } from "express";
import { validateDto } from "../middlewares/validateDto";
import { RegisterDto } from "../dtos/auth/register.dto";
import { asyncHandler } from "../middlewares/asyncHandler";
import { forgotPassword, login, logout, refreshToken, register, resetPassword } from "../controllers/auth.controller";
import { LoginDto } from "../dtos/auth/login.dto";
import { authMiddleware } from "../middlewares/auth";
import { RefreshTokenDto } from "../dtos/auth/refreshToken.dto";
import { ForgotPasswordDto } from "../dtos/auth/forgot-password.dto";
import { ResetPasswordDto } from "../dtos/auth/reset-password.dto";

const router = Router()

router.post("/register", validateDto(RegisterDto), asyncHandler(register))
router.post("/login", validateDto(LoginDto), asyncHandler(login))
router.post("/refresh", validateDto(RefreshTokenDto), asyncHandler(refreshToken))
router.post("/logout", authMiddleware, asyncHandler(logout))
router.post("/forgot-password", validateDto(ForgotPasswordDto), asyncHandler(forgotPassword))
router.post("/reset-password", validateDto(ResetPasswordDto), asyncHandler(resetPassword))
export default router;

