import { Router } from 'express'
import { asyncHandler } from '../middlewares/asyncHandler'
import { createDoctorSchedule, deleteDoctorSchedule, getDoctorSchedulesByDoctorId, updateDoctorSchedule } from '../controllers/doctorSchedules.controller'
import { validateDto } from '../middlewares/validateDto'
import { CreateDoctorScheduleDto } from '../dtos/doctorSchedule/create-doctorSchedule.dto'
import { UpdateDoctorScheduleDto } from '../dtos/doctorSchedule/update-doctorSchedule.dto'
import { authMiddleware } from '../middlewares/auth'
import { authorizeRoles } from '../middlewares/roles'
import { UserRole } from '../enums/UserRole'



const router: Router = Router()

router.get("/doctor/:doctorId", authMiddleware, authorizeRoles(UserRole.ADMIN), asyncHandler(getDoctorSchedulesByDoctorId))
router.post("/doctor/:doctorId", authMiddleware, authorizeRoles(UserRole.ADMIN), validateDto(CreateDoctorScheduleDto), asyncHandler(createDoctorSchedule))
router.put("/:id", authMiddleware, authorizeRoles(UserRole.ADMIN), validateDto(UpdateDoctorScheduleDto), asyncHandler(updateDoctorSchedule))
router.delete("/:id", authMiddleware, authorizeRoles(UserRole.ADMIN), asyncHandler(deleteDoctorSchedule))

export default router