import { Router } from "express";
import { validateDto } from "../middlewares/validateDto";
import { RegisterDto } from "../dtos/auth/register.dto";
import { asyncHandler } from "../middlewares/asyncHandler";
import { changePassword, forgotPassword, login, logout, refreshToken, register, resetPassword, session } from "../controllers/auth.controller";
import { LoginDto } from "../dtos/auth/login.dto";
import { authMiddleware } from "../middlewares/auth";
import { ForgotPasswordDto } from "../dtos/auth/forgot-password.dto";
import { ResetPasswordDto } from "../dtos/auth/reset-password.dto";
import { ChangePasswordDto } from "../dtos/auth/change-password.dto";

const router = Router()

router.post("/register", validateDto(RegisterDto), asyncHandler(register))
router.get("/session", authMiddleware, asyncHandler(session))
router.post("/login", validateDto(LoginDto), asyncHandler(login))
router.post("/refresh", asyncHandler(refreshToken))
router.post("/logout", authMiddleware, asyncHandler(logout))
router.post("/forgot-password", validateDto(ForgotPasswordDto), asyncHandler(forgotPassword))
router.post("/reset-password", validateDto(ResetPasswordDto), asyncHandler(resetPassword))
router.put("/change-password", authMiddleware, validateDto(ChangePasswordDto), asyncHandler(changePassword))
export default router;

