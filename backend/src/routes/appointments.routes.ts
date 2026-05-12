import { Router } from "express";
import { getAppointmentById, getAppointments } from "../controllers/appointments.controller";
import { createAppointment } from "../controllers/appointments.controller";
import { updateAppointment } from "../controllers/appointments.controller";
import { deleteAppointment } from "../controllers/appointments.controller";
import { validateDto } from "../middlewares/validateDto";
import { CreateAppointmentDto } from "../dtos/appointment/create-appointment.dto";
import { asyncHandler } from "../middlewares/asyncHandler";
import { UpdateAppointmentDto } from "../dtos/appointment/update-appointment.dto";



const router: Router = Router();

router.get("/", asyncHandler(getAppointments))
router.get("/:id", asyncHandler(getAppointmentById))
router.post("/", validateDto(CreateAppointmentDto), asyncHandler(createAppointment))
router.put("/:id", validateDto(UpdateAppointmentDto), asyncHandler(updateAppointment))
router.delete("/:id", asyncHandler(deleteAppointment))

export default router;