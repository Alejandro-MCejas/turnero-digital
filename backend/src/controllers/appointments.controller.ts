import { Request, Response } from "express";
import { CreateAppointmentDto } from "../dtos/appointment/create-appointment.dto";
import { UpdateAppointmentDto } from "../dtos/appointment/update-appointment.dto";
import {
    getAppointments as getAppointmentsService,
    getAppointmentById as getAppointmentByIdService,
    createAppointment as createAppointmentService,
    updateAppointment as updateAppointmentService,
    deleteAppointment as deleteAppointmentService
} from "../services/appointments.service"


export const getAppointments = async (req: Request, res: Response) => {
    return res.status(200).json(await getAppointmentsService())
}

export const getAppointmentById = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params
    return res.status(200).json(await getAppointmentByIdService(id))
}

export const createAppointment = async (req: Request<{}, {}, CreateAppointmentDto>, res: Response) => {
    const dto = req.body

    const appointment = await createAppointmentService(dto)

    return res.status(201).json(appointment)
}

export const updateAppointment = async (req: Request<{ id: string }, {}, UpdateAppointmentDto>, res: Response) => {
    const { id } = req.params
    const dto = req.body

    const appointment = await updateAppointmentService(id, dto)

    return res.status(200).json(appointment)
}

export const deleteAppointment = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params

    await deleteAppointmentService(id)

    return res.status(204).send()
}