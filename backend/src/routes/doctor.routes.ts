import { Router } from "express";
import { createDoctor, deleteDoctor, getDoctorAvailability, getDoctorAvailableDays, getDoctorById, getDoctors, updateDoctor } from "../controllers/doctors.controller";
import { asyncHandler } from "../middlewares/asyncHandler";
import { validateDto } from "../middlewares/validateDto";
import { CreateDoctorDto } from "../dtos/doctor/create-doctor.dto";
import { UpdateDoctorDto } from "../dtos/doctor/update-doctor.dto";
import { authMiddleware } from "../middlewares/auth";
import { authorizeRoles } from "../middlewares/roles";
import { UserRole } from "../enums/UserRole";



const router: Router = Router();


router.get("/", asyncHandler(getDoctors))
router.get("/:id", asyncHandler(getDoctorById))
router.get("/:id/available-days", asyncHandler(getDoctorAvailableDays))
router.get("/:id/availability", asyncHandler(getDoctorAvailability))
router.post("/", authMiddleware, authorizeRoles(UserRole.ADMIN), validateDto(CreateDoctorDto), asyncHandler(createDoctor))
router.put("/:id", authMiddleware, authorizeRoles(UserRole.ADMIN), validateDto(UpdateDoctorDto), asyncHandler(updateDoctor))
router.delete("/:id", authMiddleware, authorizeRoles(UserRole.ADMIN), asyncHandler(deleteDoctor))



export default router;