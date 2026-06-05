import { Request, Response } from "express";
import {
    getDoctorSchedulesByDoctorId as getDoctorSchedulesService,
    createDoctorSchedule as createDoctorScheduleService,
    updateDoctorSchedule as updateDoctorScheduleService,
    deleteDoctorSchedule as deleteDoctorScheduleService
} from "../services/doctorSchedules.service"
import { CreateDoctorScheduleDto } from "../dtos/doctorSchedule/create-doctorSchedule.dto";
import { UpdateDoctorScheduleDto } from "../dtos/doctorSchedule/update-doctorSchedule.dto";



export const getDoctorSchedulesByDoctorId = async (req: Request<{ doctorId: string }>, res: Response) => {
    const { doctorId } = req.params
    return res.status(200).json(await getDoctorSchedulesService(doctorId))
}

export const createDoctorSchedule = async (req: Request<{ doctorId: string }, {}, CreateDoctorScheduleDto>, res: Response) => {
    const { doctorId } = req.params
    const dto = req.body

    return res.status(201).json(await createDoctorScheduleService(doctorId, dto))
}

export const updateDoctorSchedule = async (req: Request<{ id: string }, {}, UpdateDoctorScheduleDto>, res: Response) => {
    const { id } = req.params
    const dto = req.body

    return res.status(200).json(await updateDoctorScheduleService(id, dto))
}

export const deleteDoctorSchedule = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params

    await deleteDoctorScheduleService(id)

    return res.status(204).send()
}