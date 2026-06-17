import { Router } from "express";
import { validateDto } from "../middlewares/validateDto";
import { RegisterDto } from "../dtos/auth/register.dto";
import { asyncHandler } from "../middlewares/asyncHandler";
import { login, logout, refreshToken, register } from "../controllers/auth.controller";
import { LoginDto } from "../dtos/auth/login.dto";
import { authMidleware } from "../middlewares/auth";

const router = Router()

router.post("/register", validateDto(RegisterDto), asyncHandler(register))
router.post("/login", validateDto(LoginDto), asyncHandler(login))
router.post("/refresh", asyncHandler(refreshToken))
router.post("/logout", authMidleware, asyncHandler(logout))

export default router;

