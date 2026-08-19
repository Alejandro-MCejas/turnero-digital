import { Router } from "express";
import { dashboardStats } from "../controllers/dashboard.controller";
import { authMiddleware } from "../middlewares/auth";
import { authorizeRoles } from "../middlewares/roles";
import { UserRole } from "../enums/UserRole";
import { asyncHandler } from "../middlewares/asyncHandler";

const router: Router = Router()

router.get("/stats", authMiddleware, authorizeRoles(UserRole.ADMIN), asyncHandler(dashboardStats))

export default router