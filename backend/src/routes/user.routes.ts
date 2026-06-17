import { Router } from "express";
import { getCurrentUser, getUsers, updateUserRole } from "../controllers/user.controller"
import { getUserById } from "../controllers/user.controller";
import { updateUser } from "../controllers/user.controller";
import { deleteUser } from "../controllers/user.controller"
import { asyncHandler } from "../middlewares/asyncHandler";
import { validateDto } from "../middlewares/validateDto";
import { UpdateUserDto } from "../dtos/user/update-user.dto";
import { authMiddleware } from "../middlewares/auth";
import { authorizeRoles } from "../middlewares/roles";
import { UserRole } from "../enums/UserRole";
import { UpdateUserRoleDto } from "../dtos/user/update-user-role.dto";


const router: Router = Router();

router.get("/", authMiddleware, authorizeRoles(UserRole.ADMIN), asyncHandler(getUsers))
router.get("/me", authMiddleware, asyncHandler(getCurrentUser))
router.get("/:id", authMiddleware, authorizeRoles(UserRole.ADMIN), asyncHandler(getUserById))
router.patch("/:id/role", authMiddleware, authorizeRoles(UserRole.ADMIN), validateDto(UpdateUserRoleDto), asyncHandler(updateUserRole))
router.put("/:id", authMiddleware, authorizeRoles(UserRole.ADMIN), validateDto(UpdateUserDto), asyncHandler(updateUser))
router.delete("/:id", authMiddleware, authorizeRoles(UserRole.ADMIN), asyncHandler(deleteUser))

export default router;