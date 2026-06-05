import { Router } from 'express'
import { asyncHandler } from '../middlewares/asyncHandler'
import { createDoctorSchedule, deleteDoctorSchedule, getDoctorSchedulesByDoctorId, updateDoctorSchedule } from '../controllers/doctorSchedules.controller'
import { validateDto } from '../middlewares/validateDto'
import { CreateDoctorScheduleDto } from '../dtos/doctorSchedule/create-doctorSchedule.dto'
import { UpdateDoctorScheduleDto } from '../dtos/doctorSchedule/update-doctorSchedule.dto'



const router: Router = Router()

router.get("/doctor/:doctorId", asyncHandler(getDoctorSchedulesByDoctorId))
router.post("/doctor/:doctorId", validateDto(CreateDoctorScheduleDto), asyncHandler(createDoctorSchedule))
router.put("/:id", validateDto(UpdateDoctorScheduleDto), asyncHandler(updateDoctorSchedule))
router.delete("/:id", asyncHandler(deleteDoctorSchedule))

export default router