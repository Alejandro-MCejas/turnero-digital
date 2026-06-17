import { Router } from "express";
import { getAppointmentById, getAppointments, getMyAppointments } from "../controllers/appointments.controller";
import { createAppointment } from "../controllers/appointments.controller";
import { updateAppointment } from "../controllers/appointments.controller";
import { deleteAppointment } from "../controllers/appointments.controller";
import { validateDto } from "../middlewares/validateDto";
import { CreateAppointmentDto } from "../dtos/appointment/create-appointment.dto";
import { asyncHandler } from "../middlewares/asyncHandler";
import { UpdateAppointmentDto } from "../dtos/appointment/update-appointment.dto";
import { authMiddleware } from "../middlewares/auth";
import { authorizeRoles } from "../middlewares/roles";
import { UserRole } from "../enums/UserRole";



const router: Router = Router();

router.get("/", authMiddleware, authorizeRoles(UserRole.ADMIN), asyncHandler(getAppointments))
router.get("/me", authMiddleware, asyncHandler(getMyAppointments))
router.get("/:id", authMiddleware, authorizeRoles(UserRole.ADMIN), asyncHandler(getAppointmentById))
router.post("/", authMiddleware, validateDto(CreateAppointmentDto), asyncHandler(createAppointment))
router.put("/:id", authMiddleware, authorizeRoles(UserRole.USER, UserRole.ADMIN), validateDto(UpdateAppointmentDto), asyncHandler(updateAppointment))
router.delete("/:id", authMiddleware, authorizeRoles(UserRole.USER, UserRole.ADMIN), asyncHandler(deleteAppointment))

export default router;