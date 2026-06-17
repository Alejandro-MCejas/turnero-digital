import { Router } from "express";
import userRouter from "./user.routes";
import appointmentsRouter from "./appointments.routes";
import doctorRouter from "./doctor.routes";
import doctorSchedulesRouter from "./doctorSchedules.routes";
import authRouter from "./auth.routes";

const router: Router = Router();
router.use("/auth", authRouter)
router.use("/users", userRouter)
router.use("/appointments", appointmentsRouter)
router.use("/doctors", doctorRouter)
router.use("/doctor-schedules", doctorSchedulesRouter)

export default router; 