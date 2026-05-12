import { Router } from "express";
import { createDoctor, deleteDoctor, getDoctorById, getDoctors, updateDoctor } from "../controllers/doctors.controller";
import { asyncHandler } from "../middlewares/asyncHandler";
import { validateDto } from "../middlewares/validateDto";
import { CreateDoctorDto } from "../dtos/doctor/create-doctor.dto";
import { UpdateDoctorDto } from "../dtos/doctor/update-doctor.dto";



const router: Router = Router();


router.get("/", asyncHandler(getDoctors))
router.get("/:id", asyncHandler(getDoctorById))
router.post("/", validateDto(CreateDoctorDto), asyncHandler(createDoctor))
router.put("/:id", validateDto(UpdateDoctorDto), asyncHandler(updateDoctor))
router.delete("/:id", asyncHandler(deleteDoctor))


export default router;